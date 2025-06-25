import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Service/Action/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../Loader/Loader';

function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: null
    });

    const [avatarPreview, setAvatarPreview] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                avatar: null
            });
            setAvatarPreview(`http://localhost:3005${user.avatar?.url}`);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files.length > 0) {
            const file = files[0];
            setFormData({ ...formData, avatar: file });

            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append('name', formData.name);
        myForm.append('email', formData.email);
        if (formData.avatar) {
            myForm.append('avatar', formData.avatar);
        }

        dispatch(updateProfile(myForm));
    };

    useEffect(() => {
        if (error) toast.error(error);
        if (isUpdated) {
            alert("Profile Updated Successfully!");
            navigate("/profile");
        }
    }, [error, isUpdated, navigate]);

    return (

        <>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center bg-gray-100">
                        <LoadingAnimation />
                    </div>
                ) : (

                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
                            <h2 className="text-xl font-semibold text-center text-gray-800">Update Profile</h2 >

                            <div className="flex flex-col items-center space-y-2">
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border rounded-md w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border rounded-md w-full"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                            >
                                Update Profile
                            </button>
                        </form >
                    </div >
                )
            }

        </>
    );
}

export default UpdateProfile;
