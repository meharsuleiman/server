import { Router } from 'express';
import {
  changePassword,
  forgetPassword,
  getMyProfile,
  logOut,
  login,
  resetPassword,
  signup,
  updatePic,
  updateProfile,
} from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/IsAuthMiddleware.js';
import { singleUpload } from '../middlewares/MulterMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', singleUpload, signup);
router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout', isAuthenticated, logOut);

router.put('/updateprofile', isAuthenticated, updateProfile);
router.put('/changepassword', isAuthenticated, changePassword);

router.put('/updatepic', isAuthenticated, singleUpload, updatePic);

router.route('/forgetpassword').post(forgetPassword).put(resetPassword);

export default router;
