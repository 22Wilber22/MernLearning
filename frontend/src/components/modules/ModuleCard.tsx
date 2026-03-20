import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Module } from '../../types';
import ProgressBar from '../common/ProgressBar';

interface Props {
  module: Module;
  progress?: number;
}

const ModuleCard: React.FC<Props> = ({ module, progress = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!module.isLocked) navigate(`/module/${module.slug}`);
  };

  return (
    <div
      className={`card module-card ${module.isLocked ? 'locked' : ''}`}
      onClick={handleClick}
      style={{ borderTop: `4px solid ${module.color}` }}
    >
      <div className="module-icon">{module.icon}</div>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {module.tags.slice(0, 3).map(tag => (
          <span key={tag} className="badge badge-primary">{tag}</span>
        ))}
      </div>
      <ProgressBar percentage={progress} label={`${module.lessons.length} lecciones`} />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <span>⏱ {module.estimatedHours}h</span>
        <span>⚡ {module.totalXP} XP</span>
        {module.isLocked && <span>�� Bloqueado</span>}
      </div>
    </div>
  );
};

export default ModuleCard;
