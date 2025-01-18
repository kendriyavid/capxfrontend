import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { PieChart } from 'react-minimal-pie-chart';
import Buymodal from './Buymodal'
import Sellmodal from './Sellmodal';
import {useGetuserTransactionsMutation, useGetuserValuationMutation} from './features/stockApiSlice.js'
import {useGetuserstocksMutation} from './features/stockApiSlice'
import {updateUserStocks,updateUserTransactions, updatePortfolioValue} from './features/stocksSlice'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'
function Dashboard() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(0);
  const [cpage, setCpage] = useState(1);
  const [trlength, setTrlength] = useState(0);
  const [trpage, setTrpage] = useState(1);
  const [selectedStock, setSelectedStock] = useState(null);
  const [getUserStocks] = useGetuserstocksMutation();
  const [getUserTransactions] = useGetuserTransactionsMutation();
  const [activeTab, setActiveTab] = useState("shares");
  const [getuserValuation] = useGetuserValuationMutation();

  
  const user = useSelector((state) => state.auth.user);
  const userstock = useSelector((state) => state.stocks.userStocks);
  const usertransactions = useSelector((state) => state.stocks.userTransactions);
  const portfolioValue = useSelector((state) => state.stocks.portfolioValue);
  const isConnected = useSelector((state)=>state.stocks.isConnected);
  const navigate = useNavigate();


  const fetchTransactions = async () => {
    try {
      const response = await getUserTransactions().unwrap();
      console.log(response);
      setTrlength(response.length);
      console.log(trlength);
      dispatch(updateUserTransactions(response));
    } catch (error) {
      console.log("catching error")
      if(error.status!=403){
        return(
          <>
            <Navbar></Navbar>
            <div className='flex justify-center min-h-screen'>
              <progress className="progress w-56 mt-auto mb-auto"></progress>
            </div>
          </>
        )
      }
      console.error("Error in fetching the data", error);
    }
  }

  const updateValuation = async () => {
    console.log('Updating Valuation');
      try{
          const result = await getuserValuation().unwrap();
          console.log('Valuation:', result);
          dispatch(updatePortfolioValue(result));
      }
      catch(err){
          console.error('Error updating user valuation:', err);
      }
  };
  const fetchStockData = async () => {
    try {
      const response = await getUserStocks().unwrap();
      // const {portfolioValuation,data} = response
      // console.log(response);
      // dispatch(updatePortfolioValue(portfolioValuation));
      dispatch(updateUserStocks(response));
      setLength(response.length);
    } catch (error) {
      console.error("Error in fetching the data", error);
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
          // Call these in sequence
          await fetchStockData();
          await fetchTransactions();
          await updateValuation();
      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          setLoading(false);
      }
  };
  fetchAllData();
  }, [dispatch, getUserStocks, user, isConnected]);

  const handleBuyClick = (value) => {
    setSelectedStock(value);
    document.getElementById('buyModal')?.showModal();
  };

  const handleSellClick = (value) => {
    setSelectedStock(value);
    document.getElementById('sellModal')?.showModal();
  };

  if (loading) {
    return(
      <>
        <Navbar></Navbar>
        <div className='flex justify-center min-h-screen bg-[#EAE0D5]'>
          <progress className="progress w-56 mt-auto mb-auto bg-black"></progress>
        </div>
      </>
    )
  }

  
  if (userstock.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#EAE0D5] flex items-center justify-center">
          <div className="card w-96 bg-[#C6AC8F] shadow-xl m-3">
            <div className="card-body rounded-md">
              <h2 className="card-title text-black font-mono">No Stocks found</h2>
              <p className="text-black font-mono">You haven't purchased any stocks</p>
              <div className="card-actions justify-end">
                <button 
                  onClick={() => navigate('/stocks')} 
                  className="btn bg-black text-white font-mono hover:bg-black/80"
                >
                  Head to Stocklistings
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const rendering = userstock.slice((cpage - 1) * 10, cpage * 10);
  const trrendering = usertransactions.slice((trpage - 1) * 10, trpage * 10);
  
  const chartData = userstock.map((stock, index) => ({
    title: stock.stocks.stock_symbol,
    value: stock.units_held,
    color: `hsl(${(index + 1) * 50}, 70%, 50%)`,
  }));



  return (
    <>
      <Navbar />
      <div className="bg-[#EAE0D5] min-h-fit">
      <div className="min-h-fit flex flex-col p-5 grow-1 ">
        <div className="flex flex-row justify-start">
          <h1 className="font-mono text-2xl sm:text-3xl text-black">My Portfolio</h1>
        </div>

        <div className="flex flex-row min-w-full min-h-fit justify-center w-1/2 flex-grow flex-wrap-reverse mt-3">
                <div className="min-h-fit flex flex-col grow">
        <div className="flex flex-row min-w-full min-h-fit justify-center sm:mt-3 flex-shrink-0">

          <div className="max-h-full flex-grow  ">
            {/* <div className='flex flex-row font-serif text-xl m-2 justify-around sm:text-2xl'>
              <p>Purchased Stocks</p>
              <p className="">Transactions</p>
            </div> */}
      <div role="tablist" className="tabs tabs-bordered mb-2 font-mono">
        <button
          role="tab"
          className={`tab text-sm sm:text-lg font-thin text-black ${activeTab === "shares" ? "tab-active" : "text-black"}`}
          onClick={() => setActiveTab("shares")}
        >
          Shares Owned
        </button>
        <button
          role="tab"
          className={`tab text-sm sm:text-lg text-black ${activeTab === "transactions" ? "tab-active" : "text-black"}`}
          onClick={() => {setActiveTab("transactions"); fetchTransactions()}}
        >
          Transactions
        </button>
        
      </div>
      {activeTab === "shares" && (
          <div>
            <div className='flex flex-row bg-inherit justify-around border-[#C6AC8F] border-b-2 m-2'>
              <div className="flex flex-row items-center md:space-x-4 w-full justify-between sm:pt-1 sm:pb-1 sm:pl-1 sm:pr-1 sm:space-x-1">
                <div className="flex flex-row justify-start">
                  <p className="text-black font-mono sm:text-xl text-sm  hover:cursor-pointer font-extrabold sm:mr-2 ">Name</p>
                </div>

                <div className="flex flex-row flex-grow grow-1 justify-center gap-7 sm:text-xl text-sm text-black font-bold font-mono">
                  <p className="hidden sm:block">AvgPrice</p>
                  <p>Current</p>
                  <p>Units</p>
                </div>

              </div>
           </div>

            {
              rendering.map((value,index)=>(
                <div  className='flex flex-row sm:ml-4 sm:mr-4 sm:mt-2 ml-2 mr-2 mt-2 bg-[#EAE0D5] rounded-md justify-around hover:border-yellow-400 border-b-2 border-black'>
                  <div  key ={index}className="pt-2 pb-2 pl-4 pr-4 flex flex-row items-center space-x-4 w-full justify-between">
                  <div className="flex flex-row justify-start">
                    <p className="text-black font-mono sm:text-lg text-sm hover:text-yellow-400 hover:cursor-pointer font-extrabold sm:mr-2 mr-1">{value.stocks.stock_symbol}</p>
                  </div>      
                  <div className="flex flex-row flex-grow grow-1 justify-center sm:gap-7 gap-5  text-black font-mono sm:text-lg text-sm">
                    <p className="hidden sm:block" >{value.average_price.toFixed(3)}</p>
                    <p >{value.stocks.current_price.toFixed(3)}</p>
                    <p >{value.units_held}</p>
                  </div>
                  <p className="text-green-600 sm:text-lg  font-extrabold font-mono hover:cursor-pointer" onClick={()=>{handleBuyClick(value)}} >Buy</p>
                  <p className="text-red-800 sm:text-lg  font-extrabold font-mono hover:cursor-pointer" onClick={()=>{handleSellClick(value)}}>Sell</p>
                  </div>
                  </div>

              ))
            }
  
            <div className="flex justify-center mt-4 ">
              <div className="join bg-[#C6AC8F]">
                <button className="join-item btn bg-[#C6AC8F] text-black" onClick={() => setCpage(cpage > 1 ? cpage - 1 : 1)}>«</button>
                <button className="join-item btn bg-[#C6AC8F] text-black">{cpage}</button>
                <button className="join-item btn bg-[#C6AC8F] text-black" onClick={() => setCpage(cpage < Math.ceil(length / 10) - 1 ? cpage + 1 : cpage)}>»</button>
              </div>
            </div>
          </div>

      )}
      {activeTab === "transactions" && (
           <div>
           {/* <div className='flex flex-row bg-inherit justify-around border-yellow-400 border-b-2 m-2'>
             <div className="flex flex-row items-center md:space-x-4 w-full justify-between sm:pt-1 sm:pb-1 sm:pl-1 sm:pr-1 sm:space-x-1">
               <div className="flex flex-row justify-start">
                 <p className="text-white font-mono sm:text-xl text-sm  hover:cursor-pointer font-extrabold sm:mr-2 ">Name</p>
               </div>

               <div className="flex flex-row flex-grow grow-1 justify-center gap-7 sm:text-xl text-sm text-white font-bold font-mono">
                 <p>Units</p>
                 <p className="hidden sm:block">Price</p>
                 <p>Type</p>
               </div>

             </div>
          </div> */}

           {
             trrendering.map((value,index)=>(
               <div  className='flex flex-row sm:ml-4 sm:mr-4 sm:mt-2 ml-2 mr-2 mt-2 bg-[#EAE0D5] rounded-md justify-around hover:border-yellow-400 border-b-2 border-black'>
                 <div  key ={index}className="pt-2 pb-2 pl-4 pr-4 flex flex-row items-center space-x-4 w-full justify-between">
                 <div className="flex flex-row justify-start">
                   <p className="text-black font-mono sm:text-lg text-sm hover:text-yellow-400 hover:cursor-pointer font-extrabold sm:mr-2 mr-1">{value.stocks.stock_symbol}</p>
                 </div>      
                 <div className="flex flex-row flex-grow grow-1 justify-center sm:gap-7 gap-5  text-black font-mono sm:text-lg text-sm">
                   <p >{value.units}</p>
                   <p className="hidden sm:block" >{value.price_per_unit.toFixed(3)}</p>
                   <p className={`${value.transaction_type === "SELL" ? "text-red-800 font-bold" : "text-green-600 font-bold"}`} >{value.transaction_type}</p>
                 </div>
                 <p className= "sm:text-lg  font-extrabold font-mono hover:cursor-pointer text-black">{value.timestamp}</p>
                 </div>
                 </div>

             ))
           }
 
           <div className="flex justify-center mt-4">
           <div className="join">
            <button className="join-item btn bg-[#C6AC8F] text-black" onClick={() => setTrpage(trpage > 1 ? trpage - 1 : 1)}>«</button>
            <button className="join-item btn bg-[#C6AC8F] text-black">{trpage}</button>
            <button className="join-item btn bg-[#C6AC8F] text-black" onClick={() => setTrpage(trpage < Math.ceil(trlength / 10) ? trpage + 1 : trpage)}>»</button>
          </div>

           </div>
         </div>
      )}

            
        </div>
      </div>
     </div>


          <div className="flex flex-grow font-mono flex-wrap flex-col items-center">
          <div
  className="stats stats-horizontal text-black"
  style={{
    // background: "rgb(234,224,213)",
    // background: "linear-gradient(90deg, rgba(234,224,213,1) 0%, rgba(0,212,255,1) 100%)",
    background: "hsla(31, 33%, 88%, 1)",

background: "linear-gradient(225deg, hsla(31, 33%, 88%, 1) 0%, hsla(275, 77%, 70%, 1) 100%, hsla(351, 88%, 62%, 1) 100%)",

background: "-moz-linear-gradient(225deg, hsla(31, 33%, 88%, 1) 0%, hsla(275, 77%, 70%, 1) 100%, hsla(351, 88%, 62%, 1) 100%)",

background: "-webkit-linear-gradient(225deg, hsla(31, 33%, 88%, 1) 0%, hsla(275, 77%, 70%, 1) 100%, hsla(351, 88%, 62%, 1) 100%)"

  }}
>

                <div className="stat">
                  <div className="stat-title text-gray-900">Valuation</div>
                  <div className="stat-value">${portfolioValue.toFixed(3)}</div>
                </div>
                <div className="stat hidden sm:block">
                  <div className="stat-title text-gray-900">Investments</div>
                  <div className="stat-value text-3xl sm:stat-value">4,200</div>
                  <div className="stat-desc text-gray-900">DUMMY VALUE</div>
                </div>

                <div className="stat hidden sm:block">
                  <div className="stat-title text-gray-900">Net Return %</div>
                  <div className="stat-value text-3xl sm:stat-value">20%</div>
                  <div className="stat-desc text-gray-900">DUMMY VALUE</div>
                </div>
          </div>
            <PieChart
              data={chartData}
              label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
              labelStyle={{
                fontSize: "3px",
                fill: "black",
                fontFamily: "monospace",
                fontStyle: "bold",
              }}
              radius={42}
              lineWidth={15}
              paddingAngle={15}
              labelPosition={80}
              className="h-[350px] w-[350px] mt-auto mb-auto sm:min-w-[550px] sm:min-h-[550px]"
              animate={true}
              // rounded={true}
            />
          </div>
        </div>
      </div>

      </div>
      <Footer />
      <Buymodal selectedStock={selectedStock} />
      <Sellmodal selectedStock={selectedStock}/>
    </>
  );
}

export default Dashboard;