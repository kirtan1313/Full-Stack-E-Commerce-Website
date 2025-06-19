import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingAnimation from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../Service/Action/userAction";

const ForgetPassword = () => {

    const { message, loading, } = useSelector((state) => state.forgetPassword);
    const dispatch = useDispatch();


    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            alert("Please enter your email");
            return;
        }

        const requestData = {
            email: email,
            frontendURL: window.location.origin,
        };

        dispatch(forgetPassword(requestData));

       alert("Forgot Password Request Sent:", email);
        alert("Password reset link sent to your email (mock)");
    };

    useEffect(() => {
        if (message) {
            alert(message)
        }
    }, [message])

    return (

        <>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center bg-gray-100">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                                Forgot Password
                            </h2>

                            <label className="block text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                            >
                                Send Reset Link
                            </button>

                            <p className="text-sm text-center mt-4 text-gray-500">
                                You will receive an email with password reset instructions.
                            </p>
                        </form>
                    </div>
                )
            }
        </>

    );
};

export default ForgetPassword;
