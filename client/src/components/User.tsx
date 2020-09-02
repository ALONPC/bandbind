import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: 24,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const User = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <h1>Hello user!</h1>
    </div>
  );
};
