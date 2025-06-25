import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../Loader/Loader";

const Profile = () => {
    const { user, loading, isAuthentication } = useSelector((state) => state.user);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (isAuthentication === false) {
            navigate('/login'); 
        }
    }, [isAuthentication, navigate]);

    return (
        <>
            {loading ? (
                <div className="h-screen flex justify-center items-center bg-gray-100">
                        <LoadingAnimation />
                    </div>
            ) : (
                <div className="min-h-screen flex justify-center items-center p-6 mt-20">
                    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
                        <div className="flex flex-col items-center space-y-4 mb-6">
                            <img
                                src={`http://localhost:3005${user?.avatar?.url}`}
                                alt="User Avatar"
                                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-600 text-sm mb-1 block">Full Name</label>
                                <input
                                    type="text"
                                    value={user?.name}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm mb-1 block">Email Address</label>
                                <input
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm mb-1 block">Role</label>
                                <input
                                    type="text"
                                    value={user?.role}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <Link
                                to="/orders"
                                className="block text-center w-full py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium"
                            >
                                My Orders
                            </Link>

                            <Link
                                to="/update-profile"
                                className="block text-center w-full py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                            >
                                Edit Profile
                            </Link>

                            <Link
                                to="/change-password"
                                className="block text-center w-full py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                            >
                                Change Password
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
