import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { APP_NAME } from "../../contants";
import { LoginDialog } from "../LoginDialog";

const useStyles = makeStyles((theme) => ({
  header: {
    // color: theme.palette.primary.main,
    // backgroundColor: theme.palette.background.header,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    // <header className={classes.appBar}>
    <header>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {APP_NAME}
        </Typography>
        {/* <LoginDialog open={open} handleOpen={handleOpen}></LoginDialog>
        <Button onClick={handleOpen} color="inherit">
          Login
        </Button> */}
      </Toolbar>
    </header>
  );
};
