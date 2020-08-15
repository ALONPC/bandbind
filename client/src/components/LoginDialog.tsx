import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};

export const LoginDialog: React.FunctionComponent<Props> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  console.log("LoginDialog -> open", open);

  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button
            disabled={loading}
            onClick={() => handleSubmit()}
            color="primary">
            Submit
          </Button>
          {loading && <CircularProgress size={24} />}
        </DialogActions>
      </Dialog>
    </div>
  );
};
