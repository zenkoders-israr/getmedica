import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import InformationCard from "../components/features/DoctorDetails/InformationCard";
import DateSelector from "../components/features/DoctorDetails/DateSelector";
import TimeSelector from "../components/features/DoctorDetails/TimeSelector";
import { TextField } from "../components/controls";
import { colors } from "../theme/colors";
import { useSetAppointment } from "../api/appointment/useAppointmentMutations";
import { ToastRef } from "../components/controls/Toast";
import { getErrorMessage } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { useGetAvailability } from "../api/availability/useAvailabilityQuery";
import { DAYS_MAPPER } from "../utils/constant";
import {
  getDayNumberFromDate,
  mergeBookingSlots,
} from "../components/features/DoctorDetails/helper";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/Selectors";

function DoctorDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector(selectUser);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(schedule[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);

  const { mutate: setAppointment } = useSetAppointment({
    onSuccess: () => {
      ToastRef.showSnackbar("Appointment booked successfully", "success");
      navigate(-1);
    },
    onError: (error) => {
      ToastRef.showSnackbar(getErrorMessage(error), "error");
    },
  });

  const { data: appointmentData, refetch: refetchAppointment } =
    useGetAvailability(state?.doc_id);

  useEffect(() => {
    if (state?.doc_id) {
      refetchAppointment();
    }
  }, [state?.doc_id]);

  const updateState = () => {
    if (!appointmentData) return;

    const { doctor, scheduler } = appointmentData;
    const docBasicInfo = { ...doctor };

    if (scheduler?.length) {
      const availabilityDays = [];

      const scheduleData =
        scheduler.map((item) => {
          availabilityDays.push(DAYS_MAPPER[item.schedule_day]);

          return {
            id: item.id,
            schedule_day: item.schedule_day,
            date: getDayNumberFromDate(item.date),
            slots: mergeBookingSlots(item.slots ?? []),
          };
        }) || [];

      docBasicInfo.availability = availabilityDays.join(", ");
      setSchedule(scheduleData);
      setSelectedDate(scheduleData?.[0] || []);
    }

    setBasicInfo(docBasicInfo);
  };

  useEffect(() => {
    if (appointmentData) {
      updateState();
    }
  }, [appointmentData]);

  const handleBookAppointment = () => {
    if (!selectedTime || !reason) {
      ToastRef.showSnackbar("Please Select Time and enter reason", "error");
      return;
    }

    setAppointment({
      booking_slot_id: selectedTime,
      patient_id: user?.id,
      booking_reason: reason,
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

        <InformationCard data={basicInfo} />

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
            setReason("");
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
