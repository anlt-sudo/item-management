import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await login(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const registerThunk = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const response = await register(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// export const fetchUserProfileThunk = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
//   try {
//     const response = await fetchUserProfile();
//     return response.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.role = action.payload.user.role;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.role = action.payload.user.role;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Register failed';
      })
    //   .addCase(fetchUserProfileThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload.user;
    //     state.role = action.payload.user.role;
    //     state.isAuthenticated = true;
    //   })
    //   .addCase(fetchUserProfileThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || 'Fetch profile failed';
    //   });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
