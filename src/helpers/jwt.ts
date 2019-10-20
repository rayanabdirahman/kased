import jwt from 'jsonwebtoken';
import { IUser } from './../data_access/models/interfaces';

export const jwtHelper = {
  /**
   * Signs JWT token using user id
   * @param { IUser } user - user object returned by the database
   * @returns { string }
   */
  async signJWTToken(user: IUser): Promise<string>  {
    const { id } = user;

    const JWT_PAYLOAD = {
      user: {
        id
      }
    };

    return await jwt.sign(JWT_PAYLOAD, `${process.env.JWT_SECRET}`, {expiresIn: `${process.env.JWT_EXPIRES_IN}`});
  },

  async decodeToken(token: string) {
    return await jwt.verify(token, `${process.env.JWT_SECRET}`);
  }

}