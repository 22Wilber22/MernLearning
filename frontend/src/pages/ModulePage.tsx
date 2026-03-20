import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Module } from '../types';
import Navbar from '../components/layout/Navbar';

const ModulePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/modules/${slug}`).then(res => {
      setModule(res.data.data);
    }).catch(() => setError('No se pudo cargar el módulo. Inténtalo de nuevo.')).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <><Navbar /><div className="loading-screen"><div className="spinner"></div></div></>;
  if (error) return <><Navbar /><div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>⚠️ {error}</div></>;
  if (!module) return <><Navbar /><div style={{ padding: '2rem', textAlign: 'center' }}>Módulo no encontrado</div></>;

  const totalExercises = module.lessons.reduce((acc, l) => acc + (l.exercises?.length || 0), 0);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          ← Volver al Dashboard
        </button>

        <div className="card" style={{ marginBottom: '2rem', borderTop: `4px solid ${module.color}` }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '4rem' }}>{module.icon}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: '0.5rem' }}>{module.title}</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{module.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>📚 {module.lessons.length} lecciones</span>
                <span>✏️ {totalExercises} ejercicios</span>
                <span>⏱ {module.estimatedHours}h estimadas</span>
                <span>⚡ {module.totalXP} XP total</span>
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ marginBottom: '1rem' }}>Lecciones</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {module.lessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className="card"
              style={{ cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center' }}
              onClick={() => navigate(`/lesson/${lesson._id}`)}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.25rem' }}>{lesson.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`badge ${lesson.type === 'theory' ? 'badge-primary' : lesson.type === 'practice' ? 'badge-success' : 'badge-warning'}`}>
                    {lesson.type}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>⏱ {lesson.estimatedMinutes} min</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>⚡ {lesson.xpReward} XP</span>
                  {lesson.exercises && <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>✏️ {lesson.exercises.length} ejercicios</span>}
                </div>
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>→</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModulePage;
