import { createJSONStorage, persist } from "zustand/middleware";
import { RegisterForm } from "../../types/validation-types";
import { create } from "zustand";

type RegisterStore = {
  files: Nullable<
    Pick<RegisterForm, "regionalCert" | "nationalCert" | "picture" | "receipt">
  >;
  setFiles: (
    files: Pick<
      RegisterForm,
      "regionalCert" | "nationalCert" | "picture" | "receipt"
    >
  ) => void;
  removeFiles: () => void;
};

export const useFileStore = create<RegisterStore>()(
  persist(
    (set) => ({
      files: null,
      setFiles: (files) => set({ files }),
      removeFiles: () => set({ files: null }),
    }),
    {
      name: "file-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
