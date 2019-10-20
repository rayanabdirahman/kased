import User from '../data_access/models/user.model';

export default class UserService {
  public async findById(id: string) {
    return await User.findById(id).select('-password');
  }
}
