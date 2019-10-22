import * as Joi from '@hapi/joi';
import { ICreateProductModel } from '../../domain/interfaces';

export class ProductValidator {
  public static create(createProductModel: ICreateProductModel): Joi.ValidationResult {
    return this.createProductSchema.validate(createProductModel);
  }

  private static createProductSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().min(2).max(32).required(),
  });

}
