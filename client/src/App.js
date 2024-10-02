// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLib from './server/MainLib';
import Users from './components/Users';
import Books from './components/Books';
import HomeLib from './client/HomeLib';
import Loans from './components/Loans';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Register />} />
          {/* <PrivateRoute  path="/profile" element={<MainLib/>} /> */}
          <Route  path="/main/users/" element={<PrivateRoute><Users/></PrivateRoute>} />
          <Route path="/home/" element={<PrivateRoute><HomeLib /></PrivateRoute>} />
          <Route path="/main/" element={<PrivateRoute><MainLib /></PrivateRoute>} />
          <Route  path='/main/loans/' element={<PrivateRoute><Loans/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
