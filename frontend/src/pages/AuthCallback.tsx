import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../utils/api';

const AuthCallback: React.FC = () => {
  const [params] = useSearchParams();
  const { setTokenAndUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/auth/me').then(res => {
        setTokenAndUser(token, res.data.user);
        navigate('/dashboard');
      }).catch(() => navigate('/login?error=oauth_failed'));
    } else {
      navigate('/login?error=no_token');
    }
  }, [navigate, params, setTokenAndUser]);

  return (
    <div className="loading-screen">
      <div>
        <div className="spinner" style={{ margin: '0 auto' }}></div>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
          Autenticando...
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
