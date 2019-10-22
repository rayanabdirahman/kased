import { Router } from 'express';
import CategoryController from '../controllers/category/category.controller';
import AuthController from '../controllers/auth/auth.controller';
import UserController from '../controllers/user/user.controller';

const router = Router();
const categoryController = new CategoryController();
const authController = new AuthController(); // TODO: MOVE RESUED AUTH METHODS INTO MIDDLEWARE FOLDER
const userController = new UserController(); // TODO: MOVE RESUED USERID METHOD INTO MIDDLEWARE FOLDER

// Authorised Admin user can only create categories
router.post('/create/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  categoryController.create
);

router.param('userId', userController.findById);


export default router;
