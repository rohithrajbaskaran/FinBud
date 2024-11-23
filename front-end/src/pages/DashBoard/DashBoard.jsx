import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../../components/NavBar/NavBar.jsx";
import { fetchFinanceData } from "../../services/financeService.jsx";
import { setLoading, setError, setFinanceData } from "../../features/finances/financeReducer.jsx";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import InputData from "../../components/InputData/InputData.jsx";

import "./Dashboard.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { totalExpense, totalIncome, balance } = useSelector(state => state.finances);

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

    const chartData = {
        labels: ['Total Income', 'Total Expenses', 'Balance'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [totalIncome, totalExpense, balance],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Income
                    'rgba(255, 99, 132, 0.6)', // Expenses
                    'rgba(53, 162, 235, 0.6)', // Balance
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                    'rgb(53, 162, 235)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Financial Overview',
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => `$${value}`,
                },
            },
        },
    };

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
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
