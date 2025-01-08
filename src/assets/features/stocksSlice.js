import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    stocks:[],
    userStocks:[],
    userTransactions:[],
    portfolioValue:0,
    lastUpdate: null,
    isConnected:false
}

const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        updateStocks: (state, action) => {
            console.log('stocks updated')
            console.log(action.payload.stocks)
            state.stocks = action.payload.stocks;
            state.lastUpdate = action.payload.timestamp;
        },
        setConnectionStatus: (state, action) => {
            console.log('connection status updated')
            state.isConnected = action.payload;
        },
        updateUserStocks: (state, action) => {
            console.log('user stocks updated')
            console.log(action.payload)
            state.userStocks = action.payload;
        },
        updateUserTransactions: (state, action) => {
            console.log('user transactions updated')
            console.log(action.payload)
            state.userTransactions = action.payload;},
        updatePortfolioValue: (state, action) => {
            console.log('portfolio value updated')
            console.log(action.payload)
            console.log(action.payload)
            state.portfolioValue = action.payload;}
    }
})

export const {updateStocks, setConnectionStatus, updateUserStocks, updateUserTransactions, updatePortfolioValue} = stockSlice.actions;
export default stockSlice.reducer;