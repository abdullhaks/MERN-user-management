import { Link } from "react-router-dom"


function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center m-7">Sign Up</h1>
      <form className="flex flex-col gap-4">

        <input type="text" placeholder="Username" id="username" className="bg-slate-200 rounded-lg p-2 " />

        <input type="email" placeholder="Email" id="email" className="bg-slate-200 rounded-lg p-2 " />

        <input type="password" placeholder="Password" id="password" className="bg-slate-200 rounded-lg p-2 " />

        <button  className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase">Sign up</button>
      </form>

      <div className="max-w-lg mx-auto flex flex-col pt-3">
      <button  className="bg-red-700 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase">continue with google</button>
      </div>
      

      <div className="flex gap-2 mt-4">
        <p>Have an account ?</p>
        <Link to={'/sign-in'}>
        <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
