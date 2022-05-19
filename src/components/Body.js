import React, { useState } from "react";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import data from "../data.json";
import { Container } from "@mui/system";

import List from "./List";
import Gridlist from "./Grid";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../redux/albumSlice";

function Body() {
  const defaultProps = {
    options: data.albums,
    getOptionLabel: (option) => option.title,
  };
  const [favorite, setFavorite] = useState("");
  console.log("favorite", favorite);
  const dispatch = useDispatch();
  const songsFav = useSelector((state) => state.album);
  console.log("state-", songsFav);

  const handleClick = () => {
    dispatch(addAlbum(favorite));
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            height: 60,
            backgroundColor: "#e6ffff",
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
        <Box sx={{ width: "100%", height: 300, backgroundColor: "#e6ffff" }}>
          <List />
          <Gridlist/>
        </Box>
      </Container>
    </>
  );
}
export default Body;
