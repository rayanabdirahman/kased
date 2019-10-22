export enum ErrorMessage {
  DB_CONNECTION = 'Failed to connect to DbClient',
  SIGN_UP_USER = 'Unable to register user to database',
  LOGIN_USER = 'Unable to log user in to application',
  EMAIL_IS_TAKEN = 'Email is already taken',
  USER_DOES_NOT_EXIST = 'User with that email does not exist',
  INVALID_DETAILS = 'Invalid credentials',
  CREATE_CATEGORY = 'Unable to create category'
}

export enum SuccessMessage {
  DB_CONNECTION = 'Successfully connected to DbClient',
  SIGN_UP_USER = 'Successfully registered user to databse',
  LOG_OUT_USER = 'Successfully logged user out',
}
