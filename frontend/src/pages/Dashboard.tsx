import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../utils/api';
import { Module } from '../types';
import Navbar from '../components/layout/Navbar';
import ModuleCard from '../components/modules/ModuleCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/modules').then(res => {
      setModules(res.data.data);
    }).catch(() => setError('No se pudieron cargar los módulos. Inténtalo de nuevo.')).finally(() => setLoading(false));
  }, []);

  const getModuleProgress = (moduleId: string): number => {
    if (!user) return 0;
    const p = (user as any).progress?.find((p: any) => p.moduleId === moduleId);
    return p?.percentage || 0;
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {user && (
          <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ fontSize: '4rem' }}>👋</div>
              <div>
                <h2>¡Hola, {user.name}!</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Continúa tu aprendizaje MERN</p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-primary">⚡ {user.xp} XP</span>
                  <span className="badge badge-warning">🏆 Nivel {user.level}</span>
                  <span className="badge badge-success">🔥 {user.streak} días</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Módulos de Aprendizaje</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {modules.filter(m => !m.isLocked).length} / {modules.length} desbloqueados
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem' }}>Cargando módulos...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--danger)' }}>
            ⚠️ {error}
          </div>
        ) : (
          <div className="modules-grid">
            {modules.map(m => (
              <ModuleCard key={m._id} module={m} progress={getModuleProgress(m._id)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
