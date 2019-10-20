import { Router } from 'express';
import UserController from '../controllers/user/user.controller';

const router = Router();
const userController = new UserController();

router.post('/', userController.signUp);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

export default router;
