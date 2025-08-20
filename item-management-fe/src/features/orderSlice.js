import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrders,
  fetchOrderById,
  updateOrderStatus,
  placeOrder,
} from "../api/orderApi";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

export const fetchOrdersThunk = createAsyncThunk(
  "order/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchOrders();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchOrderByIdThunk = createAsyncThunk(
  "order/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchOrderById(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const placeOrderThunk = createAsyncThunk(
  "order/place",
  async (data, thunkAPI) => {
    try {
      const response = await placeOrder(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch orders failed";
      })
      .addCase(fetchOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch order failed";
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.orders[idx] = action.payload;
      });
  },
});

export default orderSlice.reducer;
