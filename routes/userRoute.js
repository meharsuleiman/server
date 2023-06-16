import { Router } from 'express';
import {
  changePassword,
  getMyProfile,
  logOut,
  login,
  signup,
  updateProfile,
} from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/IsAuthMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', signup);
router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout', isAuthenticated, logOut);

router.put('/updateprofile', isAuthenticated, updateProfile);
router.put('/changepassword', isAuthenticated, changePassword);

export default router;
