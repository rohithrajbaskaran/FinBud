import { combineReducers } from 'redux';
import authReducer from "../features/auth/authReducer.jsx";
import financeReducer from "../features/finances/financeReducer.jsx";

// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer, // Add authReducer to the `auth` key
    finances: financeReducer,
    // Add other reducers here as needed
});

export default rootReducer;
