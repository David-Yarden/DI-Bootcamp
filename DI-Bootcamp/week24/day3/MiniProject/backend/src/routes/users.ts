import { Router, Response } from 'express';
import { AuthRequest, authenticateToken } from '../middleware/auth';
import { searchUsers, getAllUsers } from '../models/userModel';

const router = Router();

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { search } = req.query;

    if (search && typeof search === 'string') {
      const users = await searchUsers(search);
      res.json(users);
    } else {
      const users = await getAllUsers();
      res.json(users);
    }
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'An error occurred while fetching users.' });
  }
});

export default router;
