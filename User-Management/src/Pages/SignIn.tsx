import { useState } from "react"
import { Link , useNavigate} from "react-router-dom";
import { signInStart,signInSuccess,signInFailure } from "../Redux/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../Components/Oauth";


function SignIn() {

  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state:any) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e: { target: { id: any; value: any } })=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  };

  const handleSubmit = async(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    
    console.log('form data from sign in page.......',formData);

    try{

      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data =await res.json();
      console.log("data is",data); {message:'Sign in successfuly'};


      if(data.success===false){
      dispatch(signInFailure(data));
      return
      };

      dispatch(signInSuccess(data));

      navigate('/');
    
     

    }catch(error){
      console.log("error is ",error);
      dispatch(signInFailure(error));
    }
    
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center m-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input type="email" placeholder="Email" id="email" name="email" className="bg-slate-200 rounded-lg p-2 " onChange={handleChange}/>

        <input type="password" placeholder="Password" id="password" name="password" className="bg-slate-200 rounded-lg p-2 " onChange={handleChange}/>

        <button disabled={loading} className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase">{loading ? 'Loading...' : 'Sign In'}</button>
      
        <Oauth />
      
      </form>

    
      

      <div className="flex gap-2 mt-4">
        <p>Create an account ?</p>
        <Link to={'/sign-up'}>
        <span className="text-blue-500">Sign In</span>
        </Link>
      </div>

      <p className="text-red-700 mt-4">{error ? error.message ||'Something went wrong...!' :""}</p>
    </div>
  )
}

export default SignIn
