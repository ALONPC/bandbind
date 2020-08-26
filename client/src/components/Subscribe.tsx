import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Container,
  Button,
} from "@material-ui/core";
import { API } from "../utils/contants";
import { ISubscription } from "../../@types/subscription";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: 120,
    backgroundColor: "#000000",
  },
  card: {
    textAlign: "center",
    width: 400,
    height: "100%",
    padding: 24,
  },
  subPrice: { display: "inline", fontWeight: "bold" },
}));

export const Subscribe = () => {
  const { id } = useParams();
  console.log("Subscribe -> id", id);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [loading, setLoading] = useState(false);

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
    console.log("getSubscriptions -> response", response);
    setSubscriptions(response);
    setLoading(false);
  };

  const classes = useStyles();

  const applyDiscount = (subscription: ISubscription) => {
    const { discount, price } = subscription;
    const finalPrice = price - price * (discount / 100);
    console.log("applyDiscount -> finalPrice", finalPrice);
    return finalPrice;
  };

  return (
    <div className={classes.layout}>
      <Container maxWidth="lg">
        <Typography variant="h4">It's 🤘🤘🤘 time and you know it</Typography>
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
              console.log("applyDiscount -> withDiscount", withDiscount);
              return (
                <Grid item>
                  <Card className={classes.card}>
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
                      <Button variant="outlined" color="secondary">
                        <Typography variant="h4">Start now!</Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};
