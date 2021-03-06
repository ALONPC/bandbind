import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import { IUser } from "../../@types/user";

import { AlertMessage } from "./Alert";
import { useHistory } from "react-router-dom";
import { login } from "../auth";
import { authContext } from "../utils/AuthContext";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};

const useStyles = makeStyles((theme) => ({
  loginForm: {
    width: 350,
    display: "flex",
    flexDirection: "column",
    margin: 24,
  },
}));

export const LoginDialog: React.FunctionComponent<Props> = ({
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<any>({
    open: false,
    message: "",
    error: "",
  });
  const { auth, setAuthStatus } = useContext(authContext);

  const handleSubmit = async (userData: IUser) => {
    const response = await login(userData);
    console.log("handleSubmit -> response", response);
    const { user = {}, message = "", error } = response;
    try {
      setLoading(true);
      if (!!response.user) {
        console.log("handleSubmit -> response", response);
        setAuthStatus(user);
        handleClose();
        history.push(`/user/${user._id}`, {
          params: { userId: user._id },
        });
      } else {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAlertState({ open: true, message, error });
      setLoading(false);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => await handleSubmit(values),
  });

  const handleCloseAlert = () => {
    setAlertState({ open: false });
  };

  return (
    <>
      <AlertMessage
        severity={alertState.error ? "error" : "success"}
        duration={3000}
        message={alertState.message}
        open={alertState.open}
        handleClose={handleCloseAlert}></AlertMessage>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <form
            className={classes.loginForm}
            autoComplete="off"
            onSubmit={formik.handleSubmit}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <TextField
                margin="normal"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </DialogContent>
            <DialogActions>
              <Button
                size="large"
                disabled={loading}
                type="submit"
                color="primary">
                Submit
              </Button>
              {loading && <CircularProgress size={24} />}
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};
