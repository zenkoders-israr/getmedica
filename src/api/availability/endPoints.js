import {BACKEND_API_URL} from "../../utils/constant"

export const AvailabilityEndPoints = {
    SET_AVAILABILITY: `${BACKEND_API_URL}/api/set-availability`,
    GET_AVAILABILITY: (id) => `${BACKEND_API_URL}/api/get-availability/${id}`,
}