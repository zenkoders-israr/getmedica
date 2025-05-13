import moment from "moment";

export const getDayNumberFromDate = (date) => {
  return moment(date).format("DD");
};

export const mergeBookingSlots = (slotsArray) => {
  return slotsArray.flatMap((slot) => slot.bookingSlots);
};
