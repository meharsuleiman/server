import { Router } from 'express';

import { isAuthenticated } from '../middlewares/IsAuthMiddleware.js';
import { singleUpload } from '../middlewares/MulterMiddleware.js';

import {
  addCategory,
  addProductImage,
  createProduct,
  deleteCategory,
  deleteProduct,
  deleteProductImage,
  getAllCategory,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from '../controllers/productControllers.js';

const router = Router();

router.get('/all', getAllProducts);
router
  .route('/single/:id')
  .get(getProductDetails)
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

router.post('/new', isAuthenticated, singleUpload, createProduct);

router
  .route('/images/:id')
  .post(isAuthenticated, singleUpload, addProductImage)
  .delete(isAuthenticated, deleteProductImage);

router.post('/category', isAuthenticated, addCategory);
router.get('/categories', getAllCategory);
router.delete('/category/:id', isAuthenticated, deleteCategory);

export default router;
