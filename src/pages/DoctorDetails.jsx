import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import InformationCard from "../components/features/DoctorDetails/InformationCard";
import DateSelector from "../components/features/DoctorDetails/DateSelector";
import TimeSelector from "../components/features/DoctorDetails/TimeSelector";
import { TextField } from "../components/controls";
import { colors } from "../theme/colors";
import { useGetAppointment } from "../api/appointment/useAppointmentQuery";
import { useSetAppointment } from "../api/appointment/useAppointmentMutations";
import { ToastRef } from "../components/controls/Toast";
import { getErrorMessage } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const schedule = [
  {
    id: 1,
    day: 1,
    date: "06",
    slots: [
      {
        id: 1,
        time: "9:00 AM",
        booked: true,
      },
      {
        id: 2,
        time: "10:00 AM",
        booked: false,
      },
    ],
  },
  {
    id: 2,
    day: 2,
    date: "07",
    slots: [
      {
        id: 1,
        time: "9:00 AM",
        booked: true,
      },
      {
        id: 2,
        time: "10:00 AM",
        booked: false,
      },
    ],
  },
  {
    id: 3,
    day: 3,
    date: "08",
    slots: [
      {
        id: 1,
        time: "9:00 AM",
        booked: true,
      },
    ],
  },
];

function DoctorDetails() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const [selectedDate, setSelectedDate] = useState(schedule[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");

  const { mutate: setAppointment } = useSetAppointment({
    onSuccess: () => {
      ToastRef.showSnackbar("Appointment booked successfully", "success");
      navigate(-1);
    },
    onError: (error) => {
      ToastRef.showSnackbar(getErrorMessage(error), "error");
    },
  });

  const { data: appointmentData, isLoading: isLoadingAppointment, refetch: refetchAppointment } =
    useGetAppointment(state?.doc_id);

    useEffect(() => {
      if (state?.doc_id) {
        refetchAppointment();
      }
    }, [state?.doc_id]);
    

  const handleBookAppointment = () => {
    if (!selectedTime || !reason) {
      ToastRef.showSnackbar("Please Select Time and enter reason", "error");
      return;
    }

    setAppointment({
      doctor_id: state?.doc_id,
      time: selectedTime?.time,
      reason: reason,
    });
  };

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
          dates={schedule}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
        />

        <Typography
          sx={{
            mt: 5,
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          Select Time
        </Typography>

        <TimeSelector
          slots={selectedDate?.slots}
          selectedSlot={selectedTime}
          onSlotChange={setSelectedTime}
        />

        <Typography
          sx={{
            mt: 5,
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          Reason for Appointment
        </Typography>

        <TextField
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          multiline
          rows={5}
          fullWidth
          placeholder="Please tell us why you would like to book this appointment with Dr. Raj Patel."
          sx={{
            mt: 4,
            border: "1px solid #D3D3D3",
            borderRadius: "8px",
          }}
        />

        <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: colors.primaryColor,
              height: "56px",
            }}
            onClick={handleBookAppointment}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default DoctorDetails;
