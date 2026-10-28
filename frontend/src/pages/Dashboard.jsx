import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  Clock,
  Trash2,
  ExternalLink,
  Award,
  Search,
  BookOpen,
  LogOut,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { fetchScanHistory, deleteScanHistory, fetchQuizProgress } from '../services/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [quizProgress, setQuizProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [histRes, quizRes] = await Promise.allSettled([
          fetchScanHistory(),
          fetchQuizProgress()
        ]);

        if (histRes.status === 'fulfilled' && histRes.value.history) {
          setHistory(histRes.value.history);
        }
        if (quizRes.status === 'fulfilled' && quizRes.value.progress) {
          setQuizProgress(quizRes.value.progress);
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handleDeleteHistory = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved analysis record?')) return;
    setDeletingId(id);
    try {
      await deleteScanHistory(id);
      setHistory(prev => prev.filter(h => h.id !== id));
      if (selectedHistory?.id === id) setSelectedHistory(null);
    } catch (err) {
      alert(err.message || 'Failed to delete record.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getRiskColor = (cat) => {
    if (cat === 'High risk') return '#EF4444';
    if (cat === 'Caution advised') return '#F59E0B';
    return '#10B981';
  };

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div className="glass-panel" style={{
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid var(--lime)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <User size={30} color="#C4F56A" />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--lime)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Cyber Defense Dashboard
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Welcome back, {user?.name || 'User'}!
              </h1>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {user?.email}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/checker" className="btn btn-lime">
              <Search size={16} />
              <span>New Scam Scan</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ gap: '0.4rem' }}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Saved Scans Count */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Saved Analyses</span>
              <Shield size={20} color="var(--emerald)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {history.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Stored with privacy-preserving redactions
            </div>
          </div>

          {/* Quiz Achievements */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Challenge Attempts</span>
              <Award size={20} color="var(--lime)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {quizProgress.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {quizProgress.length > 0 ? `Latest score: ${quizProgress[0].score}/${quizProgress[0].total_questions}` : 'No challenge completed yet'}
            </div>
          </div>

          {/* Safety Center Link */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Safety Education</span>
              <BookOpen size={20} color="var(--emerald)" />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
              10+ Scam Playbooks
            </div>
            <Link to="/safety-guide" style={{ fontSize: '0.8rem', color: 'var(--lime)', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Browse Safety Guide</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Main Content Grid: Scan History & Detail View */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: history.length > 0 && selectedHistory ? '1fr 1fr' : '1fr',
          gap: '2rem',
        }}>
          {/* History List */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Your Saved Analysis Records
            </h2>

            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Loader2 size={24} className="anim-spin" style={{ margin: '0 auto 0.5rem auto' }} />
                <span>Loading your records...</span>
              </div>
            ) : history.length === 0 ? (
              <div style={{
                padding: '2.5rem',
                textAlign: 'center',
                backgroundColor: 'rgba(18, 33, 28, 0.4)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-color)',
              }}>
                <Shield size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  No saved analyses yet
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 1.25rem auto' }}>
                  When analyzing messages or URLs, check "Save to my dashboard" to keep track of security audits.
                </p>
                <Link to="/checker" className="btn btn-lime" style={{ fontSize: '0.85rem' }}>
                  Run Your First Scan
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedHistory(item)}
                    style={{
                      padding: '1rem',
                      backgroundColor: selectedHistory?.id === item.id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(18, 33, 28, 0.6)',
                      border: `1px solid ${selectedHistory?.id === item.id ? 'var(--lime)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: `${getRiskColor(item.risk_category)}22`,
                          color: getRiskColor(item.risk_category),
                          fontWeight: 700,
                          border: `1px solid ${getRiskColor(item.risk_category)}55`,
                        }}>
                          {item.risk_category}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          [{item.input_type}]
                        </span>
                      </div>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.target_snippet}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteHistory(item.id, e)}
                      disabled={deletingId === item.id}
                      title="Delete record"
                      style={{
                        color: 'var(--text-muted)',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail View for Selected Record */}
          {selectedHistory && (
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  Analysis Breakdown
                </h3>
                <button
                  onClick={() => setSelectedHistory(null)}
                  style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                >
                  Close
                </button>
              </div>

              <div style={{
                padding: '0.85rem',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Target Snippet:
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--lime)', fontFamily: 'monospace' }}>
                  "{selectedHistory.target_snippet}"
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Warning Indicators ({selectedHistory.findings?.length || 0}):
                </div>

                {selectedHistory.findings && selectedHistory.findings.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedHistory.findings.map((f, i) => (
                      <div key={i} style={{
                        padding: '0.85rem',
                        backgroundColor: 'rgba(18, 33, 28, 0.7)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.82rem',
                      }}>
                        <div style={{ fontWeight: 700, color: 'var(--lime)', marginBottom: '0.25rem' }}>
                          {f.title}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                          {f.whyItMatters}
                        </div>
                        <div style={{ color: 'var(--emerald)' }}>
                          <strong>Verification:</strong> {f.verificationStep}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--emerald)' }}>
                    No specific red flags recorded for this item.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
