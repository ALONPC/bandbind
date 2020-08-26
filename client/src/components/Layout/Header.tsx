import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({}));

export const Header = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const user = useContext(authContext);
  console.log("Header -> user", user);
  const isLoggedIn = user.auth.email && user.auth.id;

  const handleLogout = () => {
    user.setUnauthStatus();
    history.push("/");
  };

  return (
    <header>
      <Toolbar>
        <Grid
          lg={8}
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
          <Grid item style={{ marginLeft: 48 }}>
            <SearchBar></SearchBar>
          </Grid>
        </Grid>
        {/* <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
          }}></Grid> */}
        <Grid
          container
          lg={4}
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "flex-end",
          }}>
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
