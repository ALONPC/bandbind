import React, { FunctionComponent } from "react";
import {
  Typography,
  Grid,
  Card,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  CardHeader,
  Paper,
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
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
  paperBand: {
    width: 100,
    height: 100,
  },
}));

type Props = {
  artist: IArtist;
  isLanding: boolean;
};

export const EventCard: FunctionComponent<Props> = ({ artist, isLanding }) => {
  const classes = useStyles();
  const { events } = artist;
  const hasEvents = !!events.length;
  return isLanding ? (
    <Card key={artist.id} className={classes.card} raised={true}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={artist.imageUrl}
          title={artist.name}
        />
      </CardActionArea>
    </Card>
  ) : (
    <Card key={artist.id} className={classes.card} raised={true}>
      <CardActionArea>
        <CardHeader
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
                label={<Typography variant="h6">{genre}</Typography>}
              />
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
