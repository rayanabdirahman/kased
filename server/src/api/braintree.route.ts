import { Router } from 'express';
import BraintreeController from '../controllers/braintree/braintree.controller';
import AuthController from '../controllers/auth/auth.controller';
import UserController from '../controllers/user/user.controller';

const router = Router();
const braintreeController = new BraintreeController();
const authController = new AuthController(); // TODO: MOVE RESUED AUTH METHODS INTO MIDDLEWARE FOLDER
const userController = new UserController(); // TODO: MOVE RESUED USERID METHOD INTO MIDDLEWARE FOLDER

/**
 * get braintree token for user
 * @get /braintree/token/:userId
 */
router.get('/token/:userId',
  authController.authGuard,
  authController.isAuth,
  braintreeController.generateToken
);

/**
 * find user id middleware
 * TODO: MOVE THIS INTO A MIDDLEWARE FODLER
 */
router.param('userId', userController.findById);


export default router;
