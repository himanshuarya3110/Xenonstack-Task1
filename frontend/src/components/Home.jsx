import React, { useEffect, useState } from "react";
import { getUserInfo, isLoggedIn } from "../utils/auth/getUserInfo";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Properties from "./Properties";
import Recommendations from "./Reccomendation";
import Header from "./Header";
import { useTheme } from './ThemeContext';

function Home() {
  const login = isLoggedIn();
  const navigate = useNavigate();

  const { isDarkMode } = useTheme();

  if (!login) navigate("/login");

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'}`}>
      <Header />
      <Recommendations />
      <Properties />
    </div>
  );
}

export default Home;
