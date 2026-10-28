import { getQuizQuestions, evaluateQuiz } from '../services/quizService.js';
import { query } from '../config/db.js';

export function getQuestions(req, res) {
  const questions = getQuizQuestions();
  return res.status(200).json({
    success: true,
    questions
  });
}

export async function submitQuiz(req, res, next) {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: 'Quiz submission requires an answers array.'
      });
    }

    const evaluation = evaluateQuiz(answers);

    // Save quiz progress if user is authenticated
    if (req.session && req.session.userId) {
      await query(
        'INSERT INTO quiz_progress (user_id, quiz_id, score, total_questions) VALUES (?, ?, ?, ?)',
        [req.session.userId, 'scam-challenge-v1', evaluation.score, evaluation.totalQuestions]
      );
      evaluation.savedToAccount = true;
    }

    return res.status(200).json({
      success: true,
      evaluation
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserQuizProgress(req, res, next) {
  try {
    const userId = req.session.userId;
    const records = await query(
      'SELECT id, quiz_id, score, total_questions, completed_at FROM quiz_progress WHERE user_id = ? ORDER BY completed_at DESC LIMIT 10',
      [userId]
    );

    return res.status(200).json({
      success: true,
      progress: records
    });
  } catch (err) {
    next(err);
  }
}
