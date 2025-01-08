import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from './features/authSlice.js';
import { useLogoutMutation } from './features/authApiSlice.js';

function Navbar() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.auth.user); // Get the user state from Redux
    // const [logout, {isLoading}] = useLogoutMutation()
    // const handleLogout = () => {
    //     try{
    //         const result=logout(user).unwrap()
    //         console.log(result)
    //         console.log("dispatching logout")
    //         dispatch(logout)
    //         navigate('/signin')
    //     }catch(error){
    //         console.log(error)
    //     }
    // };

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
            <div className="navbar bg-base-100 ">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/stocks">Stock Listings</NavLink></li>
                            
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost text-xl">CapX</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/stocks">Stock Listings</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><a>About Us</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button className="btn" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <NavLink className="btn" to="/signin">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;
