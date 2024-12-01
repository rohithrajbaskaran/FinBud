import financeReducer, { setFinanceData, setLoading, setError } from '../financeReducer';

describe('financeReducer', () => {
  const initialState = {
    expenses: [],
    incomes: [],
    totalExpense: 0,
    totalIncome: 0,
    balance: 0,
    isLoading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(financeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFinanceData', () => {
    const mockData = {
      expenses: [{ amount: 100 }],
      incomes: [{ amount: 200 }],
      totalExpense: 100,
      totalIncome: 200
    };

    const newState = financeReducer(initialState, setFinanceData(mockData));
    expect(newState.balance).toBe(100);
    expect(newState.expenses).toEqual(mockData.expenses);
  });
}); 