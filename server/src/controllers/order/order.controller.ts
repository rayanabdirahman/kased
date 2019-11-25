import express from 'express';
import * as _ from 'lodash';
import logger from '../../helpers/logger';
import OrderService from '../../services/order.service';
import { ErrorMessage, SuccessMessage } from '../../constants';
import { IExtendedRequest } from '../../custom';

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  // Find all orders
  public list =  async (req: express.Request, res: express.Response) => {
    try {

      // list all categories
      const orders = await this.orderService.list();

      return res.status(200).json(orders);

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<OrderController.list>>> ${ErrorMessage.LIST_ORDER}: ${message}`);
      res.send({ error: message });
    }
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

  // add order details to user's history
  public addOrderToHistory =  async (req: IExtendedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const history: any = [];

      req.body.order.products.forEach((item: any) => {
        history.push({
          _id: item._id,
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.count,
          transaction_id: req.body.order.transaction_id,
          amount: req.body.order.amount
        });

      });

      if (req.profile) {
        // find user by Id and update their order history
        await this.orderService.addOrderToHistory(req.profile._id, history);
      }

      next();
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<OrdedrController.addOrderToHistory>>> could not update user's order history: ${message}`);
      res.status(400).send({ error: message });
    }
  }

  // add order details to user's history
  public updateStockQuantity =  async (req: IExtendedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const history: any = [];

      req.body.order.products.forEach((item: any) => {
        history.push({
          _id: item._id,
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.count,
          transaction_id: req.body.order.transaction_id,
          amount: req.body.order.amount
        });

      });

      if (req.profile) {
        // find user by Id and update their order history
        await this.orderService.addOrderToHistory(req.profile._id, history);
      }

      next();
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<OrdedrController.addOrderToHistory>>> could not update user's order history: ${message}`);
      res.status(400).send({ error: message });
    }
  }

}
