import React from 'react';

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onCurrencyChange }) => {
  const currencies = [
    { code: 'RUB', symbol: '₽', name: 'Рубль' },
    { code: 'KZT', symbol: '₸', name: 'Тенге' },
    { code: 'USD', symbol: '$', name: 'Доллар' }
  ];

  return (
    <select
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="px-4 py-2 border border-red-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
    >
      {currencies.map(curr => (
        <option key={curr.code} value={curr.code} className="text-textMain">
          {curr.code} ({curr.symbol}) - {curr.name}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;