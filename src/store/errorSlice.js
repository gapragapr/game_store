import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "errorSlice",
  initialState: {
    haveErr: false,
    errText: null,
  },
  reducers: {
    setErr(state, action) {
      state.haveErr = true;
      state.errText = action.payload.errText;
    },
    clearErr(state, action) {
      state.haveErr = false;
      state.errText = null;
    },
  },
});

export const { setErr, clearErr } = errorSlice.actions;

export default errorSlice.reducer;
