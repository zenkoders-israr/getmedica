import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AppointmentEndPoints } from "./endPoints";
import { AppointmentQueryKeys } from "./queryKeys";
import { ToastRef } from "../../components/controls/Toast";
import { getErrorMessage } from "../../utils/helper";

export const useGetAppointment = (id) => {
  return useQuery({
    queryKey: [AppointmentQueryKeys.GET_APPOINTMENT, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          AppointmentEndPoints.GET_APPOINTMENT(id)
        );
        return response;
      } catch (error) {
        ToastRef.showSnackbar(getErrorMessage(error), "error");
      }
    },
    enabled: !!id,
    staleTime: 0,
    select: (data) => data.data,
  });
};
