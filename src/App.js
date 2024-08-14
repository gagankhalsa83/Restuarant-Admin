import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRestaurant from './pages/AddRestaurant';
import EditRestaurant from './pages/EditRestaurant';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRestaurant />} />
        <Route path="/edit/:id" element={<EditRestaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
