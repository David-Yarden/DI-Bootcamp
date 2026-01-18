import { Router } from 'express';
import {
  getContributors,
  addNewContributor,
  removeExistingContributor
} from '../controllers/contributorController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/:story_id', authenticateToken, getContributors);
router.post('/', authenticateToken, addNewContributor);
router.delete('/:id', authenticateToken, removeExistingContributor);

export default router;
