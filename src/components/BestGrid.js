import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions, Grid } from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAlbum } from "../redux/albumSlice";
import Fav from "./Fav";

function BestGrid() {
  const bestList = useSelector((state) => state.album.bestOfBest);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteAlbum(id));
  };

  return (
    <>
      <Typography
        mt={2}
        color="primary.dark"
        variant="h4"
        gutterBottom
        align="center"
        component="div"
      >
        Best of Best
      </Typography>
      <Container sx={{ py: 8 }} maxWidth="md">
        {bestList.length > 0 ? (
          <Grid container spacing={4}>
            {bestList.map((row) => (
              <Grid item key={row.id} xs={12} sm={6} md={4}>
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

                    <Button size="small" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            mt={4}
            color="primary.light"
            variant="h5"
            gutterBottom
            align="center"
            component="div"
          >
            Please, Add to 'Best of Best'..!
          </Typography>
        )}
      </Container>
    </>
  );
}
export default BestGrid;
