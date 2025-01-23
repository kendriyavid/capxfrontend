import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import { useSignupMutation } from './features/authApiSlice';
import { setCredentials } from './features/authSlice';
import { useDispatch } from 'react-redux';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signup, { isLoading }] = useSignupMutation();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await signup({
                    username: formData.name,
                    email: formData.email,
                    password: formData.password
                }).unwrap();

                dispatch(setCredentials({
                    user: result.user,
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken
                }));

                navigate('/dashboard');
            } catch (err) {
                const errorMessage = err.data?.error || 'An error occurred during signup';
                setErrors({ submit: errorMessage });
                console.error('Signup error:', err);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#EAE0D5]">
                <div className="container mx-auto max-w-md sm:min-h-screen sm:m-auto ">
                <div className="grid grid-rows-4 min-h-screen bg-[#EAE0D5] sm:min-h-fit sm:pt-10">
                    <label className="row-start-1 text-5xl justify-self-center m-auto font-mono text-black font-extrabold sm:hidden">
                        CapX
                    </label>
                    <form onSubmit={handleSubmit} className="row-start-2 row-span-3 sm:row-start-1 bg-[#eae0d5] rounded-t-badge sm:rounded-badge border-2 border-black grid grid-rows-6 text-xl justify-stretch items-center font-mono p-6">
                        <label className="row-start-1 text-3xl text-black justify-self-center font-bold">
                            Sign Up
                        </label>
                        
                        <div className="row-start-2 text-black font-bold mt-3">
                            Name: <br />
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Name" 
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="row-start-3 text-black font-bold mt-3">
                            Email: <br />
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="row-start-4 text-black font-bold mt-3">
                            Password: <br />
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="row-start-5 text-black font-bold mt-3">
                            Confirm Password: <br />
                            <input 
                                type="password" 
                                name="confirmPassword"
                                placeholder="Confirm Password" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {errors.submit && (
                            <div className="text-red-500 text-sm mb-3">
                                {errors.submit}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#C6AC8F] row-start-6 text-black w-full justify-self-center rounded-lg mt-3 hover:bg-[#C6AC8F] transition-colors duration-200"
                        >
                            <p className="p-4 font-bold">{isLoading ? 'Signing up...' : 'Sign Up'}</p>
                        </button>
                    </form>
                </div>
            </div>
            </div>
            
        </>
    );
}

export default Signup;