import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./wallet";
import tezosReducer from "./tezos";
import songsReducer from "./songs";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    tezos: tezosReducer,
    songs: songsReducer,
  },
});
