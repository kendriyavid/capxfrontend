import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from './features/authSlice.js';
import { useLogoutMutation } from './features/authApiSlice.js';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [logoutMutation] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutMutation(user).unwrap();
            dispatch(logoutAction());
            navigate('/signin');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="navbar bg-[#EAE0D5] font-mono text-black font-bold px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-[#EAE0D5] border-2 border-black gap-2">
                            <li>
                                <NavLink 
                                    to="/stocks"
                                    className={({ isActive }) => 
                                        isActive ? "bg-black text-white hover:bg-black hover:text-white" : "hover:bg-black hover:text-white"
                                    }
                                >
                                    Stock Listings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard"
                                    className={({ isActive }) => 
                                        isActive ? "bg-black text-white hover:bg-black hover:text-white" : "hover:bg-black hover:text-white"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost text-xl px-6">CapX</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4">
                        <li>
                            <NavLink 
                                to="/stocks"
                                className={({ isActive }) => 
                                    isActive ? "bg-black text-white hover:bg-black hover:text-white px-4" : "hover:bg-black hover:text-white px-4"
                                }
                            >
                                Stock Listings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/dashboard"
                                className={({ isActive }) => 
                                    isActive ? "bg-black text-white hover:bg-black hover:text-white px-4" : "hover:bg-black hover:text-white px-4"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <a className="hover:bg-black hover:text-white px-4">About Us</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button className="btn bg-black text-white hover:bg-black/80 min-w-[100px]" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <NavLink 
                            className={({ isActive }) => 
                                `btn bg-black text-white hover:bg-black/80 min-w-[100px]`
                            } 
                            to="/signin"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;
