import { Router } from 'express';
import ProductController from '../controllers/product/product.controller';
import AuthController from '../controllers/auth/auth.controller';
import UserController from '../controllers/user/user.controller';

const router = Router();
const productController = new ProductController();
const authController = new AuthController(); // TODO: MOVE RESUED AUTH METHODS INTO MIDDLEWARE FOLDER
const userController = new UserController(); // TODO: MOVE RESUED USERID METHOD INTO MIDDLEWARE FOLDER

// list all products
router.get('/', productController.list);

// list product categories
router.get('/categories', productController.categories);

// list products by search query
router.post('/search', productController.search);

// Authorised Admin user can only create products
router.post('/create/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  productController.create
);

// find product by id
router.get('/:productId', productController.read);

// find related products by id
router.get('/related/:productId', productController.related);

/**
 * delete product by id
 * only authorised users can delete product
 */
router.delete('/:productId/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  productController.remove
);

/**
 * update product by id
 * only authorised users can update product
 */
router.put('/:productId/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  productController.update
);

router.param('userId', userController.findById); // TODO: MOVE THIS INTO MIDDLEWARE FODLER TO MANAGE USER AUTHGUARD
router.param('productId', productController.findById);

export default router;
