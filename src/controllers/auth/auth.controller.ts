import express from 'express';
import { ErrorMessage, SuccessMessage  } from '../../constants';
import AuthService from '../../services/auth.service';
import logger from '../../helpers/logger';
import { ISignUpModel, ILoginModel } from '../../domain/interfaces';
import { AuthValidator } from './auth.validation';

export default class AuthController {
  private authService: AuthService;
  private cookieName: string;

  constructor() {
    this.authService = new AuthService();
    this.cookieName = '_kasedUserToken';
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
      const validity = AuthValidator.signUp(signUpModel);
      if (validity.error) {
        const { message } = validity.error;

        return res.status(400).json({error: message});
      }

      // register user to database
      const user = await this.authService.signUp(signUpModel);

      res.send({user});

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<AuthController.signUp>>> ${ErrorMessage.SIGN_UP_USER}: ${message}`);
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
      const validity = AuthValidator.login(loginModel);
      if (validity.error) {
        const { message } = validity.error;

        return res.status(400).json({error: message});
      }

      // log user in
      const user = await this.authService.login(loginModel);

      // add JWT token to cookie as user_token
      const COOKIE_EXPIRES_IN = new Date(Number(new Date()) + Number(`${process.env.JWT_COOKIE_EXPIRES_IN}`) );
      const token = user.token;
      res.cookie(this.cookieName, token, { expires: COOKIE_EXPIRES_IN});

      // send user details to client
      const { _id, firstName, lastName, email, role } = user.user;
      res.status(200).json({ token, user: {_id, firstName, lastName, email, role}});

    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<AuthController.login>>> ${ErrorMessage.LOGIN_USER}: ${message}`);
      res.status(401).send({ error: message });
    }
  }

  /**
   * Log user out of application
   * @param { express.Request }
   * @param {express.Response }
   */
  public logout = (req: express.Request, res: express.Response) => {
    // clear cookie containing JWT token
    res.clearCookie(this.cookieName);

    res.status(200).json({ message: SuccessMessage.LOG_OUT_USER});
  }
}
