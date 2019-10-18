import { ErrorMessage } from '../../constants';
import express from 'express';
import UserService from '../../services/user.service';
import logger from '../../helpers/logger';
import { ISignUpModel } from '../../domain/interfaces';

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

      const user = await this.userService.signUp(signUpModel);

      res.send({user});

    } catch (error) {
      logger.error(`<<<UserController.signUp>>> ${ErrorMessage.SIGN_UP_USER}: `, error.message);
    }
  }
}
