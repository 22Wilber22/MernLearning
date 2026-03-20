import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../utils/api';
import Navbar from '../components/layout/Navbar';

const Profile: React.FC = () => {
  const { user, setTokenAndUser, token } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);
    try {
      const res = await api.put('/users/profile', { name, avatar });
      setTokenAndUser(token!, res.data.data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-secondary"
          style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}
        >
          ← Volver al Dashboard
        </button>

        <div
          className="card"
          style={{
            marginBottom: '2rem',
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))',
            border: '1px solid rgba(99,102,241,0.3)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
            {user.avatar || '👤'}
          </div>
          <h2 style={{ marginBottom: '0.25rem' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {(user as any).email}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span className="badge badge-primary">⚡ {user.xp} XP</span>
            <span className="badge badge-warning">🏆 Nivel {user.level}</span>
            <span className="badge badge-success">🔥 {user.streak} días</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Editar Perfil</h3>

          {success && (
            <div
              style={{
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                color: 'var(--success)',
                fontSize: '0.9rem',
              }}
            >
              ✅ Perfil actualizado correctamente
            </div>
          )}

          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                color: '#ef4444',
                fontSize: '0.9rem',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Avatar (emoji)</label>
              <input
                type="text"
                className="form-input"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                placeholder="👤"
                maxLength={10}
              />
              <small style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                Introduce un emoji como avatar, por ejemplo: 🧑‍💻 👩‍💻 🦊
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {saving ? '⏳ Guardando...' : '💾 Guardar Cambios'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
