import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../api/productApi";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  searchError: null,
};

export const fetchAllProductsThunk = createAsyncThunk(
  "product/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllProducts();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchProductByIdThunk = createAsyncThunk(
  "product/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchProductById(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      const response = await createProduct(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "product/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateProduct(id, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const searchProductsThunk = createAsyncThunk(
  "product/search",
  async (productName, thunkAPI) => {
    try {
      const response = await searchProducts(productName);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch products failed";
      })
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch product failed";
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const idx = state.products.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.products[idx] = action.payload;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload || "Search products failed";
      });
  },
});

export default productSlice.reducer;
