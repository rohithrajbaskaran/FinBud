import { fetchFinanceData } from '../financeService';
import mockSupabase from '../../setupTests';
import * as vi from "node/test.js";

vi.mock('../supabase', () => ({
  default: mockSupabase
}));

describe('fetchFinanceData', () => {
  const mockUserId = 'test-user-id';
  const mockExpenses = [{ amount: 100 }, { amount: 200 }];
  const mockIncomes = [{ amount: 300 }, { amount: 400 }];

  beforeEach(() => {
    mockSupabase.from.mockImplementation((table) => ({
      select: () => ({
        eq: () => ({
          gte: () => ({
            lte: () => Promise.resolve({
              data: table === 'expense' ? mockExpenses : mockIncomes,
              error: null
            })
          })
        })
      })
    }));
  });

  it('should fetch and calculate finance data correctly', async () => {
    const result = await fetchFinanceData(mockUserId);
    
    expect(result).toEqual({
      expenses: mockExpenses,
      incomes: mockIncomes,
      totalExpense: 300,
      totalIncome: 700
    });
  });

  it('should handle errors properly', async () => {
    mockSupabase.from.mockImplementation(() => ({
      select: () => ({
        eq: () => ({
          gte: () => ({
            lte: () => Promise.resolve({ error: new Error('Test error') })
          })
        })
      })
    }));

    await expect(fetchFinanceData(mockUserId)).rejects.toThrow();
  });
}); 