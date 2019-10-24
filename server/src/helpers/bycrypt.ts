import bcrypt from 'bcrypt';
import { Bcrypt } from '../domain/enums';

export const bycryptHelper = {
  /**
   * Encrypt user password using bcrypt and return a hashed password
   * @param password - user password before encryption
   */
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Bcrypt.SALT_ROUND);

    return await bcrypt.hash(password, salt);
  },

  /**
   * Compare user passwords to find a match
   * @param { string } loginPassword - password user by the user to login
   * @param { string } dbPassword - user password stored in the db
   */
  async comparePassword(loginPassword: string, dbPassword: string) {
    return await bcrypt.compare(loginPassword, dbPassword);
  }
};
