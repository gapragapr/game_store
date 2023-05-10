import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    cartCount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const gameObj = { ...action.payload.game, count: 1 };
      const findedIndex = state.cart.findIndex(
        (item) => item.id == action.payload.game.id
      );
      if (findedIndex === -1) {
        state.cart.push(gameObj);
      } else {
        state.cart[findedIndex].count++;
      }
      state.cartCount++;
    },
    deleteCart(state, action) {
      const findedIndex = state.cart.findIndex(
        (item) => item.id == action.payload.game.id
      );
      switch (action.payload.type) {
        case "deep_delete":
          if (findedIndex !== -1) {
            state.cartCount -= state.cart[findedIndex].count;
            state.cart.splice(findedIndex, 1);
          }
          break;
        case "splice_one_game":
          if (findedIndex !== -1) {
            if (state.cart[findedIndex].count > 1) {
              state.cartCount--;
              state.cart[findedIndex].count--;
            }
          }
      }
    },
  },
});

export const { addToCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
