import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import app from '../firebase_setup';
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/User/UserSlice";

function Oauth() {

  const dispatch = useDispatch();

  const handleGoogle = async() =>{
    try{

      const auth = getAuth(app);
      const provider =    new GoogleAuthProvider();
      
      const result = await signInWithPopup(auth,provider);

      const res = await fetch('/api/auth/google', {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL

        }),

      });

      const data = await res.json();

      console.log('data form ford end ..',data);
      dispatch (signInSuccess(data));


    }catch(error){
      console.log("google authentication failed...!",error)
    }
      
  }
     



  return (
  
      <button type="button" onClick={handleGoogle} className="bg-red-700 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase">continue with google</button>
      
    
  )
}

export default Oauth
