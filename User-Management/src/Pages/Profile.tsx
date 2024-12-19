import { useSelector } from "react-redux"

function Profile() {

  const {currentUser} = useSelector((state:any)=> state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>

      <form className="flex flex-col gap-4">

        <img src={currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>

        <input type="text" id="userName" placeholder="Username" className="bg-slate-100 rounded-lg p-3" defaultValue={currentUser.userName}/> 
        
        <input type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" defaultValue={currentUser.email}/> 
        
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-65">update</button>
        

      </form>

      <div className="flex  justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer ">sign Out</span>
      </div>
    </div>
  )
}

export default Profile
