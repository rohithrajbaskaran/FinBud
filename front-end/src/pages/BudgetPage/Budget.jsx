import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../../components/NavBar/NavBar.jsx";
import supabase from '../../services/supabase.jsx';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./Budget.scss";

const Budget = () => {
    const user = useSelector(state => state.auth.user);
    const { expenses } = useSelector(state => state.finances);
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({
        category: '',
        amount: '',
        period: 'monthly'
    });
    const [loading, setLoading] = useState(false);

    const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

    const fetchBudgets = async () => {
        try {
            const { data, error } = await supabase
                .from('budgets')
                .select('*')
                .eq('client_id', user.id);

            if (error) throw error;
            setBudgets(data || []);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('budgets')
                .insert([{
                    client_id: user.id,
                    category: newBudget.category,
                    amount: parseFloat(newBudget.amount),
                    period: newBudget.period
                }]);

            if (error) throw error;
            
            fetchBudgets();
            setNewBudget({ category: '', amount: '', period: 'monthly' });
        } catch (error) {
            console.error('Error creating budget:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateProgress = (budget) => {
        const categoryExpenses = expenses
            .filter(expense => expense.category === budget.category)
            .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        
        return (categoryExpenses / budget.amount) * 100;
    };

    const deleteBudget = async (budgetId) => {
        try {
            const { error } = await supabase
                .from('budgets')
                .delete()
                .eq('id', budgetId);

            if (error) throw error;
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content">
                <div className="budget-container">
                    <div className="budget-form-section">
                        <h2>Set New Budget</h2>
                        <form onSubmit={handleSubmit} className="budget-form">
                            <div className="form-group">
                                <label>Category</label>
                                <select 
                                    value={newBudget.category}
                                    onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Budget Amount</label>
                                <input
                                    type="number"
                                    value={newBudget.amount}
                                    onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
                                    placeholder="Enter amount"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="form-group">
                                <label>Period</label>
                                <select
                                    value={newBudget.period}
                                    onChange={(e) => setNewBudget({...newBudget, period: e.target.value})}
                                    required
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </div>

                            <button type="submit" disabled={loading}>
                                {loading ? 'Setting Budget...' : 'Set Budget'}
                            </button>
                        </form>
                    </div>

                    <div className="budget-overview">
                        <h2>Budget Overview</h2>
                        <div className="budget-cards">
                            {budgets.map(budget => {
                                const progress = calculateProgress(budget);
                                return (
                                    <div key={budget.id} className="budget-card">
                                        <div className="budget-info">
                                            <h3>{budget.category}</h3>
                                            <p>Budget: ${budget.amount}</p>
                                            <p>Period: {budget.period}</p>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => deleteBudget(budget.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <div className="progress-circle">
                                            <CircularProgressbar
                                                value={progress}
                                                text={`${progress.toFixed(1)}%`}
                                                styles={buildStyles({
                                                    pathColor: progress > 100 ? '#e74c3c' : '#01b35e',
                                                    textColor: '#ffffff',
                                                    trailColor: '#2d2d2d'
                                                })}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budget;