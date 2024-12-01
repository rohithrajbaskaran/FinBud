import '@testing-library/jest-dom';

// Mock Supabase
const mockSupabase = {
  from: jest.fn(),
  auth: {
    getSession: jest.fn()
  }
};

export default mockSupabase; 