import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login";
import Register from "./components/register";
import Dashboardroutes from "./components/dashboardroutes";
import ProtectedRoutes from "./components/protectedRoutes";
import Test from "./components/test";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard/*" element={<Dashboardroutes />} />
        </Route>
        <Route path="*" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
