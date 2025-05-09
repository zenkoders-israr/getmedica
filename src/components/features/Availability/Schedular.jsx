import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import TimeSlot from "./TimeSlot";
import { daysOfWeek, defaultTimeSlot } from "./constant";
import { useSetAvailability } from "../../../api/availability/useAvailabilityMutations";
import { QueryClient } from "@tanstack/react-query";
import { AVAILABILITY_KEYS } from "../../../api/availability/queryKeys";
import { ToastRef } from "../../controls/Toast";
import { getErrorMessage } from "../../../utils/helper";
import { formatTime12Hour } from "./helper";

const Schedular = () => {
  const queryClient = new QueryClient();
  const { mutate, isPending } = useSetAvailability({
    onSuccess: () =>
      queryClient.invalidateQueries([AVAILABILITY_KEYS.GET_AVAILABILITY]),
    onError: (err) => ToastRef.showSnackbar(getErrorMessage(err), "error"),
  });

  const [schedule, setSchedule] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { enabled: false, slots: [{ ...defaultTimeSlot }] };
      return acc;
    }, {})
  );

  const handleToggleDay = (day) => {
    setSchedule((prev) => {
      const isEnabled = !prev[day].enabled;
      return {
        ...prev,
        [day]: {
          ...prev[day],
          enabled: isEnabled,
          slots: isEnabled ? [{ ...defaultTimeSlot }] : prev[day].slots,
        },
      };
    });
  };

  const handleTimeChange = (day, index, field, value) => {
    setSchedule((prev) => {
      const updatedSlots = [...prev[day].slots];
      updatedSlots[index][field] = value;
      return {
        ...prev,
        [day]: { ...prev[day], slots: updatedSlots },
      };
    });
  };

  const handleAddSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { ...defaultTimeSlot }],
      },
    }));
  };

  const handleRemoveSlot = (day, index) => {
    setSchedule((prev) => {
      const updatedSlots = prev[day].slots.filter((_, i) => i !== index);
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: updatedSlots.length ? updatedSlots : [{ ...defaultTimeSlot }],
        },
      };
    });
  };

  const handleSave = () => {
    const errors = [];

    const enabledDays = Object.entries(schedule).filter(
      ([_, value]) => value.enabled
    );

    if (enabledDays.length === 0) {
      ToastRef.showSnackbar("Please select at least one day.", "error");
      return;
    }

    for (const [day, { slots }] of enabledDays) {
      const seen = new Set();

      for (let i = 0; i < slots.length; i++) {
        const { from, to } = slots[i];

        if (!from || !to) {
          errors.push(
            `${day}: Please enter both "from" and "to" time in slot ${i + 1}`
          );
          continue;
        }

        if (from >= to) {
          errors.push(
            `${day}: "From" time must be earlier than "To" time in slot ${
              i + 1
            } (${formatTime12Hour(from)} - ${formatTime12Hour(to)})`
          );

          continue;
        }

        const slotKey = `${from}-${to}`;
        if (seen.has(slotKey)) {
          errors.push(
            `${day}: Duplicate time slot "${formatTime12Hour(
              from
            )} - ${formatTime12Hour(to)}"`
          );

          continue;
        }
        seen.add(slotKey);
      }
    }

    if (errors.length > 0) {
      ToastRef.showSnackbar(errors[0], "error");
      return;
    }

    const payload = enabledDays.map(([day, { slots }]) => ({
      day,
      slots,
    }));
    console.log({ payload });
    // mutate(payload);
  };

  return (
    <>
      <Box sx={{ p: 2, mt: 4 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Select Day
            </Typography>
          </Grid>

          <Grid size={9}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Select Timing
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {daysOfWeek.map((day) => (
            <Grid size={12} key={day}>
              <Grid container spacing={1}>
                {/* Day Check box */}
                <Grid size={2}>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={schedule[day].enabled}
                      onChange={() => handleToggleDay(day)}
                      sx={{
                        "&.Mui-checked": {
                          color: schedule[day].enabled && colors.primaryColor,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: schedule[day].enabled
                          ? "black"
                          : colors.textMutedColor,
                      }}
                    >
                      {day}
                    </Typography>
                  </Box>
                </Grid>

                {/* Time slot */}
                <Grid size={9}>
                  {schedule[day].enabled ? (
                    schedule[day].slots.map((slot, index) => (
                      <TimeSlot
                        key={index}
                        slot={slot}
                        onTimeChange={(field, value) =>
                          handleTimeChange(day, index, field, value)
                        }
                        onRemove={
                          schedule[day].slots.length > 1
                            ? () => handleRemoveSlot(day, index)
                            : null
                        }
                      />
                    ))
                  ) : (
                    <Typography
                      color={colors.textMutedColor}
                      sx={{
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Unavailable
                    </Typography>
                  )}
                </Grid>

                {/* Add Button */}
                {schedule[day].enabled && (
                  <Grid size={1}>
                    <Box
                      sx={{
                        height: 25,
                        width: 25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: colors.primaryColor,
                        borderRadius: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => handleAddSlot(day)}
                        size="small"
                        color="primary"
                      >
                        <Add sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container>
        <Grid size={12} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: colors.primaryColor,
              height: "56px",
              width: "186px",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Schedular;
