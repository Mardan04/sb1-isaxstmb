import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, List, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="modern-sidebar bg-primary text-gray-600 w-64 p-6 hidden md:flex md:flex-col rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Система Заказов</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Home size={20} />
              <span>Главная</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/new-order" 
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <PlusCircle size={20} />
              <span>Новый заказ</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/orders" 
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <List size={20} />
              <span>Все заказы</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Settings size={20} />
              <span>Настройки</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;