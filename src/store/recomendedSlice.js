import { createSlice } from "@reduxjs/toolkit";

const recomendedSlice = createSlice({
  name: "recomendedSlice",
  initialState: {
    recomendedGamesArr: [],
  },
  reducers: {
    addToRecomended(state, action) {
      if (state.recomendedGamesArr.length < 8) {
        state.recomendedGamesArr = action.payload;
      }
    },
    addDescription(state, action) {
      state.recomendedGamesArr.map((item) => {
        if (item.id == action.payload.id) {
          item.description = action.payload.description_raw;
        }
      });
    },
  },
});

export const { addToRecomended, addDescription } = recomendedSlice.actions;

export default recomendedSlice.reducer;
