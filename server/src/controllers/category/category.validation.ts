import * as Joi from '@hapi/joi';
import { ICreateCategoryModel } from '../../domain/interfaces';

export class CategoryValidator {
  public static create(createCategoryModel: ICreateCategoryModel): Joi.ValidationResult {
    return this.createCategorySchema.validate(createCategoryModel);
  }

  private static createCategorySchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().min(2).max(32).required(),
  });

}
