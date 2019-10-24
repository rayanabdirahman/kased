import formidable from 'formidable';
import fs from 'fs';
import * as _ from 'lodash';
import Product from '../data_access/models/product.model';
import { ErrorMessage } from './../constants';
import { IProductSearchArg } from '../domain/interfaces';

export default class ProductService {
  // Find all products
  public async list(order: string, sortBy: string, limit: number) {
    return await Product.find()
                        .select('-photo')
                        .populate('category')
                        .sort([[sortBy, order]])
                        .limit(limit);
  }

  // Find all product categories
  public async categories() {
    return await Product.distinct('category', {});
  }

  // Find searched for products
  public async search(searchArgs: IProductSearchArg, order: string, sortBy: string, skip: number, limit: number) {
    return await Product.find(searchArgs)
                        .select('-photo')
                        .populate('category')
                        .sort([[sortBy, order]])
                        .skip(skip)
                        .limit(limit);
  }
  

  // Find all related products
  public async related(product: any, limit: number) {
    return await Product.find({ _id: {$ne: product}, category: product.category})
                        .limit(limit)
                        .populate('category', '_id name');
  }

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

  // Update product details in database
  public async update(model: any, fields: formidable.Fields, files: formidable.Files) {
    // create new product instance using product details passed from req.product
    let product = model;
    product = _.extend(product, fields);

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
