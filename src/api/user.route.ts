import { Router } from 'express';
import UserController from '../controllers/user/user.controller';

const router = Router();
const userController = new UserController();

router.post('/', userController.signUp);

export default router;
