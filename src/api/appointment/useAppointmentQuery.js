import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AppointmentEndPoints } from "./endPoints";
import { AppointmentQueryKeys } from "./queryKeys";
import { ToastRef } from "../../components/controls/Toast";
import { getErrorMessage } from "../../utils/helper";

export const useGetAppointment = (id) => {
    return useQuery({
        queryKey: [AppointmentQueryKeys.GET_APPOINTMENT, id],
        queryFn: () => axiosInstance.get(AppointmentEndPoints.GET_APPOINTMENT(id)),
        enabled: !!id,
        staleTime: 0,
        select: (data) => data.data,
        onError: (error) => {
            ToastRef.showSnackbar(getErrorMessage(error), "error")
        }
    
    })
}