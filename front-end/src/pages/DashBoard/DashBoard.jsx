import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../../components/NavBar/NavBar.jsx";
import { fetchFinanceData } from "../../services/financeService.jsx";
import { setLoading, setError, setFinanceData } from "../../features/finances/financeReducer.jsx";
import BarChart from "../../components/Charts/BarChart.jsx";
import "./Dashboard.scss";
import PieChart from "../../components/Charts/PieChart.jsx";
import TransactionTable from "../../components/TransactionTable/TransactionTable.jsx";


const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { totalExpense, totalIncome, balance, incomes, expenses } = useSelector(state => state.finances);

    useEffect(() => {
        const loadFinanceData = async () => {
            if (!user) return;

            dispatch(setLoading(true));
            try {
                const data = await fetchFinanceData(user.id);
                dispatch(setFinanceData(data));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        loadFinanceData();
    }, [dispatch, user]);

    console.log(incomes);



    return (
        <div className="main-container">
            <NavBar />
            <div className="content">
                <div className="financial-summary">
                    <div className="summary-card income">
                        <h3>Total Income</h3>
                        <p>${totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="summary-card expenses">
                        <h3>Total Expenses</h3>
                        <p>${totalExpense.toFixed(2)}</p>
                    </div>
                    <div className="summary-card balance">
                        <h3>Balance</h3>
                        <p>${balance.toFixed(2)}</p>
                    </div>
                </div>
                <div className="chart-container">
                    <h3>Expense, Income and Balance</h3>
                    <BarChart totalIncome={totalIncome} totalExpense={totalExpense} balance={balance}/>
                </div>

                <div className="pietable-container">
                    <div className="pie-chart-container">
                        <h3>Categorical Income and Expense</h3>
                        <PieChart incomes={incomes} expenses={expenses}/>
                    </div>
                    <div className="table-container">
                        <h3>Recent Transactions</h3>
                        <TransactionTable incomes={incomes} expenses={expenses} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
