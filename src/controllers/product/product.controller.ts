import express from 'express';
import formidable from 'formidable';
import * as _ from 'lodash';
import logger from '../../helpers/logger';
import ProductService from '../../services/product.service';
import { ICreateProductModel } from '../../domain/interfaces';
import { ProductValidator } from './product.validation';
import { ErrorMessage } from '../../constants';
import { IExtendedRequest } from '../../custom';

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public create = (req: express.Request, res: express.Response) => {
    // handle form data to allow for product image upload
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (error, fields, files) => {
      try {
        // validate fields from client
        const {
          name,
          description,
          price,
          category,
          quantity,
          photo,
          shipping } = fields;

        const createProductModel: ICreateProductModel = {
          name,
          description,
          price,
          category,
          quantity,
          photo,
          shipping
        };

        // validate request
        const validity = ProductValidator.create(createProductModel);
        if (validity.error) {
          const { message } = validity.error;

          return res.status(400).json({error: message});
        }

        // check if there was an error when uploading image
        if (error) {
          const message = error.message || error;
          logger.error(`<<<ProductController.create>>> ${ErrorMessage.PRODUCT_IMAGE_UPLOAD}: ${message}`);

          return res.status(400).json({error: ErrorMessage.PRODUCT_IMAGE_UPLOAD});
        }


        // register product to database
        const product = await this.productService.create(fields, files);

        res.json(product);
      } catch (error) {
        const message = error.message || error;
        logger.error(`<<<ProductController.create>>> ${ErrorMessage.CREATE_PRODUCT}: ${message}`);
        res.send({ error: message });
      }
    });
  }

  /**
   * Return product details stored in req.product
   */
  public read = (req: IExtendedRequest, res: express.Response) => {
    if (req.product) {
      /**
       * set product photo to undefined for performance reasons.
       * seprate method will be called to handle image files
       */
      req.product.photo = undefined;
    }

    // return product details stored in req.product
    return res.status(200).json(req.product);
  }

  /**
   * Find product by ID and store details in req.product
   */
  public findById = async (req: IExtendedRequest, res: express.Response, next: express.NextFunction, id: string) => {
    try {

      // find product by Id
      const product = await this.productService.findById(id);
      if (!product) {
        return res.status(400).json({error: 'cant find product by id'});
      }

      // add product details to request object
      req.product = product;

      next();
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.findById>>>: ${message}`);
      res.status(400).send({ error: message });
    }
  }
}
