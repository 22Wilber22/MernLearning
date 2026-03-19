import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Lesson } from '../types';
import Navbar from '../components/layout/Navbar';
import CodeEditor from '../components/modules/CodeEditor';

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'exercises'>('content');
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    api.get(`/lessons/${id}`).then(res => {
      setLesson(res.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleComplete = () => {
    api.post(`/lessons/${id}/complete`).then(() => setCompleted(true));
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} style={{ fontSize: '2rem', margin: '1.5rem 0 0.75rem' }}>{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.5rem', margin: '1.25rem 0 0.5rem' }}>{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: '1.2rem', margin: '1rem 0 0.5rem' }}>{line.slice(4)}</h3>;
      if (line.startsWith('- **')) return <li key={i} style={{ color: 'var(--text-secondary)', padding: '0.2rem 0' }} dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e1e1e;padding:2px 6px;border-radius:4px;">$1</code>') }} />;
      if (line.startsWith('- ')) return <li key={i} style={{ color: 'var(--text-secondary)', padding: '0.2rem 0' }}>{line.slice(2)}</li>;
      if (line.startsWith('```')) return null;
      if (line === '') return <br key={i} />;
      return <p key={i} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{line}</p>;
    });
  };

  if (loading) return <><Navbar /><div className="loading-screen"><div className="spinner"></div></div></>;
  if (!lesson) return <><Navbar /><div style={{ padding: '2rem', textAlign: 'center' }}>Lección no encontrada</div></>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          ← Volver
        </button>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>{lesson.title}</h1>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className={`badge ${lesson.type === 'theory' ? 'badge-primary' : 'badge-success'}`}>{lesson.type}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>⏱ {lesson.estimatedMinutes} min</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>⚡ {lesson.xpReward} XP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button className={`btn ${activeTab === 'content' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('content')}>
            📖 Contenido
          </button>
          {lesson.exercises && lesson.exercises.length > 0 && (
            <button className={`btn ${activeTab === 'exercises' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('exercises')}>
              ✏️ Ejercicios ({lesson.exercises.length})
            </button>
          )}
        </div>

        {activeTab === 'content' && (
          <div>
            <div className="card lesson-content" style={{ maxWidth: '100%' }}>
              {renderContent(lesson.content)}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              {completed ? (
                <div style={{ color: 'var(--success)', fontSize: '1.1rem' }}>✅ ¡Lección completada! +{lesson.xpReward} XP</div>
              ) : (
                <button className="btn btn-success" onClick={handleComplete} style={{ padding: '0.85rem 2rem' }}>
                  ✅ Marcar como completada
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'exercises' && lesson.exercises && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {lesson.exercises.map((exercise: any, index: number) => (
              <div key={exercise._id}>
                <h3 style={{ marginBottom: '1rem' }}>Ejercicio {index + 1}: {exercise.title}</h3>
                <CodeEditor exercise={exercise} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LessonPage;
