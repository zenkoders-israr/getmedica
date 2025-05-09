import React from "react";
import { Box, Typography } from "@mui/material";
import Schedular from "./Schedular";
function Availability() {
  return (
    <Box
      sx={{
        mt: 5,
       ml:2,
       mr:2
      }}
    >
      <Typography
        sx={{
          fontSize: 26,
          fontWeight: 600,
        }}
      >
        Set Your Weekly Availability
      </Typography>

      <Schedular />
    </Box>
  );
}

export default Availability;
