import React, { useState } from "react";
import {
  useTheme,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    heigth: 500,
  },
  img: {
    height: "100%",
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('https://images-na.ssl-images-amazon.com/images/I/61Gf1W-LxFL._AC_SX679_.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export const SignUp = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
  } = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().max(32, "Name is too long!").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "8 characters long at least!")
        .required("Required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), undefined],
        "Passwords must match"
      ),
    }),
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      //   await handleSubmit(values);
    },
  });
  const classes = useStyles();
  return (
    <div style={theme.custom.layout}>
      <Container className={classes.form} maxWidth="lg">
        <Grid container alignItems="stretch">
          <Grid item lg={6}>
            <Paper className={classes.img}></Paper>
          </Grid>
          <Grid item lg={6}>
            <form onSubmit={handleSubmit}>
              <Card style={{ padding: 18 }}>
                <CardContent>
                  <Typography variant="h4">Sign up</Typography>
                  <br></br>
                  <Grid container justify="space-evenly">
                    <Grid container direction="column">
                      <Grid item>
                        <TextField
                          margin="normal"
                          id="name"
                          label="Name"
                          type="text"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                          value={values.name}
                          onBlur={handleBlur}
                          color="secondary"
                          helperText={
                            errors.name && touched.name
                              ? errors.name
                              : "Enter your full name."
                          }
                          error={errors.name && touched.name ? true : false}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          margin="normal"
                          id="email"
                          label="Email"
                          type="email"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                          value={values.email}
                          onBlur={handleBlur}
                          color="secondary"
                          helperText={
                            errors.email && touched.email
                              ? errors.email
                              : "Enter your email."
                          }
                          error={errors.email && touched.email ? true : false}
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="column">
                      <Grid item>
                        <TextField
                          margin="normal"
                          id="password"
                          label="Password"
                          type="password"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                          value={values.password}
                          onBlur={handleBlur}
                          color="secondary"
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : "Enter your password."
                          }
                          error={
                            errors.password && touched.password ? true : false
                          }
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          margin="normal"
                          id="passwordConfirmation"
                          label="Repeat password"
                          type="password"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                          value={values.passwordConfirmation}
                          onBlur={handleBlur}
                          color="secondary"
                          helperText={
                            errors.passwordConfirmation &&
                            touched.passwordConfirmation
                              ? errors.passwordConfirmation
                              : "Confirm your password."
                          }
                          error={
                            errors.passwordConfirmation &&
                            touched.passwordConfirmation
                              ? true
                              : false
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions>
                  <Grid container justify="flex-end">
                    <Button
                      size="large"
                      disabled={loading}
                      type="submit"
                      variant="outlined"
                      color="primary">
                      Submit
                    </Button>
                    {loading && <CircularProgress size={24} />}
                  </Grid>
                </CardActions>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
