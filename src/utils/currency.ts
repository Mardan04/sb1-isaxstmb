const exchangeRates = {
  RUB: 1,
  KZT: 5.5, // примерный курс: 1 RUB = 5.5 KZT
  USD: 0.011 // примерный курс: 1 RUB = 0.011 USD
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Сначала конвертируем в рубли
  const amountInRUB = fromCurrency === 'RUB' ? amount : amount / exchangeRates[fromCurrency];
  
  // Затем конвертируем в целевую валюту
  return amountInRUB * exchangeRates[toCurrency];
};

export const formatCurrency = (amount: number, currency: string): string => {
  const symbols = {
    RUB: '₽',
    KZT: '₸',
    USD: '$'
  };

  return `${amount.toLocaleString()} ${symbols[currency]}`;
};