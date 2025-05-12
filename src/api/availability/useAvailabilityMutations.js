import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AvailabilityEndPoints } from "./endPoints";
import { BackdropLoaderRef } from "../../components/controls/BackdropLoader";
import { AVAILABILITY_KEYS } from "./queryKeys";
export const useSetAvailability = ({ onSuccess = () => {}, onError = () => {}, onSettled = () => {} }) => {
    return useMutation({
      mutationKey: [AVAILABILITY_KEYS.SET_AVAILABILITY],
      mutationFn: async (payload) => {
        const res = await axiosInstance.put(AvailabilityEndPoints.SET_AVAILABILITY, payload);
        return res.data;
      },
      onMutate: () => {
        BackdropLoaderRef?.handleOpen();
      },
  
      onSuccess: () => onSuccess(),
      onError: (error) => onError(error),
      onSettled: () => {
        onSettled();
        BackdropLoaderRef?.handleClose();
      },
    });
  };