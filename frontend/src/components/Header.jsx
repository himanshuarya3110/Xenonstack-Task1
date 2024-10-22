import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from 'antd';
import { loggedOut } from '../utils/auth/getUserInfo';
import { useTheme } from './ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const navigate = useNavigate()
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
const handleLogout =()=>{
loggedOut();
navigate("/login")
}


  return (
    <div className="p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-600 flex justify-between items-center mb-8 bg-white p-4 shadow-md">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Estay Properties</h1>
      <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-md focus:outline-none bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white transition duration-300"
            >
                Toggle Theme
            </button>
      <div className="relative">
        <FaUserCircle 
          size={36} 
          className="text-gray-700 hover:text-gray-900 cursor-pointer" 
          onClick={handleDropdownToggle}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
            <p onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
