import { Router } from 'express';
import { getQuestions, submitQuiz, getUserQuizProgress } from '../controllers/quizController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/questions', getQuestions);
router.post('/submit', submitQuiz);
router.get('/progress', requireAuth, getUserQuizProgress);

export default router;
