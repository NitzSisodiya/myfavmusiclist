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
      };console.log(update.id);
      const exist = state.album.bestOfBest.findOne(list=>list.id === update.id)
      if(exist==""){
        return { ...state, bestOfBest: [...state.bestOfBest, update] };
      }
      return "Already in best of best list"
    },
    removeBestOfTheBest: (state, action) => {
      state.album.bestOfBest = state.album.bestOfBest.filter((li) => li.id !== action.payload);
    },
  },
});
export const { addAlbum, deleteAlbum, addBestOfTheBest, removeBestOfTheBest } =
  albumSlice.actions;
export default albumSlice.reducer;
