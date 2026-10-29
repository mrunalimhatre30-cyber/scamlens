import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import analyzeRoutes from './routes/analyzeRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import { isUsingMySQL } from './config/db.js';

dotenv.config();

const app = express();

// Trust reverse proxies (Render, Vercel, Heroku) for secure cookies
app.set('trust proxy', 1);

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS configuration supporting credentials across Vercel & Render
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://scamlens-eight.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || /\.vercel\.app$/.test(origin)) {
      callback(null, origin || true);
    } else {
      callback(null, origin || true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing with limits
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: true, limit: '200kb' }));
app.use(cookieParser());

// Server-side Session Management
const isProduction = process.env.NODE_ENV === 'production';
app.use(session({
  name: 'scamlens_sid',
  secret: process.env.SESSION_SECRET || 'scamlens-secure-session-dev-key-99x',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax', // Allows cross-site session between Vercel frontend and Render backend
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Rate Limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, error: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, error: 'Too many authentication attempts. Please try again after 15 minutes.' }
});

const analysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Analysis rate limit reached. Please wait a few moments before scanning again.' }
});

app.use('/api', globalLimiter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/analyze', analysisLimiter, analyzeRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/quiz', quizRoutes);

// System Health Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'ScamLens Backend API',
    database: isUsingMySQL() ? 'MySQL (connected)' : 'Resilient In-Memory Mode (Ready for MySQL)',
    timestamp: new Date().toISOString()
  });
});

// Central 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: isProduction ? 'An unexpected internal error occurred.' : (err.message || 'Internal server error.')
  });
});

export default app;
