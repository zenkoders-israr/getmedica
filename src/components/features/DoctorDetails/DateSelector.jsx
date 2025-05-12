import React from "react";
import { Grid } from "@mui/material";

import DateView from "./components/DateView";
const DateSelector = ({ dates = [], selectedDate, onSelectDate }) => {
  return (
    <Grid container spacing={1}>
      {dates.map((data) => (
        <Grid size={4} key={data.id}>
          {/* Day Label */}
          <DateView
            data={data}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DateSelector;
