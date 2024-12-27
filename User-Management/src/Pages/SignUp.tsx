import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../Components/Oauth";

function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const validateUserName = (userName: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/; 
    return usernameRegex.test(userName);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.endsWith(".com");
  };

  const validatePassword = (password: string) => {
    const hasNoSpaces = !/\s/.test(password);
    return password.length >= 8 && hasNoSpaces;
  };

  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // validation....... 
    if (id === "userName") {
      if (value === "" || !validateUserName(value)) {
        setErrors((prev) => ({
          ...prev,
          userName: "Username must be at least 3 characters, no spaces or special characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, userName: "" }));
      }
    }

    if (id === "email") {
      if (value === "" || !validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email. Must end with .com" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (id === "password") {
      if (value === "" || !validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters long and contain no spaces",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (errors.userName || errors.email || errors.password) {
      return; 
    }

    try {
      setError(false);
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data is", data); 

      setLoading(false);
      if (data.success === false) {
        setError(true);
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log("error is", error);
      setLoading(false);
      setError(true);
    }
  };

  const isFormValid =
    !errors.userName && !errors.email && !errors.password && formData.userName && formData.email && formData.password;

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center m-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="userName"
          name="userName"
          className="bg-slate-200 rounded-lg p-2"
          value={formData.userName}
          onChange={handleChange}
        />
        {errors.userName && <p className="text-red-500">{errors.userName}</p>}

        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          className="bg-slate-200 rounded-lg p-2"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          className="bg-slate-200 rounded-lg p-2"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button
          disabled={loading || !isFormValid}
          className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <Oauth />
      </form>

      <div className="flex gap-2 mt-4">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>

      <p className="text-red-700 mt-4">{error && "Something went wrong...!"}</p>
    </div>
  );
}

export default SignUp;
