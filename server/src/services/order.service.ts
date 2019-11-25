import * as _ from 'lodash';
import { Order } from '../data_access/models/order.model';

export default class ProductService {
  public async create(model: any) {
    // create new order instance
    const order = new Order(model);

    // save order to DB
    await order.save();

    return order;
  }
}
