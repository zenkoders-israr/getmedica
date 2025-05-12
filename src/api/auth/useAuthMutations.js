import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AuthEndPoint } from "./endPoints";
import { BackdropLoaderRef } from "../../components/controls/BackdropLoader";

export const useSignup = ({ onSuccess = () => {}, onError = () => {} }) => {
  return useMutation({
    mutationFn: async (newUser) => {
      const res = await axiosInstance.post(AuthEndPoint.SIGNUP, newUser);
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

export const useLogin = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: async (credentials) => {
      const res = await axios.post(AuthEndPoint.SIGNIN, credentials);
      return res.data;
    },
    onMutate: () => {
      BackdropLoaderRef?.handleOpen();
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
    onSettled: () => {
      onSettled();
      BackdropLoaderRef?.handleClose();
    },
  });
};
