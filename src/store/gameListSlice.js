import { createSlice } from "@reduxjs/toolkit";

const gameListSlice = createSlice({
  name: "gameListSlice",
  initialState: {
    options: "ordering=-sales",
    gamesListArr: [],
  },
  reducers: {
    setOptions(state, action) {
      state.options = action.payload.options;
    },
    addToGamesList(state, action) {
      state.gamesListArr.push(action.payload);
    },
    clearGamesList(state) {
      state.gamesListArr = [];
    },
  },
});

export const { setOptions, addToGamesList, clearGamesList } =
  gameListSlice.actions;

export default gameListSlice.reducer;
