import { useState } from "react"
import { Link } from "react-router-dom"

function SignIn() {

  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  const handleChange = (e: { target: { id: any; value: any } })=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  };

  const handleSubmit = async(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    

    try{
      setError(false);

      setLoading(true);

      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data =await res.json();
      console.log("data is",data); {message:'User created successfuly'};

      setLoading(false);
      if(data.success===false){
      setError(true);

      }

    }catch(error){
      console.log("error is ",error);
      setLoading(false);
      setError(true);
    }
    
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center m-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input type="email" placeholder="Email" id="email" name="email" className="bg-slate-200 rounded-lg p-2 " onChange={handleChange}/>

        <input type="password" placeholder="Password" id="password" name="password" className="bg-slate-200 rounded-lg p-2 " onChange={handleChange}/>

        <button disabled={loading} className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase">{loading ? 'Loading...' : 'Sign In'}</button>
      </form>

      <div className="max-w-lg mx-auto flex flex-col pt-4">
      <button  className="bg-red-700 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase">continue with google</button>
      </div>
      

      <div className="flex gap-2 mt-4">
        <p>Haven't an account ?</p>
        <Link to={'/sign-up'}>
        <span className="text-blue-500">Sign In</span>
        </Link>
      </div>

      <p className="text-red-700 mt-4">{error && 'Something went wrong...!'}</p>
    </div>
  )
}

export default SignIn
