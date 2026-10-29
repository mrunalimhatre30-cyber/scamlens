/**
 * ScamLens Client API Service with Hybrid Resilient Fallback
 * Connects to Express backend when available, and provides seamless
 * client-side heuristic fallback if the backend is waking up or not yet configured.
 */

import { analyzeMessage as localAnalyzeMessage, analyzeUrl as localAnalyzeUrl } from './clientAnalyzer';
import { getQuizQuestions as localGetQuizQuestions, evaluateQuiz as localEvaluateQuiz } from './clientQuiz';

const envBase = import.meta.env.VITE_API_BASE_URL;

// Avoid Mixed Content error if running on HTTPS production without VITE_API_BASE_URL
const isHttpsHost = typeof window !== 'undefined' && window.location.protocol === 'https:';
const API_BASE = envBase || (isHttpsHost ? null : 'http://localhost:5000/api');

async function request(endpoint, options = {}) {
  if (!API_BASE) {
    throw new Error('BACKEND_UNAVAILABLE');
  }

  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include'
  };

  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data.errors ? data.errors.join(' ') : (data.error || `Request failed with status ${res.status}`);
    const error = new Error(errorMsg);
    error.status = res.status;
    error.details = data;
    throw error;
  }

  return data;
}

// -----------------------------------------------------------------------------
// Authentication APIs (Hybrid Resilient)
// -----------------------------------------------------------------------------
export async function registerUser(name, email, password, confirmPassword) {
  try {
    return await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword })
    });
  } catch (err) {
    if (err.status) throw err;
    // Client resilient fallback for instant live access
    const user = { id: Date.now(), name: name.trim(), email: email.trim().toLowerCase() };
    localStorage.setItem('scamlens_active_user', JSON.stringify(user));
    return { success: true, user, isOfflineMode: true };
  }
}

export async function loginUser(email, password) {
  try {
    return await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  } catch (err) {
    if (err.status) throw err;
    const user = { id: Date.now(), name: email.split('@')[0], email: email.trim().toLowerCase() };
    localStorage.setItem('scamlens_active_user', JSON.stringify(user));
    return { success: true, user, isOfflineMode: true };
  }
}

export async function demoLoginUser() {
  try {
    return await request('/auth/demo', { method: 'POST' });
  } catch (err) {
    const user = { id: 999, name: 'Guest Explorer', email: 'guest.demo@scamlens.local' };
    localStorage.setItem('scamlens_active_user', JSON.stringify(user));
    return { success: true, user, isOfflineMode: true };
  }
}

export async function logoutUser() {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch {
    // Ignore backend unreachable on logout
  } finally {
    localStorage.removeItem('scamlens_active_user');
  }
}

export async function getCurrentUser() {
  try {
    return await request('/auth/me', { method: 'GET' });
  } catch {
    const cached = localStorage.getItem('scamlens_active_user');
    if (cached) {
      try {
        return { success: true, authenticated: true, user: JSON.parse(cached) };
      } catch {
        // invalid JSON
      }
    }
    return { success: true, authenticated: false, user: null };
  }
}

// -----------------------------------------------------------------------------
// Scam Analysis APIs (Hybrid Resilient)
// -----------------------------------------------------------------------------
export async function analyzeMessage(message, saveToHistory = false) {
  try {
    return await request('/analyze/message', {
      method: 'POST',
      body: JSON.stringify({ message, saveToHistory })
    });
  } catch (err) {
    if (err.status) throw err;
    // Execute rule-based analysis directly in-browser
    const analysis = localAnalyzeMessage(message);
    if (saveToHistory) {
      saveLocalHistory('message', message.slice(0, 60), analysis);
      analysis.savedToHistory = true;
    }
    return { success: true, analysis };
  }
}

export async function analyzeUrl(url, saveToHistory = false) {
  try {
    return await request('/analyze/url', {
      method: 'POST',
      body: JSON.stringify({ url, saveToHistory })
    });
  } catch (err) {
    if (err.status) throw err;
    const analysis = localAnalyzeUrl(url);
    if (saveToHistory) {
      saveLocalHistory('url', (analysis.domain || url).slice(0, 60), analysis);
      analysis.savedToHistory = true;
    }
    return { success: true, analysis };
  }
}

// -----------------------------------------------------------------------------
// History APIs
// -----------------------------------------------------------------------------
export async function fetchScanHistory() {
  try {
    return await request('/history', { method: 'GET' });
  } catch {
    const raw = localStorage.getItem('scamlens_scan_history') || '[]';
    return { success: true, history: JSON.parse(raw) };
  }
}

export async function fetchHistoryById(id) {
  try {
    return await request(`/history/${id}`, { method: 'GET' });
  } catch {
    const raw = JSON.parse(localStorage.getItem('scamlens_scan_history') || '[]');
    const record = raw.find(r => r.id === id);
    if (!record) throw new Error('Record not found');
    return { success: true, record };
  }
}

export async function deleteScanHistory(id) {
  try {
    return await request(`/history/${id}`, { method: 'DELETE' });
  } catch {
    const raw = JSON.parse(localStorage.getItem('scamlens_scan_history') || '[]');
    const filtered = raw.filter(r => r.id !== id);
    localStorage.setItem('scamlens_scan_history', JSON.stringify(filtered));
    return { success: true, message: 'Deleted' };
  }
}

function saveLocalHistory(type, snippet, analysis) {
  const raw = JSON.parse(localStorage.getItem('scamlens_scan_history') || '[]');
  const item = {
    id: Date.now(),
    input_type: type,
    target_snippet: snippet,
    risk_category: analysis.riskCategory,
    warning_count: analysis.warningCount,
    findings: analysis.findings,
    created_at: new Date().toISOString()
  };
  raw.unshift(item);
  localStorage.setItem('scamlens_scan_history', JSON.stringify(raw.slice(0, 50)));
}

// -----------------------------------------------------------------------------
// Quiz APIs
// -----------------------------------------------------------------------------
export async function fetchQuizQuestions() {
  try {
    return await request('/quiz/questions', { method: 'GET' });
  } catch {
    return { success: true, questions: localGetQuizQuestions() };
  }
}

export async function submitQuizAnswers(answers) {
  try {
    return await request('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  } catch {
    return { success: true, evaluation: localEvaluateQuiz(answers) };
  }
}

export async function fetchQuizProgress() {
  try {
    return await request('/quiz/progress', { method: 'GET' });
  } catch {
    return { success: true, progress: [] };
  }
}

export async function checkServerHealth() {
  try {
    return await request('/health', { method: 'GET' });
  } catch {
    return { status: 'offline', mode: 'client-resilient' };
  }
}
