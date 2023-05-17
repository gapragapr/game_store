import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    needPopup: false,
    popupText: null,
  },
  reducers: {
    setNeedPopup(state, action) {
      state.needPopup = action.payload.option;
    },
    setPopupText(state, action) {
      state.popupText = action.payload.popupText;
    },
  },
});

export const { setNeedPopup, setPopupText } = popupSlice.actions;

export default popupSlice.reducer;
