import { ISignUpModel } from '../domain/interfaces';
// import encryptPassword from '../../helpers/encrypt';
import logger from '../helpers/logger';
import { ErrorMessage } from '../constants';
import User from '../data_access/models/user.model';
import { DbErrorHandler } from '../helpers/errorhandler';
import encryptPassword from '../helpers/encrypt';

export default class UserService {

  public signUp = async (model: ISignUpModel) => {
    // check if email exists
    if (await this.isEmailTaken(model.email)) {
      throw new Error(ErrorMessage.EMAIL_IS_TAKEN);
    }

    const user = new User(model);

    // save user to DB
    await user.save();

    return user;

    // return model;

    // try {

    //   // const user = signUpModel;
    //   const user = new User(model);

    //   await user.save();

    //   return user;

    // } catch (error) {
    //   logger.error(`<<<UserService.signUp>>> ${ErrorMessage.SIGN_UP_USER}: `, error);
    //   const errorMessage = DbErrorHandler(error);

    //   // return error;
    //   return errorMessage;
    // }
  }

  /**
   * Checks if email already exists in database
   * @param { string } email - email the user is signing up with
   */
  private async isEmailTaken(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    if (user) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}
