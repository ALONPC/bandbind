import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import { APP_NAME } from "../../contants";

export const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    footer: {
      textAlign: "center",
      // backgroundColor: theme.palette.background.footer,
      padding: theme.spacing(1),
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
  }));

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography color="textSecondary">
        🤘 {`© ${APP_NAME} ${moment().format("YYYY")}.`}
      </Typography>
    </footer>
  );
};
