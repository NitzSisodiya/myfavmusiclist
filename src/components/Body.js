import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import data from "../data.json";
import { Container } from "@mui/system";

import List from "./List";
import Gridlist from "./Grid";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/albumSlice";
import BestList from "./BestList";

function Body({auth, best}) {
  const defaultProps = {
    options: data.albums,
    getOptionLabel: (option) => option.title,
  };
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState("");
  const favSongList = useSelector((state) => state.album);

  const handleClick = () => {
    if (favorite == null || favorite == "") {
      return alert("Please select album");
    } else {
      const available = favSongList.album.find((li) => li.id === favorite.id);
      if (available !== undefined) return alert("Album already exists");
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
            options={data.albums}
            onChange={(event, value) => setFavorite(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="albums" />}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Add
          </Button>
        </Box>
        <hr></hr>

        <Box sx={{ width: "100%", height: "auto" }}>
          {
           best ? 
         <BestList/> : 
          auth ? <List /> : <Gridlist />
          }
        </Box>
      </Container>
    </>
  );
}
export default Body;
