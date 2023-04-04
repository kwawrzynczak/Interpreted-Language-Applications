import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../services/api';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const res = await api.get('orders/all');
  return res.data;
});

export const editOrderStatus = createAsyncThunk(
  'orders/editOrderStatus',
  async ({ orderId, orderStatusId }) => {
    const res = await api.patch(`orders/${orderId}`, { orderStatusId });
    return res.data;
  },
);

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;
