import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// add user goal
export const addGoal = createAsyncThunk("goal/add", async (user, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.addGoal(user, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI(message);
  }
});

// get user goals
export const getGoals = createAsyncThunk("goal/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI(message);
  }
});

// remove goal
export const removeGoal = createAsyncThunk(
  "goal/remove",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.removeGoal(id, token);
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

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [addGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [addGoal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(action.payload);
    },
    [addGoal.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getGoals.pending]: (state) => {
      state.isLoading = true;
    },
    [getGoals.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = action.payload;
    },
    [getGoals.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [removeGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [removeGoal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = state.goals.filter((goal) => goal._id !== action.payload);
    },
    [removeGoal.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
