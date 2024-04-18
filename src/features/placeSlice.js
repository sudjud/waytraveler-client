import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPlaces = createAsyncThunk('place/fetch', async (_, thunkAPI) => {
  try {
    const res = await fetch('https://waytravel-server-7bcc93134540.herokuapp.com/place');
    const data = await res.json();
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.res.data.error)
  }
})

export const postLikes = createAsyncThunk('place/patch', async (id, thunkAPI) => {
  try {
    const res = await fetch(`https://waytravel-server-7bcc93134540.herokuapp.com/place/${id}/add-like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.token}`
      }
    });
    const data = await res.json();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const placeSlice = createSlice({
  name: 'place',
  initialState: {
    loading: false,
    error: null,
    places: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
        state.loading = false;
        state.error = null;
      })
    builder
    .addCase(postLikes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(postLikes.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(postLikes.fulfilled, (state, action) => {
      state.places = state.places.map(el => {
        if(el._id === action.payload._id) {
         return action.payload
        } 
        return el;
      })
    })
  }
})

export default placeSlice.reducer