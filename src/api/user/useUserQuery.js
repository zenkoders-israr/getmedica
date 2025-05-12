import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { UserEndPoints } from "./endPoints";
import { USER_KEYS } from "./queryKeys";
import { ToastRef } from "../../components/controls/Toast";
import { getErrorMessage } from "../../utils/helper";
import { BackdropLoaderRef } from "../../components/controls/BackdropLoader";

export const useGetDoctors = (params = {}) => {
  return useQuery({
    queryKey: [USER_KEYS.GET_DOCTORS, params],
    queryFn: () => {
      BackdropLoaderRef?.handleOpen();
      return axiosInstance.get(UserEndPoints.GET_DOCTORS(params));
    },
    staleTime: 0,
    select: (data) => {
      BackdropLoaderRef?.handleClose();
      return data?.data?.data?.data || [];
    },
    onError: (error) => {
      ToastRef.showSnackbar(getErrorMessage(error), "error");
      BackdropLoaderRef?.handleClose();
    },
  });
};
