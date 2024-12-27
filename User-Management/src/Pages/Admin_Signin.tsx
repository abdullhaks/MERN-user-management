// AdminSignIn.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSignInStart, adminSignInSuccess, adminSignInFailure } from "../Redux/Admin/AdminSlice";

function AdminSignIn() {
    const [formData, setFormData] = useState<{ email?: string; password?: string }>({});
    const { admin_loading, admin_error } = useSelector((state: any) => state.admin);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Admin form data:", formData);

        try {
            dispatch(adminSignInStart());
            const res = await fetch('/api/admin/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("Admin sign-in data:", data);

            if (!data.success) {
                dispatch(adminSignInFailure(data.message || 'Sign-in failed'));
                return;
            }

            dispatch(adminSignInSuccess(data));
            navigate('/admin'); 

        } catch (error: any) {
            console.error("Admin sign-in error:", error);
            dispatch(adminSignInFailure(error.message || 'Something went wrong'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-400 via-purple-200 to-blue-400">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Admin Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        required
                        className="bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        required
                        className="bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        disabled={admin_loading}
                        className={`p-3 rounded-lg text-white font-semibold transition ${
                            admin_loading
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {admin_loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                {/* <div className="mt-6 text-center">
                    <p className="text-gray-500">Need an admin account?</p>
                    <Link to="/admin/sign-up" className="text-blue-500 hover:underline">
                        Register Here
                    </Link>
                </div> */}
                {admin_error && (
                    <p className="text-red-500 mt-4 text-center">
                        {admin_error || 'Something went wrong!'}
                    </p>
                )}
            </div>
        </div>
    );
}

export default AdminSignIn;
