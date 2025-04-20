import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Trash2 } from 'lucide-react';
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

interface OrderDetailsProps {
  orders: Order[];
  completeOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orders, completeOrder, deleteOrder }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-4 text-textMain">Заказ не найден</h2>
        <p className="mb-4 text-textMain/70">Запрошенный заказ не существует или был удалён.</p>
        <Link to="/orders" className="text-primary hover:underline">Вернуться к заказам</Link>
      </div>
    );
  }

  const handleComplete = () => {
    completeOrder(order.id);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      deleteOrder(order.id);
      navigate('/orders');
    }
  };

  const advancePayment = order.amount * 0.5;

  return (
    <div className="fade-in">
      <MobileNavbar />
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-textMain/10"
        >
          <ArrowLeft size={20} className="text-textMain" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-textMain">Детали заказа</h1>
          <p className="text-textMain/70 mt-1">Просмотр информации о заказе</p>
        </div>
      </div>

      <div className="bg-background rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${
            order.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.completed ? 'Выполнен' : 'В работе'}
          </span>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            {!order.completed && (
              <button
                onClick={handleComplete}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <CheckCircle size={18} className="mr-2" />
                Отметить как выполненный
              </button>
            )}

            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50"
            >
              <Trash2 size={18} className="mr-2" />
              Удалить заказ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-textMain/10 text-textMain">Информация о заказе</h2>
            <div className="space-y-4 text-textMain">
              <div>
                <p className="text-sm text-textMain/60">Услуга</p>
                <p className="font-medium">{order.service}</p>
              </div>
              <div>
                <p className="text-sm text-textMain/60">Дата создания</p>
                <p className="font-medium">{format(new Date(order.dateCreated), 'dd.MM.yyyy')}</p>
              </div>
              {order.completed && order.dateCompleted && (
                <div>
                  <p className="text-sm text-textMain/60">Дата выполнения</p>
                  <p className="font-medium">{format(new Date(order.dateCompleted), 'dd.MM.yyyy')}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-textMain/60">Заметки</p>
                <p className="font-medium whitespace-pre-line">{order.notes || 'Нет заметок'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-textMain/10 text-textMain">Клиент и оплата</h2>
            <div className="space-y-4 text-textMain">
              <div>
                <p className="text-sm text-textMain/60">Имя клиента</p>
                <p className="font-medium">{order.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-textMain/60">Телефон</p>
                <p className="font-medium">{order.phone}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-textMain/10">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-textMain/60">Общая сумма:</p>
                  <p className="font-semibold">{order.amount.toLocaleString()} ₽</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-textMain/60">Аванс (50%):</p>
                  <p className="font-semibold">{advancePayment.toLocaleString()} ₽</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-textMain/60">Остаток:</p>
                  <p className="font-semibold">{advancePayment.toLocaleString()} ₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default OrderDetails;