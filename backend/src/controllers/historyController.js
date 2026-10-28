import { query } from '../config/db.js';

export async function getHistory(req, res, next) {
  try {
    const userId = req.session.userId;
    const history = await query(
      'SELECT id, input_type, target_snippet, risk_category, warning_count, findings, created_at FROM scan_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
      [userId]
    );

    const formatted = history.map(item => ({
      ...item,
      findings: typeof item.findings === 'string' ? JSON.parse(item.findings) : item.findings
    }));

    return res.status(200).json({
      success: true,
      history: formatted
    });
  } catch (err) {
    next(err);
  }
}

export async function getHistoryById(req, res, next) {
  try {
    const userId = req.session.userId;
    const historyId = parseInt(req.params.id, 10);

    if (isNaN(historyId)) {
      return res.status(400).json({ success: false, error: 'Invalid history ID.' });
    }

    const items = await query(
      'SELECT * FROM scan_history WHERE id = ? AND user_id = ?',
      [historyId, userId]
    );

    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Record not found or access denied.'
      });
    }

    const item = items[0];
    item.findings = typeof item.findings === 'string' ? JSON.parse(item.findings) : item.findings;

    return res.status(200).json({
      success: true,
      record: item
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteHistory(req, res, next) {
  try {
    const userId = req.session.userId;
    const historyId = parseInt(req.params.id, 10);

    if (isNaN(historyId)) {
      return res.status(400).json({ success: false, error: 'Invalid history ID.' });
    }

    // Strict ownership verification: WHERE id = ? AND user_id = ?
    const result = await query(
      'DELETE FROM scan_history WHERE id = ? AND user_id = ?',
      [historyId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Record not found or already deleted.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Analysis record successfully deleted.'
    });
  } catch (err) {
    next(err);
  }
}
