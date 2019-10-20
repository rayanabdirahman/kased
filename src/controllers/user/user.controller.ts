import { ErrorMessage } from '../../constants';
import express from 'express';
import UserService from '../../services/user.service';
import logger from '../../helpers/logger';
import { ISignUpModel, ILoginModel } from '../../domain/interfaces';
import { UserValidator } from './user.validation';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Register user to database
   * @param { express.Request }
   * @param {express.Response }
   */
  public signUp = async (req: express.Request, res: express.Response) => {
    try {
      const signUpModel: ISignUpModel = {
        ...req.body
      };

      // validate request
      const validity = UserValidator.signUp(signUpModel);
      if (validity.error) {
        const { message } = validity.error;

        return res.status(400).json({error: message});
      }

      // register user to database
      const user = await this.userService.signUp(signUpModel);

      res.send({user});

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<UserController.signUp>>> ${ErrorMessage.SIGN_UP_USER}: ${message}`);
      res.send({ error: message });
    }
  }

  /**
   * Log user into application
   * @param { express.Request }
   * @param {express.Response }
   */
  public login = async (req: express.Request, res: express.Response) => {
    try {
      const loginModel: ILoginModel = {
        ...req.body
      };

      // validate request
      const validity = UserValidator.login(loginModel);
      if (validity.error) {
        const { message } = validity.error;

        return res.status(400).json({error: message});
      }

      // log user in
      const user = await this.userService.login(loginModel);

      // add JWT token to cookie as user_token
      const COOKIE_EXPIRES_IN = new Date(Number(new Date()) + Number(`${process.env.JWT_COOKIE_EXPIRES_IN}`) );
      const token = user.token;
      res.cookie('user_token', token, { expires: COOKIE_EXPIRES_IN});

      // send user details to client
      const { _id, firstName, lastName, email, role } = user.user;
      res.status(200).json({ token, user: {_id, firstName, lastName, email, role}});

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<UserController.login>>> ${ErrorMessage.LOGIN_USER}: ${message}`);
      res.status(401).send({ error: message });
    }
  }
}
