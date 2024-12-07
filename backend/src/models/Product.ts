// src/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  code: string;
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  category: string;
  status: boolean;
  importHistory?: {
    importedAt: Date;
    importedBy: string;
    fileName: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  code: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  costPrice: { 
    type: Number, 
    required: true,
    min: 0 
  },
  sellingPrice: { 
    type: Number, 
    required: true,
    min: 0 
  },
  stock: { 
    type: Number, 
    required: true,
    min: 0 
  },
  category: { 
    type: String, 
    required: true,
    trim: true 
  },
  status: { 
    type: Boolean, 
    default: true 
  },
  importHistory: [{
    importedAt: { type: Date, default: Date.now },
    importedBy: String,
    fileName: String
  }]
}, {
  timestamps: true
});

// Validação de preço de venda maior que preço de custo
productSchema.pre('save', function(next) {
  if (this.sellingPrice < this.costPrice) {
    next(new Error('Preço de venda deve ser maior que o preço de custo'));
  }
  next();
});

export const Product = mongoose.model<IProduct>('Product', productSchema);