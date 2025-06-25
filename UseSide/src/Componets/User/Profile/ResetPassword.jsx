import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Service/Action/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingAnimation from "../../Loader/Loader";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const { success, error, loading } = useSelector((state) => state.forgetPassword || {});

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const myForm = new FormData();
        myForm.append("password", formData.newPassword);         
        myForm.append("confirmPassword", formData.confirmPassword);

        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (success) {
            alert("Password Reset Successfully...");
            navigate("/login");
        }
        if (error) {
            alert(error);
        }
    }, [success, error, navigate]);

    return (
        <>
            {
                loading ?
                    (
                        <div className="h-screen flex justify-center items-center bg-gray-100">
                            <LoadingAnimation />
                        </div>
                    ) : (
                        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
                            >
                                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                                    Reset Password
                                </h2>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                                >
                                    {loading ? "Resetting..." : "Reset Password"}
                                </button>
                            </form>
                        </div>
                    )
            }
        </>
    );
};

export default ResetPassword;
