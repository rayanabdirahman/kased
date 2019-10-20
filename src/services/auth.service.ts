import { ILoginModel } from '../domain/interfaces';
import { ISignUpModel } from '../domain/interfaces';
import { ErrorMessage } from '../constants';
import User from '../data_access/models/user.model';
import { bycryptHelper } from '../helpers/bycrypt';
import { jwtHelper } from '../helpers/jwt';

export default class AuthService {

  public signUp = async (model: ISignUpModel) => {
    // check if email exists
    if (await this.isEmailTaken(model.email)) {
      throw new Error(ErrorMessage.EMAIL_IS_TAKEN);
    }

    // create new user instance
    const user = new User(model);

    // encrypt password
    user.password = await bycryptHelper.encryptPassword(user.password);

    // save user to DB
    await user.save();

    return user;
  }

  public login = async (model: ILoginModel) => {
    // check if email exists
    const user = await this.isEmailTaken(model.email);
    if (!user) {
      throw new Error(ErrorMessage.USER_DOES_NOT_EXIST);
    }

    // check if passwords match
    const isMatch = await bycryptHelper.comparePassword(model.password, user.password);
    if (!isMatch) {
      throw new Error(ErrorMessage.INVALID_DETAILS);
    }

    // genereate JWT token with user model;
    const token = await jwtHelper.signJWTToken(user);

    return { user, token};
  }

  /**
   * Checks if email already exists in database
   * @param { string } email - email the user is signing up with
   */
  private async isEmailTaken(email: string): Promise<any> {
    const user = await User.findOne({ email });
    if (user) {
      // return Promise.resolve(true);
      return Promise.resolve(user);
    }

    return Promise.resolve(false);
  }
}
