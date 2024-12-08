// src/types/product.ts
export interface Product {
    _id: string;
    code: string;
    name: string;
    description?: string;
    costPrice: number;
    sellingPrice: number;
    stock: number;
    category: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductInput {
    code: string;
    name: string;
    description?: string;
    costPrice: number;
    sellingPrice: number;
    stock: number;
    category: string;
    status?: boolean;
  }
  
  export interface ProductListResponse {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }
  
  export interface ImportResponse {
    message: string;
    success: number;
    errors: Array<{
      line: number;
      error: string;
    }>;
  }