import React from 'react';
import { Shield, Lock, Eye, CheckCircle2, AlertTriangle, FileCode, Users } from 'lucide-react';

export default function About() {
  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-pill">
              <Shield size={14} color="#C4F56A" />
              <span>Transparency & Privacy First</span>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 800, marginBottom: '0.6rem' }}>
            About <span style={{ color: 'var(--lime)' }}>ScamLens</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Our mission is to democratize digital safety through explainable cybersecurity tools, transparent heuristics, and privacy-first engineering.
          </p>
        </div>

        {/* What ScamLens Does */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            What ScamLens Does
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
            Every day, millions of internet users encounter unsolicited text messages, deceptive links, fake recruitment offers, and manipulated payment requests. Traditional security tools often give cryptic black-box ratings without context.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            ScamLens bridges this gap by acting as an educational lens. When you inspect a communication, we break down why it appears risky, cite the exact suspicious pattern, explain the threat vector, and guide you with actionable next steps.
          </p>
        </div>

        {/* How Analysis Works */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            How Analysis Works (Zero-Paid-API Architecture)
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            ScamLens is powered by a transparent, deterministic heuristic engine designed to run efficiently on any infrastructure without requiring costly third-party AI tokens:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Coercion & Urgency Vectoring:</strong> Detects artificial deadlines, threats of arrest, service termination, and emotional pressure designed to inhibit logical verification.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Credential & Financial Harvesting:</strong> Flags requests for OTPs, net banking passwords, UPI PINs (under the pretense of receiving money), and remote desktop screen-sharing utilities.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Sandboxed URL Structure Parsing:</strong> Inspects domains, brand typosquatting, raw IP addresses, and protocol indicators without visiting or executing the untrusted destination.
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Data Handling */}
        <div id="privacy" className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Lock size={24} color="var(--lime)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Privacy & Data Minimization Policy
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
            We believe that safety tools must not become surveillance vectors. Here is our genuine, verifiable data commitment:
          </p>

          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Zero Raw Message Storage:</strong> By default, messages and URLs analyzed on the homepage or scam checker are processed strictly in-memory and discarded once the response is sent.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Explicit History Opt-In:</strong> If you are logged in and choose to save an analysis to your personal dashboard, we store only a sanitized excerpt (with numeric identifiers redacted) alongside the resulting risk category and finding IDs.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Immediate Deletion Control:</strong> You can delete any saved scan from your dashboard at any time. When deleted, it is removed immediately from our database via parameterized SQL commands.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Password Security:</strong> Passwords are never stored in plain text. We hash all credentials using bcrypt (12 salt rounds) before storing them in MySQL.</li>
          </ul>
        </div>

        {/* Limitations & Disclaimers */}
        <div id="limitations" className="glass-panel" style={{ padding: '2.5rem', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <AlertTriangle size={24} color="#F59E0B" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FDBA74' }}>
              System Limitations & Safety Notice
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.85rem' }}>
            No automated security scanner can guarantee 100% detection of all attacks. Scammers constantly engineer novel pretexts, change domain infrastructure, and evolve linguistic phrasing.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            A status of <em>"No obvious warning signs detected"</em> indicates that the submitted text does not match known rule signatures; it does not constitute an endorsement of legitimacy. Always maintain digital vigilance.
          </p>
        </div>
      </div>
    </div>
  );
}
