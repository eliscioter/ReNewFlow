import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../../config/axios";
import {
  RegisteredPeople,
  IDType,
  RegisteredPerson,
  GenderDemographics,
  RenewedDemographics,
} from "../../types/validation-types";

export const useRegisteredPeople = () =>
  useQuery<RegisteredPeople, AxiosError>({
    queryKey: ["registered-data"],
    queryFn: async () => (await api.get(`/demographics/fetch/registered`)).data,
  });
export const useRenewalPeople = () =>
  useQuery<RegisteredPeople, AxiosError>({
    queryKey: ["renewal-data"],
    queryFn: async () => (await api.get(`/demographics/fetch/renewal`)).data,
  });

export const useRegisteredPersonData = (id: IDType) =>
  useQuery<RegisteredPerson, AxiosError>({
    queryKey: ["registered-person-data", id],
    queryFn: async () =>
      (await api.get(`/demographics/fetch/submitted/${id}`)).data,
  });

export const useGenderDemographics = () =>
  useQuery<GenderDemographics, AxiosError>({
    queryKey: ["gender-demographics"],
    queryFn: async () => (await api.get(`/demographics/fetch/gender-count`)).data,
  });
export const useAllRenewedDemographics = () =>
  useQuery<RenewedDemographics, AxiosError>({
    queryKey: ["all-renewed-demographics"],
    queryFn: async () => (await api.get(`/demographics/fetch/all-renewal-count`)).data,
  });
export const useRenewedDemographics = () =>
  useQuery<RenewedDemographics, AxiosError>({
    queryKey: ["renewed-demographics"],
    queryFn: async () => (await api.get(`/demographics/fetch/renewal-count`)).data,
  });
export const useRegisteredDemographics = () =>
  useQuery<RenewedDemographics, AxiosError>({
    queryKey: ["registered-demographics"],
    queryFn: async () => (await api.get(`/demographics/fetch/register-count`)).data,
  });
