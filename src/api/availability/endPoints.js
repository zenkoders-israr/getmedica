import {BACKEND_API_URL} from "../../utils/constant"

export const AvailabilityEndPoints = {
    SET_AVAILABILITY: `${BACKEND_API_URL}/api/scheduler/create`,
    GET_AVAILABILITY: (doctor_id = null) => {
        return `${BACKEND_API_URL}/api/scheduler${doctor_id ? `/${doctor_id}` : ""}`
    },
}