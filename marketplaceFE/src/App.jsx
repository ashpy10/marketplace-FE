import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OurSauces from './pages/OurSauces';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="nav-bar-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<OurSauces />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<h2>Login</h2>} />
          <Route path="/account" element={<h2>My Account</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
