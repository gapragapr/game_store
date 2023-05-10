import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState: {
    favoriteGamesArr: [],
  },
  reducers: {
    addToFavorites(state, action) {
      const findedGame = state.favoriteGamesArr.findIndex(
        (item) => item.id === action.payload.game.id
      );
      if (findedGame === -1) {
        state.favoriteGamesArr.push(action.payload.game);
      }
    },
    deleteFavorite(state, action) {
      const findedIndex = state.favoriteGamesArr.findIndex(
        (item) => item.id === action.payload.game.id
      );
      if (findedIndex !== -1) {
        state.favoriteGamesArr.splice(findedIndex, 1);
      }
    },
  },
});

export const { addToFavorites, deleteFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
