import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Search,
  FileText,
  ShieldCheck,
  Gamepad2,
  BookOpen,
  GraduationCap,
  Users,
  Store,
  UserCheck,
  Zap,
  Lock,
  Eye
} from 'lucide-react';
import HeroIllustration from '../components/HeroIllustration';
import CheckerCard from '../components/CheckerCard';

export default function Home() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background glow & subtle grid */}
      <div className="cyber-bg-glow" />
      <div className="cyber-grid-overlay" />

      {/* ============================================================== */}
      {/* HERO SECTION                                                   */}
      {/* ============================================================== */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.95fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}>
            {/* Left Column: Heading, Subtitle, and Scam Checker Panel */}
            <div>
              {/* Badge */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="badge-pill">
                  <Sparkles size={14} color="#C4F56A" />
                  <span>AI-POWERED SCAM DETECTION</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                marginBottom: '1.2rem',
                color: 'var(--text-primary)',
              }}>
                Think Before You Click.<br />
                <span className="text-lime-gradient">
                  Stay One Step Ahead<br />
                  of Scams.
                </span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                marginBottom: '2rem',
              }}>
                Analyse suspicious messages, URLs, job offers and payment requests.
                Get clear explanations, safe next steps, and learn how to stay protected.
              </p>

              {/* Scam Checker Input Panel */}
              <CheckerCard />
            </div>

            {/* Right Column: 3D Shield Hero Visual & Floating Alert Cards */}
            <div className="hero-graphic-col">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* WHY SCAMLENS / MORE THAN JUST A LINK CHECKER                   */}
      {/* ============================================================== */}
      <section style={{ padding: '5rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Section Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'var(--lime)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                WHY SCAMLENS?
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}>
                More Than Just a <span style={{ color: 'var(--lime)' }}>Link Checker</span>
              </h2>
              <p style={{
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                maxWidth: '580px',
                lineHeight: 1.6,
              }}>
                We don't just tell you if something is risky — we explain why it's risky,
                show you the warning signs, and guide you on what to do next.
              </p>
            </div>

            <Link to="/checker" className="btn btn-outline" style={{ gap: '0.6rem' }}>
              <span>Explore All Features</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* 5 Feature Cards Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem',
          }}>
            {/* Card 1 */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <Search size={22} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Detect Warning Signs
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Spot suspicious patterns in messages, links, and job offers before interacting.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <FileText size={22} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Get Clear Explanations
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Understand exactly why something is risky in plain, accessible language.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <ShieldCheck size={22} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Safe Next Steps
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Find out what to do — whether you clicked, paid, or shared confidential information.
              </p>
            </div>

            {/* Card 4 */}
            <Link to="/quiz" className="glass-card" style={{ padding: '1.5rem', display: 'block' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <Gamepad2 size={22} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Interactive Scam Challenge
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Test your instincts through real-life scenarios, quizzes, and instant feedback.
              </p>
            </Link>

            {/* Card 5 */}
            <Link to="/safety-guide" className="glass-card" style={{ padding: '1.5rem', display: 'block' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <BookOpen size={22} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Safety Guide
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Explore common scams, recovery checklists, and official emergency reporting helplines.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* TRUST / VALUE BANNER                                           */}
      {/* ============================================================== */}
      <section style={{ padding: '2rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(25, 41, 35, 0.95) 0%, rgba(16, 27, 23, 0.9) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)',
            overflow: 'hidden',
          }}>
            {/* Background Cyber Wave Lines Accent */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '40%',
              background: 'radial-gradient(ellipse at right, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Left Tagline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2 }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1.5px solid var(--lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ShieldCheck size={26} color="#C4F56A" />
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                A safer internet<br />starts with you.
              </div>
            </div>

            {/* Truthful Feature Metrics (avoiding fabricated numbers) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              zIndex: 2,
            }}>
              {/* Metric 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Zap size={20} color="#C4F56A" />
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    Real-Time
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Pattern Analysis
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Eye size={20} color="#C4F56A" />
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Explainable Reasons
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Lock size={20} color="#C4F56A" />
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    Zero-Data
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Retention Policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* AUDIENCE SECTION                                               */}
      {/* ============================================================== */}
      <section style={{ padding: '2.5rem 0 1rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            padding: '1.25rem 2rem',
            borderTop: '1px solid rgba(49, 83, 68, 0.4)',
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
          }}>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Trusted by:</strong>{' '}
              <span>users, students, families & small businesses</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GraduationCap size={18} color="var(--lime)" />
                <span>Students</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={18} color="var(--lime)" />
                <span>Families</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Store size={18} color="var(--lime)" />
                <span>Small Businesses</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserCheck size={18} color="var(--lime)" />
                <span>Everyday Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
