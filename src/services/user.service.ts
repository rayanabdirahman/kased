import { ISignUpModel } from '../domain/interfaces';
// import encryptPassword from '../../helpers/encrypt';
import logger from '../helpers/logger';
import { ErrorMessage } from '../constants';
import User from '../data_access/models/user.model';

export default class UserService {
  public signUp = async (signUpModel: ISignUpModel) => {
    try {

      // const user = signUpModel;
      const user = new User(signUpModel);

      await user.save();

      return user;

    } catch (error) {
      logger.error(`<<<UserService.signUp>>> ${ErrorMessage.SIGN_UP_USER}: `, error);

      return error;
    }
  }
}
