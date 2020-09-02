import React, { useState, useEffect, FunctionComponent } from "react";
import {
  makeStyles,
  useTheme,
  List,
  Typography,
  ListItem,
  Grid,
} from "@material-ui/core";
import { IArtist } from "../../@types/artist";
import { useParams } from "react-router-dom";
import { EventCard } from "./EventCard";
import { Loading } from "./Loading";

const useStyles = makeStyles((theme) => ({
  eventList: {
    marginTop: 24,
  },
}));

interface RouteParams {
  searchValue: string;
}

export const SearchResults: FunctionComponent<{}> = () => {
  const [artist, setArtist] = useState<IArtist>({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const params = useParams<RouteParams>();
  useEffect(() => {
    getArtists();
  }, [params.searchValue]); // will re render if params change

  const getArtists = async () => {
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
    setArtist(response);
  };

  const classes = useStyles();
  console.log("artist", artist);
  const events = artist?.events ?? [];
  console.log("events", events);
  return (
    <div style={{ ...theme.custom.layout }}>
      <Typography variant="h4">{`Upcoming events for "${params.searchValue}"...`}</Typography>
      <List className={classes.eventList}>
        <Grid container>
          {!loading &&
            !!events.length &&
            events.map((event) => (
              <ListItem>
                <Grid lg={9} md={12} sm={12} item>
                  <EventCard
                    imageUrl={artist.imageUrl}
                    event={event}></EventCard>
                </Grid>
              </ListItem>
            ))}
          {loading && <Loading></Loading>}
          {!loading && events.length === 0 && (
            <h1>Sorry, there are no events scheduled for this artist yet :(</h1>
          )}
        </Grid>
      </List>
    </div>
  );
};
