import React, { useState } from "react";
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
import { deleteAlbum } from "../redux/albumSlice";

export default function List() {
  const dispatch = useDispatch();
  const favSongList = useSelector((state) => state.album);
  const initialList = favSongList.album;
  console.log("listinitial", initialList);
  const [filterList, setFilterList] = useState(initialList);
  console.log("list ", filterList);

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setFilterList(initialList);
      return;
    }
    const filteredSongs = initialList.filter(
      (item) =>
        item.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
        -1
        );
    setFilterList(filteredSongs);
  };
  const handleDelete = (id) => {
    dispatch(deleteAlbum(id));
  };

  return (
    <>
      <input
        className="my-1 shadow border border-none"
        type="search"
        placeholder="Search user"
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
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
            {initialList?.map((row) => (
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
                {/* <TableCell align="right"><StarBorderIcon onClick={bestOfBest()} /></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
