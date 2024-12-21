import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { signInSuccess } from "../Redux/User/UserSlice.js";  
// import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const fileRef = useRef<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [isFormValid, setIsFormValid] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const navigate = useNavigate()

  useEffect(() => {
    // Validate form
    const isValid = userName.trim().length > 2 && /\S+@\S+\.\S+/.test(email);
    setIsFormValid(isValid);
  }, [userName, email]);

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
            onUploadProgress: (progressEvent:any) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        const { secure_url } = uploadRes.data;
        console.log('url is :',secure_url)
        

        var updatedUser:{
          userName: any;
          email: any;
          profilePicture: any |null;
      } = {
          userName,
          email,
          profilePicture: secure_url,
        };

      }else { 

        var updatedUser : {
          userName: any;
          email: any;
          profilePicture: any | null;
      }= {
          userName,
          email,
          profilePicture: null,
        };
        
      }

        const res = await axios.put("/api/profile/update", updatedUser, {
          withCredentials: true,
        });

        // Update currentUser state in Redux
        console.log(res.data);
        dispatch(signInSuccess(res.data));
        // navigate('/profile', { replace: true });
        window.location.reload();

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

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

        <progress value={uploadProgress} max="100" className="w-full">
          {uploadProgress}%
        </progress>

        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />

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
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
