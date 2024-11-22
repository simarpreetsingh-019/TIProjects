import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    gotSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { gotSongs } = songSlice.actions;
export default songSlice.reducer;
