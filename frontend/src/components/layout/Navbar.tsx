import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to={user ? '/dashboard' : '/'} className="navbar-brand">
        🚀 MernLearning
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span style={{ color: 'var(--text-secondary)' }}>
              ⚡ {user.xp} XP
            </span>
            <Link to="/profile" style={{ color: 'var(--text-secondary)' }}>
              {user.name}
            </Link>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register" className="btn btn-primary">
              Comenzar Gratis
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
