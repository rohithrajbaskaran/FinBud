
import "./TransactionTable.scss"; // Import your styles here

const TransactionTable = ({ incomes, expenses }) => {
    // Combine incomes and expenses into a single array
    const transactions = [
        ...incomes.map((income) => ({ ...income, type: "Income" })),
        ...expenses.map((expense) => ({ ...expense, type: "Expense" })),
    ];

    // Sort transactions by date (latest first)
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get the last 10 transactions
    const recentTransactions = sortedTransactions.slice(0, 10);

    return (
        <table className="transaction-table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
            </tr>
            </thead>
            <tbody>
            {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                        <td>{transaction.date || "N/A"}</td>
                        <td>{transaction.category || "N/A"}</td>
                        <td>${Number(transaction.amount).toFixed(2)}</td>
                        <td className={`type ${transaction.type.toLowerCase()}`}>
                            {transaction.type}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="no-transactions">
                        No transactions found.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default TransactionTable;


