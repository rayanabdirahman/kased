import { Router } from 'express';
import CategoryController from '../controllers/category/category.controller';

const router = Router();
const categoryController = new CategoryController();

router.post('/create', categoryController.create);


export default router;
