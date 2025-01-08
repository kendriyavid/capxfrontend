import Navbar from "./navbar";
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from './features/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './features/authSlice';
// import { updateField } from './features/signupSlice';
import React, { useState } from 'react';



function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signin, { isLoading }] = useLoginMutation();

        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
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

        return newErrors;
    };


    



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const result = await signin({
    //             username,
    //             email,
    //             password
    //         }).unwrap();

    //         console.log('Signin result:', result);

    //         dispatch(setCredentials({
    //             accessToken: result.accessToken,
    //             refreshToken: result.refreshToken,
    //             user: result.user
    //         }));

    //         navigate('/dashboard');
    //     } catch (err) {
    //         const errorMessage = err.data?.message || 'An error occurred during signin';
    //         alert(errorMessage);
    //         console.error('Signin error:', err);
    //     }}

        const handleSubmit = async (e) => {
            e.preventDefault();
            const newErrors = validateForm();
    
            if (Object.keys(newErrors).length === 0) {
                try {
                    const result = await signin({
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
                    const errorMessage = err.data?.message || 'An error occurred during signin';
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
                <div className="container mx-auto max-w-md sm:min-h-screen sm:m-auto">
                    <div className="grid grid-rows-4 min-h-screen bg-[#1D232A] sm:min-h-fit sm:pt-10">
                        <label className="row-start-1 text-5xl justify-self-center m-auto font-mono text-[#eae0d5] sm:hidden">
                            CapX
                        </label>
                        <form onSubmit={handleSubmit} className="row-start-2 row-span-3 sm:row-start-1 bg-[#eae0d5] rounded-t-badge sm:rounded-badge border-t-8 border-[#c6ac8f] grid grid-rows-6 text-xl justify-stretch items-center font-mono p-6">
                            <label className="row-start-1 text-3xl text-black justify-self-center font-bold">
                                Sign In
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
    
    
                            {errors.submit && (
                                <div className="text-red-500 text-sm mb-3">
                                    {errors.submit}
                                </div>
                            )}
    
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#5e503f] row-start-5 text-black w-full justify-self-center rounded-lg mt-3 hover:bg-[#4e4233] transition-colors duration-200"
                            >
                                <p className="p-4 font-bold">{isLoading ? 'Signing up...' : 'SignIn'}</p>
                            </button>

                            <button onClick={() => navigate('/signup')}
                                className="bg-[#5e503f] row-start-6 text-black w-full justify-self-center rounded-lg hover:bg-[#4e4233] transition-colors duration-200"
                            >
                                <p className="p-4 font-bold">Register with Us</p>
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

export default Signin;
