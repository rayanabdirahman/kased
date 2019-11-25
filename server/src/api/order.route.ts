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

// /**
//  * get braintree token for user
//  * @get /braintree/token/:userId
//  */
// router.get('/token/:userId',
//   authController.authGuard,
//   authController.isAuth,
//   braintreeController.generateToken
// );

/**
 * process payment
 * @post /braintree/token/:userId
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


export default router;
