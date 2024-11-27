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



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const BarChart = ({totalIncome, totalExpense, balance}) => {
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
                position: 'bottom',
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
        <Bar data={chartData} options={chartOptions} />
    )
}

export default BarChart;