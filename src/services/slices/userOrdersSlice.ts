import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrderSliceState = {
  orders: TOrder[];
  orderRequest: boolean;
  error: string | undefined;
};

export const initialState: TUserOrderSliceState = {
  orders: [],
  orderRequest: false,
  error: undefined
};

export const userOrderThunk = createAsyncThunk(
  'userOrders/getUserOrders',
  getOrdersApi
);

export const userOrderSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectorUserOrders: (state) => state.orders,
    selectorUserOrdersRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(userOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(userOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = true;
        state.orders = action.payload;
      })
      .addCase(userOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const { selectorUserOrders, selectorUserOrdersRequest } =
  userOrderSlice.selectors;
export const userOrdersReducer = userOrderSlice.reducer;
