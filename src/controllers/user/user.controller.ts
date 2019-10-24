import express from 'express';
import UserService from '../../services/user.service';
import logger from '../../helpers/logger';
import { IExtendedRequest } from '../../custom';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public findById = async (req: IExtendedRequest, res: express.Response, next: express.NextFunction, id: string) => {
    try {

      // find user by Id
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(400).json({error: 'cant find user by id'});
      }

      // add user details to request object
      req.profile = user;

      next();
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<UserController.findById>>>: ${message}`);
      res.status(400).send({ error: message });
    }
  }

  /**
   * Return user profile details stored in req.profile
   */
  public read = (req: IExtendedRequest, res: express.Response) => {
    if (req.profile) {
      /**
       * set profile photo to undefined for performance reasons.
       * seprate method will be called to handle image files
       */
      req.profile.photo = undefined;
    }

    // return profile details stored in req.profile
    return res.status(200).json(req.profile);
  }

  /**
   * Update user prodile details in database using req.prodile
   */
  public update = async (req: IExtendedRequest, res: express.Response) => {
    try {
      if (req.profile) {

        const updatedUserModel = {
          ...req.body
        };

        const userId = req.profile.id;

        // update user using
        const user = await this.userService.update(userId, updatedUserModel);

        return res.status(200).json(user);

      }
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<UserController.update>>>: ${message}`);
      res.status(400).send({ error: message });
    }
  }


}
