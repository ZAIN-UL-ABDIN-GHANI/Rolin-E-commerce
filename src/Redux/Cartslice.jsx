// Cartslice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  //
  initialState: [],
  reducers: {
    add: (state, action) => {
      const payload = action.payload;
      const item = state.find(i => i.id === payload.id);
      if (item) {
        item.quantity = (item.quantity ?? 1) + 1;
      } else {
        // ensure required props exist
        state.push({ ...payload, quantity: 1 });
      }
    },
    remove: (state, action) => state.filter(item => item.id !== action.payload),
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const idx = state.findIndex(item => item.id === id);
      if (idx !== -1) {
        state[idx].quantity = (state[idx].quantity ?? 1) + change;
        if (state[idx].quantity <= 0) {
          // remove item in-place with splice (works with Immer)
          state.splice(idx, 1);
        }
      }
    },
    clearCart: () => [],
  }
});

export const { add, remove, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
