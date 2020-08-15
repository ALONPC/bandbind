import React, { useState, useEffect } from "react";
import { Typography, makeStyles, Grid, Paper } from "@material-ui/core";
import { IArtist } from "../../@types/artist";

const useStyles = makeStyles((theme) => ({
  bg: {
    flexGrow: 1,

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
  console.log("Landing -> artists", artists);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArtists();
    return () => console.log("EventCard -> artists", artists);
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
    setArtists(artists.slice(0, 6));
  };

  return (
    <div className={classes.bg}>
      {/* <Grid container direction="row" justify="center" alignItems="center">
        <Grid item direction="column">
          <Typography variant="h3">BE ALWAYS ON THE FRONT ROW</Typography>
        </Grid>
        <Grid item direction="column" className={classes.artistMosaic}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center">
            {artists.map((artist) => (
              <Paper elevation={3}>
                <img src={artist.imageUrl} />
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </div>
  );
};
