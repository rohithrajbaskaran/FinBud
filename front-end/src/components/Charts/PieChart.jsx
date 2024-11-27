import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ incomes, expenses }) => {
    // Helper to aggregate data by category
    const aggregateByCategory = (data) =>
        data.reduce((acc, item) => {
            const { category, amount } = item;
            if (!acc[category]) acc[category] = 0;
            acc[category] += Number(amount);
            return acc;
        }, {});

    // Aggregate income and expense data by category
    const incomeData = aggregateByCategory(incomes);
    const expenseData = aggregateByCategory(expenses);

    // Merge income and expense data into a single dataset
    const categories = new Set([
        ...Object.keys(incomeData),
        ...Object.keys(expenseData),
    ]);

    const combinedData = Array.from(categories).map((category) => ({
        category,
        income: incomeData[category] || 0,
        expense: expenseData[category] || 0,
    }));

    // Generate distinct colors for each category
    const generateColors = (count) =>
        Array.from({ length: count }, (_, i) =>
            `hsl(${(i * 360) / count}, 70%, 60%)`
        );

    const categoryColors = generateColors(categories.size);

    // Prepare the chart data
    const chartData = {
        labels: combinedData.map((data) => data.category), // All categories
        datasets: [
            {
                label: "Income",
                data: combinedData.map((data) => data.income),
                backgroundColor: categoryColors, // Assign unique colors
            },
            {
                label: "Expense",
                data: combinedData.map((data) => data.expense),
                backgroundColor: categoryColors, // Same colors for consistency
            },
        ],

    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: "Income and Expense Distribution by Category",
            },
            legend: {
                display: true,
                position: "bottom",
            },
        },

    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;




