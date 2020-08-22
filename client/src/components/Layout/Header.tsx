import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import Album from "@material-ui/icons/Album";
import { APP_NAME } from "../../utils/contants";
import { LoginDialog } from "../LoginDialog";
import { authContext } from "../../utils/AuthContext";
import { NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const user = useContext(authContext);
  const { isLoggedIn } = user;
  console.log("Header -> user", user);

  const handleLogout = () => {
    user.setUnauthStatus();
    history.push("/");
  };

  return (
    <header>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <Album />
        </IconButton>
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
          }}>
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
          {user && isLoggedIn && (
            <Grid item>
              <Typography variant="subtitle1">{`Welcome, ${user.auth.email}`}</Typography>
            </Grid>
          )}
          <Grid item>
            {user && isLoggedIn ? (
              <Button onClick={() => handleLogout()} color="inherit">
                Logout
              </Button>
            ) : (
              <Button onClick={handleOpen} color="inherit">
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
