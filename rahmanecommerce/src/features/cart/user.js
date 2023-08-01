import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  localtestUser: {
    email: "example@gmail.com",
    password: "123qwerty",
    given_name: "Test",
    family_name: "User",
  },
  currentUser: {},
};

const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUser: (state, action) => {
      const currUser = action.payload;
      state.currentUser = currUser;
    },
    removeUser: (state) => {
      state.currentUser = {};
    },
    addCartItem: (state, action) => {
      const item = action.payload;
      if (state.cart.length !== 0) {
        for (let i = 0; i < state.cart.length; i++) {
          if (
            item.User.email === state.cart[i].User.email &&
            item.Item.title === state.cart[i].Item.title
          ) {
            state.cart[i].Quantity += parseInt(item.Quantity);
            state.cart[i].Sub =
              state.cart[i].Quantity * state.cart[i].Item.price;
            break;
          } else {
            state.cart.push(item);
            break;
          }
        }
      } else {
        state.cart.push(item);
      }
    },
    DecrementCart: (state, action) => {
      const ItemID = action.payload;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].ItemID === ItemID) {
          state.cart[i].Quantity -= 1;
          if (state.cart[i].Quantity <= 0) {
            state.cart[i].Quantity = 1;
          }
          state.cart[i].Sub = state.cart[i].Quantity * state.cart[i].Item.price;
          break;
        }
      }
    },
    IncrementCart: (state, action) => {
      const ItemID = action.payload;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].ItemID === ItemID) {
          state.cart[i].Quantity += 1;
          state.cart[i].Sub = state.cart[i].Quantity * state.cart[i].Item.price;
          break;
        }
      }
    },
    Checkout: (state) => {
      let TempCart = [];
      for (let i = 0; i < state.cart.length; i++) {
        if (state.currentUser.email !== state.cart[i].User.email) {
          TempCart.push(state.cart[i]);
        }
      }
      state.cart = TempCart;
    },
    RemoveFromCart: (state, action) => {
      const ItemID = action.payload;
      let DeletedIndex = null;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].ItemID === ItemID) {
          DeletedIndex = i + 1;
          break;
        }
      }
      if (DeletedIndex !== null) {
        const afterDeleted = state.cart.filter((item) => {
          return item.ItemID !== ItemID;
        });
        state.cart = afterDeleted;
      }
    },
  },
});

export const {
  assignUser,
  removeUser,
  addCartItem,
  DecrementCart,
  IncrementCart,
  CalculateSubCart,
  RemoveFromCart,
  Checkout,
} = User.actions;

export default User.reducer;
