import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  vatNumber: string;
  email: string;
  _hashedPassword: string;
  organisationName: string;
  businessType: string;
  occupationTitle: string;
  password: string;
  confirmPassword: string;
  role: number;
  history: [];
}
