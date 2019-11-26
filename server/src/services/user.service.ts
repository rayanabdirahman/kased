import User from '../data_access/models/user.model';
import { Order } from '../data_access/models/order.model';

export default class UserService {
  public async findById(id: string) {
    return await User.findById(id).select('-password');
  }

  public async update(id: string, model: any) {
    return await User.findOneAndUpdate(
                      { _id: id },
                      { $set: model },
                      { new: true }).select('-password');
  }

  public async findOrdersByUser(id: string) {
    return await Order.find({ user: id })
                      .populate('user', '_id firstName lastName address')
                      .sort('-created');
  }
}
