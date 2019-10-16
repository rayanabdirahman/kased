import bcrypt from 'bcrypt';
import { Bcrypt } from '../domain/enums';

/**
 * Encrypt user password using bcrypt and return a hashed password
 * @param password - user password before encryption
 */
const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(Bcrypt.SALT_ROUND);

  return await bcrypt.hash(password, salt);
};

export default encryptPassword;
