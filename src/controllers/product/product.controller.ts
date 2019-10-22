import express from 'express';
import logger from '../../helpers/logger';
import ProductService from '../../services/product.service';
import { ICreateProductModel } from '../../domain/interfaces';
import { ProductValidator } from './product.validation';
import { ErrorMessage } from '../../constants';

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public create =  async (req: express.Request, res: express.Response) => {
    try {
      const createProductModel: ICreateProductModel = {
        ...req.body
      };

      // validate request
      const validity = ProductValidator.create(createProductModel);
      if (validity.error) {
        const { message } = validity.error;

        return res.status(400).json({error: message});
      }

      // register product to database
      const product = await this.productService.create(createProductModel);

      res.send({ product });

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.create>>> ${ErrorMessage.CREATE_PRODUCT}: ${message}`);
      res.send({ error: message });
    }
  }
}
