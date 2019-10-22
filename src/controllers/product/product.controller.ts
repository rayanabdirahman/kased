import express from 'express';
import formidable from 'formidable';
import * as _ from 'lodash';
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

      let product: any;

      // validate request
      // const validity = ProductValidator.create(createProductModel);
      // if (validity.error) {
      //   const { message } = validity.error;

      //   return res.status(400).json({error: message});
      // }

      // handle form data to allow for product image upload
      const form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (error, fields, files) => {
        // check if there was an error when uploading image
        if (error) {
          const message = error.message || error;
          logger.error(`<<<ProductController.create>>> ${ErrorMessage.PRODUCT_IMAGE_UPLOAD}: ${message}`);

          return res.status(400).json({error: ErrorMessage.PRODUCT_IMAGE_UPLOAD});
        }

        // register product to database
        product = await this.productService.create(fields, files);

        res.json(product);
      });

      // register product to database
      // const product = await this.productService.create(createProductModel);


    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.create>>> ${ErrorMessage.CREATE_PRODUCT}: ${message}`);
      res.send({ error: message });
    }
  }
}
