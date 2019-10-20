import express from 'express';
import UserService from '../../services/user.service';
import logger from '../../helpers/logger';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public findById = async (req: express.Request, res: express.Response, next: express.NextFunction, id: string) => {
    try {

      // find user by Id
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(400).json({error: 'cant find user by id'});
      }

      // add user details to request object
      // TODO: Extend Request type to allow `profile` to be attached to request
      req.body.profile = user;

      next();
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<UserController.findById>>>: ${message}`);
      res.status(400).send({ error: message });
    }
  }
}
