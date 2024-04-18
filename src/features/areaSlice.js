import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAreas = createAsyncThunk('area/fetch', async (_, thunkAPI) => {

  try {
    const res = await fetch('https://waytravel-server-7bcc93134540.herokuapp.com/area');
    const data = await res.json();
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.res.data.error)
  }
})

const areaSlice = createSlice({
  name: 'area',
  initialState: {
    loading: false,
    error: null,
    areas: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.places = action.payload;
        state.loading = false;
        state.error = null;
      })
  }
})

export default areaSlice.reducer

