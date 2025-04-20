import React, { useState } from 'react';
import MobileNavbar from '../components/MobileNavbar';
import CurrencySelector from '../components/CurrencySelector';

interface SettingsProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ currency, onCurrencyChange }) => {
  const [companyName, setCompanyName] = useState(() => localStorage.getItem('companyName') || '');
  const [phone, setPhone] = useState(() => localStorage.getItem('companyPhone') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('companyEmail') || '');
  const [advancePayment, setAdvancePayment] = useState(() => localStorage.getItem('advancePayment') || '50');
  const [services, setServices] = useState<string[]>(() => {
    const savedServices = localStorage.getItem('services');
    return savedServices ? JSON.parse(savedServices) : [
      'Ремонт кухни',
      'Ремонт ванной',
      'Полный ремонт',
      'Косметический ремонт',
      'Монтаж электрики',
      'Монтаж сантехники'
    ];
  });
  const [newService, setNewService] = useState('');

  const handleAddService = () => {
    if (newService.trim()) {
      const updatedServices = [...services, newService.trim()];
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
      setNewService('');
    }
  };

  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('companyPhone', phone);
    localStorage.setItem('companyEmail', email);
    localStorage.setItem('advancePayment', advancePayment);
    localStorage.setItem('services', JSON.stringify(services));
    
    alert('Настройки успешно сохранены!');
  };

  return (
    <div className="fade-in">
      <MobileNavbar />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-600">Настройки</h1>
        <p className="text-gray-600 mt-1">Управление настройками вашей системы заказов</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-6">Общие настройки</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Название компании
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="Название вашей компании"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Размер аванса (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={advancePayment}
                  onChange={(e) => setAdvancePayment(e.target.value)}
                  className="w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-600 mb-1">
                  Валюта
                </label>
                <CurrencySelector currency={currency} onCurrencyChange={onCurrencyChange} />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6">Список услуг</h2> 
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="flex-grow min-w-0 px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="Название услуги"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-[#FF4B4B] text-white rounded-md hover:bg-[#FF3D3D]"
                >
                  Добавить
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-60 border rounded-md">
                <ul className="divide-y divide-gray-200">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-center justify-between p-3 hover:bg-gray-50">
                      <span>{service}</span>
                      <button
                        onClick={() => handleDeleteService(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;