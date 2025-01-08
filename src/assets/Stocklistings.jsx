import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import Buymodal from './Buymodal';
import { useDispatch, useSelector } from 'react-redux';

function Stocklistings() {
  const dispatch = useDispatch();
  const { stocks, isConnected } = useSelector((state) => state.stocks);

  const [length, setLength] = useState(0);
  const [cpage, setCpage] = useState(1);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleBuyClick = (value) => {
    console.log(value);
    setSelectedStock(value);
    const modal = document.getElementById('buyModal');
    if (modal) modal.showModal();
  };

  useEffect(() => {
    setLength(stocks.length);
  }, [stocks]);

  // if (!isConnected) {
  //   return <h1 className="font-mono text-3xl text-center m-10">Loading...</h1>;
  // }

  if(length==0){
    return(
      <>
        <Navbar></Navbar>
        <div className='flex justify-center min-h-screen'>
          <progress className="progress w-56 mt-auto mb-auto"></progress>
        </div>
      </>
    )
  }

  const rendering = stocks.slice((cpage - 1) * 10, cpage * 10);

  return (
    <>
      <Navbar />
      <div className="min-h-fit flex flex-col p-4">
        <div className="flex flex-row justify-start">
          <h1 className="font-mono text-2xl sm:text-3xl">Stock Listings</h1>
        </div>
  
        <div className="flex flex-row min-w-full min-h-screen justify-center sm:mt-3 pt-4 pb-4 flex-shrink-0">
          <div className="max-h-full flex-grow sm:max-w-[70%] ">
            <div className="flex flex-row bg-inherit justify-around border-yellow-400 border-b-2 m-2">
              <div className="flex flex-row items-center md:space-x-4 w-full justify-between sm:pt-1 sm:pb-1 sm:pl-1 sm:pr-1 sm:space-x-1">
                <div className="flex flex-row justify-start">
                  <p className="text-white font-mono sm:text-xl text-sm hover:cursor-pointer font-extrabold sm:mr-2">Name</p>
                </div>
                <div className="flex flex-row flex-grow justify-center gap-7 sm:text-xl text-sm text-white font-bold font-mono">
                  <p>Current</p>
                  <p>High</p>
                  <p className="hidden sm:block">Low</p>
                  <p>Close</p>
                </div>
              </div>
            </div>

            {rendering.map((value, index) => (
              <div key={index} className="flex flex-row sm:ml-4 sm:mr-4 sm:mt-2 ml-2 mr-2 mt-2 bg-black rounded-md justify-around hover:border-yellow-400 border-b-2 border-black">
                <div className="pt-2 pb-2 pl-4 pr-4 flex flex-row items-center space-x-4 w-full justify-between">
                  <div className="flex flex-row justify-start">
                    <p className="text-white font-mono sm:text-lg text-sm hover:text-yellow-400 hover:cursor-pointer font-extrabold sm:mr-2 mr-1">{value.symbol}</p>
                  </div>
                  <div className="flex flex-row flex-grow justify-center sm:gap-7 gap-5 text-white font-mono sm:text-lg text-sm">
                    <p>{value.data.c.toFixed(2)}</p>
                    <p>{value.data.h.toFixed(2)}</p>
                    <p className="hidden sm:block">{value.data.l.toFixed(2)}</p>
                    <p>{value.data.pc.toFixed(2)}</p>
                  </div>
                  <p className="text-yellow-400 sm:text-lg font-extrabold font-mono hover:cursor-pointer" onClick={() => handleBuyClick(value)}>Buy</p>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <div className="join">
                <button className="join-item btn" onClick={() => setCpage(cpage > 1 ? cpage - 1 : 1)}>«</button>
                <button className="join-item btn">{cpage}</button>
                <button className="join-item btn" onClick={() => setCpage(cpage < Math.ceil(length / 10) ? cpage + 1 : cpage)}>»</button>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <Footer />
      <Buymodal selectedStock={selectedStock} />
    </>
  );
}

export default Stocklistings;
