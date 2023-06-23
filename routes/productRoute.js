import { Router } from 'express';

import { isAdmin, isAuthenticated } from '../middlewares/IsAuthMiddleware.js';
import { singleUpload } from '../middlewares/MulterMiddleware.js';

import {
  addCategory,
  addProductImage,
  createProduct,
  deleteCategory,
  deleteProduct,
  deleteProductImage,
  getAdminProducts,
  getAllCategory,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from '../controllers/productControllers.js';

const router = Router();

router.get('/all', getAllProducts);
router.get('/admin', isAuthenticated, isAdmin, getAdminProducts);

router
  .route('/single/:id')
  .get(getProductDetails)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);

router.post('/new', isAuthenticated, isAdmin, singleUpload, createProduct);

router
  .route('/images/:id')
  .post(isAuthenticated, isAdmin, singleUpload, addProductImage)
  .delete(isAuthenticated, isAdmin, deleteProductImage);

router.post('/category', isAuthenticated, isAdmin, addCategory);
router.get('/categories', getAllCategory);
router.delete('/category/:id', isAuthenticated, isAdmin, deleteCategory);

export default router;
