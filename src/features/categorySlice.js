import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('fetch/Category', async (_, thunkAPI) => {
  try {
    const res = await fetch('https://waytravel-server-7bcc93134540.herokuapp.com/category');
    const data = await res.json();
    return data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    loading: false,
    error: null,
    category: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
        state.error = null;
      })
  }
})

export default categorySlice.reducer