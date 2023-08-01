import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/products";
import UserReducer from "./features/cart/user";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: UserReducer,
  },
});
