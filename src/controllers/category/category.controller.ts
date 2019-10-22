import express from 'express';
import logger from '../../helpers/logger';
import CategoryService from '../../services/category.service';
import { ICreateCategoryModel } from '../../domain/interfaces';
import { CategoryValidator } from './category.validation';
import { ErrorMessage } from '../../constants';

export default class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public create =  async (req: express.Request, res: express.Response) => {
    try {
      const createCategoryModel: ICreateCategoryModel = {
        ...req.body
      };

      // validate request
      const validity = CategoryValidator.create(createCategoryModel);
      if (validity.error) {
        const { message } = validity.error;

        return res.status(400).json({error: message});
      }

      // register user to database
      const category = await this.categoryService.create(createCategoryModel);

      res.send({ category });

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<CategoryController.create>>> ${ErrorMessage.CREATE_CATEGORY}: ${message}`);
      res.send({ error: message });
    }
  }
}
