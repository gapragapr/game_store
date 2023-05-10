import { createSlice } from "@reduxjs/toolkit";

const gameCardSlice = createSlice({
  name: "gameCard",
  initialState: {
    game: null,
    price: null,
    platforms: null,
    screenshots: null,
  },
  reducers: {
    setGame(state, action) {
      state.game = action.payload.game;
    },
    setPrice(state, action) {
      state.price = action.payload.price;
    },
    setPlatforms(state, action) {
      state.platforms = action.payload;
    },
    setScreenshots(state, action) {
      state.screenshots = action.payload.screenshots;
    },
  },
});

export const { setGame, setPrice, setPlatforms, setScreenshots } =
  gameCardSlice.actions;

export default gameCardSlice.reducer;
