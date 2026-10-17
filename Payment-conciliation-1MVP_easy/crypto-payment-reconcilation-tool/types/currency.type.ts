
// top 7 currencies over the world...
export type FiatCurrenciesOptions = 'USD' | 'EUR' | 'INR' | 'GBP' | 'JPY' | 'CHF' | 'AUD' ;

export const FiatCurrenciesSymbols = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF",
  AUD: "A$",
} as const satisfies Record<FiatCurrenciesOptions, string> ;

export type FiatCurrenciesSymbolOptions = (typeof FiatCurrenciesSymbols)[FiatCurrenciesOptions] ;