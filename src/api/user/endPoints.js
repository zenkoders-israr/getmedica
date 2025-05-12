import {BACKEND_API_URL} from "../../utils/constant"
import { addParam } from "../../utils/helper"

export const UserEndPoints = {
    GET_USER_DETAILS: (user_id = null) => {
        return `${BACKEND_API_URL}/api/user${user_id ? `/user_id=${user_id}` : ""}`
    },

    GET_DOCTORS: (params = {}) => {
        return `${BACKEND_API_URL}/api/user/get-doctors${addParam(params)}`
    }
}