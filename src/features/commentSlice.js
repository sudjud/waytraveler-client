import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`https://waytravel-server-7bcc93134540.herokuapp.com/comment`, {});
      return  response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ text, idParams }, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://waytravel-server-7bcc93134540.herokuapp.com/comment/place/${idParams}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        }
      );

      const token = response.data;
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://waytravel-server-7bcc93134540.herokuapp.com/delete/comment/${id}`
      );
      const json = response.data;
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const patchComment = createAsyncThunk(
  "comment/patchComment",
  async ({ id, completed }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `https://waytravel-server-7bcc93134540.herokuapp.com/patch/comment/${id}`,
        {
          completed: completed,
        },
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        }
      );
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

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.loading = false;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchComment.pending, (state) => {
        state.loading = true;
      })
      // ===== Добавление дел =====
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log(action)
        state.comment.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      // ==== Удаление дел ====
      .addCase(deleteComment.pending, (state, action) => {
        state.comment = state.comment.map((item) => {
          if (item._id === action.meta.arg) {
            item.loading = true;
          }
          return item;
        });
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.comment = state.comment.map((item) => {
          if (item._id === action.meta.arg) {
            item.loading = false;
          }
          return item;
        });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = state.comment.filter(
          (item) => item._id !== action.payload
        );
      })
      //==== Изменение состояния ====
      .addCase(patchComment.pending, (state, action) => {
        state.error = null;
      })
      .addCase(patchComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(patchComment.fulfilled, (state, action) => {
        state.comment = state.comment.map((item) => {
          if (item._id === action.payload._id) {
            item.completed = !item.completed;
            return item;
          }
          return item;
        });
        state.loading = false;
        state.error = null;
      });
  },
});

export default commentSlice.reducer;
