import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AppointmentEndPoints } from "./endPoints";
import { BackdropLoaderRef } from "../../components/controls/BackdropLoader";

export const useSetAppointment = ({ onSuccess = () => {}, onError = () => {} }) => {
    return useMutation({
      mutationFn: async (payload) => {
        const res = await axiosInstance.post(AppointmentEndPoints.SET_APPOINTMENT, payload);
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