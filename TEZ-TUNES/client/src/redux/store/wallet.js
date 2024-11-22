import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  address: null,
  balance: 0,
  wallet: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.connected = true;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.wallet = action.payload.wallet;
    },
    disconnectWallet: (state) => {
      state.connected = false;
      state.address = null;
      state.balance = 0;
      state.wallet = null;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { connectWallet, disconnectWallet, updateBalance } =
  walletSlice.actions;
export default walletSlice.reducer;
