import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://fakestoreapi.com/products";

const initialState = {
  productItems: [],
  filteredItems: [],
  distinctCategories: [],
  isLoading: true,
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (name, thunkAPI) => {
    try {
      const response = await axios(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    topThree: (state) => {
      const tempItem = [...state.productItems];
      const tempProductItems = tempItem.sort(
        (a, b) => b.rating.count - a.rating.count
      );
      state.filteredItems = tempProductItems;
    },
    uniqueCategories: (state) => {
      const unique = new Set();
      for (let i = 0; i < state.productItems.length; i++) {
        unique.add(state.productItems[i].category);
      }
      state.distinctCategories = Array.from(unique);
    },
    selectedItem: (state, { payload }) => {
      state.filteredItems = [];
      for (let i = 0; i < state.productItems.length; i++) {
        if (parseInt(state.productItems[i].id) === parseInt(payload.id)) {
          state.filteredItems.push(state.productItems[i]);
          break;
        }
      }
    },
    filterItems: (state, action) => {
      state.filteredItems = [];
      const cat = action.payload;
      for (let i = 0; i < state.productItems.length; i++) {
        if (state.productItems[i].category === cat) {
          state.filteredItems.push(state.productItems[i]);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productItems = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { topThree, uniqueCategories, filterItems, selectedItem } =
  productsSlice.actions;
export default productsSlice.reducer;
