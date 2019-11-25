import express from 'express';
import formidable from 'formidable';
import * as _ from 'lodash';
import logger from '../../helpers/logger';
import ProductService from '../../services/product.service';
import { ICreateProductModel, IProductSearchArg, ISearchQuery } from '../../domain/interfaces';
import { ErrorMessage, SuccessMessage } from '../../constants';
import { IExtendedRequest } from '../../custom';

export default class OrderController {
  public create = (req: express.Request, res: express.Response) => {
    logger.debug(`Create order: ${req.body}`);
  }

}
