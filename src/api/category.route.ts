import { Router } from 'express';
import CategoryController from '../controllers/category/category.controller';
import AuthController from '../controllers/auth/auth.controller';
import UserController from '../controllers/user/user.controller';

const router = Router();
const categoryController = new CategoryController();
const authController = new AuthController(); // TODO: MOVE RESUED AUTH METHODS INTO MIDDLEWARE FOLDER
const userController = new UserController(); // TODO: MOVE RESUED USERID METHOD INTO MIDDLEWARE FOLDER

// list all categories
router.get('/', categoryController.list);

// Authorised Admin user can only create categories
router.post('/create/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  categoryController.create
);

// find category by id
router.get('/:categoryId', categoryController.read);

/**
 * delete category by id
 * only authorised users can delete category
 */
router.delete('/:categoryId/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  categoryController.remove
);

/**
 * update category by id
 * only authorised users can update category
 */
router.put('/:categoryId/:userId',
  authController.authGuard,
  authController.isAuth,
  authController.isAdmin,
  categoryController.update
);

router.param('userId', userController.findById); // TODO: MOVE THIS INTO MIDDLEWARE FODLER TO MANAGE USER AUTHGUARD
router.param('categoryId', categoryController.findById);

export default router;
