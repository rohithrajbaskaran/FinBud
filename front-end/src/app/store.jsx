import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as default
import rootReducer from "./rootReducer.jsx";

const persistConfig = {
    key: 'root', // The key for the root storage
    storage, // Use localStorage to persist data
    whitelist: ['auth'], // Only persist the `auth` slice
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['auth.session'],
            },
        }),
});

// Create a persistor instance
const persistor = persistStore(store);

export { store, persistor };
