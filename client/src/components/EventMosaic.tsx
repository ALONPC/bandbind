import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Fade,
  Chip,
  CardHeader,
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    // width: 250,
    margin: 24,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    background: "#3333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  cardWrapper: {},
  grayedOutCard: {
    // opacity: 0.4,
  },
  cardTitle: {
    textAlign: "center",
  },
  media: {
    height: 260,
  },
  chipWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export const EventMosaic = () => {
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

  const classes = useStyles();
  // return null;
  return (
    <Container maxWidth="xl">
      <Grid container direction="row" justify="center" alignItems="center">
        {loading && <CircularProgress />}
        {!loading &&
          artists.map((artist) => {
            const { events } = artist;
            const hasEvents = !!events.length;
            return (
              <Grid key={artist._id} container item xl={2} xs={6} spacing={3}>
                {/* <Fade in={!loading}> */}
                {/* <div
                    className={
                      hasEvents ? classes.cardWrapper : classes.grayedOutCard
                    }> */}
                <Card className={classes.card} raised={true}>
                  <CardActionArea>
                    <CardHeader
                      // title={
                      //   (artist.events[0] && artist.events[0].title) ||
                      //   artist.name
                      // }
                      title={artist.name}
                      subheader={
                        (artist.events[0] &&
                          moment(artist.events[0].date).format("DD/MM/YYYY")) ||
                        "(No scheduled events)"
                      }
                    />
                    <CardMedia
                      className={classes.media}
                      image={artist.imageUrl}
                      title={artist.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <div className={classes.chipWrapper}>
                        {artist.genres.slice(0, 2).map((genre, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={
                              <Typography variant="h6">{genre}</Typography>
                            }
                          />
                        ))}
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/* </div> */}
                {/* </Fade> */}
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};
