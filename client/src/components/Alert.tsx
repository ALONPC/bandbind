import React, { FunctionComponent } from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

type Props = {
  severity: string | any;
  duration: number;
  message: string;
  open: boolean;
  handleClose: () => void;
};

export const AlertMessage: React.FunctionComponent<Props> = ({
  severity,
  duration,
  message,
  open,
  handleClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={duration}
      open={open}
      onClose={handleClose}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
