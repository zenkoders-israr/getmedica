import { BACKEND_API_URL } from "../../utils/constant";

export const AppointmentEndPoints = {
    SET_APPOINTMENT: `${BACKEND_API_URL}/api/booking/book-slot`,
    GET_APPOINTMENT: (id) => `${BACKEND_API_URL}/api/get-appointment/${id}`,
}