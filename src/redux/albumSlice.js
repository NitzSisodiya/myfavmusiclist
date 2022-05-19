import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    album: [],
  },
  reducers: {
    addAlbum: (state, action) => {
      console.log("action--", action.payload);
      state.album.push(action.payload);
    },
    deleteAlbum: (state, action) => {
        console.log("action delete", action.payload);
      state.album = state.album.filter((li) => li.id !== action.payload);
    }, 
  },
  
});
export const { addAlbum, deleteAlbum } = albumSlice.actions;
export default albumSlice.reducer;
