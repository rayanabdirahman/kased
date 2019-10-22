import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  vatNumber?: string;
  email: string;
  password: string;
  organisationName?: string;
  businessType?: string;
  occupationTitle?: string;
  role?: number;
  history?: [];
}

export interface ICategory extends mongoose.Document {
  name: string;
}

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: ICategory;
  quantity: number;
  photo: string;
  shipping: boolean;
}
