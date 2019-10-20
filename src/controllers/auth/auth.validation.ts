import * as Joi from '@hapi/joi';
import { ISignUpModel, ILoginModel } from '../../domain/interfaces';

export class AuthValidator {
  public static signUp(signUpModel: ISignUpModel): Joi.ValidationResult {
    return this.signUpSchema.validate(signUpModel);
  }

  public static login(loginModel: ILoginModel): Joi.ValidationResult {
    return this.loginSchema.validate(loginModel);
  }

  private static signUpSchema: Joi.ObjectSchema = Joi.object({
    firstName: Joi.string().min(2).max(32).required(),
    lastName: Joi.string().min(2).max(32).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    organisationName: Joi.string(),
    businessType: Joi.string(),
    occupationTitle: Joi.string(),
    role: Joi.string(),
    history: Joi.array(),
  });

  private static loginSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
}
