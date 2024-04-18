import { configureStore } from "@reduxjs/toolkit";
import place from "../features/placeSlice";
import user from "../features/userSlice";
import comment from "../features/commentSlice";
import area from "../features/areaSlice"
import trip from "../features/tripSlice"
import category from '../features/categorySlice'

export const store = configureStore({
  reducer: {
    place,
    user,
    area,
    trip,
    comment,
    category
  },
});
