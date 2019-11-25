import * as _ from 'lodash';
import { Order } from '../data_access/models/order.model';
import User from '../data_access/models/user.model';

export default class ProductService {
  // Find all orders
  public async list() {
    return await Order.find()
                        .select('-photo')
                        .populate('user', '_id name address')
                        .sort('-created');
  }

  public async create(model: any) {
    // create new order instance
    const order = new Order(model);

    // save order to DB
    await order.save();

    return order;
  }

  public async addOrderToHistory(id: string, model: any) {
    return await User.findOneAndUpdate(
      { _id: id },
      { $push: { history: model }},
      { new: true }).select('-password');
  }
}
