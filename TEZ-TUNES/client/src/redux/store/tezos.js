import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tezos: null,
  connected: false,
};

const tezosSlice = createSlice({
  name: "tezos",
  initialState,
  reducers: {
    setTezos: (state, action) => {
      state.tezos = action.payload;
      state.connected = true;
    },
    clearTezos: (state) => {
      state.tezos = null;
      state.connected = false;
    },
  },
});

export const { setTezos, clearTezos } = tezosSlice.actions;
export default tezosSlice.reducer;
