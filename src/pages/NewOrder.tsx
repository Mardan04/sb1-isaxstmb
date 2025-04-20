import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNavbar from '../components/MobileNavbar';
import Calculator from '../components/Calculator';

interface NewOrderProps {
  addOrder: (order: {
    clientName: string;
    phone: string;
    service: string;
    amount: number;
    notes: string;
  }) => void;
  currency: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ addOrder, currency }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    service: '',
    amount: '',
    notes: ''
  });

  const services = JSON.parse(localStorage.getItem('services') || '[]');
  const defaultServices = [
    'Ремонт кухни',
    'Ремонт ванной',
    'Полный ремонт',
    'Косметический ремонт',
    'Монтаж электрики',
    'Монтаж сантехники'
  ];

  const availableServices = services.length > 0 ? services : defaultServices;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addOrder({
      clientName: formData.clientName,
      phone: formData.phone,
      service: formData.service,
      amount: parseFloat(formData.amount),
      notes: formData.notes
    });

    navigate('/orders');
  };

  const advancePayment = formData.amount ? parseFloat(formData.amount) * 0.5 : 0;
  const currencySymbol = { 'RUB': '₽', 'USD': '$', 'KZT': '₸' }[currency];

  return (
    <div className="fade-in">
      <MobileNavbar />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-600">Новый заказ</h1>
        <p className="text-gray-600 mt-1">Создайте новую запись о заказе</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-red-600 mb-1">
                    Имя клиента *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-textMain/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-red-600 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-textMain/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-red-600 mb-1">
                    Услуга *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-red-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Выберите услугу</option>
                    {availableServices.map((service: string, index: number) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-red-600 mb-1">
                    Сумма ({currencySymbol}) *
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    required
                    min="0"
                    step="100"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-red-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {formData.amount && (
                <div className="mt-4 p-3 bg-primary/10 rounded-xl border border-red-200">
                  <p className="text-primary font-medium">Аванс (50%): {advancePayment.toLocaleString()} {currencySymbol}</p>
                  <p className="text-red-600 font-medium">Оставшаяся сумма: {advancePayment.toLocaleString()} {currencySymbol}</p>
                </div>
              )}

              <div className="mt-4">
                <label htmlFor="notes" className="block text-sm font-medium text-red-600 mb-1">
                  Заметки
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-textMain/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mr-4 px-4 py-2 border border-textMain/20 rounded-xl text-textMain hover:bg-textMain/5"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2  border border-red-600 text-textMain rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Создать заказ
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Калькулятор</h2>
          <Calculator />
        </div>
      </div>
    </div>
  );
};

export default NewOrder;