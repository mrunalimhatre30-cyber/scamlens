import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Checker from './pages/Checker';
import SafetyGuide from './pages/SafetyGuide';
import ScamChallenge from './pages/ScamChallenge';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import WelcomeGate from './pages/WelcomeGate';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#101B17'
      }}>
        <Loader2 size={36} className="anim-spin" color="#C4F56A" />
      </div>
    );
  }

  // Access Gate: Show Welcome / Login screen first before accessing the app
  if (!isAuthenticated) {
    return <WelcomeGate />;
  }

  // Authenticated: Grant access to full ScamLens application suite
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checker" element={<Checker />} />
            <Route path="/safety-guide" element={<SafetyGuide />} />
            <Route path="/quiz" element={<ScamChallenge />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
