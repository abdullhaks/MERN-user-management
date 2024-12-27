import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { signInSuccess, signOut } from "../Redux/User/UserSlice.js";  
import { useNavigate } from "react-router-dom";
import { persistor } from "../Redux/Store.js";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const fileRef = useRef<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userNameValid = /^[a-zA-Z0-9 ]+$/.test(userName.trim()) && userName.trim().length >= 3;
    const emailValid = /^[\w-.]+@[\w-]+\.(com)$/.test(email.trim());
    const passwordValid = password.length === 0 || password.trim().length >= 8;
  
    setErrors({
      userName: userNameValid ? "" : "Username must be at least 3 characters and contain only letters, numbers, or spaces.",
      email: emailValid ? "" : "Invalid Email. Must end with '.com'.",
      password: passwordValid ? "" : "Password must be at least 8 characters.",
    });
  
    setIsFormValid(userNameValid && emailValid && passwordValid);
  }, [userName, email, password]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
        formData.append("upload_preset", "profile_pictures"); 

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dtnukc9id/image/upload",
          formData,
          {
            onUploadProgress: (progressEvent: any) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        const { secure_url } = uploadRes.data;

        var updatedUser:{
          _id:any
          userName: any;
          email: any;
          password:any | null;
          profilePicture: any |null;
      } = {
          _id: currentUser._id,
          userName,
          email,
          password,
          profilePicture: secure_url,
        };
      } else {
        var updatedUser:{
          _id:any
          userName: any;
          email: any;
          password:any | null;
          profilePicture: any | null;
      } = {
          _id: currentUser._id,
          userName,
          email,
          password,
          profilePicture: null,
        };
      }

      const res = await axios.put("/api/profile/update", updatedUser, {
        withCredentials: true,
      });

      dispatch(signInSuccess(res.data));
      window.location.reload();
    } catch (error) {
      console.error(error);
      navigate('/sign-in');
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post('/api/auth/sign-out', {}, { withCredentials: true });
  
      dispatch(signOut());
      persistor.purge(); 
  
      navigate('/sign-in');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };
  
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
  
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`/api/profile/delete/${currentUser._id}`, {
        withCredentials: true,
      });
  
      dispatch(signOut());
      persistor.purge(); 
  
      navigate('/sign-in');
    } catch (error) {
      console.error('Error during account deletion:', error);
    }
  };
  
  

  return (
    <div className="p-3 max-w-lg mx-auto" style={{
      background: "linear-gradient(to right, #a8e063, #56ab2f)",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}>
      <h1 className="text-3xl font-semibold text-center my-7 text-white">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
        ) : (
          <img
            src={currentUser?.profilePicture}
            alt="Profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
        )}

        <progress value={uploadProgress} max="100" className="w-full h-1">
          {uploadProgress}%
        </progress>

        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors.userName && <p className="text-red-600 text-sm">{errors.userName}</p>}

        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

        <button
          type="button"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-65"
          disabled={!isFormValid || uploadProgress > 0}
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <button
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>

        <button
          className="text-red-700 cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
