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



// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Landing = () => {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
      
//       <main className="flex-grow">
//         <div className="flex flex-col-reverse md:flex-row w-full min-h-[calc(100vh-64px)]">
//           {/* Left Content Section */}
//           <div className="flex-1 bg-[#EAE0D5] p-6 md:p-8 lg:p-12 flex items-center justify-center">
//             <div className="max-w-xl w-full text-black">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono text-center md:text-left mb-6 font-extralight leading-tight">
//                 Revolutionizing your{' '}
//                 <span className="block mt-2">Stock Trading Journey</span>
//               </h1>
              
//               <div className="text-center md:text-left">
//                 {user ? (
//                   <Link to="/dashboard">
//                     <button className="btn bg-[#C6AC8F] btn-accent w-full md:w-auto min-w-[150px] border-2 border-black hover:bg-black hover:text-[#EAE0D5]">
//                       Dashboard
//                     </button>
//                   </Link>
//                 ) : (
//                   <Link to="/signin">
//                     <button className="btn bg-[#C6AC8F] btn-accent font-mono w-full md:w-auto min-w-[150px] border-2 border-black hover:bg-black hover:text-[#EAE0D5]">
//                       Sign In
//                     </button>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Image Section */}
//           {/* <div className="flex-1 bg-accent relative min-h-[300px] md:min-h-full">
//             <img 
//               src="/stockHero.jpg" 
//               alt="Stock Trading Hero"
//               className="object-cover w-full h-full absolute inset-0"
//               loading="eager"
//             />
//           </div> */}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Landing;


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LineChart, ShieldCheck, Globe2, Users, Wallet, ArrowUpRight, TrendingUp, BookOpen } from 'lucide-react';

const BentoCard = ({ title, description, icon: Icon, className = "" }) => (
  <div className={`bg-[#C6AC8F] bg-opacity-20 backdrop-blur-sm p-6 rounded-xl border-2 border-black hover:bg-opacity-30 transition-all duration-300 ${className}`}>
    <Icon className="w-8 h-8 mb-4 text-black" />
    <h3 className="text-xl font-mono font-bold mb-2 text-black">{title}</h3>
    <p className="text-black/80 font-light">{description}</p>
  </div>
);

const Landing = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-[#EAE0D5]">
        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row w-full min-h-[60vh]">
         
          <div className="flex-1 p-6 md:p-8 lg:p-12 flex items-center justify-center">
            <div className="max-w-xl w-full text-black">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono text-center md:text-left mb-6 font-extralight leading-tight">
                Revolutionizing your{' '}
                <span className="block mt-2">Stock Trading Journey</span>
              </h1>
              
              <div className="text-center md:text-left">
                {user ? (
                  <Link to="/dashboard">
                    <button className="btn bg-[#C6AC8F] btn-accent w-full md:w-auto min-w-[150px] border-2 border-black hover:bg-black hover:text-[#EAE0D5] group flex items-center justify-center gap-2">
                      Dashboard
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin">
                    <button className="btn bg-[#C6AC8F] btn-accent font-mono w-full md:w-auto min-w-[150px] border-2 border-black hover:bg-black hover:text-[#EAE0D5] group flex items-center justify-center gap-2">
                      Sign In
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="px-6 md:px-8 lg:px-12 py-16 bg-[#EAE0D5] ">
          <h2 className="text-3xl font-mono font-light text-center mb-12 text-black">Why Choose Our Platform?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Featured Card */}
            <BentoCard
              title="Advanced Analytics"
              description="Professional-grade charting tools and technical indicators for data-driven trading decisions."
              icon={LineChart}
              className={"md:col-span-2 md:row-span-1 font-mono"}
            />
            
            <BentoCard
              title="Secure Trading"
              description="Bank-level security protocols"
              icon={ShieldCheck}
              className={"font-mono"}
            />
            
            <BentoCard
              title="Global Markets"
              description="Access worldwide trading opportunities"
              icon={Globe2}
              className="font-mono"
            />
            
            <BentoCard
              title="Active Community"
              description="Learn from experienced traders"
              icon={Users}
              className="font-mono"
            />
             
             <BentoCard
              title="Market Insights"
              description="Real-time data and AI predictions"
              icon={TrendingUp}
              className="md:row-span-2 font-mono "
            />
            
            <BentoCard
              title="Portfolio Management"
              description="Connect and manage multiple accounts"
              icon={Wallet}
              className="md:col-span-2 font-mono"
            />
           
            
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;