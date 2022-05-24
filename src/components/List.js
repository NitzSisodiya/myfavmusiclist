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
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { addBestOfTheBest, deleteAlbum ,removeBestOfTheBest} from "../redux/albumSlice";
import { Box, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function List() {
  const [value, setValue] = useState(new Date(""));
  const [add, setAdd] = useState(true);

  const dispatch = useDispatch();
  const favSongList = useSelector((state) => state.album);
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    setFilterList(favSongList.album);
  }, [favSongList.album]);

  const handleChange = (newValue) => {
    setValue(newValue);
    const filteredSongs = favSongList.album.filter(
      (item) => item.date === value
    );
    setFilterList(filteredSongs);
  };

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

  const addToBestOfBest = (id) => {
    dispatch(addBestOfTheBest(id));
    setAdd(false);
  };
  const removeFromBestOfBest = (id) => {
    dispatch(removeBestOfTheBest(id));
    setAdd(true);
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3} style={{ width: "50%", height: 30 }}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
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
                {console.log("date type", typeof row.date)}
                {console.log("date", row.date)}
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={() => handleDelete(row.id)} />
                </TableCell>
                <TableCell align="right">
                  {add ? (
                    <StarBorderIcon onClick={() => addToBestOfBest(row.id)} />
                  ) : (
                    <StarIcon onClick={() => removeFromBestOfBest(row.id)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
