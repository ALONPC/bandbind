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
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import StarBorder from "@material-ui/icons/StarBorder";

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
    <Grid container style={{ padding: 12 }} justify="space-between">
      <Grid item>
        <Typography variant="h4">{artist.name}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          type="submit"
          onClick={() => {
            //make favorite
            console.log("favorite");
          }}>
          <StarBorder />
        </IconButton>
      </Grid>
    </Grid>
  );
  return isLanding ? (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={artist.imageUrl}
          title={artist.name}
        />
      </CardActionArea>
    </Card>
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
                    label={<Typography variant="h6">{genre}</Typography>}
                  />
                ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
