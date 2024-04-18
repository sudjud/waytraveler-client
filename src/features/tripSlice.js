import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const fetchTrips = createAsyncThunk('trip/fetchTrips', async (_, thunkAPI) => {
  try {
    const res = await fetch('https://waytravel-server-7bcc93134540.herokuapp.com/trip');
    const data = await res.json()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

export const likeTrip = createAsyncThunk('like/trip', async(data, thunkAPI) => {
  try {
    const res = await fetch(`https://waytravel-server-7bcc93134540.herokuapp.com/trip/${data}/add-like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.token}`
      }
    })
    const data = await res.json();
    return thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return e
  }
})



export const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    loading: false,
    error: null,
    trips: []
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(likeTrip.fulfilled, (state, action) => {
        state.trips = state.trips.map(item => {
          if (item._id === action.payload._id) {
            return action.payload
          }
          return item;
        })
      })
  }
})

export default tripSlice.reducer
