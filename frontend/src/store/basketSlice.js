import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import orderStatuses from '../common/statuses';
import api from '../services/api';

export const createOrder = createAsyncThunk(
  'basket/createOrder',
  async (orderItems, { getState }) => {
    const { statuses } = getState().inventory;

    const orderStatusId = statuses.find(
      ({ status }) => status === orderStatuses.notConfirmed,
    ).id;

    const res = await api.post('orders', { orderStatusId, orderItems });

    return res.data;
  },
);

const initialState = {
  orderItems: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addQuantity: (state, action) => {
      const orderItem = state.orderItems.find(
        ({ productId }) => productId === action.payload,
      );

      if (!orderItem) {
        state.orderItems = [
          ...state.orderItems,
          {
            productId: action.payload,
            quantity: 1,
          },
        ];
        return;
      }

      state.orderItems = state.orderItems.map((oi) =>
        oi.productId === action.payload
          ? {
              ...oi,
              quantity: oi.quantity + 1,
            }
          : oi,
      );
    },
    removeQuantity: (state, action) => {
      const orderItem = state.orderItems.find(
        ({ productId }) => productId === action.payload,
      );

      if (!orderItem) return;

      if (orderItem.quantity - 1 === 0) {
        state.orderItems = state.orderItems.filter(
          ({ productId }) => productId !== action.payload,
        );
        return;
      }

      state.orderItems = state.orderItems.map((oi) =>
        oi.productId === action.payload
          ? {
              ...oi,
              quantity: oi.quantity - 1,
            }
          : oi,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.orderItems = [];
    });
  },
});

export const { addQuantity, removeQuantity } = basketSlice.actions;

export const selectOrderItems = (state) => state.basket.orderItems;

export default basketSlice.reducer;
