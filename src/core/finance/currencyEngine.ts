export type SupportedCurrency = 'NGN' | 'USD' | 'EUR' | 'GBP';

export interface ExchangeRates {
  NGN: number; // Base 1 NGN = 1
  USD: number; // 1 NGN in USD
  EUR: number; // 1 NGN in EUR
  GBP: number; // 1 NGN in GBP
}

// Default Exchange Rates (1 USD = ~1500 NGN, 1 EUR = ~1650 NGN, 1 GBP = ~1950 NGN)
export const DEFAULT_RATES: ExchangeRates = {
  NGN: 1,
  USD: 1 / 1500,
  EUR: 1 / 1650,
  GBP: 1 / 1950,
};

export class CurrencyEngine {
  static convert(amountNgn: number, targetCurrency: SupportedCurrency): number {
    const rate = DEFAULT_RATES[targetCurrency] || 1;
    return Math.round(amountNgn * rate * 100) / 100;
  }

  static format(amount: number, currency: SupportedCurrency): string {
    const symbols: Record<SupportedCurrency, string> = {
      NGN: '₦',
      USD: '$',
      EUR: '€',
      GBP: '£',
    };

    const symbol = symbols[currency] || '₦';
    return `${symbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
