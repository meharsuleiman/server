import { Router } from 'express';
import { login, signup } from '../controllers/userControllers.js';


const router = Router();

router.post('/login', login);
router.post('/register', signup);

export default router;