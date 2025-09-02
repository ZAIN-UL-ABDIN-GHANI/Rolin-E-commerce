import { createSlice } from "@reduxjs/toolkit";

// ------------------- STATUS -------------------
export const STATUSES = Object.freeze({
  SUCCESS: "SUCCESS",
  ERROR: "error",
  LOADING: "LOADING",
});

// ------------------- PRODUCT SLICE -------------------
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// ------------------- PRODUCT THUNK -------------------
export function fetchProducts() {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
 
// ------------------- TIMER SLICE -------------------
export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    seconds: 0,
    isRunning: false,
  },
  reducers: {
    start(state) {
      state.isRunning = true;
    },
    pause(state) {
      state.isRunning = false;
    },
    reset(state) {
      state.seconds = 0;
      state.isRunning = false;
    },
    tick(state) {
      if (state.isRunning) {
        state.seconds += 1;
      }
    },
  },
});

export const { start, pause, reset, tick } = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
