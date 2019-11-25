import express from 'express';
import formidable from 'formidable';
import * as _ from 'lodash';
import logger from '../../helpers/logger';
import OrderService from '../../services/order.service';
import { ICreateProductModel, IProductSearchArg, ISearchQuery } from '../../domain/interfaces';
import { ErrorMessage, SuccessMessage } from '../../constants';
import { IExtendedRequest } from '../../custom';

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public create = async (req: IExtendedRequest, res: express.Response) => {
    try {
      // set user for oder
      req.body.order.user = req.profile;

      // create new order
      const order = await this.orderService.create(req.body.order);

      return res.status(200).json(order);

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<OrderController.create>>> ${ErrorMessage.CREATE_ORDER}: ${message}`);
      res.status(400).send({ error: message });
    }
  }

}
