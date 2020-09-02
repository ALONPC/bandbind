import React, { useState, useContext } from "react";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
} from "@material-ui/core";
import Album from "@material-ui/icons/Album";
import { APP_NAME } from "../../utils/contants";
import { LoginDialog } from "../LoginDialog";
import { authContext } from "../../utils/AuthContext";
import { NavLink, useHistory } from "react-router-dom";
import { SearchBar } from "../SearchBar";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const user = useContext(authContext);
  console.log("Header -> user", user);
  const isLoggedIn = !!user.auth.email && !!user.auth._id;
  console.log("Header -> isLoggedIn", isLoggedIn);

  const handleLogout = () => {
    user.setUnauthStatus();
    history.push("/");
  };

  return (
    <header>
      <Toolbar>
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}>
          <Grid item>
            <IconButton edge="start" color="inherit">
              <Album />
            </IconButton>
          </Grid>
          <Grid item>
            <NavLink
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to="/">
              <Typography variant="h6">{APP_NAME}</Typography>
            </NavLink>
          </Grid>
          <Grid item lg={4} style={{ marginLeft: 48 }}>
            <SearchBar></SearchBar>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          alignContent="center"
          justify="flex-end">
          {user && isLoggedIn && (
            <Grid item>
              <>
                <Typography variant="subtitle1">{`Welcome, ${user.auth.name}`}</Typography>
                <Divider variant="fullWidth" orientation="vertical"></Divider>
              </>
            </Grid>
          )}
          <Grid item style={{ marginLeft: 20 }}>
            {user && isLoggedIn ? (
              <Button
                onClick={() => handleLogout()}
                variant="outlined"
                color="secondary">
                Logout
              </Button>
            ) : (
              <Button onClick={handleOpen} variant="outlined" color="primary">
                Login
              </Button>
            )}
          </Grid>
        </Grid>

        <LoginDialog
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}></LoginDialog>
      </Toolbar>
    </header>
  );
};
