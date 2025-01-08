import { useState } from "react";
import { useSellMutation } from './features/buysellSlice';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import {updateUserStocks} from './features/stocksSlice.js';
function Sellmodal({ selectedStock }) {
    const dispatch = useDispatch();
    const [units, setUnits] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [sell, { isLoading }] = useSellMutation();
    const userState = useSelector((state) => state.auth.user);

    if (!selectedStock) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (units <= 0) {
            alert("Please enter a valid number of units");
            return;
        }
        try {
            const result = await sell({
                symbol: selectedStock.stocks.stock_symbol,
                units,
                user: {
                    id: userState.id
                }
            }).unwrap();
            dispatch(updateUserStocks(result));
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
            console.log("Sell result:", result);
            document.getElementById("sellModal").close();
        } catch (err) {
            const errorMessage = err.data?.message || "An error occurred during sell";
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 2000);
            alert(errorMessage);
            console.error("Sell error:", err);
        }
    };

    return (
        <>
                    {showSuccess && (
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
                        <span>Sold Successfully!</span>
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

        <dialog id="sellModal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col bg-[#EAE0D5] border-t-8 border-[#C6AC8F] text-black font-mono">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg font-mono">SELL</h3>
                <div className="flex flex-row font-mono mt-3 mb-3">
                    <p className="m-auto flex-wrap">Name: {selectedStock.stocks.stock_symbol}</p>
                    <p className="m-auto flex-wrap">Current: {selectedStock.stocks.current_price}</p>
                    <p className="m-auto flex-wrap">Units Held: {selectedStock.units_held}</p>
                </div>
                <form onSubmit={handleSubmit}>
                Units:
                    <div className="flex flex-row font-mono">
                        {/* <input
                            type="number"
                            value={units}
                            onChange={(e) => {
                                let v = parseInt(e.target.value);
                                if (v <= selectedStock.units_held) {
                                    setUnits(v);
                                }
                            }}
                            min="1"
                            max={selectedStock.units_held}
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
                    <div className="flex flex-row font-mono">
                        Current Value: ${selectedStock.stocks.current_price * units || 0}
                    </div>
                    <div className="flex flex-row m-3">
                        {/* <button 
                            className="btn bg-black m-auto" 
                            type="submit" 
                            disabled={isLoading || units <= 0}
                        >
                            {isLoading ? "Selling..." : "Sell"}
                        </button> */}
                        <button 
                            type="submit"
                            disabled={isLoading || units <= 0 || !selectedStock}                            
                            className="bg-[#5e503f] row-start-6 text-black w-full justify-self-center rounded-lg mt-3 hover:bg-[#4e4233] transition-colors duration-200"
                        >
                            <p className="p-4 font-bold">{isLoading ? 'Selling...' : 'Sell'}</p>
                        </button>
                    </div>
                </form>           
            </div>
        </dialog>
        </>
    );
}

export default Sellmodal;