import request from 'supertest';
import app from '../src/app.js';
import { analyzeMessage, analyzeUrl } from '../src/services/analyzerService.js';
import { evaluateQuiz } from '../src/services/quizService.js';

describe('ScamLens Backend API & Analysis Engine Test Suite', () => {

  describe('Health Check Endpoint', () => {
    it('should return 200 OK with healthy status and database mode', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.service).toBe('ScamLens Backend API');
    });
  });

  describe('Authentication Endpoints', () => {
    const testUser = {
      name: 'Cyber Defender',
      email: `test_${Date.now()}@example.com`,
      password: 'SafePassword123!',
      confirmPassword: 'SafePassword123!'
    };

    it('should reject registration with invalid email or weak password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'A', email: 'invalid-email', password: 'short' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });

    it('should successfully register a valid new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe(testUser.email.toLowerCase());
      expect(res.body.user).not.toHaveProperty('password_hash');
    });

    it('should prevent duplicate registration with the same email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });

    it('should reject login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'WrongPassword999!' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.errors[0]).toBe('Invalid email or password.');
    });

    it('should successfully log in with correct credentials and establish session', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe(testUser.email.toLowerCase());
      expect(res.headers['set-cookie']).toBeDefined();
    });
  });

  describe('Scam Analysis Engine - Unit Tests', () => {
    it('should detect OTP harvesting and urgency threats in suspicious message', () => {
      const input = "I am from bank support. Your account will be blocked today! Share your OTP immediately to verify.";
      const analysis = analyzeMessage(input);

      expect(analysis.riskCategory).toBe('High risk');
      expect(analysis.warningCount).toBeGreaterThanOrEqual(2);
      const signIds = analysis.findings.map(f => f.id);
      expect(signIds).toContain('cred-harvesting');
      expect(signIds).toContain('urgency-threat');
    });

    it('should detect upfront job scam / telegram task scam', () => {
      const input = "Work from home earn ₹50,000/month by liking YouTube videos. Deposit registration fee ₹1500 to activate.";
      const analysis = analyzeMessage(input);

      expect(analysis.riskCategory).toBe('High risk');
      const signIds = analysis.findings.map(f => f.id);
      expect(signIds).toContain('job-fee-scam');
    });

    it('should flag suspicious URL with IP address hostname', () => {
      const input = "http://192.168.1.100/login-secure";
      const analysis = analyzeUrl(input);

      expect(analysis.riskCategory).toBe('High risk');
      const signIds = analysis.findings.map(f => f.id);
      expect(signIds).toContain('ip-address-host');
      expect(signIds).toContain('plain-http');
    });

    it('should detect brand typosquatting on deceptive domains', () => {
      const input = "https://paypal-security-update.verify-account-portal.com";
      const analysis = analyzeUrl(input);

      expect(analysis.riskCategory).toBe('High risk');
      const signIds = analysis.findings.map(f => f.id);
      expect(signIds).toContain('brand-typosquat');
    });

    it('should not flag benign message as high risk', () => {
      const input = "Hi Mom, I am arriving at the train station at 6 PM. See you soon!";
      const analysis = analyzeMessage(input);

      expect(analysis.riskCategory).toBe('No obvious warning signs detected');
      expect(analysis.warningCount).toBe(0);
    });
  });

  describe('Interactive Quiz Evaluation', () => {
    it('should correctly calculate score and return explanations', () => {
      const sampleAnswers = [
        { questionId: 1, selectedOptionId: 'b' }, // correct
        { questionId: 2, selectedOptionId: 'a' }  // correct
      ];

      const result = evaluateQuiz(sampleAnswers);
      expect(result.score).toBe(2);
      expect(result.results.length).toBeGreaterThan(0);
      expect(result.results[0].explanation).toBeDefined();
    });
  });

  describe('Protected Endpoints & Authorization Control', () => {
    it('should deny unauthenticated access to /api/history with 401', async () => {
      const res = await request(app).get('/api/history');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
