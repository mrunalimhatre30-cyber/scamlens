import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  CreditCard,
  Briefcase,
  Headphones,
  TrendingUp,
  Share2,
  ShoppingBag,
  Download,
  Mic,
  LifeBuoy,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function SafetyGuide() {
  const [activeCategory, setActiveCategory] = useState('upi');

  const guides = [
    {
      id: 'upi',
      title: 'UPI & QR Code Scams',
      icon: <CreditCard size={20} />,
      badge: 'High Frequency',
      summary: 'Fraudsters manipulate QR codes and UPI transaction requests to trick victims into paying money instead of receiving it.',
      goldenRule: 'You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money.',
      tactics: [
        'The Fake Buyer: A buyer on marketplace platforms (OLX, Facebook) claims to send an advance payment via QR code.',
        'Reverse Request: Scammer sends a "Collect Request" for ₹5,000 disguised as a refund.',
        'Tampered Merchant QRs: Fraudulent stickers pasted over legitimate physical QR stands at shops.'
      ],
      safeActions: [
        'To receive money, only share your mobile number or UPI ID (VPA).',
        'If a screen prompts you for your 4-digit or 6-digit PIN, money will LEAVE your account.',
        'Immediately report unauthorized UPI debits to your bank and dial 1930.'
      ]
    },
    {
      id: 'jobs',
      title: 'Fake Jobs & "Task" Scams',
      icon: <Briefcase size={20} />,
      badge: 'Critical Threat',
      summary: 'Promises of flexible work-from-home earnings via liking YouTube videos, rating hotels, or reviewing apps.',
      goldenRule: 'Legitimate employers pay you for your work; they never require upfront registration deposits or VIP unlocking fees.',
      tactics: [
        'Telegram Task Groups: Users receive ₹150 for the first 3 tasks to build false trust, then are asked to deposit ₹5,000 to "unlock high-yield missions".',
        'Fake Offer Letters: Impersonating tech giants (Amazon, Google, TCS) with forged logos and unofficial Gmail domains.'
      ],
      safeActions: [
        'Verify job postings directly on official company career portals (e.g. company.com/careers).',
        'Never pay for job applications, test assignments, or background check deposits.',
        'Avoid recruitment interactions conducted exclusively over Telegram or WhatsApp.'
      ]
    },
    {
      id: 'digital-arrest',
      title: '"Digital Arrest" & Fake Police Calls',
      icon: <ShieldAlert size={20} />,
      badge: 'Severe Extortion',
      summary: 'Criminals impersonating police, CBI, or customs officials claiming illegal narcotics or money laundering parcels exist in your name.',
      goldenRule: 'There is NO legal provision for "Digital Arrest" under Indian law. Law enforcement never conducts trials over video calls.',
      tactics: [
        'Fake Police Station Backgrounds: Fraudsters wear counterfeit uniforms on Skype or WhatsApp video calls with artificial police seals.',
        'Demands for "RBI Verification Deposits": Victims are coerced into transferring savings to "clear their name".'
      ],
      safeActions: [
        'Disconnect immediately. Real police or courts issue formal physical summons.',
        'Do not share PAN, Aadhaar, or bank details under pressure.',
        'File an immediate complaint on cybercrime.gov.in and alert your family.'
      ]
    },
    {
      id: 'support',
      title: 'Fake Customer Support & Remote Access',
      icon: <Headphones size={20} />,
      badge: 'Device Takeover',
      summary: 'Counterfeit customer service phone numbers posted on Google Search to lure people seeking refunds or airline assistance.',
      goldenRule: 'Never install remote desktop tools (AnyDesk, TeamViewer, RustDesk) at the instruction of customer support.',
      tactics: [
        'Sponsored Google Ads: Searching for "airline refund contact" displays an attacker\'s mobile number at the top of search results.',
        'Remote Control Takeover: Attacker guides the victim to install AnyDesk, then reads incoming banking OTPs directly off the screen.'
      ],
      safeActions: [
        'Only obtain customer care numbers from the verified app or official website contact page.',
        'Never share remote connection codes (e.g. 9-digit AnyDesk ID) with strangers.'
      ]
    },
    {
      id: 'investment',
      title: 'Investment & Loan App Scams',
      icon: <TrendingUp size={20} />,
      badge: 'Financial Trap',
      summary: 'Fraudulent crypto trading portals, WhatsApp stock tip groups, and illegal predatory instant loan apps.',
      goldenRule: 'Guaranteed 200% returns do not exist. Regulated financial advisors are registered with SEBI.',
      tactics: [
        'Fake Trading Dashboards: Show fictitious paper profits, but demand huge "exit taxes" when you try to withdraw funds.',
        'Blackmail Loan Apps: Rogue APKs steal your contact book and photos, then blackmail you for repayment.'
      ],
      safeActions: [
        'Check SEBI registration before following investment tips.',
        'Never install loan apps from APK links or unregulated third-party sources.'
      ]
    },
    {
      id: 'recovery',
      title: 'Emergency Recovery: What To Do If Scammed',
      icon: <LifeBuoy size={20} />,
      badge: 'Critical Checklist',
      summary: 'Step-by-step emergency protocol to minimize damage and maximize fund recovery if you have interacted with a scam.',
      goldenRule: 'Act within the "Golden Hour" — the first 2 hours after a fraudulent transaction offer the highest chance of freezing funds.',
      tactics: [
        'Immediate Bank Freeze: Call your bank helpline immediately to block compromised cards, net banking, and UPI VPAs.',
        'Dial 1930 Helpline: The Citizen Financial Cyber Fraud Reporting System can trigger inter-bank lien holds on stolen funds.',
        'File at cybercrime.gov.in: Submit transaction IDs, screenshots, phone numbers, and URLs.'
      ],
      safeActions: [
        'Change all account passwords from a separate, uncompromised device.',
        'Enable 2-Factor Authentication (App-based authenticator preferred over SMS).',
        'Beware of "Recovery Scammers" who claim they can hack your money back for a fee.'
      ]
    }
  ];

  const current = guides.find(g => g.id === activeCategory) || guides[0];

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-pill">
              <ShieldAlert size={14} color="#C4F56A" />
              <span>Official Cybersecurity Playbooks</span>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', fontWeight: 800, marginBottom: '0.6rem' }}>
            Cyber Safety <span style={{ color: 'var(--lime)' }}>Guide</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Understand the psychological tricks, technical vectors, and defensive rules needed to keep yourself and your family safe.
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1.5px solid rgba(239, 68, 68, 0.5)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <PhoneCall size={22} color="#EF4444" />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#FCA5A5', fontSize: '1.05rem' }}>
                Victim of Financial Cyber Fraud? Dial 1930 Immediately
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Government of India National Cyber Helpline (24x7). Prompt reporting allows law enforcement to freeze money in transit.
              </div>
            </div>
          </div>

          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ fontSize: '0.85rem', borderColor: '#EF4444', color: '#FCA5A5', gap: '0.4rem' }}
          >
            <span>Visit cybercrime.gov.in</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Guides Layout: Category Sidebar & Content Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(250px, 320px) minmax(0, 1fr)',
          gap: '2rem',
        }}>
          {/* Sidebar Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {guides.map((g) => {
              const isActive = g.id === activeCategory;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveCategory(g.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'rgba(16, 185, 129, 0.18)' : 'rgba(25, 41, 35, 0.6)',
                    border: `1.5px solid ${isActive ? 'var(--lime)' : 'var(--border-color)'}`,
                    color: isActive ? 'var(--lime)' : 'var(--text-primary)',
                    textAlign: 'left',
                    fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: isActive ? 'var(--lime)' : 'var(--emerald)' }}>{g.icon}</span>
                    <span style={{ fontSize: '0.92rem' }}>{g.title}</span>
                  </div>
                  <ChevronRight size={16} color={isActive ? 'var(--lime)' : 'var(--text-muted)'} />
                </button>
              );
            })}
          </div>

          {/* Guide Content Display */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {current.title}
              </h2>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(196, 245, 106, 0.15)',
                color: 'var(--lime)',
                border: '1px solid rgba(196, 245, 106, 0.3)',
              }}>
                {current.badge}
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {current.summary}
            </p>

            {/* Golden Rule Banner */}
            <div style={{
              padding: '1.25rem',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              borderLeft: '4px solid var(--lime)',
              borderRadius: '0 8px 8px 0',
              marginBottom: '2rem',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                Golden Rule
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {current.goldenRule}
              </div>
            </div>

            {/* Common Attack Tactics */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#F59E0B" />
                <span>Common Deceptive Patterns</span>
              </h3>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {current.tactics.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Practical Safe Actions */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} color="var(--emerald)" />
                <span>Recommended Verification & Defensive Steps</span>
              </h3>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {current.safeActions.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
