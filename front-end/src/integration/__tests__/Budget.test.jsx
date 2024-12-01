import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Budget from '../../pages/BudgetPage/Budget';

const mockStore = configureStore([]);

describe('Budget Integration', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { id: 'test-user' } },
      finances: { expenses: [] }
    });
  });

  it('should handle budget creation flow', async () => {
    render(
      <Provider store={store}>
        <Budget />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Food' } });
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(
        expect.objectContaining({ type: 'budgets/add' })
      );
    });
  });
}); 