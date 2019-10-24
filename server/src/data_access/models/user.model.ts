import { IUser } from './interfaces';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true, maxlength: 32 },
  lastName: { type: String, trim: true, required: true, maxlength: 32 },
  vatNumber: { type: String, trim: true, },
  email: { type: String, trim: true, required: true, unique: 32 },
  password: { type: String, required: true },
  organisationName: { type: String },
  businessType: { type: String },
  occupationTitle: { type: String },
  role: {
    type: Number,
    default: 0 // 0 = standard users 1 = admin users
  },
  history: {type: Array, default: []}
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
