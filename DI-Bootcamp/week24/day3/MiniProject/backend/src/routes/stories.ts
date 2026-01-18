import { Router } from 'express';
import {
  getStories,
  getStory,
  createNewStory,
  updateExistingStory,
  deleteExistingStory
} from '../controllers/storyController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getStories);
router.get('/:id', authenticateToken, getStory);
router.post('/', authenticateToken, createNewStory);
router.patch('/:id', authenticateToken, updateExistingStory);
router.delete('/:id', authenticateToken, deleteExistingStory);

export default router;
