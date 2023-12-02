import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [current_step_index, setCurrentStepIndex] = useState(0);

  const nextStep = () => setCurrentStepIndex(prev_step_index => {
    if(prev_step_index >= steps.length - 1) return prev_step_index
    return current_step_index + 1
  })

  const prevStep = () => setCurrentStepIndex(prev_step_index => {
    if (prev_step_index <= 0) return prev_step_index
    return prev_step_index - 1
  })

  return { 
    step: steps[current_step_index],
    steps,
    is_first_step: current_step_index === 0,
    is_last_step: current_step_index === steps.length - 1,
    nextStep,
    prevStep
  }
}