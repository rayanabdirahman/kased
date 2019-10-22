import Product from '../data_access/models/product.model';
import { ICreateProductModel } from '../domain/interfaces';

export default class ProductService {
  public async create(model: ICreateProductModel) {
    // create new product instance
    const product = new Product(model);

    // save product to DB
    await product.save();

    return product;
  }
}
