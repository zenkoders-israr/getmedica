import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AuthEndPoint } from "./endPoints";
import { BackdropLoaderRef } from "../../components/controls/BackdropLoader";
import { USER_ROLES } from "../../utils/constant";

export const useSignup = ({ onSuccess = () => {}, onError = () => {}, onSettled = () => {} }) => {
  return useMutation({
    mutationFn: async ({role, ...newUser}) => {
      const endPoint = role == USER_ROLES.DOCTOR ? AuthEndPoint.DOCTOR_SIGNUP : AuthEndPoint.PATIENT_SIGNUP;
      const res = await axiosInstance.post(endPoint, newUser);
      return res.data;
    },
    onMutate: () => {
      BackdropLoaderRef?.handleOpen();
    },

    onSuccess: () => onSuccess(),
    onError: (error) => {
      BackdropLoaderRef?.handleClose();
      onError(error);
    },
    onSettled: () => {
      onSettled();
      BackdropLoaderRef?.handleClose();
    },
  });
};

export const useLogin = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: async (credentials) => {
      const res = await axiosInstance.post(AuthEndPoint.SIGNIN, credentials);
      return res.data;
    },
    onMutate: () => {
      BackdropLoaderRef?.handleOpen();
    },
    onSuccess: (data) => {
      onSuccess(data?.data);
    },
    onError: (error) => {
      onError(error);
      BackdropLoaderRef?.handleClose();
    },
    onSettled: () => {
      onSettled();
      BackdropLoaderRef?.handleClose();
    },
  });
};
