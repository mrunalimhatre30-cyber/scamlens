import React, { useState } from 'react';
import {
  MessageSquare,
  Link as LinkIcon,
  FileText,
  QrCode,
  Paperclip,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Info,
  Loader2,
  BookmarkCheck,
  ExternalLink
} from 'lucide-react';
import { analyzeMessage, analyzeUrl } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function CheckerCard({ onAnalysisComplete, initialInput = '', initialType = 'message' }) {
  const [activeTab, setActiveTab] = useState(initialType);
  const [inputText, setInputText] = useState(initialInput);
  const [fileDetails, setFileDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveToAccount, setSaveToAccount] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { isAuthenticated } = useAuth();

  // Preset demo samples for instant user verification
  const demoSamples = [
    {
      label: 'Bank Support OTP',
      type: 'message',
      text: "I'm from bank support. Your account will be blocked today! Share your OTP immediately to cancel deactivation."
    },
    {
      label: 'Job Offer Scam',
      type: 'message',
      text: "Earn ₹50,000/month from home by liking YouTube videos. Deposit registration fee ₹1500 to unlock your tasks on Telegram."
    },
    {
      label: 'UPI QR Code Trick',
      type: 'message',
      text: "I am sending you a QR code on WhatsApp. Scan this QR code and enter your UPI PIN to receive ₹4,000 in your bank account."
    },
    {
      label: 'Phishing URL',
      type: 'url',
      text: "http://192.168.1.45/sbi-netbanking-verify-secure.html"
    },
    {
      label: 'Safe Family Chat',
      type: 'message',
      text: "Hi Mom, I will reach home around 7 PM today. Please keep dinner ready!"
    }
  ];

  const handleApplySample = (sample) => {
    setActiveTab(sample.type);
    setInputText(sample.text);
    setResult(null);
    setErrorMessage('');
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setResult(null);
    setSavedSuccess(false);

    if (activeTab === 'message') {
      if (!inputText.trim()) {
        setErrorMessage('Please paste or type a message to inspect.');
        return;
      }
      setLoading(true);
      try {
        const data = await analyzeMessage(inputText, isAuthenticated && saveToAccount);
        setResult(data.analysis);
        if (data.analysis.savedToHistory) setSavedSuccess(true);
        if (onAnalysisComplete) onAnalysisComplete(data.analysis);
      } catch (err) {
        setErrorMessage(err.message || 'Analysis failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (activeTab === 'url') {
      if (!inputText.trim()) {
        setErrorMessage('Please enter a web URL (e.g., https://example.com) to inspect.');
        return;
      }
      setLoading(true);
      try {
        const data = await analyzeUrl(inputText, isAuthenticated && saveToAccount);
        setResult(data.analysis);
        if (data.analysis.savedToHistory) setSavedSuccess(true);
        if (onAnalysisComplete) onAnalysisComplete(data.analysis);
      } catch (err) {
        setErrorMessage(err.message || 'URL inspection failed. Please check the address format.');
      } finally {
        setLoading(false);
      }
    } else if (activeTab === 'file') {
      if (!fileDetails) {
        setErrorMessage('Please select a file to inspect its structural safety.');
        return;
      }
      // Inspect file extension and suspicious double extensions
      const ext = fileDetails.name.split('.').pop().toLowerCase();
      const dangerousExts = ['exe', 'scr', 'bat', 'vbs', 'cmd', 'msi', 'ps1', 'jar', 'apk', 'iso'];
      const isDangerous = dangerousExts.includes(ext);
      const isDoubleExt = fileDetails.name.match(/\.(pdf|doc|jpg|png)\.(exe|scr|bat|vbs)$/i);

      setResult({
        riskCategory: isDangerous || isDoubleExt ? 'High risk' : 'No obvious warning signs detected',
        summary: isDangerous || isDoubleExt
          ? `File extension .${ext} indicates an executable binary or script that can compromise your system.`
          : `Standard document/media format detected (${ext.toUpperCase()}).`,
        warningCount: isDangerous || isDoubleExt ? 1 : 0,
        findings: isDangerous || isDoubleExt ? [{
          id: 'executable-file',
          title: 'Direct Executable or Script File Format',
          severity: 'high',
          evidence: fileDetails.name,
          whyItMatters: 'Attackers frequently disguise malware as invoices, resumes, or receipts with executable extensions.',
          verificationStep: 'Do NOT double-click or run this file. Verify with the sender via an alternate verified channel.',
          limitation: 'Analysis checks file type heuristics safely in browser sandbox without executing the file.'
        }] : [],
        safeNextSteps: [
          'Scan with a local antivirus solution before opening.',
          'Never run attachments received from unsolicited or suspicious contacts.'
        ],
        disclaimer: 'File safety inspection is performed safely without executing untrusted binaries.'
      });
    } else if (activeTab === 'qr') {
      setResult({
        riskCategory: 'Caution advised',
        summary: 'QR codes are passive graphic representations of URLs or UPI payment strings.',
        warningCount: 1,
        findings: [{
          id: 'qr-warning',
          title: 'QR Code Redirection Vector (Quishing)',
          severity: 'medium',
          evidence: 'Physical or digital QR matrix code',
          whyItMatters: 'Scanning a QR code takes you to a destination without allowing you to inspect the URL beforehand. Furthermore, scammers exploit QR codes to request payments under the guise of "receiving money".',
          verificationStep: 'Remember: You NEVER scan a QR code to RECEIVE money via UPI. If the QR opens a website, inspect the browser URL bar carefully before signing in.',
          limitation: 'Ensure your phone camera preview shows the destination link before tapping to open it.'
        }],
        safeNextSteps: [
          'Never scan a QR code sent by an online buyer or stranger.',
          'Verify the URL in your browser before entering credentials.'
        ],
        disclaimer: 'Inspect the destination URL using our URL Checker tab.'
      });
    }
  };

  const getRiskBadge = (category) => {
    switch (category) {
      case 'High risk':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          color: '#EF4444',
          border: 'rgba(239, 68, 68, 0.4)',
          icon: <AlertOctagon size={18} color="#EF4444" />
        };
      case 'Caution advised':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          color: '#F59E0B',
          border: 'rgba(245, 158, 11, 0.4)',
          icon: <AlertTriangle size={18} color="#F59E0B" />
        };
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#10B981',
          border: 'rgba(16, 185, 129, 0.4)',
          icon: <CheckCircle2 size={18} color="#10B981" />
        };
    }
  };

  return (
    <div className="glass-panel" style={{
      padding: '1.75rem',
      maxWidth: '680px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 5,
    }}>
      {/* Tab Selectors */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
      }}>
        <button
          type="button"
          onClick={() => { setActiveTab('message'); setResult(null); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.88rem',
            fontWeight: 600,
            background: activeTab === 'message' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeTab === 'message' ? 'var(--lime)' : 'var(--text-secondary)',
            border: activeTab === 'message' ? '1.5px solid var(--lime)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          <MessageSquare size={16} />
          <span>Message</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('url'); setResult(null); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.88rem',
            fontWeight: 600,
            background: activeTab === 'url' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeTab === 'url' ? 'var(--lime)' : 'var(--text-secondary)',
            border: activeTab === 'url' ? '1.5px solid var(--lime)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          <LinkIcon size={16} />
          <span>URL</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('file'); setResult(null); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.88rem',
            fontWeight: 600,
            background: activeTab === 'file' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeTab === 'file' ? 'var(--lime)' : 'var(--text-secondary)',
            border: activeTab === 'file' ? '1.5px solid var(--lime)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          <FileText size={16} />
          <span>File</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('qr'); setResult(null); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.88rem',
            fontWeight: 600,
            background: activeTab === 'qr' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeTab === 'qr' ? 'var(--lime)' : 'var(--text-secondary)',
            border: activeTab === 'qr' ? '1.5px solid var(--lime)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          <QrCode size={16} />
          <span>Image (QR)</span>
        </button>
      </div>

      {/* Main Input Field Container */}
      <form onSubmit={handleAnalyze}>
        {activeTab === 'message' || activeTab === 'url' ? (
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.6rem 0.5rem 1rem',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
            transition: 'border-color 0.2s',
          }}>
            <Paperclip size={18} color="var(--text-muted)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={activeTab === 'url' ? 'Enter suspicious link (e.g. http://192.168.1.1/login or bit.ly/...)' : 'Paste a suspicious message, URL or job offer here...'}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-lime"
              style={{
                padding: '0.6rem 1.3rem',
                fontSize: '0.88rem',
                flexShrink: 0,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="anim-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Analyse</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        ) : activeTab === 'file' ? (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-input)',
            border: '1.5px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <FileText size={32} color="var(--lime)" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Select file to inspect extension and safety indicators</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Inspects executable risks and disguised extensions safely in your browser.
            </div>
            <input
              type="file"
              onChange={(e) => setFileDetails(e.target.files[0])}
              style={{ display: 'none' }}
              id="file-upload-input"
            />
            <label htmlFor="file-upload-input" className="btn btn-outline" style={{ display: 'inline-flex', cursor: 'pointer' }}>
              Choose File
            </label>
            {fileDetails && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--lime)' }}>
                Selected: {fileDetails.name} ({(fileDetails.size / 1024).toFixed(1)} KB)
              </div>
            )}
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" disabled={!fileDetails || loading} className="btn btn-lime">
                Analyse File Safety
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <QrCode size={36} color="var(--lime)" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontWeight: 600, marginBottom: '0.35rem' }}>QR Code Safety Verification</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1rem auto' }}>
              Scammers exploit QR codes to initiate unauthorized money deductions or hide malicious phishing URLs.
            </p>
            <button type="submit" className="btn btn-lime">
              Inspect QR Scam Rules & Risks
            </button>
          </div>
        )}

        {/* Demo Fast-Test Chips */}
        <div style={{
          marginTop: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Try sample:</span>
          {demoSamples.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplySample(sample)}
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(49, 83, 68, 0.4)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--lime)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Privacy Note & Optional Account Save */}
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} color="var(--emerald)" />
            <span>Your privacy matters. We don't store your raw messages.</span>
          </div>

          {isAuthenticated && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={saveToAccount}
                onChange={(e) => setSaveToAccount(e.target.checked)}
              />
              <span>Save sanitized summary to my dashboard</span>
            </label>
          )}
        </div>
      </form>

      {/* Error Message Alert */}
      {errorMessage && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--risk-high-bg)',
          border: '1px solid var(--risk-high)',
          borderRadius: 'var(--radius-sm)',
          color: '#FCA5A5',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <AlertOctagon size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Analysis Results Drawer */}
      {result && (
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color)',
        }}>
          {/* Header & Risk Category Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: getRiskBadge(result.riskCategory).bg,
              border: `1.5px solid ${getRiskBadge(result.riskCategory).border}`,
              color: getRiskBadge(result.riskCategory).color,
              fontWeight: 700,
              fontSize: '0.85rem',
            }}>
              {getRiskBadge(result.riskCategory).icon}
              <span>{result.riskCategory}</span>
            </div>

            {savedSuccess && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--lime)', fontSize: '0.8rem' }}>
                <BookmarkCheck size={16} />
                <span>Saved to your dashboard</span>
              </div>
            )}
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {result.summary}
          </p>

          {/* Warning Signs List */}
          {result.findings && result.findings.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Detected Warning Indicators ({result.findings.length}):
              </div>

              {result.findings.map((f, i) => (
                <div key={i} style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(18, 33, 28, 0.7)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.92rem', color: 'var(--lime)', marginBottom: '0.35rem' }}>
                    <AlertTriangle size={16} color="var(--lime)" />
                    <span>{f.title}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <strong>Why it matters:</strong> {f.whyItMatters}
                  </div>
                  {f.evidence && (
                    <div style={{
                      padding: '0.4rem 0.6rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontFamily: 'monospace',
                      color: '#FDBA74',
                      marginBottom: '0.5rem',
                    }}>
                      Evidence: "{f.evidence}"
                    </div>
                  )}
                  <div style={{ fontSize: '0.82rem', color: 'var(--emerald)' }}>
                    <strong>Recommended verification:</strong> {f.verificationStep}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Safe Next Steps */}
          {result.safeNextSteps && result.safeNextSteps.length > 0 && (
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--lime)', marginBottom: '0.5rem' }}>
                Safer Next Actions:
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {result.safeNextSteps.map((step, sIdx) => (
                  <li key={sIdx}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={14} />
            <span>{result.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
}
