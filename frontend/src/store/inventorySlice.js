import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../services/api';

export const getProducts = createAsyncThunk(
  'inventory/getProducts',
  async () => {
    const res = await api.get('products');
    return res.data;
  },
);

export const getCategories = createAsyncThunk(
  'inventory/getCategories',
  async () => {
    const res = await api.get('categories');
    return res.data;
  },
);

export const getStatuses = createAsyncThunk(
  'inventory/getStatuses',
  async () => {
    const res = await api.get('status');
    return res.data;
  },
);

const initialState = {
  products: [],
  categories: [],
  statuses: [],
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
      });
  },
});

export const selectProducts = (state) => state.inventory.products;
export const selectCategories = (state) => state.inventory.categories;
export const selectStatuses = (state) => state.inventory.statuses;

export default inventorySlice.reducer;
