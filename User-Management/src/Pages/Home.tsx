import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {


  const {currentUser} = useSelector((state:any) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white">
      <div className="text-center p-6 md:p-12 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">
          Welcome to Your Future Management Portal
        </h1>
        <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Manage your users, monitor their activities, and stay on top of everything with ease. 
          Our platform provides an intuitive interface for both admins and users.  
        </p>

        {currentUser ?<></>:
        <Link to="/sign-up">
          <button className="bg-gradient-to-r from-teal-500 to-green-400 text-lg font-semibold px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-teal-400 hover:to-green-500">
            Sign Up
          </button>
        </Link>
        }
        
      </div>

      {/* Background animation */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')" }} />
    </div>
  );
}

export default Home;
