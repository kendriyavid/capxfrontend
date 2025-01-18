
//     // {
//     //     "stock_id": "a324d334-82a6-494e-ae56-11aeec60b53c",
//     //     "units": 5,
//     //     "user":{
//     //         "id":"b5e1a06e-effa-4418-a4fd-90f0a6e2decd"
//     //     }
//     // }

// // import {useState} from 'react'
// // import {useSelector} from 'react-redux'
// // import {useBuyMutation} from './features/buysellSlice.js'
// // const userState = useSelector((state) => state.auth.user);
// // function Buymodal({selectedStock}){
// //     const [units, setUnits] = useState(0);
// //     const [buy, {isLoading}] = useBuyMutation();
// //     const handleSubmit = async(e) => {
// //         e.preventDefault();
// //         try {
// //             const result = await buy({
// //                 symbol:selectedStock.symbol,
// //                 units,
// //                 user:{
// //                     id:userState.id
// //                 }
// //             }).unwrap();
// //             console.log('Buy result:', result);
// //         } catch (err) {
// //             const errorMessage = err.data?.message || 'An error occurred during buy';
// //             alert(errorMessage);
// //             console.error('Buy error:', err);
// //         }
// //     return(  
// //         <>

// //     {/* Open the modal using document.getElementById('ID').showModal() method */}
// //             <dialog id="buyModal" className="modal modal-bottom sm:modal-middle">
// //             <div className="modal-box flex flex-col">
// //             <form method="dialog">
// //                     {/* if there is a button in form, it will close the modal */}
// //                     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
// //                 </form>
// //                 <h3 className="font-bold text-lg">BUY</h3>
// //                 <div className="flex flex-row font-mono mt-3 mb-3">
// //                     <p className="m-auto flex-wrap">Name: {selectedStock?.T || ''} </p>
// //                     <p className="m-auto flex-wrap">High: {selectedStock?.h || ''} </p>
// //                     <p className="m-auto flex-wrap">Low: {selectedStock?.l || ''} </p>
// //                 </div>
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="flex flex-row font-mono">
// //                         Units: <input type="number" value={units} onChange={(e) => setUnits(parseInt(e.target.value))} />
// //                     </div>
// //                     <div className="flex flex-row font-mono">
// //                         Current Value: ${selectedStock?.h * units || 0}
// //                     </div>
// //                     <div className="flex flex-row m-3">
// //                         <button className="btn btn-primary m-auto" type='submit' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Log in'}</button>
// //                     </div>
// //                 </form>
    
// //             </div>
// //             </dialog>

// //         </>
// //     )
// // }}

// // export default Buymodal;



// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useBuyMutation } from './features/buysellSlice';
// import {useDispatch} from 'react-redux';
// import {updateUserStocks} from './features/stocksSlice.js';
// function Buymodal({ selectedStock }) {
//     console.log(selectedStock);
//     const [units, setUnits] = useState(0);
//     const [buy, { isLoading }] = useBuyMutation();
//     const userState = useSelector((state) => state.auth.user);
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (units <= 0) {
//             alert('Please enter a valid number of units');
//             return;
//         }

//         try {
//             const result = await buy({
//                 symbol: selectedStock.symbol || selectedStock.stocks.stock_symbol,
//                 units,
//                 user: {
//                     id: userState.id
//                 }
//             }).unwrap();
//             console.log('Buy result:', result);
//             dispatch(updateUserStocks(result));
//             document.getElementById('buyModal').close();
//         } catch (err) {
//             const errorMessage = err.data?.message || 'An error occurred during buy';
//             alert(errorMessage);
//             console.error('Buy error:', err);
//         }
//     };

//     return (
//         <dialog id="buyModal" className="modal modal-bottom sm:modal-middle ">
//             <div className="modal-box flex flex-col glass">
//                 <form method="dialog">
//                     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                 </form>
//                 <h3 className="font-bold text-lg font-mono">BUY</h3>
//                 <div className="flex flex-row font-mono mt-3 mb-3">
//                     <p className="m-auto flex-wrap">Name: {selectedStock?.symbol || selectedStock?.stocks.stock_symbol}</p>
//                     {()=>{if(selectedStock?.data){
//                         <p className="m-auto flex-wrap">High: {selectedStock?.data?.h || ''}</p>
//                     }}}
//                     {/* <p className="m-auto flex-wrap">Low: {selectedStock?.data.l || ''}</p> */}
//                     <p className="m-auto flex-wrap">Current: {selectedStock?.stocks?.current_price || ''}</p>

//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="flex flex-row font-mono">
//                         Units: <input 
//                             type="number" 
//                             value={units} 
//                             onChange={(e) => setUnits(parseInt(e.target.value))}
//                             min="1"
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-row font-mono">
//                         Current Value: ${selectedStock?.h * units || 0}
//                     </div>
//                     <div className="flex flex-row m-3">
//                         <button 
//                             className="btn btn-primary m-auto" 
//                             type="submit"
//                             disabled={isLoading || units <= 0 || !selectedStock}
//                         >
//                             {isLoading ? 'Buying...' : 'Buy'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </dialog>
//     );
// }

// export default Buymodal;


import { useState } from 'react';
import { useBuyMutation } from './features/buysellSlice';
import { useDispatch } from 'react-redux';
import { updateUserStocks } from './features/stocksSlice.js';

function Buymodal({ selectedStock }) {
    const [units, setUnits] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [showError, setShowError] = useState(false);
    const [buy, { isLoading }] = useBuyMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (units <= 0) {
            alert('Please enter a valid number of units');
            return;
        }

        try {
            const result = await buy({
                symbol: selectedStock.symbol || selectedStock.stocks.stock_symbol,
                units
              
            }).unwrap();
            console.log('Buy result:', result);
            dispatch(updateUserStocks(result));
            document.getElementById('buyModal').close();
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);

        } catch (err) {
            const errorMessage = err.data?.message || 'An error occurred during buy';
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 2000);
            console.error('Buy error:', err);
        }
    };

    return (
        <>
            {showToast && (
                <div className="toast toast-end">
                    <div role="alert" className="alert alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Your purchase has been confirmed!</span>
                    </div>
                </div>
            )}

            {showError && (
                <div className="toast toast-end">
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error Occured!</span>
                </div>
                </div>)}

            <dialog id="buyModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col bg-[#EAE0D5] border-t-8 border-[#C6AC8F] text-black">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    </form>
                    <h3 className="font-bold text-lg font-mono text-black">BUY</h3>
                    {/* <div className="flex flex-row font-mono mt-3 mb-3 text-black">
                        <p className="m-auto flex-wrap">Name: {selectedStock?.symbol || selectedStock?.stocks.stock_symbol}</p>
                        {selectedStock?.performance &&(
                            <div className="tooltip" data-tip="Performance is calculated from the date of purchase">
                                <p className="m-auto flex-wrap">Growth: {selectedStock.performance.toFixed(3)}</p>
                            </div>
                        )}
                        <p className="m-auto flex-wrap">Current: {selectedStock?.stocks?.current_price || ''}</p>
                    </div> */}
                    <div className="flex flex-row font-mono mt-3 mb-3 text-black justify-between">
                        <p className=" flex-wrap">Name: {selectedStock?.symbol || selectedStock?.stocks.stock_symbol}</p>
                        
                        <p className=" flex-wrap">Current: {selectedStock?.stocks?.current_price || ''}</p>
                    </div>
                   

                    <form onSubmit={handleSubmit}>
                        <p className='font-mono '>                            Units: 
                        </p>
                        <div className="flex flex-row font-mono">
                            {/* Units: <input 
                                type="number" 
                                value={units} 
                                onChange={(e) => setUnits(parseInt(e.target.value))}
                                min="1"
                                required
                            /> */}
                            <input 
                                type="number" 
                                value={units}
                                placeholder="Units"
                                onChange={(e) => setUnits(parseInt(e.target.value))}
                                min="1"
                                required
                                className={`w-full border-2 border-black bg-inherit p-2 rounded-md`}
                            />
                        </div>
                        <div className="flex flex-row font-mono justify-between">
                            Current Value: ${selectedStock?.h * units || 0}
                            {selectedStock?.performance !== undefined && selectedStock?.performance !== null && (
                            <div className="tooltip" data-tip="Performance is calculated from the date of purchase">
                                <p className="m-auto flex-wrap">Growth: {selectedStock.performance.toFixed(3)}%</p>
                            </div>
                        )}
                        </div>
                        <div className="flex flex-row m-3">

                       

                        <button 
                            type="submit"
                            disabled={isLoading || units <= 0 || !selectedStock}                            
                            className="bg-black row-start-6 text-white w-full justify-self-center rounded-lg mt-3 hover:bg-[#4e4233] transition-colors duration-200"
                        >
                            <p className="p-4 font-bold">{isLoading ? 'Buying...' : 'Buy'}</p>
                        </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default Buymodal;