import { useState } from 'react';
import { useSelector} from 'react-redux';
import supabase from '../../services/supabase.jsx';
import "./InputData.scss";

const InputData = () => {
    const user = useSelector(state => state.auth.user);
    const [type, setType] = useState('expense'); // 'expense' or 'income'
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const categories = {
        expense: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'],
        income: ['Salary', 'Freelance', 'Investment', 'Other']
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const table = type === 'expense' ? 'expense' : 'income';
            const { data, error } = await supabase
                .from(table)
                .insert([
                    {
                        client_id: user.id,
                        amount: Number(amount),
                        name,
                        category,
                        date
                    }
                ]);

            if (error) throw error;

            setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
            setAmount('');
            setName('');
            setCategory('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="main-container">
            <div className="input-data-content">
                <h2>Add New Transaction</h2>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <form onSubmit={handleSubmit} className="input-form">
                    <div className="form-group">
                        <label>Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            required
                            step="0.01"
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select category</option>
                            {categories[type].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter description"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Add {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InputData; 