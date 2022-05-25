import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CardActions, Grid } from "@mui/material";
import { Container } from "@mui/system";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAlbum } from "../redux/albumSlice";
import Fav from "./Fav";

function Gridlist() {
  const favSongList = useSelector((state) => state.album);
  const [filterList, setFilterList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setFilterList(favSongList.album);
  }, [favSongList.album]);

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setFilterList(favSongList.album);
    }
    const filteredSongs = favSongList.album.filter(
      (item) =>
        item.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
          -1 || item.id === Number(event.target.value)
    );
    setFilterList(filteredSongs);
  };

  const handleDelete = (id) => {
    dispatch(deleteAlbum(id));
  };
  // const addToBestOfBest = (id) => {
  //   dispatch(addBestOfTheBest(id));
  // };
  // const removeFromBestOfBest = (id) => {
  //   dispatch(removeBestOfTheBest(id));
  // };

  return (
    <>
      <Box sx={{ width: "100%", height: 30 }}>
        <input
          style={{ width: "50%", height: 50 }}
          className="my-1 shadow border border-none"
          type="search"
          placeholder="Search albums..."
          onChange={handleSearch}
        />
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {filterList.map((row) => (
            <Grid item key={row} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={row.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontSize={20}
                    height={50}
                  >
                    <b>Title:</b> {row.title}
                  </Typography>
                  <hr />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontSize={20}
                    height={50}
                  >
                    <b>Artist Name:</b>
                    {row.artist_name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Fav id={row.id} fav={row} />
                  {/* {isFavorite ? (
                    <StarBorderIcon onClick={() => addToBestOfBest(row.id)} />
                  ) : (
                    <StarIcon onClick={() => removeFromBestOfBest(row.id)} />
                  )} */}
                  <Button size="small" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default Gridlist;
