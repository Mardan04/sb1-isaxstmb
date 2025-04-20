import React, { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleNumber = (number: string) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setEquation(display + ' ' + operator + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    const finalEquation = equation + display;
    try {
      // eslint-disable-next-line no-eval
      const result = eval(finalEquation);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Ошибка');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCalculator(!showCalculator)}
        className="p-2 rounded-full hover:bg-muted transition"
        title="Калькулятор"
      >
        <CalculatorIcon size={20} className="text-primary" />
      </button>

      {showCalculator && (
        <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-lg z-50 p-4 w-64">
          <div className="mb-4">
            <div className="bg-red-200 p-2 rounded-lg text-textMain/70 text-right mb-2">
              {equation}
            </div>
            <div className="bg-muted p-2 rounded-lg text-textMain text-right text-xl font-bold">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={handleClear}
              className="col-span-2 p-2 bg-red-200 text-primary rounded-xl hover:bg-red-600 transition"
            >
              C
            </button>
            <button
              onClick={() => handleOperator('/')}
              className="p-2 bg-red-200 rounded-xl hover:bg-red-600 transition"
            >
              /
            </button>
            <button
              onClick={() => handleOperator('*')}
              className="p-2 bg-red-200 rounded-xl hover:bg-red-600 transition"
            >
              ×
            </button>

            {[7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="p-2 bg-muted rounded-xl hover:bg-red-200 transition"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleOperator('-')}
              className="p-2 bg-red-200 rounded-xl hover:bg-red-600 transition"
            >
              -
            </button>

            {[4, 5, 6].map(num => (
              <button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="p-2 bg-muted rounded-xl hover:bg-red-200 transition"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleOperator('+')}
              className="p-2 bg-red-200 rounded-xl hover:bg-red-600 transition"
            >
              +
            </button>

            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="p-2 bg-muted rounded-xl hover:bg-red-200 transition"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleEqual}
              className="row-span-2 p-2 bg-red-200 text-primary rounded-xl hover:bg-red-600 transition"
            >
              =
            </button>

            <button
              onClick={() => handleNumber('0')}
              className="col-span-2 p-2 bg-red-200 rounded-xl hover:bg-red-600 transition"
            >
              0
            </button>
            <button
              onClick={() => handleNumber('.')}
              className="p-2 bg-red-200 rounded-xl hover:bg-red-600 transition"
            >
              .
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;