import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AvailabilityEndPoints } from "./endPoints";
import { AVAILABILITY_KEYS } from "./queryKeys";
import { ToastRef } from "../../components/controls/Toast";
import { getErrorMessage } from "../../utils/helper";
import { BackdropLoaderRef } from "../../components/controls/BackdropLoader";

export const useGetAvailability = (id = null) => {
  return useQuery({
    queryKey: [AVAILABILITY_KEYS.GET_AVAILABILITY, id],
    queryFn: async () => {
      try {
        BackdropLoaderRef?.handleOpen();
        const response = await axiosInstance.get(
          AvailabilityEndPoints.GET_AVAILABILITY(id)
        );
        return response;
      } catch (error) {
        ToastRef.showSnackbar(getErrorMessage(error), "error");
      } finally {
        BackdropLoaderRef?.handleClose();
      }
    },
    staleTime: 0,
    select: (data) => {
      return data?.data?.data;
    },
  });
};
