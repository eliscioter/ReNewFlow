import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import {
  CustomFile,
  RegisterForm,
  RenewForm,
} from "../../types/validation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../validations/schema/register";
import { toast } from "sonner";
import { useMultiStepForm } from "../../hooks/multistep-form";
import BasicDetails from "./includes/BasicDetails";
import Upload from "./includes/Upload";
import ConsentRegister from "./includes/Consent";
import { useState } from "react";
import { Register } from "@tanstack/react-query";
import {
  useSubmitRegistration,
  useSubmitRenewal,
} from "../../services/api/register";
import { useLocation } from "react-router-dom";
import "./Register.css";
import { RenewalSchema } from "../../validations/schema/renewal";

const initial_state: RegisterForm | RenewForm = {
  lastName: "",
  firstName: "",
  middleName: "",
  zipCode: "",
  address: "",
  birthPlace: "",
  mobileNumber: "",
  gender: "MALE",
  type: null,
  typeNo: "",
  amountPaid: 0,
  dateIdValidity: new Date(),
  transactionDetails: "",
  region: "",
  batchNo: "Batch 1",
  submittedAt: new Date(),
  picture: {
    file: null,
    name: "",
    size: 0,
    type: "",
  } as CustomFile,
  receipt: {
    file: null,
    name: "",
    size: 0,
    type: "",
  } as CustomFile,
  signature: {
    file: null,
    name: "",
    size: 0,
    type: "",
  } as CustomFile,

  regionalCert: [] as CustomFile[],
  nationalCert: [] as CustomFile[],
};

export default function Register() {
  const { pathname } = useLocation();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    resetField
  } = useForm<RegisterForm | RenewForm>({
    resolver: zodResolver(
      pathname === "/renewal" ? RenewalSchema : RegisterSchema
    ),
  });

  const [data, setData] = useState<RegisterForm | RenewForm>(initial_state);

  const submit_registration = useSubmitRegistration();
  const submit_renewal = useSubmitRenewal();

  const updateData = (data: Partial<RegisterForm | RenewForm>) =>
    setData((prev) => ({ ...prev, ...data }));

  const { step, is_first_step, is_last_step, nextStep, prevStep } =
    useMultiStepForm([
      <BasicDetails
        {...data}
        register={register}
        errors={errors}
        setValue={setValue}
        updateData={updateData}
      />,
      <Upload
        {...data}
        register={register}
        errors={errors}
        setValue={setValue}
        updateData={updateData}
        resetField={resetField}
        pathname={pathname}
      />,
      <ConsentRegister
        {...data}
        register={register}
        errors={errors}
        setValue={setValue}
        updateData={updateData}
        pathname={pathname}
      />,
    ]);

  const handleSubmitRegistration: SubmitHandler<RegisterForm | RenewForm> = (data) => {
    const form_data = new FormData();

    form_data.append("picture", data.picture as Blob);
    form_data.append("receipt", data.receipt as Blob);
    form_data.append("signature", data.signature as Blob);
    data.regionalCert.forEach((file) =>
      form_data.append("regionalCert", file as Blob)
    );
    data.nationalCert.forEach((file) =>
      form_data.append("nationalCert", file as Blob)
    );

    Object.entries(data).forEach(([key, value]) => {
      if (
        ![
          "picture",
          "receipt",
          "signature",
          "regionalCert",
          "nationalCert",
        ].includes(key) &&
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "string" && value === "")
        )
      ) {
        form_data.append(key, value as string);
      }
    });

    pathname === "/renewal"
      ? submit_renewal.mutateAsync(form_data)
      : submit_registration.mutateAsync(form_data);
  };

  const handleError: SubmitErrorHandler<RegisterForm | RenewForm> = (errors) => {
    if (!is_last_step) return nextStep();

    console.log(errors);
    toast.error("Error in submitting form");
  };

  return (
    <>
      <div className="parent-bg vh-100 p-5">
        <div className="container bg-light border rounded-4 p-3">
          <h4>{pathname === "/renewal" ? "Renewal Form" : "Register Form"}</h4>
          <div className="container">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(handleSubmitRegistration, handleError)}
            >
              {step}
              <div
                className={
                  is_first_step ? "" : "d-flex justify-content-between"
                }
              >
                {!is_first_step && (
                  <div className="text-start mt-3">
                    <button
                      className="btn border back-btn fw-bold"
                      type="button"
                      onClick={prevStep}
                    >
                      Back
                    </button>
                  </div>
                )}
                <div className="text-end mt-3">
                  <button
                    className="btn border next-btn text-white fw-bold"
                    type="submit"
                  >
                    {is_last_step ? "Submit" : "Next"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
