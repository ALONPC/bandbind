import React, { useState, useEffect, FunctionComponent } from "react";
// import { makeStyles } from "@material-ui/core";

import {
  Typography,
  makeStyles,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import { EventCard } from "./EventCard";

const useStyles = makeStyles((theme) => ({
  background: {
    flexGrow: 1,

    padding: theme.spacing(10),
    backgroundImage: `url('https://wallpaperboat.com/wp-content/uploads/2019/12/concert-23.jpg')`,
    backgroundSize: "cover",
    overflow: "hidden",
    height: "100vh",
    // opacity: 0.38,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  artistsWrapper: {},
  artistMosaic: {
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  },
}));

export const Landing = () => {
  const classes = useStyles();

  const [artists, setArtists] = useState<IArtist[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArtists();
    return () => console.log("EventMosaic -> artists", artists);
  }, []);

  const getArtists = async () => {
    setLoading(true);
    const artists = await fetch("http://localhost:8000/api/artists", {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    console.log("getArtists -> artists", artists);
    setArtists(artists);
  };

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  return (
    <div className={classes.background}>
      <Grid container direction="row">
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          <Grid item>
            <Typography variant="h4">Be in the front line</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          {artists.slice(0, 8).map((artist) => (
            <Grid item xs={12} sm={6} md={3} key={artist.id}>
              <EventCard artist={artist} isLanding={true}></EventCard>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* <Grid container direction="row" justify="center" alignItems="center"> */}

      {/* <Grid container>
        <Grid container>
          <Grid item>
            <Typography variant="h2">Be on the front row, always!</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            {artists.map((artist) => (
              <Grid item>
                <EventCard artist={artist} isLanding={true}></EventCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </div>
  );
};
