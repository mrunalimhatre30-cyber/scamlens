import { analyzeMessage, analyzeUrl } from '../services/analyzerService.js';
import { validateMessageInput, validateUrlInput } from '../validators/inputValidators.js';
import { query } from '../config/db.js';

export async function analyzeMessageController(req, res, next) {
  try {
    const { isValid, errors, sanitizedText } = validateMessageInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const result = analyzeMessage(sanitizedText);

    // If user is logged in and explicitly opts into saving analysis summary to their account
    if (req.body.saveToHistory && req.session && req.session.userId) {
      // Redact sensitive patterns from target_snippet for privacy preservation
      const sanitizedSnippet = sanitizedText
        .replace(/\b\d{4,}\b/g, '[REDACTED]')
        .slice(0, 70);

      await query(
        'INSERT INTO scan_history (user_id, input_type, target_snippet, risk_category, warning_count, findings) VALUES (?, ?, ?, ?, ?, ?)',
        [
          req.session.userId,
          'message',
          sanitizedSnippet,
          result.riskCategory,
          result.warningCount,
          JSON.stringify(result.findings)
        ]
      );
      result.savedToHistory = true;
    }

    return res.status(200).json({
      success: true,
      analysis: result
    });
  } catch (err) {
    next(err);
  }
}

export async function analyzeUrlController(req, res, next) {
  try {
    const { isValid, errors, sanitizedUrl } = validateUrlInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const result = analyzeUrl(sanitizedUrl);

    if (req.body.saveToHistory && req.session && req.session.userId) {
      const sanitizedDomain = (result.domain || sanitizedUrl).slice(0, 100);

      await query(
        'INSERT INTO scan_history (user_id, input_type, target_snippet, risk_category, warning_count, findings) VALUES (?, ?, ?, ?, ?, ?)',
        [
          req.session.userId,
          'url',
          sanitizedDomain,
          result.riskCategory,
          result.warningCount,
          JSON.stringify(result.findings)
        ]
      );
      result.savedToHistory = true;
    }

    return res.status(200).json({
      success: true,
      analysis: result
    });
  } catch (err) {
    next(err);
  }
}
