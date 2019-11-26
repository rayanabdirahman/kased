import { Router } from 'express';
import OrderController from '../controllers/order/order.controller';
import AuthController from '../controllers/auth/auth.controller';
import UserController from '../controllers/user/user.controller';
import ProductController from '../controllers/product/product.controller';

const router = Router();
const orderController = new OrderController();
const productController = new ProductController(); // TODO: MOVE RESUED AUTH METHODS INTO MIDDLEWARE FOLDER
const authController = new AuthController(); // TODO: MOVE RESUED AUTH METHODS INTO MIDDLEWARE FOLDER
const userController = new UserController(); // TODO: MOVE RESUED USERID METHOD INTO MIDDLEWARE FOLDER

// list all products
router.get('/:userId', orderController.list);

// list all products
router.get('/status-values/:userId', orderController.statusValues);

/**
 * update order status
 * @put /order/:orderId/status/:userId
 */
router.put('/:orderId/status/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  orderController.updateStatus
);

/**
 * process payment
 * @post /order/create/:userId
 */
router.post('/create/:userId',
  authController.authGuard,
  authController.isAuth,
  orderController.addOrderToHistory,
  productController.updateStockQuantity,
  orderController.create
);

/**
 * find user id middleware
 * TODO: MOVE THIS INTO A MIDDLEWARE FODLER
 */
router.param('userId', userController.findById);
router.param('orderId', orderController.findById);


export default router;
