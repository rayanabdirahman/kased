import { ErrorMessage } from './../constants';
import formidable from 'formidable';
import fs from 'fs';
import Product from '../data_access/models/product.model';
import { ICreateProductModel } from '../domain/interfaces';

export default class ProductService {
  public async create(fields: formidable.Fields, files: formidable.Files) {
    // create new product instance
    const product = new Product(fields);

    // check if product image has been provided
    if (files.photo) {
      // throw error for images larger than 1mb
      if (files.photo.size > 1000000) {
        throw Error(ErrorMessage.LARGE_IMAGE);
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // save product to DB
    await product.save();

    return product;
  }

  public async findById(id: string) {
    return await Product.findById(id);
  }
}
