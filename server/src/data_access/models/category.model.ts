import { ICategory } from './interfaces';
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, maxlength: 32, unique: true },
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);
