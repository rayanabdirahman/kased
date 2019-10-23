export enum ErrorMessage {
  DB_CONNECTION = 'Failed to connect to DbClient',
  SIGN_UP_USER = 'Unable to register user to database',
  LOGIN_USER = 'Unable to log user in to application',
  EMAIL_IS_TAKEN = 'Email is already taken',
  USER_DOES_NOT_EXIST = 'User with that email does not exist',
  INVALID_DETAILS = 'Invalid credentials',
  CREATE_CATEGORY = 'Unable to create category',
  CREATE_PRODUCT = 'Unable to create products',
  PRODUCT_IMAGE_UPLOAD = 'Unable to upload product image',
  LARGE_IMAGE = 'Image is too large to upload. It should be less than 1mb in size',
  FIND_PRODUCT_BY_ID = 'Unable to find product by this ID',
  REMOVE_PRODUCT_BY_ID = 'Unable to remove product by this ID'
}

export enum SuccessMessage {
  DB_CONNECTION = 'Successfully connected to DbClient',
  SIGN_UP_USER = 'Successfully registered user to databse',
  LOG_OUT_USER = 'Successfully logged user out',
  DELETED_PRODUCT = 'Product successfully deleted'
}
