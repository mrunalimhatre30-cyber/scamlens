import { Router } from 'express';
import { getHistory, getHistoryById, deleteHistory } from '../controllers/historyController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// All history routes require active authenticated session
router.use(requireAuth);

router.get('/', getHistory);
router.get('/:id', getHistoryById);
router.delete('/:id', deleteHistory);

export default router;
