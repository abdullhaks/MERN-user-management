import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { adminSignOut } from "../Redux/Admin/AdminSlice";
import { persistor } from "../Redux/Store";

function AdminHeader() {

  const {adminDetals} = useSelector((state:any) => state.admin);
  console.log('current user is ',adminDetals);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.post('/api/admin/sign-out', {}, { withCredentials: true });
  
      dispatch(adminSignOut());
      persistor.purge(); 
  
      navigate('/admin');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="bg-slate-600">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

            <Link to={'/admin'}>
            <h1 className="font-bold text-white">User Management</h1>
            </Link>

            <ul className="flex font-semibold gap-4">


                <Link to={'/admin'}>
                <li className="font-light text-white">DashBoard</li>
                </Link>

                <Link to={'/admin/admin-users'}>
                <li className="font-light text-white">Users</li>
                </Link>

                {adminDetals ?(
                <>
                <p className="font-light text-white cursor-pointer"  onClick={handleSignOut}>Sign out</p>

                <img src={adminDetals.profilePicture} alt="profile" className="w-7 h-7 rounded-full object-cover" /></>
                ):(
                <Link to={'/admin'}>

                <li className="font-light text-white">Sign In</li>
                </Link>

                ) }
            </ul>

        </div>
    </div>
  )
}

export default AdminHeader


