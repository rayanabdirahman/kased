import { Router } from 'express';
import UserController from '../controllers/user/user.controller';
import AuthController from '../controllers/auth/auth.controller';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.param('userId', userController.findById);
router.get('/secret/:userId', authController.authGuard, authController.isAuth, authController.isAdmin,
(req: any, res: any) => {
  res.json({
    user: req.profile
  });
});

export default router;
