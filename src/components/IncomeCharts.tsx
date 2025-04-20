import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfDay, startOfMonth, startOfYear, eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, subDays, subMonths, subYears } from 'date-fns';

interface Order {
  dateCreated: string;
  amount: number;
  completed: boolean;
}

interface IncomeChartsProps {
  orders: Order[];
  currency: string;
}

const IncomeCharts: React.FC<IncomeChartsProps> = ({ orders, currency }) => {
  const currencySymbol = { 'RUB': '₽', 'USD': '$', 'KZT': '₸' }[currency];

  const dailyData = useMemo(() => {
    const last30Days = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date()
    });

    return last30Days.map(date => {
      const dayStart = startOfDay(date);
      const dayIncome = orders
        .filter(order => order.completed && new Date(order.dateCreated) >= dayStart && new Date(order.dateCreated) < new Date(dayStart.getTime() + 86400000))
        .reduce((sum, order) => sum + order.amount, 0);

      return {
        date: format(date, 'dd.MM'),
        income: dayIncome
      };
    });
  }, [orders]);

  const monthlyData = useMemo(() => {
    const last12Months = eachMonthOfInterval({
      start: subMonths(new Date(), 11),
      end: new Date()
    });

    return last12Months.map(date => {
      const monthStart = startOfMonth(date);
      const monthIncome = orders
        .filter(order => order.completed && new Date(order.dateCreated) >= monthStart && new Date(order.dateCreated) < new Date(monthStart.getTime() + 2678400000))
        .reduce((sum, order) => sum + order.amount, 0);

      return {
        date: format(date, 'MM.yyyy'),
        income: monthIncome
      };
    });
  }, [orders]);

  const yearlyData = useMemo(() => {
    const last5Years = eachYearOfInterval({
      start: subYears(new Date(), 4),
      end: new Date()
    });

    return last5Years.map(date => {
      const yearStart = startOfYear(date);
      const yearIncome = orders
        .filter(order => order.completed && new Date(order.dateCreated) >= yearStart && new Date(order.dateCreated) < new Date(yearStart.getTime() + 31536000000))
        .reduce((sum, order) => sum + order.amount, 0);

      return {
        date: format(date, 'yyyy'),
        income: yearIncome
      };
    });
  }, [orders]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-xl">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-sm font-semibold text-gray-900">
            {payload[0].value.toLocaleString()} {currencySymbol}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Доход за последние 30 дней</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4B4B" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF4B4B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#FF4B4B" 
                fill="url(#colorIncome)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Доход по месяцам</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4B4B" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF4B4B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#FF4B4B" 
                fill="url(#colorMonthly)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Годовой доход</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyData}>
              <defs>
                <linearGradient id="colorYearly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4B4B" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF4B4B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#FF4B4B" 
                fill="url(#colorYearly)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IncomeCharts;