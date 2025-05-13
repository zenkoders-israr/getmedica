import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { colors } from "../../../../theme/colors";

function TimeView({ slot, selected, onSelect }) {
  return (
    <Grid size={2}>
      <Box
        sx={{
          height: "57px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: selected
            ? colors.primaryColor
            : colors.secondaryBgColor,
          borderRadius: "8px",
        }}
        onClick={() => !slot?.is_booked && onSelect(slot.id)}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: slot?.is_booked
              ? colors.textColorGray50
              : selected
              ? colors.textPrimaryColor
              : colors.textSecondaryColor,
          }}
        >
          {slot.time}
        </Typography>
      </Box>
    </Grid>
  );
}

export default TimeView;
