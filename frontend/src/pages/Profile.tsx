import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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

interface ProfileData {
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  role: string;
  createdAt?: string;
  progress?: Array<{
    moduleId: { title: string; slug: string; icon: string };
    lessonsCompleted: string[];
    percentage: number;
    completed: boolean;
  }>;
}

const Profile: React.FC = () => {
  const { user, setTokenAndUser, token } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/users/profile').then(res => {
      setProfile(res.data.data);
      setName(res.data.data.name);
    }).catch(() => setMessage('Error al cargar el perfil. Por favor, recarga la página.'));
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage('El nombre no puede estar vacío.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const res = await api.put('/users/profile', { name: name.trim() });
      setProfile(prev => prev ? { ...prev, name: res.data.data.name } : prev);
      if (token && user) {
        setTokenAndUser(token, { ...user, name: res.data.data.name });
      }
      setEditing(false);
      setMessage('¡Perfil actualizado correctamente!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error al actualizar el perfil. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  const completedModules = profile.progress?.filter(p => p.completed).length ?? 0;
  const totalModules = profile.progress?.length ?? 0;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-secondary"
          style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}

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
            {user.email}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          
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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Mi Perfil</h2>

        {message && (
          <div
            className="card"
            style={{
              marginBottom: '1.5rem',
              background: message.startsWith('Error')
                ? 'rgba(239,68,68,0.1)'
                : 'rgba(34,197,94,0.1)',
              border: `1px solid ${message.startsWith('Error') ? 'var(--danger)' : 'var(--success)'}`,
              color: message.startsWith('Error') ? 'var(--danger)' : 'var(--success)'
            }}
            {message}
          </div>
        )}

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>⚡</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{profile.xp}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>XP Total</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>🏆</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>{profile.level}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nivel</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>🔥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{profile.streak}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Días seguidos</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>📚</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{completedModules}/{totalModules}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Módulos</div>
          </div>
        </div>

        {/* Profile info card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Información Personal</h3>
            {!editing && (
              <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                ✏️ Editar
              </button>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Nombre</label>
            {editing ? (
              <input
                className="form-input"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                autoFocus
              />
            ) : (
              <p style={{ padding: '0.75rem 0', color: 'var(--text-primary)' }}>{profile.name}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <p style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{profile.email}</p>
          </div>

          <div className="form-group">
            <label className="form-label">Rol</label>
            <span className="badge badge-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
              {profile.role === 'admin' ? '👑 Administrador' : '🎓 Estudiante'}
            </span>
          </div>

          {editing && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : '💾 Guardar'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => { setEditing(false); setName(profile.name); }}
                disabled={saving}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Progress by module */}
        {profile.progress && profile.progress.length > 0 && (
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Progreso por Módulo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {profile.progress.map((p, i) => (
                <div key={p.moduleId?.slug ?? i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span>
                      {p.moduleId?.icon ?? '📦'} {p.moduleId?.title ?? 'Módulo'}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {p.percentage ?? 0}%
                      {p.completed && (
                        <span className="badge badge-success" style={{ marginLeft: '0.5rem' }}>
                          ✓ Completado
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${p.percentage ?? 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
