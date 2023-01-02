import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((food) => food._id !== action.payload);
    },
    update(state, action) {
      return state.map((food) => {
        if (food._id === action.payload.id) {
          return {
            ...food,
            price: action.payload.price,
            options: [action.payload.options],
            qty: action.payload.qty,
            size: action.payload.size,
          };
        } else {
          return food;
        }
      });
    },
    drop(state, action) {
      return [];
    },
  },
});

export const { add, remove, update, drop } = cartSlice.actions;
export default cartSlice.reducer;
