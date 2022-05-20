import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";

function Gridlist() {
  const favSongList = useSelector((state) => state.album);
  const [filterList, setFilterList] = useState([]);

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

  return (
    <>
      <Box sx={{ width: "100%", height: 30 }}>
        <input
          style={{ width: "50%", height: 30 }}
          className="my-1 shadow border border-none"
          type="search"
          placeholder="Search user"
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
                  <Typography gutterBottom variant="h5" component="div">
                    Title: {row.title}
                  </Typography>
                  <hr />
                  <Typography gutterBottom variant="h5" component="div">
                    Artist Name:{row.artist_name}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                {row.description}
              </Typography> */}
                </CardContent>
                {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default Gridlist;
