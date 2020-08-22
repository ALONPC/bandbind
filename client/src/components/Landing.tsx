import React, { useState, useEffect } from "react";

import { Typography, makeStyles, Grid, Box } from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import { ArtistCard } from "./ArtistCard";
import _ from "lodash";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://www.itl.cat/pngfile/big/28-286780_twenty-one-pilots-wallpapers-photo-festival-wallpaper.jpg')`,
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  content: {
    margin: theme.spacing(10),
  },
  contentText: {
    textAlign: "center",
    margin: theme.spacing(3),
    fontWeight: 600,
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
    setArtists(_.shuffle(artists));
  };

  return (
    <div className={classes.background}>
      <Box className={classes.content}>
        <Typography variant="h2" className={classes.contentText}>
          Watch thousands of bands live!
        </Typography>
        <Typography variant="h4" className={classes.contentText}>
          Be on the front row, always 🤘
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          {!loading &&
            artists.map((artist) => (
              <Grid item lg={2} md={4} sm={6}>
                <ArtistCard isLanding={true} artist={artist}></ArtistCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};
