import React from 'react'
import { Box, Typography } from "@mui/material";
import { colors } from "../../../../theme/colors";
import { DAYS_MAPPER } from "../../../../utils/constant";

function DateView({ data, selectedDate, onSelectDate }) {
  return (
   <>
      <Box sx={{ width: "100%", height: "5vh" }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: colors.primaryColor,
                textAlign: "center",
              }}
            >
              {DAYS_MAPPER[data.schedule_day]}
            </Typography>
          </Box>

          <Box
            onClick={() => onSelectDate(data)}
            sx={{
              width: "100%",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor:
                selectedDate?.date === data.date ? colors.primaryColor : colors.secondaryBgColor,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                textAlign: "center",
                color: selectedDate?.date === data.date ? "white" : "black",
              }}
            >
              {data.date}
            </Typography>
          </Box>
   </>
  )
}

export default DateView