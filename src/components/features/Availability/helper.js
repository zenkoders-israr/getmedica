import moment from "moment";
export const formatTime12Hour = (time) => moment(time, "HH:mm").format("hh:mm A");
