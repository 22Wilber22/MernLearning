import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Exercise, AIReview as AIReviewType } from '../../types';
import { api } from '../../utils/api';
import AIReview from '../common/AIReview';

interface Props {
  exercise: Exercise;
  onComplete?: (xpEarned: number) => void;
}

const CodeEditor: React.FC<Props> = ({ exercise, onComplete }) => {
  const [code, setCode] = useState(exercise.starterCode || '');
  const [review, setReview] = useState<AIReviewType | null>(null);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/exercises/${exercise._id}/submit`, { code });
      setReview(res.data.data.aiReview);
      if (res.data.data.aiReview.passed && onComplete) {
        onComplete(exercise.xpReward);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHint = async () => {
    try {
      const res = await api.post('/ai/hint', {
        exerciseDescription: exercise.description,
        currentCode: code,
        language: exercise.language
      });
      setHint(res.data.data.hint);
      setShowHint(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3>{exercise.title}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0' }}>{exercise.description}</p>
        <div style={{ background: 'rgba(99,102,241,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
          <strong>📋 Instrucciones:</strong>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{exercise.instructions}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span className={`badge ${exercise.difficulty === 'beginner' ? 'badge-success' : exercise.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'}`}>
            {exercise.difficulty}
          </span>
          <span className="badge badge-primary">{exercise.language}</span>
          <span className="badge badge-warning">⚡ {exercise.xpReward} XP</span>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-toolbar">
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {exercise.language.toUpperCase()} Editor
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={handleHint} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              💡 Pista
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              {loading ? '⏳ Revisando...' : '🚀 Enviar'}
            </button>
          </div>
        </div>
        <Editor
          height="400px"
          defaultLanguage={exercise.language === 'nodejs' ? 'javascript' : exercise.language}
          value={code}
          onChange={(val) => setCode(val || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2
          }}
        />
      </div>

      {showHint && hint && (
        <div className="card" style={{ marginTop: '1rem', borderColor: 'var(--warning)' }}>
          <h4>💡 Pista</h4>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{hint}</p>
        </div>
      )}

      {review && (
        <div style={{ marginTop: '1rem' }}>
          <AIReview review={review} />
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
