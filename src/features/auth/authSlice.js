import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI(message);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI(message);
  }
});

export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
      state.user = null;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
      state.user = null;
    },

    [logout.fulfilled]: (state) => {
      state.user = null;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
