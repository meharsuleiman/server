import { Router } from 'express';
import { getUser } from '../controllers/userControllers.js';


const router = Router();

router.route('/').get(getUser)

export default router;