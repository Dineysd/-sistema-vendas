// src/services/productService.ts
import api from './api';
import { Product, ProductInput, ProductListResponse, ImportResponse } from '../types/product';

export const productService = {
  // Listar produtos
  list: async (page = 1, limit = 10): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>(`/products?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar produto por código
  getByCode: async (code: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${code}`);
    return response.data;
  },

  // Criar produto
  create: async (product: ProductInput): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  // Atualizar produto
  update: async (code: string, product: Partial<ProductInput>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${code}`, product);
    return response.data;
  },

  // Importar produtos
  import: async (file: File): Promise<ImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<ImportResponse>('/products/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};