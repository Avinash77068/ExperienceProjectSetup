import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./slices/authSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authSlice"], 
};

const rootReducer = combineReducers({
    authSlice: authSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export const AppDispatch = store.dispatch;
