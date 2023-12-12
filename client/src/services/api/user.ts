import { useMutation } from "@tanstack/react-query";
import { IDType, UserType } from "../../types/validation-types";
import { AxiosError } from "axios";
import api from "../../config/axios";
import { toast } from "sonner";

export const useLogin = () =>
  useMutation<UserType & RequestError, AxiosError, UserType>({
    mutationKey: ["auth-login"],
    mutationFn: async (data) => (await api.post(`/user/login`, data)).data,
    onError: (error) => {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage || `Something went wrong`);
    },
  });

export const useLogout = () =>
  useMutation<UserType & RequestError, AxiosError, { id: IDType }>({
    mutationKey: ["auth-logout"],
    mutationFn: async ({ id }) => (await api.delete(`/user/logout/${id}`)).data,
    onError: (error) => {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage || `Something went wrong`);
    },
  });
