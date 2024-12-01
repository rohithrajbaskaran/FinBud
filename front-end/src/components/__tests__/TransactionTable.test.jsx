import { render, screen } from '@testing-library/react';
import TransactionTable from '../TransactionTable/TransactionTable';

describe('TransactionTable', () => {
  const mockIncomes = [
    { id: 1, amount: 1000, category: 'Salary', date: '2024-03-15', type: 'Income' }
  ];
  const mockExpenses = [
    { id: 2, amount: 500, category: 'Food', date: '2024-03-14', type: 'Expense' }
  ];

  it('renders transactions correctly', () => {
    render(<TransactionTable incomes={mockIncomes} expenses={mockExpenses} />);
    
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('$1000.00')).toBeInTheDocument();
    expect(screen.getByText('$500.00')).toBeInTheDocument();
  });

  it('shows no transactions message when empty', () => {
    render(<TransactionTable incomes={[]} expenses={[]} />);
    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
  });
}); 