// import {Link} from 'react-router-dom';
// import Navbar from "./navbar";
// import Footer from "./Footer"
// import { useSelector, useDispatch } from 'react-redux';
// function Landing(){

//     const user = useSelector((state) => state.auth.user);
//     return(
//         <>
//         <Navbar></Navbar>

//             <div className="flex w-full h-screen">
//             <div className=" bg-base-300 flex-grow place-items-start text-center p-8 basis-1/2 flex flex-col justify-center">
//                 <h1 className="text-5xl font-mono text-left mb-3 font-extralight ">
//                 Revolutionizing your <br /> Stock Trading Journey
//                 </h1>
//                 {
//                     user ? 
//                     <Link to="/dashboard">
//                         <button className="btn btn-accent">Dashboard</button>
//                     </Link>
//                     :
//                     <Link to="/signin">
//                         <button className="btn btn-accent font-mono">Sign In</button>
//                     </Link>
//                 }
//                 </div>
//             <div className=" bg-accent place-items-center basis-1/2">
//                 <img src='/stockHero.jpg' className="object-cover w-full h-full" 
//                 ></img>
//             </div>
//             </div>

//         <Footer></Footer>
//         </>
//     )
// }

// export default Landing;



import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Landing = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="flex flex-col-reverse md:flex-row w-full min-h-[calc(100vh-64px)]">
          {/* Left Content Section */}
          <div className="flex-1 bg-base-300 p-6 md:p-8 lg:p-12 flex items-center justify-center">
            <div className="max-w-xl w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono text-center md:text-left mb-6 font-extralight leading-tight">
                Revolutionizing your{' '}
                <span className="block mt-2">Stock Trading Journey</span>
              </h1>
              
              <div className="text-center md:text-left">
                {user ? (
                  <Link to="/dashboard">
                    <button className="btn btn-accent w-full md:w-auto min-w-[150px]">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin">
                    <button className="btn btn-accent font-mono w-full md:w-auto min-w-[150px]">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 bg-accent relative min-h-[300px] md:min-h-full">
            <img 
              src="/stockHero.jpg" 
              alt="Stock Trading Hero"
              className="object-cover w-full h-full absolute inset-0"
              loading="eager"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;