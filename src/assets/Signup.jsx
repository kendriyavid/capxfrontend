// import { useNavigate } from 'react-router-dom';
// import Footer from "./Footer";
// import Navbar from "./navbar";
// import { useSelector, useDispatch } from 'react-redux';
// import { updateField } from './features/signupSlice';
// import { useSignupMutation } from './features/authApiSlice';
// import { setCredentials } from './features/authSlice';

// function Signup() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { username, email, password, confirmPassword } = useSelector((state) => state.signup);
//     const [signup, { isLoading }] = useSignupMutation();

//     // Handle input field changes
//     const handleChange = (field, value) => {
//         dispatch(updateField({ field, value }));
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validate passwords match
//         if (password !== confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         try {
//             // Call the signup mutation with user data
//             const result = await signup({
//                 username,
//                 email,
//                 password
//             }).unwrap();

//             console.log('Signup result:', result);

//             // Store the tokens in Redux state
//             dispatch(setCredentials({
//                 user: result.user,
//                 accessToken: result.accessToken,
//                 refreshToken: result.refreshToken
//             }));

//             // Navigate to dashboard on success
//             navigate('/dashboard');
//         } catch (err) {
//             // Handle specific error cases
//             const errorMessage = err.data?.message || 'An error occurred during signup';
//             alert(errorMessage);
//             console.error('Signup error:', err);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="flex flex-col bg-white min-h-screen justify-end sm:flex-row-reverse">
//                 <p className="font-mono text-3xl self-center mt-auto mb-auto text-black sm:text-4xl sm:ml-8">
//                     SignUp
//                 </p>
//                 <div className="min-h-fit flex flex-col p-5 bg-stone-500 rounded-t-lg sm:rounded-none sm:justify-center sm:min-w-[40%] sm:p-8">
//                     <form onSubmit={handleSubmit}>
//                         <div className="pb-6">
//                             <div className="pt-2">
//                                 <p className="">UserName</p>
//                                 <label className="input input-bordered flex items-center gap-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//                                     </svg>
//                                     <input
//                                         type="text"
//                                         className="grow"
//                                         placeholder="Username"
//                                         value={username}
//                                         onChange={(e) => handleChange('username', e.target.value)}
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                             <div className="pt-2">
//                                 <p>Email</p>
//                                 <label className="input input-bordered flex items-center gap-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                                         <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                                     </svg>
//                                     <input
//                                         type="email"
//                                         className="grow"
//                                         placeholder="Email"
//                                         value={email}
//                                         onChange={(e) => handleChange('email', e.target.value)}
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                             <div className="pt-2">
//                                 <p>Password</p>
//                                 <label className="input input-bordered flex items-center gap-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                     <input
//                                         type="password"
//                                         className="grow"
//                                         value={password}
//                                         onChange={(e) => handleChange('password', e.target.value)}
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                             <div className="pt-2">
//                                 <p>Confirm Password</p>
//                                 <label className="input input-bordered flex items-center gap-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                     <input
//                                         type="password"
//                                         className="grow"
//                                         value={confirmPassword}
//                                         onChange={(e) => handleChange('confirmPassword', e.target.value)}
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                         </div>
//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className="btn btn-active color-black"
//                         >
//                             {isLoading ? 'Signing up...' : 'Sign Up'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Signup;
// import React, { useState } from 'react';
// import Navbar from "./navbar";

// function Signup() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const validateForm = () => {
//         const newErrors = {};
        
//         if (!formData.name.trim()) {
//             newErrors.name = 'Name is required';
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }

//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }

//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }

//         return newErrors;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newErrors = validateForm();

//         if (Object.keys(newErrors).length === 0) {
//             // Form is valid, you can submit the data here
//             console.log('Form submitted:', formData);
//             // Add your API call or submission logic here
//         } else {
//             setErrors(newErrors);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="container mx-auto max-w-md sm:min-h-screen sm:m-auto">
//                 <div className="grid grid-rows-4 min-h-screen bg-[#1D232A] sm:min-h-fit sm:pt-10">
//                     <label className="row-start-1 text-5xl justify-self-center m-auto font-mono text-[#eae0d5] sm:hidden">
//                         CapX
//                     </label>
//                     <form onSubmit={handleSubmit} className="row-start-2 row-span-3 sm:row-start-1 bg-[#eae0d5] rounded-t-badge sm:rounded-badge border-t-8 border-[#c6ac8f] grid grid-rows-6 text-xl justify-stretch items-center font-mono p-6">
//                         <label className="row-start-1 text-3xl text-black justify-self-center font-bold">
//                             Sign Up
//                         </label>
                        
//                         <div className="row-start-2 text-black font-bold mt-3">
//                             Name: <br />
//                             <input 
//                                 type='text' 
//                                 name="name"
//                                 placeholder="Name" 
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.name ? 'border-red-500' : ''}`}
//                             />
//                             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//                         </div>

//                         <div className="row-start-3 text-black font-bold mt-3">
//                             Email: <br />
//                             <input 
//                                 type='email' 
//                                 name="email"
//                                 placeholder="Email" 
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.email ? 'border-red-500' : ''}`}
//                             />
//                             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                         </div>

//                         <div className="row-start-4 text-black font-bold mt-3">
//                             Password: <br />
//                             <input 
//                                 type='password' 
//                                 name="password"
//                                 placeholder="Password" 
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.password ? 'border-red-500' : ''}`}
//                             />
//                             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                         </div>

//                         <div className="row-start-5 text-black font-bold mt-3">
//                             Confirm Password: <br />
//                             <input 
//                                 type='password' 
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password" 
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 className={`w-full border-2 border-black bg-inherit p-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
//                             />
//                             {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//                         </div>

//                         <button 
//                             type="submit"
//                             className="bg-[#5e503f] row-start-6 text-black w-full justify-self-center rounded-lg mt-3 hover:bg-[#4e4233] transition-colors duration-200"
//                         >
//                             <p className="p-4 font-bold">Sign Up</p>
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Signup;



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
                const errorMessage = err.data?.message || 'An error occurred during signup';
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
                            className="bg-[#5e503f] row-start-6 text-black w-full justify-self-center rounded-lg mt-3 hover:bg-[#4e4233] transition-colors duration-200"
                        >
                            <p className="p-4 font-bold">{isLoading ? 'Signing up...' : 'Sign Up'}</p>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;