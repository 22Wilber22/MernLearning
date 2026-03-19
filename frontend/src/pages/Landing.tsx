import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const features = [
  { icon: '🤖', title: 'Revisión con IA', desc: 'Obtén feedback instantáneo de tu código con Google Gemini AI' },
  { icon: '⚡', title: 'Aprende Haciendo', desc: 'Editor de código integrado con Monaco para práctica real' },
  { icon: '🏆', title: 'Sistema de Logros', desc: 'Gana XP y sube de nivel mientras aprendes' },
  { icon: '🗺️', title: 'Ruta Estructurada', desc: 'Desde HTML/CSS hasta MERN Stack completo' },
  { icon: '🔓', title: 'Desbloqueo Progresivo', desc: 'Nuevos módulos se desbloquean al completar el 70%' },
  { icon: '📱', title: 'Diseño Responsivo', desc: 'Aprende desde cualquier dispositivo' },
];

const modules = [
  { icon: '🌐', name: 'HTML & CSS', level: 'Fundamentos' },
  { icon: '⚡', name: 'JavaScript', level: 'Programación' },
  { icon: '⚛️', name: 'React', level: 'Frontend' },
  { icon: '🟢', name: 'Node.js', level: 'Backend' },
  { icon: '🍃', name: 'MongoDB', level: 'Base de datos' },
];

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div>
            <h1>
              Aprende <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MERN Stack</span>
              <br />con Inteligencia Artificial
            </h1>
            <p>
              La plataforma de aprendizaje más completa para dominar MongoDB, Express, React y Node.js.
              Con revisión automática de código por IA gratuita.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem' }}>
                🚀 Comenzar Gratis
              </Link>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem' }}>
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: '4rem 2rem', background: 'rgba(99,102,241,0.03)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>Tu Ruta de Aprendizaje</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>5 módulos progresivos desde cero hasta MERN completo</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
            {modules.map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '1.5rem', minWidth: '140px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{m.icon}</div>
                <div style={{ fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.level}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', paddingTop: '4rem', marginBottom: '0.5rem' }}>¿Por qué MernLearning?</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '0' }}>Diseñado para aprender de forma efectiva</p>
          <div className="features">
            {features.map((f, i) => (
              <div key={i} className="card feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¿Listo para comenzar?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>Es gratis. Sin tarjeta de crédito.</p>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            🎯 Empezar ahora
          </Link>
        </section>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)' }}>
        <p>© 2024 MernLearning. Hecho con ❤️ para aprendices de MERN Stack.</p>
      </footer>
    </>
  );
};

export default Landing;
