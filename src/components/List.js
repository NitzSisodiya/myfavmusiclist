import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAlbum } from "../redux/albumSlice";
import { Box } from "@mui/material";
import Fav from "./Fav";
import { useDispatch, useSelector } from "react-redux";

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
          -1 ||
        item.id === event.target.value ||
        item.date === event.target.value
    );
    setFilterList(filteredSongs);
  };

  const handleDelete = (id) => {
    dispatch(deleteAlbum(id));
  };

  const titleSort = () => {
    setFilterList(
      filterList.slice().sort((a, b) => (a.title > b.title ? 1 : -1))
    );
  };

  const idSort = () => {
    setFilterList(filterList.slice().sort((a, b) => a.id - b.id));
  };

  const dateSort = () => {
    const newFilterList = filterList.slice().sort((a, b) => Number(b.date.slice(0, 1)) - Number(a.date.slice(0, 1)));
    // const fianlList = newFilterList
    //   .slice()
    //   .sort((a, b) => Number(b.date.slice(1, 2)) - Number(a.date.slice(1, 2)));

    setFilterList(newFilterList);
  };

  return (
    <>
      <Box sx={{ width: "100%", height: 60, display: "flex" }}>
        <input
          id="input-search"
          style={{ width: "50%", height: 50 }}
          className="my-1 shadow border border-none"
          type="search"
          placeholder="Search album..."
          onChange={handleSearch}
        />
      </Box>
      <TableContainer component={Paper} mt={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Id</b> <button onClick={idSort}>Sort</button>{" "}
              </TableCell>
              <TableCell align="right">
                <b>Title</b> <button onClick={titleSort}>Sort</button>
              </TableCell>
              <TableCell align="right">
               <b> Date</b> <button onClick={dateSort}>Sort</button>
              </TableCell>
              <TableCell align="right"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterList?.map((row) => (
              <TableRow
                key={row.id}
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
                  <Fav id={row.id} fav={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
