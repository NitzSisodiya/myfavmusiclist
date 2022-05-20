import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { addBestOfTheBest, deleteAlbum } from "../redux/albumSlice";
import { Box } from "@mui/material";

export default function List() {
  const dispatch = useDispatch();
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
          -1 || item.id === Number(event.target.value) || item.date === Number(event.target.value)
    );
    setFilterList(filteredSongs);
  };

  const handleDelete = (id) => {
    dispatch(deleteAlbum(id));
  };

  const handleBestOfBest = (id) => {
    dispatch(addBestOfTheBest(id));
  };
 
  return (
    <>
      <Box sx={{ width: "100%", height: 100 }}>
        <input
          style={{ width: "50%", height: 50 }}
          className="my-1 shadow border border-none"
          type="search"
          placeholder="Search user"
          onChange={handleSearch}
        />
     
      </Box>
      <TableContainer component={Paper} mt={2}>
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
            {filterList?.map((row) => (
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
                  <DeleteIcon onClick={() => handleDelete(row.id)} />
                </TableCell>
                <TableCell align="right">
                  <StarBorderIcon onClick={() => handleBestOfBest(row.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

