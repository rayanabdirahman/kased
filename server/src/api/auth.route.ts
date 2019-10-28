import { Router } from 'express';
import AuthController from '../controllers/auth/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;
