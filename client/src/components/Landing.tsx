import React, { useState, useEffect } from "react";
import { Typography, makeStyles, Grid, Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import _ from "lodash";

import { ArtistCard } from "./ArtistCard";
import { IArtist } from "../../@types/artist";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://www.itl.cat/pngfile/big/28-286780_twenty-one-pilots-wallpapers-photo-festival-wallpaper.jpg')`,
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  content: {
    margin: theme.spacing(6),
  },
  contentText: {
    margin: theme.spacing(1),
    fontWeight: 600,
  },
}));

export const Landing = () => {
  const classes = useStyles();

  const [artists, setArtists] = useState<IArtist[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArtists();
    return () => console.log("artists", artists);
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
    setArtists(_.shuffle(artists));
  };

  return (
    <div className={classes.background}>
      <Box className={classes.content}>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
          alignItems="center"
          spacing={4}>
          <Grid item>
            <Typography className={classes.contentText} variant="h2">
              Watch thousands of bands live!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">Be on the front row, always 🤘</Typography>
          </Grid>
          <Grid item>
            <NavLink
              to="/subscribe"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}>
              <Button variant="outlined" color="primary" size="large">
                <Typography className={classes.contentText} variant="h4">
                  Subscribe now!
                </Typography>
              </Button>
            </NavLink>
          </Grid>
        </Grid>

        <Grid
          style={{ marginTop: 24 }}
          container
          direction="row"
          justify="center"
          alignItems="center">
          {!loading &&
            artists.map((artist) => (
              <Grid key={artist._id} item lg={2} md={4} sm={6}>
                <ArtistCard isLanding={true} artist={artist}></ArtistCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};
