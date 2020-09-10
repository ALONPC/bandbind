import React, { useContext, useEffect } from "react";
import {
  makeStyles,
  useTheme,
  Typography,
  Divider,
  Grid,
} from "@material-ui/core";
import { authContext } from "../utils/AuthContext";
import { useParams, NavLink } from "react-router-dom";

interface RouteParams {
  userId: string;
}

export const User = () => {
  const theme = useTheme();
  const { auth } = useContext(authContext);

  // const getUsersFavoriteArtists = async () => {
  // GET method passing the user ID and fetch all favorite artists
  // }

  const params = useParams<RouteParams>();
  console.log("User -> params", params);

  useEffect(() => {
    // do smt
  }, [params.userId]);

  console.log("User -> subscription", auth.subscription);
  return (
    <div style={theme.custom.layout}>
      <Grid container>
        <Grid item lg={9}>
          <Typography variant="h4">{`Welcome back, ${auth.name}`}</Typography>
          <br></br>
          <Typography
            display="inline"
            variant="h5">{`Your current subscription: `}</Typography>
          <Typography display="inline" variant="h4">
            {auth.subscription?.plan || "No plan"}
          </Typography>

          <Typography variant="subtitle1" color="secondary">
            <NavLink
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to="/subscribe">
              Manage your subscription here.
            </NavLink>
          </Typography>
          <br></br>
          <Divider></Divider>
          <Typography variant="body1" color="secondary">
            <NavLink
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to="/">
              Check your payment history.
            </NavLink>
          </Typography>
          {/* <Typography variant="h6">Your favorite artists:</Typography> */}
        </Grid>
      </Grid>
    </div>
  );
};
