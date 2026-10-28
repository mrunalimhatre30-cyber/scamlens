/**
 * ScamLens Client API Service
 * Handles communication with the ScamLens Express backend.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include' // transmit session cookie
  };

  try {
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
  } catch (err) {
    if (err.status) throw err;
    // Network or connectivity issue
    const networkError = new Error('Unable to connect to the ScamLens backend server. Please check your connection.');
    networkError.isNetworkError = true;
    throw networkError;
  }
}

// Scam Analysis APIs
export async function analyzeMessage(message, saveToHistory = false) {
  return request('/analyze/message', {
    method: 'POST',
    body: JSON.stringify({ message, saveToHistory })
  });
}

export async function analyzeUrl(url, saveToHistory = false) {
  return request('/analyze/url', {
    method: 'POST',
    body: JSON.stringify({ url, saveToHistory })
  });
}

// Authentication APIs
export async function registerUser(name, email, password, confirmPassword) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, confirmPassword })
  });
}

export async function loginUser(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function logoutUser() {
  return request('/auth/logout', {
    method: 'POST'
  });
}

export async function getCurrentUser() {
  return request('/auth/me', {
    method: 'GET'
  });
}

// History APIs
export async function fetchScanHistory() {
  return request('/history', { method: 'GET' });
}

export async function fetchHistoryById(id) {
  return request(`/history/${id}`, { method: 'GET' });
}

export async function deleteScanHistory(id) {
  return request(`/history/${id}`, { method: 'DELETE' });
}

// Quiz APIs
export async function fetchQuizQuestions() {
  return request('/quiz/questions', { method: 'GET' });
}

export async function submitQuizAnswers(answers) {
  return request('/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({ answers })
  });
}

export async function fetchQuizProgress() {
  return request('/quiz/progress', { method: 'GET' });
}

export async function checkServerHealth() {
  return request('/health', { method: 'GET' });
}
