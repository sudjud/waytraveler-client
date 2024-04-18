import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ name, password_1, mail }, thunkAPI) => {
    try {
      const response = await axios.post("https://waytravel-server-7bcc93134540.herokuapp.com/register", {
        name,
        password_1,
        mail,
      });
      const json = response.data;
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await axios.post("https://waytravel-server-7bcc93134540.herokuapp.com/login", {
        login,
        password,
      });

      const json = response.data;
      // console.log(json);
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      localStorage.setItem("token", json.token);
      localStorage.setItem('userId', json.user);

      return json
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    error: null,
    loading: false,
    token: localStorage.getItem("token"),
    userId: localStorage.getItem('userId')
  },
  reducers: {
    deleteToken: (state, action) => {
      state.userId = null;
      state.token = null;
    },
    deleteError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      // ===== Авторизация =====
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.user
        state.loading = false;
        state.error = null;
      });
  },
});

export const { deleteToken, deleteError } = userSlice.actions;
export default userSlice.reducer;
