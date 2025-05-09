import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { colors } from "../../../theme/colors";
import { DAYS_MAPPER } from "../../../utils/constant";
const DateSelector = ({ dates = [], selectedDate, onSelectDate }) => {
  return (
    <Grid container spacing={1}>
      {dates.map(({ day, date }) => (
        <Grid size={4} key={date}>
          {/* Day Label */}
          <Box sx={{ width: "100%", height: "5vh" }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: colors.primaryColor,
                textAlign: "center",
              }}
            >
              {DAYS_MAPPER[day]}
            </Typography>
          </Box>

          <Box
            onClick={() => onSelectDate(date)}
            sx={{
              width: "100%",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor:
                selectedDate === date ? colors.primaryColor : colors.secondaryBgColor,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                textAlign: "center",
                color: selectedDate === date ? "white" : "black",
              }}
            >
              {date}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DateSelector;
