import { createSlice } from "@reduxjs/toolkit";

const financeReducer = createSlice({
    name: "finances",
    initialState: {
        expenses: [],
        incomes: [],
        totalExpense: 0,
        totalIncome: 0,
        balance: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        setFinanceData: (state, action) => {
            state.expenses = action.payload.expenses;
            state.incomes = action.payload.incomes;
            state.totalExpense = action.payload.totalExpense;
            state.totalIncome = action.payload.totalIncome;
            state.balance = Math.abs(action.payload.totalIncome - action.payload.totalExpense);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setFinanceData, setLoading, setError } = financeReducer.actions;
export default financeReducer.reducer;