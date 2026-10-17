
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FiatCurrenciesOptions,FiatCurrenciesSymbolOptions } from "@/types/currency.type";
import { TimezonesOptions } from "@/types/timezone.type";

interface AppStoreStates {
  preferredCurrency: { code: FiatCurrenciesOptions ; symbol: FiatCurrenciesSymbolOptions };
  preferredTimezone: TimezonesOptions;
  activeNetworkId: string | null;
  setPreferredCurrency: (currency: FiatCurrenciesOptions,symbol: FiatCurrenciesSymbolOptions) => void;
  setPreferredTimezone: (timezone: TimezonesOptions) => void;
  setActiveNetworkId: (networkId: string | null) => void;
}

export const useAppStore = create<AppStoreStates>()(persist((set) => ({
      preferredCurrency: { code: "USD",symbol: "$" },
      preferredTimezone: "UTC",
      activeNetworkId: null,
      setPreferredCurrency: (currency, symbol) => set({ preferredCurrency: { code: currency, symbol } }),
      setPreferredTimezone: (timezone) => set({ preferredTimezone: timezone }),
      setActiveNetworkId: (networkId) => set({ activeNetworkId: networkId }),
    }),
    {
      name: "app-preferences",
    }
  )
);