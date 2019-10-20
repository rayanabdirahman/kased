import { Router } from 'express';
import UserController from '../controllers/user/user.controller';
import AuthController from '../controllers/auth/auth.controller';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.param('userId', userController.findById);
router.get('/secret/:userId', authController.authGuard, authController.isAuth, authController.isAdmin, (req, res) => {
  res.json({
    user: req.body.profile
  });
});

export default router;
