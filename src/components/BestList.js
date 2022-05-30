import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeBestOfTheBest } from "../redux/albumSlice";

function BestList() {
  const dispatch = useDispatch();
  const bestList = useSelector((state) => state.album.bestOfBest);

  const removeFromBestOfBest = (id) => {
    dispatch(removeBestOfTheBest(id));
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
      <TableContainer component={Paper} mt={2}>
        {bestList.length > 0 ?
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bestList?.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  {" "}
                  <DeleteIcon onClick={() => removeFromBestOfBest(row.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        : 
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
            }
      </TableContainer>
    </>
  );
}
export default BestList;
