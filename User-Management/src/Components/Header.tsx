import { Link } from "react-router-dom"
import { useSelector} from "react-redux"

function Header() {

  const {currentUser} = useSelector((state:any) => state.user);
  console.log('current user is ',currentUser);

  return (
    <div className="bg-slate-200">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

            <Link to={'/'}>
            <h1 className="font-bold">User Management</h1>
            </Link>

            <ul className="flex font-semibold gap-4">


                <Link to={'/'}>
                <li>Home</li>
                </Link>

                <Link to={'/about'}>
                <li>About</li>
                </Link>

                <Link to={'/profile'}>
                {currentUser ?(
                  <img src={currentUser.profilePicture} alt="profile" className="w-7 h-7 rounded-full object-cover" />
                ):(
                <li>Sign In</li>
                ) }
                </Link>
            </ul>

        </div>
    </div>
  )
}

export default Header
