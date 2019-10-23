import Category from '../data_access/models/category.model';
import { ICreateCategoryModel } from '../domain/interfaces';

export default class CategoryService {
  // Find all categories
  public async list() {
    return await Category.find();
  }

  // Create category
  public async create(model: ICreateCategoryModel) {
    // create new category instance
    const category = new Category(model);

    // save category to DB
    await category.save();

    return category;
  }

  /**
   * Update existing category in database
   * @param reqCategory - category details from req.category
   * @param model - updated req.body fields
   */
  public async update(reqCategory: any, model: ICreateCategoryModel) {
    // create new category instance from reqCategory
    const category = reqCategory;
    category.name = model.name;

    // save category to DB
    await category.save();

    return category;
  }

  public async findById(id: string) {
    return await Category.findById(id);
  }
}
