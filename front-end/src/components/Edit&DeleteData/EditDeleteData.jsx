import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../../services/supabase.jsx';
import { fetchFinanceData } from '../../services/financeService.jsx';
import { setFinanceData } from '../../features/finances/financeReducer.jsx';
import './EditDeleteData.scss';

const EditDeleteData = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const { data: expenses, error: expenseError } = await supabase
                .from('expense')
                .select('*')
                .eq('foreign_id', user.id)
                .order('date', { ascending: false });

            const { data: incomes, error: incomeError } = await supabase
                .from('income')
                .select('*')
                .eq('foreign_id', user.id)
                .order('date', { ascending: false });

            if (expenseError) throw expenseError;
            if (incomeError) throw incomeError;

            const allTransactions = [
                ...expenses.map(e => ({ ...e, type: 'expense' })),
                ...incomes.map(i => ({ ...i, type: 'income' }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date));

            setTransactions(allTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [user.id]);

    const handleDelete = async (id, type) => {
        try {
            setLoading(true);
            const { error } = await supabase
                .from(type === 'income' ? 'income' : 'expense')
                .delete()
                .eq('id', id)
                .eq('foreign_id', user.id);

            if (error) throw error;

            // Update local state first
            setTransactions(prev => prev.filter(t => !(t.id === id && t.type === type)));
            
            // Then update Redux store
            const data = await fetchFinanceData(user.id);
            dispatch(setFinanceData(data));
            
        } catch (error) {
            console.error('Error deleting transaction:', error);
        } finally {
            setLoading(false);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    return (
        <div className="edit-delete-content">
            <h2>Recent Transactions</h2>
            <div className="transaction-list">
                {currentItems.map((transaction) => (
                    <div key={`${transaction.type}-${transaction.id}`} className="transaction-item">
                        <div className="transaction-details">
                            <p><strong>Type:</strong> {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Category:</strong> {transaction.category}</p>
                            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                        <div className="transaction-actions">
                            <button 
                                className="delete-btn"
                                onClick={() => handleDelete(transaction.id, transaction.type)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EditDeleteData;

