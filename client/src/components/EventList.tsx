import React, { useState, useEffect, FunctionComponent } from "react";
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
import { useParams } from "react-router-dom";

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

interface RouteParams {
  searchValue: string;
}

export const EventList: FunctionComponent<{}> = () => {
  const params = useParams<RouteParams>();
  const [artist, setArtist] = useState<IArtist>({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getArtist();
  }, [params.searchValue]); // will re render if params change
  
  const getArtist = async () => {
    console.log("artist", artist)
    setLoading(true);
    const response = await fetch(
      `http://localhost:8000/api/artist/${params.searchValue}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    console.log("getArtist -> artist", response[0]);
    setArtist(response[0]);
  };

  const classes = useStyles();
  console.log("artist", artist);
  const events = artist?.events ?? [];
  console.log("events", events);
  return (
    <>
      {!loading &&
        !!events.length && events.map((event) => (
          <>
            <h1>{event.title}</h1>
          </>
        ))}
    </>
  );
  // return (
  //   <Container maxWidth="xl">
  //     <Grid container direction="row" justify="center" alignItems="center">
  //       {loading && <CircularProgress />}
  //       {!loading &&
  //         artist.events.map((event) => {
  //           const { events } = artist;
  //           const hasEvents = !!events.length;
  //           return (
  //             <Grid key={artist._id} container item xl={2} xs={6} spacing={3}>
  //               {/* <Fade in={!loading}> */}
  //               {/* <div
  //                   className={
  //                     hasEvents ? classes.cardWrapper : classes.grayedOutCard
  //                   }> */}
  //               <Card className={classes.card} raised={true}>
  //                 <CardActionArea>
  //                   <CardHeader
  //                     // title={
  //                     //   (artist.events[0] && artist.events[0].title) ||
  //                     //   artist.name
  //                     // }
  //                     title={artist.name}
  //                     subheader={
  //                       (artist.events[0] &&
  //                         moment(artist.events[0].date).format("DD/MM/YYYY")) ||
  //                       "(No scheduled events)"
  //                     }
  //                   />
  //                   <CardMedia
  //                     className={classes.media}
  //                     image={artist.imageUrl}
  //                     title={artist.name}
  //                   />
  //                   <CardContent className={classes.cardContent}>
  //                     <div className={classes.chipWrapper}>
  //                       {artist.genres.slice(0, 2).map((genre, index) => (
  //                         <Chip
  //                           key={index}
  //                           size="small"
  //                           label={
  //                             <Typography variant="h6">{genre}</Typography>
  //                           }
  //                         />
  //                       ))}
  //                     </div>
  //                   </CardContent>
  //                 </CardActionArea>
  //               </Card>
  //               {/* </div> */}
  //               {/* </Fade> */}
  //             </Grid>
  //           );
  //         })}
  //     </Grid>
  //   </Container>
  // );
};
