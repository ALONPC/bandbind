import React, { FC, useContext } from "react";
import { makeStyles, Typography, Grid, Paper, Button } from "@material-ui/core";
import { IEvent } from "../../@types/event";
import moment from "moment";
import AccessTime from "@material-ui/icons/AccessTime";
import Place from "@material-ui/icons/Place";
import { authContext } from "../utils/AuthContext";

const useStyles = (status: Boolean) =>
  makeStyles((_) => ({
    paper: {
      width: "100%",
      padding: 24,
      ...(status ? {} : { opacity: 0.4 }),
    },
    img: {
      width: 100,
      height: 100,
    },
  }));

type Props = {
  imageUrl?: string | any;
  event: IEvent;
};

export const EventCard: FC<Props> = ({ imageUrl, event }) => {
  const classes = useStyles(event.status)();
  const { auth } = useContext(authContext);
  const isLoggedIn = !auth.id?.length;
  console.log("auth", auth);
  const splitDate = (date: Date) => {
    const day = moment(date).format("DD");
    const month = moment(date).format("MMMM");
    const year = moment(date).format("YYYY");
    const hour = moment(date).format("HH:SS");
    return {
      day,
      month,
      year,
      hour,
    };
  };
  console.log("!!auth.id?.length", !!auth.id?.length);
  const eventDate = splitDate(event.date);
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid lg={1} container>
          <Grid item>
            <img
              style={{ borderRadius: 18 }}
              className={classes.img}
              src={imageUrl}
              alt={event.title}></img>
          </Grid>
        </Grid>
        <Grid
          lg={2}
          direction="column"
          justify="center"
          alignContent="center"
          alignItems="center"
          container>
          <Grid item>
            <Typography variant="h6">{eventDate.month}</Typography>
          </Grid>
          <Grid item>
            <Typography color="secondary" variant="h4">
              {eventDate.day}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{eventDate.year}</Typography>
          </Grid>
        </Grid>
        <Grid lg={7} direction="column" container>
          <Grid item>
            <Typography variant="h4">{event.title}</Typography>
          </Grid>
          <Grid item>
            <Grid container alignContent="center" alignItems="center">
              <Place></Place>
              <Typography variant="h6">{event.place}</Typography>
            </Grid>
            <Grid container alignContent="center" alignItems="center">
              <AccessTime></AccessTime>
              <Typography variant="h5">{eventDate.hour}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={2} container alignContent="center">
          <Grid item>
            <Button
              size="large"
              disabled={!event.status || isLoggedIn}
              onClick={() => console.log("Notification sent!")}
              variant="outlined"
              color="secondary">
              Notify me
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
