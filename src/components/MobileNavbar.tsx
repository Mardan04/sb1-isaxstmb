import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, List, Settings, Menu, X } from 'lucide-react';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <div className="glass-card stats-card p-6 rounded-2xl text-gray-600 p-4 flex justify-between items-center rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">Система Заказов</h1>
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-primary/20 rounded-lg transition duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="bg-white h-full w-64 p-4 shadow-xl transform transition-transform duration-200 ease-in-out rounded-lg">
            <nav>
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) =>
                      `flex items-center space-x-3 p-3 rounded-xl transition duration-200 ${
                        isActive ? 'bg-[#FF3D3D] text-white' : 'text-textMain hover:bg-primary/10'
                      }`
                    }
                    onClick={toggleMenu}
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
                        isActive ? 'bg-[#FF3D3D] text-white' : 'text-textMain hover:bg-primary/10'
                      }`
                    }
                    onClick={toggleMenu}
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
                        isActive ? 'bg-[#FF3D3D] text-white' : 'text-textMain hover:bg-primary/10'
                      }`
                    }
                    onClick={toggleMenu}
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
                        isActive ? 'bg-[#FF3D3D] text-white' : 'text-textMain hover:bg-primary/10'
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    <Settings size={20} />
                    <span>Настройки</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;