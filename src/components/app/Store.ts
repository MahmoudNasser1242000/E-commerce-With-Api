import storage from 'redux-persist/es/storage';
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CartSlice from "./Cart/CartSlice";
import internetModeSlice from "./Internet/InternetModeSlice";
import profileImageSlice from "./ProfileImageId/ProfileImageSlice";
import { persistStore, persistReducer, WebStorage } from "redux-persist";
import { productSlice } from './Products/ProductSlice';
import { categorySlice } from './Category/categorySlice';
import { UserInfoSlice } from './UserInfo/UserInfoSlice';


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
    internet: internetModeSlice,
    profileImage: profileImageSlice,
    [productSlice.reducerPath]: productSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [UserInfoSlice.reducerPath]: UserInfoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([productSlice.middleware, categorySlice.middleware, UserInfoSlice.middleware]),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
