import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios";
import { IDType, RegisteredPeople, RegisteredPerson } from "../../types/validation-types";
import { AxiosError } from "axios";

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
