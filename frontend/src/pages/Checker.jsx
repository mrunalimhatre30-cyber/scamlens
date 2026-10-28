import React, { useState } from 'react';
import { Shield, Sparkles, AlertOctagon, AlertTriangle, CheckCircle2, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CheckerCard from '../components/CheckerCard';

export default function Checker() {
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--lime)', fontSize: '0.88rem', fontWeight: 600 }}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-pill">
              <Sparkles size={14} color="#C4F56A" />
              <span>Full Scam Analysis Engine</span>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Deep <span style={{ color: 'var(--lime)' }}>Scam Checker</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Inspect suspicious messages, urgent payment requests, job recruitment links, and domain structures.
            Receive explainable indicators, evidence context, and safe verification steps.
          </p>
        </div>

        {/* Primary Interactive Checker */}
        <CheckerCard onAnalysisComplete={(analysis) => setLatestAnalysis(analysis)} />

        {/* Educational Framework Guide below checker */}
        <div style={{ marginTop: '3.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            How ScamLens Analyzes Content
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--lime)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                1. Behavioral Heuristics
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                We inspect text for classic coercion cues: artificial urgency, threat of law enforcement or account deactivation, and unsolicited prize claims.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--lime)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                2. Financial & Credential Traps
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Checks for requests for OTPs, UPI PINs under the guise of "receiving money", upfront task deposits, and screen-sharing application downloads.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--lime)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                3. Safe Structural URL Parsing
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                URLs are parsed without navigating to them, preventing malware execution while examining lookalike domains, raw IP hosts, and misleading subdomains.
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: 'rgba(25, 41, 35, 0.6)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            lineHeight: 1.5,
          }}>
            <Info size={18} color="var(--lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Important Cybersecurity Note:</strong> When ScamLens reports <em>"No obvious warning signs detected"</em>, this means no known automated red flags were triggered. Scammers continuously adapt. Always verify communications through official channels before sharing credentials or funds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
