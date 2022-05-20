import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    album: [],
    bestOfBest: [],
  },
  reducers: {
    addAlbum: (state, action) => {
      state.album.push(action.payload);
    },
    deleteAlbum: (state, action) => {
      state.album = state.album.filter((li) => li.id !== action.payload);
    },
    addBestOfTheBest: (state, action) => {
      const update = {
        ...state.album.filter((li) => li.id === action.payload)[0],
      };
      return { ...state, bestOfBest: [...state.bestOfBest, update] };
    },
  },
});
export const { addAlbum, deleteAlbum, addBestOfTheBest } = albumSlice.actions;
export default albumSlice.reducer;
