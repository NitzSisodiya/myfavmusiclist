import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Body from "./Body";

function Navbar() {
  const [auth, setAuth] = useState(true);
  const [best, setBest] = useState(false);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleChangeBest = (event) => {
    setBest(event.target.checked);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              FavMusicList
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
                    color="warning"
                  />
                }
                label={auth ? "List" : "Grid"}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={best}
                    onChange={handleChangeBest}
                    color="warning"
                  />
                }
                label="Best of Best"
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
      <Body auth={auth} best={best} />
    </>
  );
}
export default Navbar;
