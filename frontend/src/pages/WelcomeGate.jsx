import React, { useState } from 'react';
import { Shield, Sparkles, Mail, Lock, User, Eye, EyeOff, Loader2, AlertOctagon, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import HeroIllustration from '../components/HeroIllustration';

export default function WelcomeGate() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register, demoLogin } = useAuth();

  const hasMinLength = password.length >= 8;
  const hasSpecialOrNum = /(?=.*[0-9]|.*[!@#$%^&*])/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.trim() || !password) {
        setError('Please enter your email and password.');
        return;
      }
      setLoading(true);
      try {
        await login(email, password);
      } catch (err) {
        setError(err.message || 'Login failed. Please verify your credentials.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!name.trim()) {
        setError('Please provide your full name.');
        return;
      }
      if (!hasMinLength || !hasSpecialOrNum) {
        setError('Password must be at least 8 characters and include a number or symbol.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setLoading(true);
      try {
        await register(name, email, password, confirmPassword);
      } catch (err) {
        setError(err.message || 'Registration failed. Please check your details.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDemoAccess = async () => {
    setError('');
    setLoading(true);
    try {
      await demoLogin();
    } catch (err) {
      setError(err.message || 'Demo access failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient background glow & subtle grid */}
      <div className="cyber-bg-glow" style={{ top: '-10%', right: '15%' }} />
      <div className="cyber-grid-overlay" />

      {/* Top Welcome Bar */}
      <header style={{
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(49, 83, 68, 0.4)',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(16, 27, 23, 0.7)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10B981 0%, #064E3B 100%)',
            border: '1.5px solid var(--lime)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
          }}>
            <Shield size={22} color="#C4F56A" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Scam<span style={{ color: 'var(--lime)' }}>Lens</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              Think · Check · Stay Safe
            </div>
          </div>
        </div>

        <button
          onClick={handleDemoAccess}
          disabled={loading}
          className="btn btn-outline"
          style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', borderColor: 'var(--lime)', color: 'var(--lime)', gap: '0.4rem' }}
        >
          <Zap size={14} />
          <span>Quick Demo Access</span>
        </button>
      </header>

      {/* Main Welcome & Access Portal Body */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        zIndex: 5,
      }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Left Presentation Column */}
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <span className="badge-pill">
                  <Sparkles size={14} color="#C4F56A" />
                  <span>CYBERSECURITY GATEWAY</span>
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}>
                Think Before You Click.<br />
                <span className="text-lime-gradient">
                  Stay One Step Ahead of Scams.
                </span>
              </h1>

              <p style={{
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.75rem',
                maxWidth: '480px',
              }}>
                ScamLens helps students, job seekers, and everyday users detect deceptive tactics, analyze URLs & messages, and take safe defensive actions.
              </p>

              {/* Value checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--lime)" />
                  <span>Explainable Heuristic Scam & Link Analysis</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--lime)" />
                  <span>Interactive Real-World Cybersecurity Quizzes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--lime)" />
                  <span>Official Helpline 1930 & Emergency Playbooks</span>
                </div>
              </div>

              <div style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: 'rgba(25, 41, 35, 0.7)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <Shield size={16} color="var(--emerald)" />
                <span>Zero raw-message retention. Your privacy is protected.</span>
              </div>
            </div>

            {/* Right Authentication Card */}
            <div>
              <div className="glass-panel" style={{
                padding: '2.25rem',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 35px var(--emerald-glow)',
                position: 'relative',
              }}>
                {/* Mode Selector Tabs */}
                <div style={{
                  display: 'flex',
                  backgroundColor: 'rgba(18, 33, 28, 0.8)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px',
                  marginBottom: '1.75rem',
                  border: '1px solid var(--border-color)',
                }}>
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      color: mode === 'login' ? '#101B17' : 'var(--text-secondary)',
                      backgroundColor: mode === 'login' ? 'var(--lime)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setError(''); }}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      color: mode === 'register' ? '#101B17' : 'var(--text-secondary)',
                      backgroundColor: mode === 'register' ? 'var(--lime)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    Create Account
                  </button>
                </div>

                {/* Card Title */}
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {mode === 'login' ? 'Sign In to Enter ScamLens' : 'Register for Full Access'}
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {mode === 'login'
                    ? 'Authenticate to access the scam checker, challenges, and safety guides.'
                    : 'Create your account to unlock all detection tools and personal dashboard.'}
                </p>

                {/* Error Banner */}
                {error && (
                  <div style={{
                    marginBottom: '1.25rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--risk-high-bg)',
                    border: '1px solid var(--risk-high)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#FCA5A5',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <AlertOctagon size={16} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Form Fields */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {mode === 'register' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Full Name
                      </label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.6rem 0.85rem',
                      }}>
                        <User size={16} color="var(--text-muted)" style={{ marginRight: '0.6rem' }} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '0.88rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Email Address
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem 0.85rem',
                    }}>
                      <Mail size={16} color="var(--text-muted)" style={{ marginRight: '0.6rem' }} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-primary)',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Password
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem 0.85rem',
                    }}>
                      <Lock size={16} color="var(--text-muted)" style={{ marginRight: '0.6rem' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === 'register' ? 'Min 8 chars with number/symbol' : '••••••••'}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-primary)',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {mode === 'register' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Confirm Password
                      </label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.6rem 0.85rem',
                      }}>
                        <Lock size={16} color="var(--text-muted)" style={{ marginRight: '0.6rem' }} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '0.88rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lime"
                    style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', gap: '0.5rem' }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="anim-spin" />
                        <span>Verifying access...</span>
                      </>
                    ) : (
                      <>
                        <span>{mode === 'login' ? 'Sign In & Enter ScamLens' : 'Create Account & Enter'}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Instant Demo Access Divider */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '1.25rem 0',
                  gap: '0.75rem',
                }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    or explore instantly
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
                </div>

                <button
                  type="button"
                  onClick={handleDemoAccess}
                  disabled={loading}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', borderColor: 'var(--lime)', color: 'var(--lime)', gap: '0.5rem' }}
                >
                  <Zap size={16} />
                  <span>Instant 1-Click Guest Access</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
