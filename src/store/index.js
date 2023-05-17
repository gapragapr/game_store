import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import favoritesSlice from "./favoritesSlice";
import recomendedSlice from "./recomendedSlice";
import cartSlice from "./cartSlice";
import topGamesSlice from "./topGamesSlice";
import gameListSlice from "./gameListSlice";
import errorSlice from "./errorSlice";
import gameCardSlice from "./gameCardSlice";
import popupSlice from "./popupSlice";
import { recomendedApi } from "./api/recomendedApi";
import { topGamesApi } from "./api/topGamesApi";
import { gameListApi } from "./api/gameListApi";
import { gameCardApi } from "./api/gameCardApi";
import { searchApi } from "./api/searchApi";

export default configureStore({
  reducer: {
    favorites: favoritesSlice,
    recomended: recomendedSlice,
    cart: cartSlice,
    topGames: topGamesSlice,
    gamesList: gameListSlice,
    err: errorSlice,
    gameCard: gameCardSlice,
    popup: popupSlice,
    [recomendedApi.reducerPath]: recomendedApi.reducer,
    [topGamesApi.reducerPath]: topGamesApi.reducer,
    [gameListApi.reducerPath]: gameListApi.reducer,
    [gameCardApi.reducerPath]: gameCardApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(recomendedApi.middleware)
      .concat(topGamesApi.middleware)
      .concat(gameListApi.middleware)
      .concat(searchApi.middleware)
      .concat(gameCardApi.middleware),
});
