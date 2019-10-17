import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  vatNumber?: string;
  email: string;
  password: string;
  confirmPassword: string;
  organisationName?: string;
  businessType?: string;
  occupationTitle?: string;
  role?: number;
  history?: [];
}
