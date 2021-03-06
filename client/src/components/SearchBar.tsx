import React from "react";
import {
  makeStyles,
  Paper,
  Divider,
  Grid,
  InputBase,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 32,
    width: 600,
    padding: "2px 4px",
  },
  input: {
    width: "100%",
    marginLeft: theme.spacing(1),
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
  },
}));

export const SearchBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: ({ searchValue }, { resetForm }) => {
      searchValue &&
        history.push(`/artist/${searchValue.trim()}`, {
          params: { searchValue: searchValue.trim() },
        });
      resetForm(); // after submit the value is removed
    },
  });

  return (
    <Grid container lg={12}>
      <Paper className={classes.root}>
        <form
          className={classes.root}
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off">
          <IconButton type="submit" className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <InputBase
            id="searchValue"
            className={classes.input}
            autoFocus
            type="text"
            placeholder="Search for an artist..."
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.searchValue}
          />
        </form>
      </Paper>
    </Grid>
  );
};
