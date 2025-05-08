import * as React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { useEffect, useState } from "react";


export let BackdropLoaderRef = {};
const BackdropLoader = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    BackdropLoaderRef = {
      handleClose,
      handleOpen,
    };
    return () => {
      BackdropLoaderRef = {};
    };
  }, []);

  return (
    <Backdrop sx={(theme) => ({ color: "#fff", zIndex: 1301 })} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoader;
