import { ErrorMessage } from '../../constants';
import express from 'express';
import UserService from '../../services/user.service';
import logger from '../../helpers/logger';
import { ISignUpModel } from '../../domain/interfaces';
import { UserValidator } from './user.validation';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

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
}
