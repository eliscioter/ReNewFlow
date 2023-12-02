import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../config/axios";
import {
  IDType,
  RegisteredPeople,
  RegisteredPerson,
} from "../../types/validation-types";
import { AxiosError } from "axios";
import { queryClient } from "../../config/query-client";
import { toast } from "sonner";

export const useSubmittedData = () =>
  useQuery<RegisteredPeople, AxiosError>({
    queryKey: ["submitted-data"],
    queryFn: async () => (await api.get(`/register/fetch/registered`)).data,
  });

export const useRegisteredPersonData = (id: IDType) =>
  useQuery<RegisteredPerson, AxiosError>({
    queryKey: ["registered-person-data", id],
    queryFn: async () =>
      (await api.get(`/register/fetch/submitted/${id}`)).data,
  });

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
