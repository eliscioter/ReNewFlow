import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm, initial_state } from "../../types/validation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../validations/schema/register";
import { toast } from "sonner";
import { useMultiStepForm } from "../../hooks/multistep-form";
import BasicDetails from "./includes/BasicDetails";
import Upload from "./includes/Upload";
import ConsentRegister from "./includes/Consent";
import { useState } from "react";
import { Register } from "@tanstack/react-query";
import { useSubmitRegistration } from "../../services/api/register";


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

  const submit_registration = useSubmitRegistration();

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
        !((Array.isArray(value) && value.length === 0) || (typeof value === 'string' && value === ''))
      ) {
        form_data.append(key, value as string);
      }
    });
    
    submit_registration.mutateAsync(form_data);
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
