import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Admin from './components/Admin';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="app">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', background: '#302626ff' }}>
        <h1>React Shop</h1>
        <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/admin">Admin</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {user.photoURL && <img src={user.photoURL} alt={user.name} style={{ width: '30px', borderRadius: '50%' }} />}
                <span>{user.name}</span>
                <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
              </div>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductList user={user} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/login" element={<Login onLogin={u => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); }} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
