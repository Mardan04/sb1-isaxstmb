import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight, TrendingUp, Users, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MobileNavbar from '../components/MobileNavbar';
import IncomeCharts from '../components/IncomeCharts';

interface Order {
  id: string;
  clientName: string;
  service: string;
  amount: number;
  dateCreated: string;
  dateCompleted?: string;
  completed: boolean;
  currency: string;
}

interface DashboardProps {
  orders: Order[];
  currency: string;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, currency }) => {
  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyOrders = orders.filter(order => {
      const orderDate = new Date(order.dateCreated);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    const completedMonthlyOrders = monthlyOrders.filter(order => order.completed);
    const totalEarnings = monthlyOrders.reduce((sum, order) => sum + order.amount, 0);
    const completedEarnings = completedMonthlyOrders.reduce((sum, order) => sum + order.amount, 0);
    const pendingOrders = orders.filter(order => !order.completed);

    return {
      totalMonthlyOrders: monthlyOrders.length,
      completedMonthlyOrders: completedMonthlyOrders.length,
      totalEarnings,
      completedEarnings,
      pendingOrders: pendingOrders.length
    };
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
      .slice(0, 5);
  }, [orders]);

  const currencySymbol = {
    RUB: '₽',
    USD: '$',
    KZT: '₸'
  }[currency];

  return (
    <div className="fade-in p-4 md:p-6">
      <MobileNavbar />
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-600 mb-2">Панель управления</h1>
        <p className="text-gray-600">Обзор ваших заказов и статистики</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card stats-card p-6 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-2">Заказы за месяц</p>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalMonthlyOrders}</h3>
              <p className="text-green-600 text-sm mt-2">
                Выполнено: {stats.completedMonthlyOrders}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="glass-card stats-card p-6 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-2">Доход за месяц</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.totalEarnings.toLocaleString()} {currencySymbol}
              </h3>
              <p className="text-green-600 text-sm mt-2">
                Получено: {stats.completedEarnings.toLocaleString()} {currencySymbol}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="glass-card stats-card p-6 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-2">В ожидании</p>
              <h3 className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</h3>
              <p className="text-orange-600 text-sm mt-2">Незавершенных заказов</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="glass-card stats-card p-6 rounded-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 mb-2">Быстрые действия</p>
              <h3 className="text-xl font-semibold text-gray-900">Создать заказ</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <PlusCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <Link
            to="/new-order"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-xl inline-flex items-center justify-center hover:from-red-600 hover:to-red-700 transition duration-200"
          >
            <PlusCircle size={18} className="mr-2" />
            <span>Новый заказ</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Последние заказы</h2>
              <Link 
                to="/orders" 
                className="flex items-center text-red-600 hover:text-red-700 transition-colors"
              >
                <span className="mr-2">Посмотреть все</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              {recentOrders.length > 0 ? (
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th className="rounded-tl-xl">Клиент</th>
                      <th>Услуга</th>
                      <th>Сумма</th>
                      <th>Дата</th>
                      <th className="rounded-tr-xl">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.clientName}</td>
                        <td>{order.service}</td>
                        <td>{order.amount.toLocaleString()} {currencySymbol}</td>
                        <td>{format(new Date(order.dateCreated), 'dd.MM.yyyy')}</td>
                        <td>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            order.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {order.completed ? 'Выполнен' : 'В работе'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">Нет заказов для отображения</p>
                  <p className="text-sm mt-2">Создайте новый заказ, чтобы начать</p>
                </div>
              )}
            </div>
          </div>

          <IncomeCharts orders={orders} currency={currency} />
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Календарь</h2>
              <div className="p-2 bg-red-100 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <Calendar className="w-full" value={new Date()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;