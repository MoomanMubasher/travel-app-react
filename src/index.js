 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isLogin =  JSON.parse(localStorage.getItem('islogin')) || false

root.render(
  <PrimeReactProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={isLogin ? <AdminLayout /> : <AuthLayout />} />
      <Route path="/auth/*" element={isLogin ? <AdminLayout /> : <AuthLayout />} />
      <Route path="*" element={isLogin ?  <Navigate to="/admin/index" replace /> : <AuthLayout /> } />
    </Routes>
  </BrowserRouter>
  </PrimeReactProvider>
);
