
// function for converting crypto value in fiat currencies...
import axios from "axios";
import { FiatCurrenciesOptions } from "@/types/currency.type";

export async function ConvertCryptoInFiatCurrency(currencyCode: FiatCurrenciesOptions,cryptoValue: number): Promise<number> {
  if (!Number.isFinite(cryptoValue) || cryptoValue < 0)  throw new Error("Invalid cryptocurrency amount") ;

  const currency = currencyCode.toLowerCase();
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ETH&vs_currencies=ethereum}`);

  if (response.status !== 200) throw new Error("Failed to fetch cryptocurrency price");

  const Data : Record<string, Record<string, number>> = await response.data ;

  const price = Data['ETH']?.[currency];

  if (typeof price !== "number" || !Number.isFinite(price)) throw new Error("Cryptocurrency price unavailable");

  return cryptoValue * price ;
}