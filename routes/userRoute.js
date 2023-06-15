import { Router } from 'express';
import {
  getMyProfile,
  logOut,
  login,
  signup,
} from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/IsAuthMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', signup);
router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout', isAuthenticated, logOut);

export default router;
