import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../Service/Action/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../Loader/Loader';

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        dispatch(updatePassword(formData));
    };

    // Show toast when updated
    React.useEffect(() => {
        if (error) toast.error(error);
        if (isUpdated) {
            alert("Password Updated Successfully!")
            navigate("/profile");
        };
    }, [error, isUpdated]);

    return (
        <>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center bg-gray-100">
                        <LoadingAnimation />
                    </div>
                )
                    : (
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                                <h2 className="text-2xl font-semibold text-center text-gray-800">Update Password</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Old Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                    )
            }
        </>
    );
}

export default UpdatePassword;
