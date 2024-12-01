import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../../services/supabase';
import { fetchFinanceData } from '../../services/financeService';
import { setFinanceData } from '../../features/finances/financeReducer';
import './EditDeleteData.scss';
import InputData from "../InputData/InputData.jsx";

const EditDeleteData = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const ITEMS_PER_PAGE = 5;

    // Consolidate data fetching and processing
    const loadFinanceData = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const data = await fetchFinanceData(user.id);
            dispatch(setFinanceData(data));

            const allTransactions = [
                ...data.expenses.map(e => ({ ...e, type: 'expense' })),
                ...data.incomes.map(i => ({ ...i, type: 'income' }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date));

            setTransactions(allTransactions);
        } catch (error) {
            console.error('Error loading finance data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Unified method for database operations
    const performDatabaseOperation = async (operation, id, type, updateData = {}) => {
        if (!['income', 'expense'].includes(type)) return;

        try {
            setLoading(true);
            const table = type === 'income' ? 'income' : 'expense';
            const idColumn = `${type}_id`;

            const { error } = await supabase
                .from(table)
                [operation](updateData)
                .eq(idColumn, id);

            if (error) throw error;
            await loadFinanceData();
        } catch (error) {
            console.error(`Error during ${operation}:`, error);
        } finally {
            setLoading(false);
            setEditingTransaction(null);
        }
    };

    // Simplified delete handler
    const handleDelete = (id, type) =>
        performDatabaseOperation('delete', id, type);

    // Simplified edit handlers
    const handleEdit = (transaction) => {
        setEditingTransaction({
            ...transaction,
            date: new Date(transaction.date).toISOString().split('T')[0]
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const { type, income_id, expense_id } = editingTransaction;
        const id = income_id || expense_id;

        performDatabaseOperation('update', id, type, {
            amount: editingTransaction.amount,
            category: editingTransaction.category,
            date: editingTransaction.date
        });
    };

    // Pagination logic
    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
    const currentItems = transactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handle new transaction from InputData
    const handleNewTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => {
            const updatedTransactions = [...prevTransactions, newTransaction];
            return updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        });
    };

    useEffect(() => {
        loadFinanceData();
    }, [user?.id]);

    return (
        <div className="edit-delete-content">
            {/* Pass handleNewTransaction as a prop to InputData */}
            <InputData onAddTransaction={handleNewTransaction} />

            <h2>Recent Transactions</h2>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    {currentItems.length > 0 ? (
                        <div className="transaction-list">
                            {currentItems.map((transaction) => (
                                <div
                                    key={`${transaction.type}-${transaction.income_id || transaction.expense_id}`}
                                    className="transaction-item"
                                >
                                    <div className="transaction-details">
                                        {['type', 'amount', 'category', 'date'].map(field => (
                                            <p key={field}>
                                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                                                {field === 'type'
                                                    ? transaction[field].charAt(0).toUpperCase() + transaction[field].slice(1)
                                                    : field === 'date'
                                                        ? new Date(transaction[field]).toLocaleDateString()
                                                        : field === 'amount'
                                                            ? `$${transaction[field]}`
                                                            : transaction[field]}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="transaction-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(transaction)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(transaction.income_id || transaction.expense_id, transaction.type)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No transactions found.</p>
                    )}

                    {currentItems.length > 0 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {editingTransaction && (
                        <div className="edit-form-container">
                            <h3>Edit Transaction</h3>
                            <form onSubmit={handleEditSubmit}>
                                {['amount', 'category', 'date'].map(field => (
                                    <div key={field} className="form-group">
                                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                        <input
                                            type={field === 'amount' ? 'number' : field === 'date' ? 'date' : 'text'}
                                            value={editingTransaction[field]}
                                            onChange={(e) => setEditingTransaction(prev => ({
                                                ...prev,
                                                [field]: e.target.value
                                            }))}
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="form-actions">
                                    <button type="submit" className="save-btn">Save</button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setEditingTransaction(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EditDeleteData;
