import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Container,
  Button,
  useTheme,
} from "@material-ui/core";
import { API } from "../utils/contants";
import { ISubscription } from "../../@types/subscription";
import { IAlertState } from "../../@types/alertState";

import { authContext } from "../utils/AuthContext";
import { LoginDialog } from "./LoginDialog";
import { AlertMessage } from "./Alert";

const useStyles = makeStyles((theme) => ({
  subscription: {
    textAlign: "center",
    width: 400,
    height: "100%",
    padding: 24,
  },
  purchasedSubscription: {
    textAlign: "center",
    width: 400,
    height: "100%",
    padding: 24,
    opacity: 0.4,
  },
  subPrice: { display: "inline", fontWeight: "bold" },
}));

export const Subscribe = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const { auth, setAuthStatus } = useContext(authContext);
  const isLoggedIn = !!auth.email && !!auth._id;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseAlert = () => {
    setAlertState({ open: false });
  };

  const [alertState, setAlertState] = useState<IAlertState>({
    open: false,
    message: "",
  });

  const upgradeSubscription = async (planToSubscribe: ISubscription) => {
    setLoading(true);
    if (!isLoggedIn) {
      handleOpen();
    } else {
      const { _id } = auth;
      const response = await fetch(`${API}/upgradeSubscription`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          plan: planToSubscribe.plan,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err));
      const { message, updatedUserWithSubscription } = response;
      setAuthStatus(updatedUserWithSubscription);
      setAlertState({ open: true, message });
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  const getSubscriptions = async () => {
    setLoading(true);
    const response = await fetch(`${API}/subscriptions`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
    setSubscriptions(response);
    setLoading(false);
  };

  const theme = useTheme();
  const classes = useStyles();

  const applyDiscount = (subscription: ISubscription) => {
    const { discount, price } = subscription;
    return price - price * (discount / 100);
  };

  return (
    <div style={theme.custom.layout}>
      <Container maxWidth="lg">
        <Typography variant="h4">
          It's time to headbang and you know it...
        </Typography>
        <Grid
          container
          style={{ marginTop: 24 }}
          spacing={4}
          direction="row"
          justify="center"
          alignContent="center">
          {!loading &&
            subscriptions.map((sub) => {
              const withDiscount = applyDiscount(sub);
              const isPurchased = sub.plan === auth?.subscription?.plan;
              return (
                <Grid key={sub._id} item>
                  <Card
                    className={
                      isPurchased
                        ? classes.purchasedSubscription
                        : classes.subscription
                    }>
                    <CardContent>
                      <Typography variant="h3">{sub.plan}</Typography>
                      {!!sub.discount && (
                        <Typography
                          color="textSecondary"
                          variant="h5">{`(Save ${sub.discount}%)`}</Typography>
                      )}

                      <Typography className={classes.subPrice} variant="h5">
                        {sub.currency}
                      </Typography>
                      <Typography
                        className={classes.subPrice}
                        variant="h2">{`$${withDiscount}`}</Typography>
                      {!!sub.discount && (
                        <Typography
                          display="inline"
                          color="textSecondary"
                          style={{ textDecoration: "line-through" }}
                          variant="h5">{`$${sub.price}`}</Typography>
                      )}
                      <Typography style={{ marginTop: 10 }} variant="h6">
                        {sub.description}
                      </Typography>
                      <br></br>
                      {isPurchased ? (
                        <Typography variant="h4">PURCHASED!</Typography>
                      ) : (
                        <Button
                          onClick={() => upgradeSubscription(sub)}
                          variant="outlined"
                          color="secondary">
                          <Typography variant="h4">Upgrade</Typography>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          <LoginDialog
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}></LoginDialog>
          <AlertMessage
            severity="success"
            duration={3000}
            message={alertState.message}
            open={alertState.open}
            handleClose={handleCloseAlert}></AlertMessage>
        </Grid>
      </Container>
    </div>
  );
};
