import supabase from "./supabase.jsx";

export const fetchFinanceData = async (userId) => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

        const { data: expenses = [], error: expenseError } = await supabase
            .from('expense')
            .select('*')
            .eq('foreign_id', userId)
            .gte('date', firstDayOfMonth)
            .lte('date', lastDayOfMonth);

        if (expenseError) throw expenseError;

        const { data: incomes = [], error: incomeError } = await supabase
            .from('income')
            .select('*')
            .eq('foreign_id', userId)
            .gte('date', firstDayOfMonth)
            .lte('date', lastDayOfMonth);

        if (incomeError) throw incomeError;


        const totalExpense = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
        const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount), 0);

        return {
            expenses,
            incomes,
            totalExpense,
            totalIncome
        };
    } catch (error) {
        console.error('Finance data fetch error:', error);
        throw error;
    }
};