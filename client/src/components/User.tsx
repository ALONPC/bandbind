import React, { useContext, useEffect } from "react";
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import { authContext } from "../utils/AuthContext";
import { useParams } from "react-router-dom";

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

  return (
    <div style={theme.custom.layout}>
      <Typography variant="h4">{`Welcome back, ${auth.name}`}</Typography>
      <Typography variant="h6">{`Your current subscription: ${
        auth.subscription?.plan || "No plan"
      }`}</Typography>
      {/* <Typography variant="h6">Your favorite artists:</Typography> */}
    </div>
  );
};
