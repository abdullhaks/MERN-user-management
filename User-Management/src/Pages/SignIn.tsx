import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../Redux/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../Components/Oauth";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.endsWith(".com");
  };

  const validatePassword = (password: string) => {
    const hasNoSpaces = !/\s/.test(password);
    return password.length >= 8 && hasNoSpaces;
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    //validations..... 
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

    if (errors.email || errors.password) {
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Error during sign-in:", error);
      dispatch(signInFailure(error));
    }
  };

  const isFormValid = !errors.email && !errors.password && formData.email && formData.password;

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center m-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          className="bg-slate-200 rounded-lg p-2 "
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          className="bg-slate-200 rounded-lg p-2 "
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button
          disabled={loading || !isFormValid}
          className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-65 uppercase"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <Oauth />
      </form>

      <div className="flex gap-2 mt-4">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>

      <p className="text-red-700 mt-4">{error ? error.message || "Something went wrong...!" : ""}</p>
    </div>
  );
}

export default SignIn;
