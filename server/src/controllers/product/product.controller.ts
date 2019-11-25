import express from 'express';
import formidable from 'formidable';
import * as _ from 'lodash';
import logger from '../../helpers/logger';
import ProductService from '../../services/product.service';
import { ICreateProductModel, IProductSearchArg, ISearchQuery } from '../../domain/interfaces';
import { ProductValidator } from './product.validation';
import { ErrorMessage, SuccessMessage } from '../../constants';
import { IExtendedRequest } from '../../custom';

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }


  /**
   * Find all products matching query params
   * @return products by the amount sold (Most popular): /product?sortBy=sold&order=desc&limit=4
   * @return products by the arrival date (New arrivals): /product?sortBy=createdAt&order=desc&limit=4
   * @return products with default querys if query is not provided
   */
  public list =  async (req: express.Request, res: express.Response) => {
    try {

      // get order from req.query if provided or set default to ascending order
      const order = req.query.order ? req.query.order : 'asc';

      // get sortBy from req.query if provided or set default to _id
      const sortBy = req.query.sortBy ? req.query.sortBy : '_id';

      // get limit from req.query if provided or set default to 6
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

      // return all products that meet query
      const products = await this.productService.list(order, sortBy, limit);

      return res.status(200).json(products);

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.list>>> ${ErrorMessage.LIST_PRODUCT}: ${message}`);
      res.send({ error: message });
    }
  }

  /**
   * Find all product categories
   * @return an array of categories id
   */
  public categories =  async (req: express.Request, res: express.Response) => {
    try {

      // return all product categories
      const categories = await this.productService.categories();

      return res.status(200).json(categories);

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.categories>>> ${ErrorMessage.LIST_PRODUCT_CATEGORIES}: ${message}`);
      res.send({ error: message });
    }
  }

  // Find searched for products
  public search =  async (req: express.Request, res: express.Response) => {
    try {

      // get order from req.body if provided or set default to descending order
      const order = req.body.order ? req.body.order : 'desc';

      // get sortBy from req.body if provided or set default to _id
      const sortBy = req.body.sortBy ? req.body.sortBy : '_id';

      // get limit from req.body if provided or set default to 6
      const limit = req.body.limit ? parseInt(req.body.limit, 10) : 100;

      /**
       * get skip from req.body if provided
       * used to implement "See more" feature on the frontend
       */
      const skip = parseInt(req.body.skip, 10);

      const searchArgs: IProductSearchArg = {};

      // loop through re.body.filter to populate searchArgs object
      const filters = req.body.filters;
      for (const key in filters) {
        if (filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                searchArgs[key] = {
                    $gte: filters[key][0],
                    $lte: filters[key][1]
                };
            } else {
                searchArgs[key] = filters[key];
            }
        }
    }

      // return all products that meet search query
      const products = await this.productService.search(searchArgs, order, sortBy, skip, limit);

      return res.status(200).json({ size: products.length, products });

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.search>>> ${ErrorMessage.SEARCH_PRODUCT}: ${message}`);
      res.send({ error: message });
    }
  }

  // List of products by searched query
  public listSearch =  async (req: express.Request, res: express.Response) => {
    try {
      // hold search and category value
      const query: ISearchQuery = {};

      if (req.query.search) {
        // assign search value to query.name
        query.name = {$regex: req.query.search, $options: 'i'};

        // assign category value to query.category
        if (req.query.category && req.query.category !== 'All') {
          query.category = req.query.category;
        }
      }

      // return all products that meet query object
      const products = await this.productService.listSearch(query);

      return res.status(200).json({ size: products.length, products });

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.listSearch>>> ${ErrorMessage.LISTSEARCH_PRODUCT }: ${message}`);
      res.send({ error: message });
    }
  }


  /**
   * Find all related products by finding products based on the req product category
   * @return products in the same category
   * @query /product/related/:productId?limit=4
   */
  public related =  async (req: IExtendedRequest, res: express.Response) => {
    try {

      // get limit from req.query if provided or set default to 6
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

      // current product
      const product = req.product;

      // return all related products
      const products = await this.productService.related(product, limit);

      return res.status(200).json(products);

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.related>>> ${ErrorMessage.RELATED_PRODUCTS}: ${message}`);
      res.send({ error: message });
    }
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
          shipping,
          sold } = fields;

        const createProductModel: ICreateProductModel = {
          name,
          description,
          price,
          category,
          quantity,
          photo,
          shipping,
          sold
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
   * Remove product details stored in req.product
   */
  public remove = (req: IExtendedRequest, res: express.Response) => {
    if (req.product) {
      const product = req.product;

      product.remove((error: Error, deletedProduct: ICreateProductModel) => {
        if (error) {
          logger.error(`<<<ProductController.remove>>> ${ErrorMessage.REMOVE_PRODUCT_BY_ID}: ${error}`);

          return res.status(400).json({error: ErrorMessage.REMOVE_PRODUCT_BY_ID});
        }

        const message = `${SuccessMessage.DELETED_PRODUCT}`;

        return res.status(200).json({message});
      });
    }
  }

  /**
   * Update product details in database using req.product
   */
  public update = (req: IExtendedRequest, res: express.Response) => {
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

        const updateProductModel: ICreateProductModel = {
          name,
          description,
          price,
          category,
          quantity,
          photo,
          shipping
        };

        // validate request
        const validity = ProductValidator.create(updateProductModel);
        if (validity.error) {
          const { message } = validity.error;

          return res.status(400).json({error: message});
        }

        // check if there was an error when uploading image
        if (error) {
          const message = error.message || error;
          logger.error(`<<<ProductController.update>>> ${ErrorMessage.PRODUCT_IMAGE_UPLOAD}: ${message}`);

          return res.status(400).json({error: ErrorMessage.PRODUCT_IMAGE_UPLOAD});
        }

        // update product in database
        const product = await this.productService.update(req.product, fields, files);

        res.json(product);
      } catch (error) {
        const message = error.message || error;
        logger.error(`<<<ProductController.update>>> ${ErrorMessage.UPDATE_PRODUCT}: ${message}`);
        res.send({ error: message });
      }
    });
  }

  /**
   * Find product by ID and store details in req.product
   */
  public findById = async (req: IExtendedRequest, res: express.Response, next: express.NextFunction, id: string) => {
    try {

      // find product by Id
      const product = await this.productService.findById(id);
      if (!product) {
        logger.error(`<<<ProductController.findById>>> ${ErrorMessage.FIND_PRODUCT_BY_ID}`);

        return res.status(400).json({error: ErrorMessage.FIND_PRODUCT_BY_ID});
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

  public updateStockQuantity = async (req: IExtendedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      // update product stock quantity
      await this.productService.updateStockQuantity(req.body.order.products);

      next();
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<ProductController.updateStockQuantity>>> Could not update product: ${message}`);
      res.status(400).send({ error: message });
    }
  }

  public photo =  async (req: IExtendedRequest, res: express.Response, next: express.NextFunction) => {
    if (req.product) {
      if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        res.send(req.product.photo.data);
      }
    }

    next();
  }

}
