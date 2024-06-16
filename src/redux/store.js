import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSliceReducer from "../redux/features/cart/cartSlice";
import favouritesReducer from "../redux/features/favourite/favouriteSlice";
import shopReducer from "../redux/features/shop/shopSlice";
import { getFavouritesFromLocalStorage } from "../utils/localStorage";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import authSlice from "./features/auth/authSlice";
// import orderApiSlice from "./api/orderApiSlice";

const initialFavourite = getFavouritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authReducer,
    [authSlice.name]: authSlice.reducer,
    favourites: favouritesReducer,
    cart: cartSliceReducer,
    shop: shopReducer,
  },

  middleware: (mid) => [...mid(), apiSlice.middleware],
  
  preloadedState: {
    favourites: initialFavourite,
  },

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
  // devTools: true,
});

setupListeners(store.dispatch);
export default store;
