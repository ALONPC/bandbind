import React, { FunctionComponent } from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Grid,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import StarBorder from "@material-ui/icons/StarBorder";
import HeadsetTwoToneIcon from "@material-ui/icons/HeadsetTwoTone";
import { NavLink } from "react-router-dom";
import { API } from "../utils/contants";

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
  const ArtistCardTitle = () => (
    <Grid
      container
      style={{ padding: 12 }}
      justify="space-between"
      alignContent="center"
      alignItems="center">
      <Grid item>
        <Typography variant="h4">{artist.name}</Typography>
      </Grid>
      <Grid item>
        <a href={artist.url}>
          <Button
            size="small"
            // type="submit"
            // onClick={() => {
            //   // make favorite or unfavorite
            //   // this will be on the user "favorite artists" field
            //   // make an endpoint for adding or removing the artist from favorites
            //   // make an endpoint to get the favorite artists in the user panel
            //   console.log("favorite");
            // }}>
          >
            Listen on Spotify
          </Button>
        </a>
      </Grid>
    </Grid>
  );
  return isLanding ? (
    <a href={artist.url}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={artist.imageUrl}
            title={artist.name}
          />
        </CardActionArea>
      </Card>
    </a>
  ) : (
    <Card className={classes.card} style={{ width: 400 }}>
      <CardActionArea>
        <ArtistCardTitle></ArtistCardTitle>
        <CardMedia
          className={classes.media}
          image={artist.imageUrl}
          title={artist.name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.chipWrapper}>
            {!!artist.genres &&
              artist.genres
                .slice(0, 3)
                .map((genre, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={<Typography variant="body1">{genre}</Typography>}
                  />
                ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
