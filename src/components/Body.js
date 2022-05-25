import React, { useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/albumSlice";

import data from "../data.json";
import BestList from "./BestList";
import List from "./List";
import Gridlist from "./Grid";

function Body({ auth, best }) {
  const defaultProps = {
    options: data.albums,
    getOptionLabel: (option) => option.title,
  };
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState("");
  const favSongList = useSelector((state) => state.album);

  const handleClick = (defaultProps) => {
    if (!favorite || favorite === "") {
      setFavorite("");
      return alert("Please select album");
    } else {
      const available = favSongList.album.find((li) => li.id === favorite.id);
      setFavorite("");
      if (available !== undefined) 
      return alert("Album already exists");
    }
    dispatch(addAlbum(favorite));
    setFavorite("");
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            height: 60,
          }}
          mt={2}
          display={"flex"}
        >
          <Autocomplete
            disablePortal
            {...defaultProps}
            id="combo-box-demo"
            value={favorite}
            getOptionLabel={(option) => option.title || ""}
            options={data.albums}
            onChange={(event, value) => setFavorite(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="albums" />}
          />
          <Button
            variant="outlined"
            color="primary"
            sx={{ height: "40px", marginTop: "10px", marginLeft: "8px" }}
            onClick={handleClick}
          >
            Add to Favorite
          </Button>
        </Box>
        <hr></hr>

        <Box sx={{ width: "100%", height: "auto" }}>
          {best ? <BestList /> : auth ? <List /> : <Gridlist />}
        </Box>
      </Container>
    </>
  );
}
export default Body;
