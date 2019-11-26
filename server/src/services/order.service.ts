import * as _ from 'lodash';
import { Order } from '../data_access/models/order.model';
import User from '../data_access/models/user.model';

export default class ProductService {
  // Find all orders
  public async list() {
    return await Order.find()
                        .select('-photo')
                        .populate('user', '_id firstName lastName address')
                        .sort('-created');
  }

  // return a list of all status values for orders
  public async statusValues() {
    return await Order.schema.path('status').enumValues;
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

  public async findById(id: string) {
    return await Order.findById(id).populate('products.product', 'name price');
  }
}
