import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OurSauces from './pages/OurSauces';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import { useEffect, useState } from 'react';
import Account from './pages/Account';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div className="app">
      <Navbar token={token} setToken={setToken}/>
      <div className="nav-bar-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<OurSauces />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/account" element={<Account toekn={token}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;