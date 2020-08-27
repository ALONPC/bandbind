import React, { FunctionComponent } from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(3),
  },
  cardContent: {
    background: "#3333",
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

export const ArtistCard: FunctionComponent<Props> = ({ artist, isLanding }) => {
  const classes = useStyles();
  return isLanding ? (
    <Card key={artist._id} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={artist.imageUrl}
          title={artist.name}
        />
      </CardActionArea>
    </Card>
  ) : (
    <Card key={artist._id} className={classes.card} raised={true}>
      <CardActionArea>
        <CardHeader
          title={artist.name}
          // subheader={
          //   (hasEvents && moment(artist.events[0].date).format("DD/MM/YYYY")) ||
          //   "(No scheduled events)"
          // }
        />
        <CardMedia
          className={classes.media}
          image={artist.imageUrl}
          title={artist.name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.chipWrapper}>
            {/* {artist.genres.slice(0, 2).map((genre, index) => (
              <Chip
                key={index}
                size="small"
                label={<Typography variant="h6">{genre}</Typography>}
              />
            ))} */}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
