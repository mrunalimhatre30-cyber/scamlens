import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0B1310',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      marginTop: '5rem',
      color: 'var(--text-secondary)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10B981 0%, #064E3B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--lime)',
              }}>
                <Shield size={20} color="#C4F56A" />
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Scam<span style={{ color: 'var(--lime)' }}>Lens</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Think Before You Click. Stay One Step Ahead of Scams.
              A cybersecurity platform built to empower everyday citizens, students, and businesses with transparent scam detection.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--emerald)' }}>
              ● Zero raw message storage by default
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Platform
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><Link to="/" style={{ transition: 'color 0.2s' }}>Home</Link></li>
              <li><Link to="/checker" style={{ transition: 'color 0.2s' }}>Scam Checker</Link></li>
              <li><Link to="/safety-guide" style={{ transition: 'color 0.2s' }}>Safety Guide</Link></li>
              <li><Link to="/quiz" style={{ transition: 'color 0.2s' }}>Interactive Scam Challenge</Link></li>
              <li><Link to="/about" style={{ transition: 'color 0.2s' }}>About & Privacy</Link></li>
            </ul>
          </div>

          {/* Account & Tools */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Account & Privacy
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Create Account</Link></li>
              <li><Link to="/dashboard">User Dashboard</Link></li>
              <li><Link to="/about#privacy">Data Minimization Policy</Link></li>
              <li><Link to="/about#limitations">Heuristic Limitations</Link></li>
            </ul>
          </div>

          {/* Official Emergency Cybercrime Resources */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Emergency Reporting
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(25, 41, 35, 0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--lime)', fontWeight: 700, marginBottom: '0.4rem' }}>
                <PhoneCall size={16} />
                <span>National Helpline: 1930</span>
              </div>
              <p style={{ marginBottom: '0.6rem' }}>
                If you have been a victim of financial cyber fraud, dial <strong>1930</strong> immediately to request transaction freezing.
              </p>
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'var(--emerald)',
                  fontWeight: 600,
                }}
              >
                <span>National Cyber Crime Portal</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div style={{
          borderTop: '1px solid rgba(49, 83, 68, 0.4)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.78rem',
        }}>
          <div>
            © {new Date().getFullYear()} ScamLens. Built for safe digital navigation.
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Disclaimer: ScamLens provides educational heuristic warnings. No automated scanner can guarantee 100% protection against zero-day tactics.
          </div>
        </div>
      </div>
    </footer>
  );
}
