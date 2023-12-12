import { IDType } from "../../types/validation-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Auth = {
    userId: Nullable<IDType>;
    setId: (id: IDType) => void;
    removeId: () => void;
}

export const useAuth = create<Auth>()(
    persist(
        (set) => ({
            userId: null,
            setId: (id) => set(() => ({ userId: id })),
            removeId: () => set(() => ({ userId: null })),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)