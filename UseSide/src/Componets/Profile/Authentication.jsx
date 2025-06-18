import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../Service/Action/userAction';
import LoadingAnimation from '../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AuthForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { loading, error, isAuthentication } = useSelector((state) => state.user)

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null,
    });


    const [avatarPreview, setAvatarPreview] = useState(null);

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
        if (isLogin) {
            handleLogin();
        } else {
            handleRegister();
        }
    };


    const handleLogin = () => {

        dispatch(login(formData.email, formData.password))
        setFormData({
            email: '',
            password: '',
        })
        console.log('Login Success Fully...');
    }


    const handleRegister = () => {

        const myForm = new FormData();

        myForm.append('name', formData.name);
        myForm.append('email', formData.email);
        myForm.append('password', formData.password);
        myForm.append('avatar', formData.avatar)
        console.log(formData.avatar);
        console.log([...myForm.entries()]);

        dispatch(register(myForm))
        console.log('Sign In Successfully...');

    }


    useEffect(() => {
        console.log("Error:", error);

        if (error) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 3000,
                pauseOnHover: true,
                theme: "colored",
            });
        }
        const token = localStorage.getItem("token");
        if (token && isAuthentication) {
            navigate("/");
        }
    }, [error, navigate, isAuthentication]);

    return (

        <div>
            {
                loading ?
                    <div className="h-screen flex justify-center items-center bg-gray-100">
                        <LoadingAnimation />
                    </div>
                    : (
                        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                                    {isLogin ? 'Login' : 'Register'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {!isLogin && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    onChange={handleChange}
                                                    className="w-full text-sm"
                                                />
                                                {avatarPreview && (
                                                    <img
                                                        src={avatarPreview}
                                                        alt="Avatar Preview"
                                                        className="mt-2 w-20 h-20 rounded-full object-cover border"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    required
                                                />
                                            </div>


                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>

                                    {isLogin && (
                                        <div className="text-right">
                                            <Link
                                                to={'/forgetPassword'}
                                                type="button"
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        {isLogin ? 'Login' : 'Register'}
                                    </button>
                                </form>

                                <p className="text-center text-sm text-gray-600 mt-6">
                                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                                    <button
                                        onClick={() => {
                                            setIsLogin(!isLogin);
                                            setAvatarPreview(null);
                                            setFormData({
                                                name: '',
                                                email: '',
                                                password: '',
                                                avatar: null,
                                            });
                                        }}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {isLogin ? 'Register' : 'Login'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    )
            }

        </div>





    );
};

export default AuthForm;
