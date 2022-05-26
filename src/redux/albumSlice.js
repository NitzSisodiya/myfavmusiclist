import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    album: [],
    bestOfBest: [],
  },
  reducers: {
    addAlbum: (state, action) => {
      state.album.push(action.payload);console.log("updatedlist",state);
    },
    deleteAlbum: (state, action) => {
      state.album = state.album.filter((li) => li.id !== action.payload);
      state.bestOfBest = state.bestOfBest.filter((li)=> li.id !== action.payload)
    },
    addBestOfTheBest: (state, action) => {
      const changeFav = state.album.find((list) => list.id === action.payload);
      const updated = { ...changeFav, fav: true };
      const updateList = state.album.map((list) =>
        list.id === action.payload ? updated : list
      );
    state.album = updateList
      
      state.bestOfBest = [
        ...state.bestOfBest,
        updateList.filter((li) => li.id === action.payload)[0],
      ];
    },
    removeBestOfTheBest: (state, action) => {
      const changeFav = state.album.find((list) => list.id === action.payload);
      const updated = { ...changeFav, fav: false };
      state.album = state.album.map((list) =>
        list.id === action.payload ? updated : list
      );
      state.bestOfBest = state.bestOfBest.filter(
        (li) => li.id !== action.payload
      );
    },
  },
});
export const { addAlbum, deleteAlbum, addBestOfTheBest, removeBestOfTheBest } =
  albumSlice.actions;
export default albumSlice.reducer;
