import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import InformationCard from "../components/features/DoctorDetails/InformationCard";
import DateSelector from "../components/features/DoctorDetails/DateSelector";

const dates = [
  { day: 1, date: "06" },
  { day: 4, date: "07" },
  { day: 7, date: "08" },
];

function DoctorDetails() {
  const { state } = useLocation();
  const [selectedDate, setSelectedDate] = useState("06");

  useEffect(() => {
    // Api get called
  }, [state?.doc_id]);

  return (
    <>
      <Box
        sx={{
          mt: 3,
          ml: 2,
          mr: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          Book Appointment
        </Typography>

        <InformationCard />

        <Typography
          sx={{
            mt: 5,
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          Select Day
        </Typography>

        <DateSelector
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </Box>
    </>
  );
}

export default DoctorDetails;
