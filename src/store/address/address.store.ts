import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  //*methods

  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => set({ address }),
    }),
    //* La dirección es PII; sessionStorage evita conservarla después de cerrar la pestaña.
    {
      name: "address-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
