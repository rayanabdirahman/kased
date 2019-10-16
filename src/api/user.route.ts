import { Router } from 'express';
import UserController from '../controllers/user/user.controller';

const router = Router();
const userController = new UserController();

router.get('/', userController.test);

export default router;
