import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export let ToastRef = {};
const Toast = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    ToastRef = { showSnackbar, handleClose };
    return () => {
      ToastRef = {};
    };
  }, []);

  const showSnackbar = (message, severity = "info") => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
      >
        {snackbarState.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
