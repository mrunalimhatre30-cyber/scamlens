import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(16, 27, 23, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
      }}>
        {/* Logo and Wordmark */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10B981 0%, #064E3B 100%)',
            border: '1.5px solid var(--lime)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
          }}>
            <Shield size={24} color="#C4F56A" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}>
              Scam<span style={{ color: 'var(--lime)' }}>Lens</span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Think · Check · Stay Safe
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem',
        }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: isActive('/') ? 'var(--lime)' : 'var(--text-secondary)',
              borderBottom: isActive('/') ? '2px solid var(--lime)' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.2s',
            }}
          >
            Home
          </Link>
          <Link
            to="/checker"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: isActive('/checker') ? 'var(--lime)' : 'var(--text-secondary)',
              borderBottom: isActive('/checker') ? '2px solid var(--lime)' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.2s',
            }}
          >
            Scam Checker
          </Link>
          <Link
            to="/safety-guide"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: isActive('/safety-guide') ? 'var(--lime)' : 'var(--text-secondary)',
              borderBottom: isActive('/safety-guide') ? '2px solid var(--lime)' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.2s',
            }}
          >
            Safety Guide
          </Link>
          <Link
            to="/quiz"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: isActive('/quiz') ? 'var(--lime)' : 'var(--text-secondary)',
              borderBottom: isActive('/quiz') ? '2px solid var(--lime)' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.2s',
            }}
          >
            Scam Challenge
          </Link>
          <Link
            to="/about"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: isActive('/about') ? 'var(--lime)' : 'var(--text-secondary)',
              borderBottom: isActive('/about') ? '2px solid var(--lime)' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.2s',
            }}
          >
            About
          </Link>
        </nav>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Working Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(49, 83, 68, 0.4)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#C4F56A" /> : <Moon size={18} color="#10B981" />}
          </button>

          {/* Auth Controls */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/dashboard" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                <User size={15} />
                <span>{user?.name?.split(' ')[0] || 'Dashboard'}</span>
              </Link>
              <button
                onClick={logout}
                title="Log out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  color: 'var(--text-secondary)',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginRight: '0.5rem'
              }}>
                Log In
              </Link>
              <Link to="/register" className="btn btn-lime">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              color: 'var(--text-primary)',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-panel)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <Link to="/" onClick={() => setMobileOpen(false)} style={{ color: isActive('/') ? 'var(--lime)' : 'var(--text-primary)', fontWeight: 600 }}>Home</Link>
          <Link to="/checker" onClick={() => setMobileOpen(false)} style={{ color: isActive('/checker') ? 'var(--lime)' : 'var(--text-primary)', fontWeight: 600 }}>Scam Checker</Link>
          <Link to="/safety-guide" onClick={() => setMobileOpen(false)} style={{ color: isActive('/safety-guide') ? 'var(--lime)' : 'var(--text-primary)', fontWeight: 600 }}>Safety Guide</Link>
          <Link to="/quiz" onClick={() => setMobileOpen(false)} style={{ color: isActive('/quiz') ? 'var(--lime)' : 'var(--text-primary)', fontWeight: 600 }}>Scam Challenge</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} style={{ color: isActive('/about') ? 'var(--lime)' : 'var(--text-primary)', fontWeight: 600 }}>About</Link>
          {isAuthenticated ? (
            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn btn-lime" style={{ marginTop: '0.5rem' }}>My Dashboard</Link>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>Log In</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn btn-lime" style={{ flex: 1 }}>Get Started</Link>
            </div>
          )}
        </div>
      )}

      {/* Style for desktop/mobile responsive toggle */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 859px) {
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
