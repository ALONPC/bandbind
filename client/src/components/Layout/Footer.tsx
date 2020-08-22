import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import { APP_NAME } from "../../utils/contants";

export const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    footer: {
      textAlign: "center",
      padding: theme.spacing(1),
      width: "100%",
      // position: "fixed",
    },
  }));

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography color="textSecondary">
        <span role="img" aria-label="🤘">
          🤘
        </span>{" "}
        {`© ${APP_NAME} ${moment().format("YYYY")}.`}
      </Typography>
    </footer>
  );
};
