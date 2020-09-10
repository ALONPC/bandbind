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
import { ArtistCard } from "./ArtistCard";
import { Skeleton } from "@material-ui/lab";

interface RouteParams {
  searchValue: string;
}

const LoadingSearchResults = () => (
  <div style={{ padding: 24 }}>
    <Grid container justify="flex-start" spacing={4}>
      <Grid item lg={9}>
        <Skeleton variant="rect" height={380} width={400} />
      </Grid>
      {Array.from({ length: 6 }).map(() => (
        <Grid item lg={9}>
          <Skeleton variant="text" height={130} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export const SearchResults: FunctionComponent<{}> = () => {
  const [artist, setArtist] = useState<IArtist>({});
  console.log("artist", artist);
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

  const events = artist?.events ?? [];
  return (
    <div style={theme.custom.layout}>
      <Typography variant="h5">{`Search results for "${params.searchValue}"...`}</Typography>

      {loading && <LoadingSearchResults></LoadingSearchResults>}

      {!loading && (
        <>
          <Grid container>
            <ArtistCard artist={artist} isLanding={false}></ArtistCard>
          </Grid>
          <Typography variant="h5">{`Upcoming events:`}</Typography>
        </>
      )}

      <List>
        <Grid container>
          {!loading &&
            !!events.length &&
            events.map((event) => (
              <ListItem key={event._id}>
                <Grid lg={9} md={12} sm={12} item>
                  <EventCard
                    imageUrl={artist.imageUrl}
                    event={event}></EventCard>
                </Grid>
              </ListItem>
            ))}

          {!loading && events.length === 0 && (
            <h1>Sorry, there are no events scheduled for this artist yet :(</h1>
          )}
        </Grid>
      </List>
    </div>
  );
};
