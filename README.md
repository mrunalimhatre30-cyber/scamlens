# ScamLens — Cybersecurity Platform

> **"Think Before You Click. Stay One Step Ahead of Scams."**

ScamLens is a full-stack cybersecurity application designed to help students, job seekers, families, and everyday internet users identify potential scams, understand deceptive psychological tactics, verify suspicious communications, and take safe defensive actions.

![ScamLens Hero](frontend/public/images/hero-shield.jpg)

---

## 🌟 Key Features

1. **Explainable Scam Analysis Engine**
   - **Message Inspection:** Detects credential & OTP harvesting, artificial urgency/threat of arrest ("Digital Arrest"), upfront part-time job fees, off-platform diversion, and unauthorized UPI collect requests.
   - **URL Structural Scanner:** Safely parses domain names, flag lookalike brands (typosquatting), raw IP addresses, and plain HTTP connections without visiting untrusted web destinations.
   - **File & QR Safety Rules:** Actionable educational guidance on dangerous file extensions (`.exe`, `.scr`, double extensions `.pdf.exe`) and QR code payment scams.
   - **Explainable Findings:** Every detected flag includes *Why It Matters*, *Evidence Found*, *Recommended Verification Steps*, and *Limitations*.

2. **Pixel-Perfect Cybersecurity Design System**
   - Matches the dark charcoal (`#101B17`), deep forest green (`#192923`), emerald (`#10B981`), and bright lime (`#C4F56A`) theme.
   - 3D shield-and-lock hero centerpiece with concentric energy rings and glassmorphic floating scam-alert cards.
   - Working Light & Dark cyber theme toggle with smooth CSS variable switching.
   - Responsive design adapting gracefully to desktop, tablet, and mobile screens.

3. **Secure Authentication & Session Management**
   - Account registration with password strength requirements (min 8 characters + number/symbol).
   - Password hashing via **bcryptjs** (12 salt rounds).
   - Secure server-side sessions via **express-session** with `HttpOnly` cookies and SameSite protection.
   - Rate-limiting on authentication and analysis endpoints via **express-rate-limit**.
   - Security HTTP headers configured with **helmet**.

4. **User Security Dashboard**
   - View profile summary and session status.
   - Privacy-preserving saved scan history with redacted excerpts and full findings drawer.
   - Deletion controls with strict user ownership enforcement (`WHERE id = ? AND user_id = ?`).
   - Scam Challenge progress tracking.

5. **Interactive Scam Challenge (Quiz)**
   - Curated fictional scenarios representing UPI fraud, fake recruitment, authority impersonation, and KYC phishing.
   - Instant answer verification, scoring, and celebratory confetti animations.

