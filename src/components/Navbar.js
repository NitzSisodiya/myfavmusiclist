import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Favorite Music List
            </Typography>
            <span style={{ marginRight: "10px" }}>Grid</span>
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
                label="List"
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
