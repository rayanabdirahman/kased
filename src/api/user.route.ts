import { Router } from 'express';
import UserController from '../controllers/user/user.controller';
import AuthController from '../controllers/auth/auth.controller';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

/**
 * read user information
 * @get /user/:userId
 */
router.get('/:userId', authController.authGuard, authController.isAuth, userController.read);

/**
 * update user information
 * @put /user/:userId
 */
router.put('/:userId', authController.authGuard, authController.isAuth, userController.update);

/**
 * find user id middleware
 * TODO: MOVE THIS INTO A MIDDLEWARE FODLER
 */
router.param('userId', userController.findById);

// route to test authGuard middlewares
router.get('/secret/:userId', authController.authGuard, authController.isAuth, authController.isAdmin,
(req: any, res: any) => {
  res.json({
    user: req.profile
  });
});

export default router;
