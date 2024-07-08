import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/owners">Owners</Link></li>
          <li><Link to="/clients">Clients</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
