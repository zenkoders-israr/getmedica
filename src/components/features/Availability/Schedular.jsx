import React, { useState, useEffect } from "react";
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
import { defaultTimeSlot } from "./constant";
import { useSetAvailability } from "../../../api/availability/useAvailabilityMutations";
import { useGetAvailability } from "../../../api/availability/useAvailabilityQuery";
import { useQueryClient } from '@tanstack/react-query';
import { AVAILABILITY_KEYS } from "../../../api/availability/queryKeys";
import { ToastRef } from "../../controls/Toast";
import { getErrorMessage } from "../../../utils/helper";
import { formatTime12Hour } from "./helper";
import { DAYS } from "../../../utils/constant";
import { BackdropLoaderRef } from "../../controls/BackdropLoader";
const Schedular = () => {
  const queryClient = useQueryClient();
  const { data: availability } = useGetAvailability();

  const { mutate } = useSetAvailability({
    onSuccess: () => {
      queryClient.invalidateQueries([AVAILABILITY_KEYS.GET_AVAILABILITY]);
      ToastRef.showSnackbar("Availability updated successfully", "success");
      BackdropLoaderRef?.handleClose();
    },
    onError: (err) => {
      ToastRef.showSnackbar(getErrorMessage(err), "error");
      BackdropLoaderRef?.handleClose();
    },
  });

  const [schedule, setSchedule] = useState(
    DAYS.reduce((acc, { value, label }) => {
      acc[value] = { label, enabled: false, slots: [{ ...defaultTimeSlot }] };
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!availability?.length) return;

    const availabilityMap = availability.reduce((map, item) => {
      map[item.schedule_day] = item;
      return map;
    }, {});

    const updatedSchedule = DAYS.reduce((acc, { value, label }) => {
      const matchedDay = availabilityMap[value];

      acc[value] = {
        label,
        enabled: Boolean(matchedDay),
        slots: matchedDay?.slots?.length
          ? matchedDay.slots.map(({ start_time, end_time }) => ({
              from: start_time,
              to: end_time,
            }))
          : [{ ...defaultTimeSlot }],
      };

      return acc;
    }, {});

    setSchedule(updatedSchedule);
  }, [availability]);

  const handleToggleDay = (value) => {
    setSchedule((prev) => {
      const isEnabled = !prev[value].enabled;
      return {
        ...prev,
        [value]: {
          ...prev[value],
          enabled: isEnabled,
          slots: isEnabled ? [{ ...defaultTimeSlot }] : prev[value].slots,
        },
      };
    });
  };

  const handleTimeChange = (value, index, field, fieldValue) => {
    setSchedule((prev) => {
      const updatedSlots = [...prev[value].slots];
      updatedSlots[index][field] = fieldValue;
      return {
        ...prev,
        [value]: { ...prev[value], slots: updatedSlots },
      };
    });
  };

  const handleAddSlot = (value) => {
    setSchedule((prev) => ({
      ...prev,
      [value]: {
        ...prev[value],
        slots: [...prev[value].slots, { ...defaultTimeSlot }],
      },
    }));
  };

  const handleRemoveSlot = (value, index) => {
    setSchedule((prev) => {
      const updatedSlots = prev[value].slots.filter((_, i) => i !== index);
      return {
        ...prev,
        [value]: {
          ...prev[value],
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

    for (const [value, { label, slots }] of enabledDays) {
      const seen = new Set();

      for (let i = 0; i < slots.length; i++) {
        const { from, to } = slots[i];

        if (!from || !to) {
          errors.push(
            `${label}: Please enter both "from" and "to" time in slot ${i + 1}`
          );
          continue;
        }

        if (from >= to) {
          errors.push(
            `${label}: "From" time must be earlier than "To" time in slot ${
              i + 1
            } (${formatTime12Hour(from)} - ${formatTime12Hour(to)})`
          );
          continue;
        }

        const slotKey = `${from}-${to}`;
        if (seen.has(slotKey)) {
          errors.push(
            `${label}: Duplicate time slot "${formatTime12Hour(
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

    const payload = enabledDays.map(([value, { slots }]) => ({
      scheduleDay: Number(value),
      slots,
    }));

    BackdropLoaderRef?.handleOpen();
    mutate(payload);
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
          {DAYS.map(({ label, value }) => (
            <Grid size={12} key={value}>
              <Grid container spacing={1}>
                {/* Day Check box */}
                <Grid size={2}>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={schedule[value].enabled}
                      onChange={() => handleToggleDay(value)}
                      sx={{
                        "&.Mui-checked": {
                          color: schedule[value].enabled && colors.primaryColor,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: schedule[value].enabled
                          ? "black"
                          : colors.textMutedColor,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                </Grid>

                {/* Time slot */}
                <Grid size={9}>
                  {schedule[value].enabled ? (
                    schedule[value].slots.map((slot, index) => (
                      <TimeSlot
                        key={index}
                        slot={slot}
                        onTimeChange={(field, val) =>
                          handleTimeChange(value, index, field, val)
                        }
                        onRemove={
                          schedule[value].slots.length > 1
                            ? () => handleRemoveSlot(value, index)
                            : null
                        }
                      />
                    ))
                  ) : (
                    <Typography
                      color={colors.textMutedColor}
                      sx={{ mt: 1, ml: 4 }}
                    >
                      Unavailable
                    </Typography>
                  )}
                </Grid>

                {/* Add Button */}
                {schedule[value].enabled && (
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
                        onClick={() => handleAddSlot(value)}
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
        <Grid size={12} display="flex" justifyContent="flex-end">
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
