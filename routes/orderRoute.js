import { Router } from 'express';
import {
  createOrder,
  getAdminOrders,
  getMyOrders,
  getOrderDetail,
  processOrder,
  processPayment,
} from '../controllers/orderController.js';
import { isAdmin, isAuthenticated } from '../middlewares/IsAuthMiddleware.js';

const router = Router();

router.post('/new', isAuthenticated, createOrder);
router.post('/payment', isAuthenticated, processPayment);

router.get('/my', isAuthenticated, getMyOrders);
router.get('/admin', isAuthenticated, isAdmin, getAdminOrders);

router
  .route('/single/:id')
  .get(isAuthenticated, getOrderDetail)
  .put(isAuthenticated, isAdmin, processOrder);

export default router;
