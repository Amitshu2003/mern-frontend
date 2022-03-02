import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // const token = localStorage.getItem("token");
  return (
    <div>
      <h1>Hello </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />          
          <Route path="/dashboard" exact  element={<Dashboard />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
