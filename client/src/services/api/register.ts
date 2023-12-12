import { useMutation } from "@tanstack/react-query";
import api from "../../config/axios";
import { AxiosError } from "axios";
import { queryClient } from "../../config/query-client";
import { toast } from "sonner";



export const useSubmitRegistration = () =>
  useMutation<FormData & RequestError, AxiosError, FormData>({
    mutationFn: async (data) =>
      (
        await api.post(`/register/submit`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submitted-data"] });
      toast.success("Registration submitted successfully!");
    },
    onError: (error) => {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage || `Something went wrong`);
    },
  });
export const useSubmitRenewal = () =>
  useMutation<FormData & RequestError, AxiosError, FormData>({
    mutationFn: async (data) =>
      (
        await api.post(`/register/submit-renewal`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submitted-data"] });
      toast.success("Renewal submitted successfully!");
    },
    onError: (error) => {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      toast.error(errorMessage || `Something went wrong`);
    },
  });