6. **Cyber Safety Guide & Emergency Response**
   - Deep-dive playbooks for 6+ major fraud vectors.
   - Official Indian Cyber Crime Reporting guidance: **National Helpline 1930** and [https://cybercrime.gov.in/](https://cybercrime.gov.in/).

---

## 📁 Project Architecture

```
scamlens/
├── frontend/                     # React + Vite Client
│   ├── public/
│   │   └── images/
│   │       └── hero-shield.jpg   # 3D Shield & Padlock Asset
│   ├── src/
│   │   ├── components/           # Navbar, Footer, CheckerCard, HeroIllustration, ProtectedRoute
│   │   ├── pages/                # Home, Checker, SafetyGuide, ScamChallenge, About, Login, Register, Dashboard
│   │   ├── services/             # api.js (Fetch client with credentials)
│   │   ├── hooks/                # useAuth.jsx, useTheme.jsx
│   │   ├── styles/               # theme.css (Tokens), index.css (Animations & Glassmorphism)
│   │   ├── App.jsx               # React Router Configuration
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express REST API
│   ├── database/
│   │   ├── schema.sql            # MySQL 8.0+ Table Definitions
│   │   └── seed.sql              # Verification script
│   ├── src/
│   │   ├── config/               # db.js (MySQL pool with resilient zero-setup fallback)
│   │   ├── controllers/          # authController, analyzeController, historyController, quizController
│   │   ├── middleware/           # authMiddleware (Session protection)
│   │   ├── routes/               # authRoutes, analyzeRoutes, historyRoutes, quizRoutes
│   │   ├── services/             # analyzerService (Rule heuristics), quizService
│   │   ├── validators/           # inputValidators (Server-side validation)
│   │   ├── app.js                # Express app setup (Helmet, CORS, Sessions, Rate limits)
│   │   └── server.js             # HTTP listener with graceful shutdown
│   ├── tests/
│   │   └── api.test.js           # Automated Jest integration tests (13 test cases)
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── .gitignore
├── package.json                  # Root runner scripts
└── README.md
```

---

## 🚀 Running the Project Locally

### Step 1: Prerequisites
Ensure the following tools are installed on your machine:
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **MySQL**: MySQL 8.0 or MySQL Workbench (Optional but recommended for persistent database storage)

---

### Step 2: Open Project in Visual Studio Code
Open terminal or PowerShell and navigate to the project directory:
```powershell
code "C:\Users\lenovo\.gemini\antigravity\scratch\scamlens"
```

---

### Step 3: Install Dependencies
Install dependencies for both frontend and backend:

```powershell
# In the root scamlens directory:
cd backend
npm install

cd ../frontend
npm install
```

---

### Step 4: MySQL Database Setup in MySQL Workbench

1. Launch **MySQL Workbench** and connect to your local MySQL instance (`localhost:3306`).
2. Click **File -> Open SQL Script...** and select:
   `scamlens/backend/database/schema.sql`
3. Click the yellow **Lightning Bolt (Execute)** icon to run the script. This will create:
   - Database: `scam_lens`
   - Tables: `users`, `scan_history`, `quiz_progress` with proper foreign keys and indexes.

---

### Step 5: Configure Backend Environment Variables

1. Open `backend/.env`.
2. Update the credentials with your MySQL password:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_actual_mysql_password
   DB_NAME=scam_lens

   SESSION_SECRET=scamlens_secure_session_secret_key_99
   ```

> **Note on Resilient Mode:** If you do not have MySQL installed or running, ScamLens automatically operates in a resilient in-memory mode. All authentication, scam analysis, history, and quizzes will work out of the box for testing!

---

### Step 6: Start the Backend Server

```powershell
cd backend
npm start
```
The server will boot and display:
```
--------------------------------------------------
          🛡️  ScamLens Cybersecurity API          
--------------------------------------------------
[Server] ScamLens backend listening on http://localhost:5000
[Health] Status endpoint: http://localhost:5000/api/health
```

---

### Step 7: Start the Frontend Application

In a separate terminal window:
```powershell
cd frontend
npm run dev
```
The Vite development server will open:
```
  VITE v8.3.5  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 8: Access the Website

Open your browser and navigate to:
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API Health:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Testing the Application

### 1. Run Automated Backend Tests
Run the comprehensive Jest test suite:
```powershell
cd backend
npm test
```
**Test Coverage:**
- Health check verification
- User registration & duplicate email rejection
- Password hashing with bcrypt
- Login authentication & session cookie generation
- Message analysis heuristics (OTP theft, Job task scams, Urgency threats)
- URL inspection heuristics (IP hosts, Typosquatting, Plain HTTP)
- Interactive quiz scoring & explanations
- Access control on protected endpoints (`401 Unauthorized`)

### 2. Manual User Journey Testing
1. **Try Instant Homepage Samples:** On the homepage or `/checker`, click the quick sample chips (`Bank Support OTP`, `Job Offer Scam`, `UPI QR Code Trick`, `Phishing URL`, `Safe Family Chat`). Notice the explainable findings and verification steps.
2. **Register a New Account:** Click **Get Started** or visit `/register`. Create an account with a secure password.
3. **Save an Analysis:** Go to `/checker`, paste a suspicious message, tick *"Save sanitized summary to my dashboard"*, and click **Analyse**.
4. **Inspect Dashboard:** Navigate to `/dashboard` to view your stored analyses, read the findings breakdown, or delete the record.
5. **Take the Scam Challenge:** Visit `/quiz` to take the interactive 5-scenario challenge and earn your score with celebratory confetti!
6. **Switch Theme:** Click the Sun/Moon toggle in the header to switch between Dark Charcoal and Clean Cyber Light modes.

---

## 🔒 Security Best Practices Implemented

- **No Plaintext Passwords:** Passwords hashed with bcrypt (12 salt rounds).
- **Session Security:** `HttpOnly`, `SameSite=Lax` (production `Strict`), and configurable `Secure` flags.
- **Privacy Preservation:** Sensitive messages are processed in-memory. Saved summaries redact phone numbers and numeric codes.
- **SSRF Prevention:** URLs are parsed with the standard `URL` parser without backend HTTP visits.
- **Rate Limiting:** Prevents brute-force authentication and spam requests.
- **SQL Injection Defense:** All queries use parameterized queries (`?`).

---

## ☁️ Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Set the root directory to `frontend`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable:
   `VITE_API_BASE_URL=https://your-backend-api.com/api`

### Backend Deployment (Render / Railway / DigitalOcean)
1. Set root directory to `backend`.
2. Start command: `node src/server.js`
3. Configure environment variables in the host dashboard:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-frontend-domain.com`
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (e.g. AWS RDS MySQL or PlanetScale)
   - `SESSION_SECRET=strong_random_secret_string`

---

## 🛡️ Official Emergency Reporting Resources (India)

- **National Cyber Financial Fraud Helpline:** `1930` (Available 24x7)
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **Reserve Bank of India (RBI) Sachet Portal:** [https://sachet.rbi.org.in](https://sachet.rbi.org.in)

---

## 📄 License & Attribution
Designed and built for digital safety education.
ScamLens © 2026. All rights reserved.
