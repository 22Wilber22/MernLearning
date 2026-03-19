import React from 'react';

interface Props {
  percentage: number;
  label?: string;
  showLabel?: boolean;
}

const ProgressBar: React.FC<Props> = ({ percentage, label, showLabel = true }) => {
  const pct = Math.min(100, Math.max(0, percentage));
  return (
    <div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>{label || 'Progreso'}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
