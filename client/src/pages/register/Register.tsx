import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm } from "../../types/validation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../validations/schema/register";
import { toast } from "sonner";
import { useMultiStepForm } from "../../hooks/multistep-form";
import BasicDetails from "./includes/BasicDetails";
import Upload from "./includes/Upload";
import ConsentRegister from "./includes/Consent";
import { useState } from "react";
import { Register } from "@tanstack/react-query";

interface CustomFile extends File {
    file: File | null;
    name: string;
    size: number;
    type: string;
}

const initial_state: RegisterForm = {
  lastName: "",
  firstName: "",
  middleName: "",
  zipCode: "",
  address: "",
  birthPlace: "",
  mobileNumber: "",
  gender: "MALE",
  type: "CCPE",
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
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const [data, setData] = useState<RegisterForm>(initial_state);

  const updateData = (data: Partial<RegisterForm>) =>
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
      />,
      <ConsentRegister
        {...data}
        register={register}
        errors={errors}
        setValue={setValue}
        updateData={updateData}
      />,
    ]);

  const handleSubmitRegistration: SubmitHandler<RegisterForm> = (data) => {
    console.log(data);
    toast.success("Successfully submitted form");
  };

  const handleError: SubmitErrorHandler<RegisterForm> = (errors) => {
    if (!is_last_step) return nextStep();

    console.log(errors);
    toast.error("Error in submitting form");
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleSubmitRegistration, handleError)}
      >
        {step}
        {!is_first_step && (
          <button className="btn bg-secondary" type="button" onClick={prevStep}>
            Back
          </button>
        )}
        <button className="btn bg-primary" type="submit">
          {is_last_step ? "Submit" : "Next"}
        </button>
      </form>
    </>
  );
}
