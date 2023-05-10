import { createSlice } from "@reduxjs/toolkit";

const topGamesSlice = createSlice({
  name: "topGamesSlice",
  initialState: {
    topGamesArr: [],
  },
  reducers: {
    addToTopGames(state, action) {
      if (state.topGamesArr.length < 4) {
        state.topGamesArr.push(action.payload);
      }
    },
  },
});

export const { addToTopGames } = topGamesSlice.actions;

export default topGamesSlice.reducer;
