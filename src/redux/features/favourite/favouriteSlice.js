import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: [],
  reducers: {
    addtoFavourites: (state, action) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavourite: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavourites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addtoFavourites, setFavourites, removeFromFavourite } =
  favouriteSlice.actions;
export const selectFavouriteProduct = (state) => state.favourite;
export default favouriteSlice.reducer;
