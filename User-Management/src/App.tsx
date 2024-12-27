import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'animate.css';
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import Admin_Home from "./Pages/Admin_Home";
import Admin_Signin from "./Pages/Admin_Signin";
import Admin_PrivateRoute from "./Components/Admin_PrivateRoute";
import AdminUsers from "./Pages/Admin_Users";
import PublicRoute from "./Components/PublicRoute"; // Import the PublicRoute

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Use PublicRoute to wrap SignIn and SignUp */}
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<Admin_PrivateRoute />}>
          <Route path="/admin" element={<Admin_Home />} />
          <Route path="/admin/admin-users" element={<AdminUsers />} />

        </Route>

        <Route path="/admin-sign-in" element={<Admin_Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
