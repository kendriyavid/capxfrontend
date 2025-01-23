import {useState, useEffect, useRef} from 'react'
import Navbar from './assets/Navbar';
import Footer from './assets/Footer';

function App(){
  const [loading, setLoading] = useState(true);
  const [stockData,setStockData] = useState("")
  const [length,setLength] = useState(0);
  const [cpage,setCpage] = useState(1);
  useEffect(()=>{
    const fetchStockData = async ()=>{
      try{
        const response = await fetch(
          "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2024-12-18?adjusted=true&apiKey=V9jULBcLwwGIgcj_CfK3RxiMn_QOTpIp"
        )
        const data = await response.json();
        setStockData(data.results||[])
        setLength(data.resultsCount)
      }
      catch(error){
        console.error("error in fetching the data",error)
      }
      finally{
        setLoading(false);
      }  
    }
    fetchStockData();
  },[])

  if(loading){
    return(<h1 className='font-mono text-3xl text-center m-10'>Loading...</h1>)
  }

  const rendering = stockData.slice((cpage*10)+1,((cpage+1)*10)+1)

  function pagination(){

  }

  return(
    <>
    <Navbar></Navbar>
      

      <div className="min-h-screen flex flex-col ml-6 mr-6 mt-6">
        <div className="flex flex-row justify-start">
          <h1 className="font-serif text-4xl  ">Stock Listings</h1>
        </div>

        <div className="flex flex-row min-w-full min-h-screen justify-center mt-6 flex-shrink-0">
          <div className="max-h-full ">
          <div className='flex flex-row ml-4 mr-4 mt-2 bg-inherit justify-around border-yellow-400 border-b-2'>
            <div className="pt-2 pb-2 pl-4 pr-4 flex flex-row items-center space-x-4 w-full justify-between">

            <div className="flex flex-row justify-start">
            <p className="text-white font-mono text-xl hover:text-yellow-400 hover:cursor-pointer font-extrabold mr-2">Name</p>
            </div>

            <div className="flex flex-row flex-grow grow-1 justify-center gap-7">
            <p className="text-white font-mono text-xl ">High</p>
            <p className="text-white font-mono text-xl ">Low</p>
            <p className="text-white font-mono text-xl ">Close</p>
        </div>

      {/* <p className="text-yellow-400 text-xl font-extrabold font-mono hover:cursor-pointer">Buy</p> */}
      </div>
    </div>

{
  rendering.map((value,index)=>(
    <div  className='flex flex-row ml-4 mr-4 mt-2 bg-black rounded-md justify-around hover:border-yellow-400 border-b-2 border-black'>
       <div  key ={index}className="pt-2 pb-2 pl-4 pr-4 flex flex-row items-center space-x-4 w-full justify-between">
      <div className="flex flex-row justify-start">
        <p className="text-white font-mono text-xl hover:text-yellow-400 hover:cursor-pointer font-extrabold mr-2">{value.T}</p>
      </div>

      
      <div className="flex flex-row flex-grow grow-1 justify-center gap-7">
      <p className="text-white font-mono text-xl ">{value.h}</p>
      <p className="text-white font-mono text-xl ">{value.l}</p>
      <p className="text-white font-mono text-xl ">{value.c}</p>
      </div>

      <p className="text-yellow-400 text-xl font-extrabold font-mono hover:cursor-pointer">Buy</p>

      </div>
      </div>

  ))
}
  
<div className="flex justify-center mt-4">
  <div className="join">
    <button className="join-item btn" onClick={() => setCpage(cpage > 0 ? cpage - 1 : 0)}>«</button>
    <button className="join-item btn">{cpage}</button>
    <button className="join-item btn" onClick={() => setCpage(cpage < Math.ceil(length / 10) - 1 ? cpage + 1 : cpage)}>»</button>
  </div>
</div>

    </div>

    </div>
  </div>


  <Footer></Footer>
    
</>
    

  )
}

export default App;