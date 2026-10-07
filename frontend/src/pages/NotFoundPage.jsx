import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="section-padding container" style={{ maxWidth: '600px', textAlign: 'center' }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-rose-light)',
          color: 'var(--accent-rose)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <Compass size={40} />
      </div>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>404</h1>
      <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
        The bespoke design or private atelier page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Return to Home <ArrowRight size={18} />
      </Link>
    </div>
  );
};

