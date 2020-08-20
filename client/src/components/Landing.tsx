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
  GridList,
  GridListTile,
  rgbToHex,
  Box,
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
  display: {
    flexGrow: 2,
    display: "flex",
    alignContent: "center",
    alignItems: "start",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: 500,
  },
  displayText: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridListContainer: {
    flexGrow: 1,
    display: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 450,
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
      <Box className={classes.display}>
        <Grid container className={classes.displayText}>
          <Grid item>
            <Typography variant="h2">Be on the front row, always!</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.gridListContainer}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {artists.map(({ id, imageUrl, name }) => (
              <GridListTile key={id} cols={1}>
                <img src={imageUrl} alt={name} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        {/* <Grid container className={classes.gridListContainer}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {artists.map(({ id, imageUrl, name }) => (
              <GridListTile key={id} cols={1}>
                <img src={imageUrl} alt={name} />
              </GridListTile>
            ))}
          </GridList>
        </Grid> */}
      </Box>
      {/* <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div> */}

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
