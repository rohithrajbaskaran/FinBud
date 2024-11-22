import { combineReducers } from 'redux';
import authReducer from "../features/auth/authReducer.jsx";

// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer, // Add authReducer to the `auth` key
    // Add other reducers here as needed
});

export default rootReducer;
