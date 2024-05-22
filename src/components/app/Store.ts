import storage from 'redux-persist/es/storage';
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CartSlice from "./Cart/CartSlice";
import { persistStore, persistReducer, WebStorage } from "redux-persist";


interface IPersistConfig {
  key: string;
  storage: WebStorage
} 
const persistCongfigCart: IPersistConfig = {
  key: "cart",
  storage,
};

const persistedCard = persistReducer(persistCongfigCart, CartSlice);

const store = configureStore({
  reducer: {
    cart: persistedCard,
  },
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
