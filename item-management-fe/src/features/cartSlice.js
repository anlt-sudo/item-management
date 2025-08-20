import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addToCart as addToCartApi,
  updateCartItem,
  removeFromCartApi,
  clearCartApi,
} from "../api/cartApi";

export const fetchCartThunk = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const data = await fetchCart();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch cart failed"
      );
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (item, thunkAPI) => {
    try {
      const data = await addToCartApi(item);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Add to cart failed"
      );
    }
  }
);

export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, cartId, quantity }, thunkAPI) => {
    try {
      const data = await updateCartItem({ productId, cartId, quantity });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Update cart item failed"
      );
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkAPI) => {
    try {
      const data = await removeFromCartApi(id);
      return { id };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Remove from cart failed"
      );
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      await clearCartApi();
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Clear cart failed"
      );
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateLocalQuantity: (state, action) => {
      const { cartId, productId, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id?.cartId === cartId && i.id?.productId === productId
      );
      if (item) item.quantity = quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.status = "succeeded";
      })
      .addCase(addToCartThunk.fulfilled, (state) => {
        // Server trả về cart mới
        state.status = "succeeded";
      })
      .addCase(updateCartItemThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(removeFromCartThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
        state.status = "succeeded";
      });
  },
});

export const { updateLocalQuantity } = cartSlice.actions;
export default cartSlice.reducer;
