import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Menu from "./components/Menu"
import Home from "./components/Home"
import Shop from "./components/Shop"
import Orders from "./components/Orders"
import NotFound from "./components/NotFound"
import Admin from "./components/Admin"

function App() {
  return (
    <>
      <Menu />
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}/>  
          <Route path="/shop" element={<Shop />}/>  
          <Route path="/orders" element={<Orders />}/> 
          <Route path="/admin" element={<Admin />}/> 
          <Route path="/" element={<Navigate to="/home" repalce />}/>
          <Route path="*" element={<NotFound text="Такой страницы не существует!"/>}/>  
        </Routes>
      </Router>
    </>
  );
}

export default App;
