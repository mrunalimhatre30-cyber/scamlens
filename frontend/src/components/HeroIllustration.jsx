import React from 'react';
import { Mail, MessageCircle, UserCheck, QrCode, Link2, Shield, Lock } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '560px',
      height: '520px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
    }}>
      {/* Background Holographic Glow & Rings */}
      <div style={{
        position: 'absolute',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(196, 245, 106, 0.12) 40%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: 1,
      }} />

      {/* Cyber Ring 1 (Outer Slow Pulse) */}
      <div style={{
        position: 'absolute',
        bottom: '28px',
        width: '380px',
        height: '110px',
        borderRadius: '50%',
        border: '1.5px solid rgba(196, 245, 106, 0.45)',
        boxShadow: '0 0 25px rgba(196, 245, 106, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.3)',
        transform: 'rotateX(68deg)',
        zIndex: 2,
      }} />

      {/* Cyber Ring 2 (Inner Energy Core) */}
      <div style={{
        position: 'absolute',
        bottom: '38px',
        width: '280px',
        height: '80px',
        borderRadius: '50%',
        border: '2px solid rgba(16, 185, 129, 0.7)',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
        transform: 'rotateX(68deg)',
        zIndex: 2,
      }} />

      {/* Central 3D Shield Image Asset with Glow */}
      <div style={{
        position: 'relative',
        width: '340px',
        height: '340px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0,0,0,0.7), 0 0 45px rgba(16, 185, 129, 0.35)',
        border: '1.5px solid rgba(196, 245, 106, 0.4)',
        zIndex: 3,
      }}>
        <img
          src="/images/hero-shield.jpg"
          alt="ScamLens Cybersecurity 3D Shield with Padlock"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e) => {
            // High-fidelity SVG fallback if image file is loading
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Subtle radial overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(16, 27, 23, 0.6) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ============================================================== */}
      {/* FLOATING SCAM ALERT NOTIFICATION CARDS AROUND SHIELD           */}
      {/* ============================================================== */}

      {/* 1. Top Card: Job Offer! */}
      <div
        className="floating-alert-card anim-float-1"
        style={{
          position: 'absolute',
          top: '25px',
          left: '22%',
          zIndex: 10,
        }}
      >
        <div className="card-icon-wrap" style={{ background: '#EA580C' }}>
          <Mail size={18} color="#FFFFFF" />
        </div>
        <div>
          <div className="card-title" style={{ color: '#FDBA74' }}>Job Offer!</div>
          <div className="card-subtitle">Earn ₹50,000/month from home!</div>
        </div>
      </div>

      {/* 2. Top-Right Card: Account Blocked (WhatsApp Style) */}
      <div
        className="floating-alert-card anim-float-2"
        style={{
          position: 'absolute',
          top: '80px',
          right: '-10px',
          zIndex: 10,
        }}
      >
        <div className="card-icon-wrap" style={{ background: '#16A34A' }}>
          <MessageCircle size={18} color="#FFFFFF" />
        </div>
        <div>
          <div className="card-title" style={{ color: '#86EFAC' }}>Your account</div>
          <div className="card-subtitle">will be blocked today!</div>
        </div>
      </div>

      {/* 3. Center-Left Card: Claim Reward Link */}
      <div
        className="floating-alert-card anim-float-3"
        style={{
          position: 'absolute',
          top: '210px',
          left: '-20px',
          zIndex: 10,
        }}
      >
        <div className="card-icon-wrap" style={{ background: '#8B5CF6' }}>
          <Link2 size={18} color="#FFFFFF" />
        </div>
        <div>
          <div className="card-title" style={{ color: '#DDD6FE' }}>Click here to claim</div>
          <div className="card-subtitle">your reward!</div>
        </div>
      </div>

      {/* 4. Center-Right Card: Bank Support OTP */}
      <div
        className="floating-alert-card anim-float-4"
        style={{
          position: 'absolute',
          top: '215px',
          right: '-25px',
          zIndex: 10,
        }}
      >
        <div className="card-icon-wrap" style={{ background: '#0D9488' }}>
          <UserCheck size={18} color="#FFFFFF" />
        </div>
        <div>
          <div className="card-title" style={{ color: '#5EEAD4' }}>I'm from bank support.</div>
          <div className="card-subtitle">Share your OTP.</div>
        </div>
      </div>

      {/* 5. Bottom-Right Card: QR Code Gift */}
      <div
        className="floating-alert-card anim-float-5"
        style={{
          position: 'absolute',
          bottom: '75px',
          right: '5%',
          zIndex: 10,
        }}
      >
        <div className="card-icon-wrap" style={{ background: '#0284C7' }}>
          <QrCode size={18} color="#FFFFFF" />
        </div>
        <div>
          <div className="card-title" style={{ color: '#7DD3FC' }}>Scan this QR for</div>
          <div className="card-subtitle">free gift!</div>
        </div>
      </div>

      {/* Handwritten Style Bottom-Right Annotation */}
      <div
        className="handwritten-caption"
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '-15px',
          zIndex: 11,
          textAlign: 'right',
        }}
      >
        <div>Spot the red flags.</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
          <span>Stay secure.</span>
        </div>
        <div className="underline-lime" style={{ marginLeft: 'auto' }} />
      </div>
    </div>
  );
}
