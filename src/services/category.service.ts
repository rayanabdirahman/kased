import Category from '../data_access/models/category.model';
import { ICreateCategoryModel } from '../domain/interfaces';

export default class CategoryService {
  public async create(model: ICreateCategoryModel) {
    // create new category instance
    const category = new Category(model);

    // save category to DB
    await category.save();

    return category;
  }

  public async findById(id: string) {
    return await Category.findById(id);
  }
}
