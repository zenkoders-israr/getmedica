import React from "react";
import { Grid } from "@mui/material";

import TimeView from "./components/TimeView";

function TimeSelector({
  slots = [],
  selectedSlot = null,
  onSlotChange = () => {},
}) {
  return (
    <Grid container spacing={1} mt={2}>
      {slots.map((slot) => (
        <TimeView
          key={slot.id}
          slot={slot}
          selected={slot.id === selectedSlot}
          onSelect={() => onSlotChange(slot.id)}
        />
      ))}
    </Grid>
  );
}

export default TimeSelector;
