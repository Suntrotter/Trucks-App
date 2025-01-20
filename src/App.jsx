import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage/HomePage';
import CatalogPage from './components/Pages/Catalog/CatalogPage';
import Details from './components/Details/Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
