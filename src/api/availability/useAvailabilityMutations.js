import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AvailabilityEndPoints } from "./endPoints";
import { Loader } from "../../components/controls";

export const useSetAvailability = ({ onSuccess = () => {}, onError = () => {} }) => {
    return useMutation({
      mutationFn: async (payload) => {
        const res = await axiosInstance.post(AvailabilityEndPoints.SET_AVAILABILITY, payload);
        return res.data;
      },
      onMutate: () => {
        Loader?.handleOpen();
      },
  
      onSuccess: () => onSuccess(),
      onError: (error) => onError(error),
      onSettled: () => {
        onSettled();
        Loader?.handleClose();
      },
    });
  };