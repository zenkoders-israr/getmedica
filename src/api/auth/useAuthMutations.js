import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../interceptor";
import { AuthEndPoint } from "./endPoints";
import { Loader } from "../../components/controls";

export const useSignup = ({ onSuccess = () => {}, onError = () => {} }) => {
  return useMutation({
    mutationFn: async (newUser) => {
      const res = await axiosInstance.post(AuthEndPoint.SIGNUP, newUser);
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
      Loader?.handleOpen();
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
    onSettled: () => {
      onSettled();
      Loader?.handleClose();
    },
  });
};
