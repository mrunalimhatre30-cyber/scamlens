import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { validateRegistration, validateLogin } from '../validators/inputValidators.js';

export async function register(req, res, next) {
  try {
    const { isValid, errors, sanitized } = validateRegistration(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const { name, email, password } = sanitized;

    // Check if user already exists
    const existing = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        errors: ['An account with this email address already exists.']
      });
    }

    // Secure password hash
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const result = await query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );

    const userId = result.insertId;

    // Establish session
    req.session.userId = userId;
    req.session.userName = name;
    req.session.userEmail = email;

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      user: {
        id: userId,
        name,
        email
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { isValid, errors, sanitized } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const { email, password } = sanitized;

    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      // Use generic error to avoid user enumeration
      return res.status(401).json({
        success: false,
        errors: ['Invalid email or password.']
      });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        errors: ['Invalid email or password.']
      });
    }

    // Establish session
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Could not log out. Please try again.'
      });
    }
    res.clearCookie('scamlens_sid');
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  });
}

export async function getMe(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        user: null
      });
    }

    const users = await query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.session.userId]
    );

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        user: null
      });
    }

    return res.status(200).json({
      success: true,
      authenticated: true,
      user: users[0]
    });
  } catch (err) {
    next(err);
  }
}

export async function demoLogin(req, res, next) {
  try {
    const demoEmail = 'guest.demo@scamlens.local';
    let users = await query('SELECT * FROM users WHERE email = ?', [demoEmail]);
    let user;
    if (users.length === 0) {
      const hash = await bcrypt.hash('DemoPass123!', 10);
      const resInsert = await query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        ['Guest Explorer', demoEmail, hash]
      );
      user = { id: resInsert.insertId, name: 'Guest Explorer', email: demoEmail };
    } else {
      user = users[0];
    }

    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    return res.status(200).json({
      success: true,
      message: 'Demo guest access granted.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
}

