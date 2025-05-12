import {BACKEND_API_URL} from "../../utils/constant"

export const AuthEndPoint = {
    DOCTOR_SIGNUP: `${BACKEND_API_URL}/api/auth/register-doctor`,
    PATIENT_SIGNUP: `${BACKEND_API_URL}/api/auth/register-patient`,
    SIGNIN: `${BACKEND_API_URL}/api/auth/login`,
}