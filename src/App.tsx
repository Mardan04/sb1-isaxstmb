import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem('currency');
    return savedCurrency || 'RUB';
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString(),
      completed: false,
      currency: currency
    };
    setOrders([...orders, newOrder]);
  };

  const completeOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, completed: true, dateCompleted: new Date().toISOString() } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard orders={orders} currency={currency} onCurrencyChange={setCurrency} />} />
            <Route path="/new-order" element={<NewOrder addOrder={addOrder} currency={currency} />} />
            <Route path="/orders" element={<Orders orders={orders} completeOrder={completeOrder} deleteOrder={deleteOrder} currency={currency} />} />
            <Route path="/orders/:id" element={<OrderDetails orders={orders} completeOrder={completeOrder} deleteOrder={deleteOrder} currency={currency} />} />
            <Route path="/settings" element={<Settings currency={currency} onCurrencyChange={setCurrency} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;