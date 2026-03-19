import React from 'react';
import { AIReview as AIReviewType } from '../../types';

interface Props {
  review: AIReviewType;
}

const AIReview: React.FC<Props> = ({ review }) => {
  return (
    <div className="ai-review">
      <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>🤖 Revisión IA</h3>
      <div className="ai-score">{review.score}/100</div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span className={`badge ${review.passed ? 'badge-success' : 'badge-danger'}`}>
          {review.passed ? '✅ Aprobado' : '❌ Necesita mejoras'}
        </span>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
        {review.feedback}
      </p>
      {review.positives.length > 0 && (
        <div className="ai-section positives">
          <h4>✅ Lo que hiciste bien</h4>
          <ul>{review.positives.map((p, i) => <li key={i}>• {p}</li>)}</ul>
        </div>
      )}
      {review.improvements.length > 0 && (
        <div className="ai-section improvements">
          <h4>🔧 A mejorar</h4>
          <ul>{review.improvements.map((p, i) => <li key={i}>• {p}</li>)}</ul>
        </div>
      )}
      {review.suggestions.length > 0 && (
        <div className="ai-section suggestions">
          <h4>💡 Sugerencias</h4>
          <ul>{review.suggestions.map((p, i) => <li key={i}>• {p}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default AIReview;
