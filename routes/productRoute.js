import { Router } from 'express';

import { isAuthenticated } from '../middlewares/IsAuthMiddleware.js';
import { singleUpload } from '../middlewares/MulterMiddleware.js';

import {
  addProductImage,
  createProduct,
  deleteProduct,
  deleteProductImage,
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

export default router;
