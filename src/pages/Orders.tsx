import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import MobileNavbar from '../components/MobileNavbar';

interface Order {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  amount: number;
  notes: string;
  dateCreated: string;
  dateCompleted?: string;
  completed: boolean;
}

interface OrdersProps {
  orders: Order[];
  completeOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ orders, completeOrder, deleteOrder }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    // Apply status filter
    if (filter === 'pending') {
      result = result.filter(order => !order.completed);
    } else if (filter === 'completed') {
      result = result.filter(order => order.completed);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.clientName.toLowerCase().includes(query) ||
        order.service.toLowerCase().includes(query) ||
        order.phone.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (newest first)
    return result.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  }, [orders, filter, searchQuery]);

  return (
    <div className="fade-in">
      <MobileNavbar />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-600">Все заказы</h1>
        <p className="text-gray-600 mt-1">Управление всеми вашими заказами</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="md:w-1/3">
              <input
                type="text"
                placeholder="Поиск по имени, услуге..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'pending' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                В работе
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'completed' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Выполненные
              </button>
            </div>
          </div>
        </div>
        
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Услуга
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Аванс (50%)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.clientName}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.service}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount.toLocaleString()} ₽
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(order.amount * 0.5).toLocaleString()} ₽
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(order.dateCreated), 'dd.MM.yyyy')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`py-1 px-2 rounded-full text-xs font-medium ${
                        order.completed ? 'status-completed' : 'status-pending'
                      }`}>
                        {order.completed ? 'Выполнен' : 'В работе'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/orders/${order.id}`}
                          className="text-red-600 hover:text-red-900"
                          title="Просмотр"
                        >
                          <Eye size={18} />
                        </Link>
                        
                        {!order.completed && (
                          <button
                            onClick={() => completeOrder(order.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Отметить как выполненный"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        
                        <button
                          onClick={() => {
                            if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Удалить"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            {searchQuery ? 'Нет заказов, соответствующих вашему поиску' : 'Нет заказов для отображения'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;