// src/services/ProductService.ts
import { Product, IProduct } from '../models/Product';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Transform } from 'stream';

export class ProductService {
  // Criar produto
  async create(productData: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(productData);
    return await product.save();
  }

  // Listar produtos com paginação
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments();

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  // Buscar produto por código
  async findByCode(code: string): Promise<IProduct | null> {
    return await Product.findOne({ code });
  }

  // Atualizar produto
  async update(code: string, productData: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findOneAndUpdate(
      { code },
      productData,
      { new: true, runValidators: true }
    );
  }

  // Importar produtos de arquivo CSV
  async importFromCSV(filePath: string, importedBy: string): Promise<{
    success: number;
    errors: Array<{ line: number; error: string }>;
  }> {
    const results = {
      success: 0,
      errors: [] as Array<{ line: number; error: string }>
    };
    let lineNumber = 0;

    const processLine = new Transform({
      objectMode: true,
      transform: async (chunk, _encoding, callback) => {
        lineNumber++;
        try {
          // Validar e transformar dados
          const productData = {
            code: chunk.CODIGO?.trim(),
            name: chunk.NOME?.trim(),
            description: chunk.DESCRICAO?.trim(),
            costPrice: parseFloat(chunk.CUSTO),
            sellingPrice: parseFloat(chunk.VENDA),
            stock: parseInt(chunk.ESTOQUE),
            category: chunk.CATEGORIA?.trim(),
            status: chunk.STATUS?.toUpperCase() === 'A',
            importHistory: [{
              importedBy,
              fileName: filePath.split('/').pop()
            }]
          };

          // Validar dados obrigatórios
          if (!productData.code || !productData.name || isNaN(productData.costPrice) || 
              isNaN(productData.sellingPrice) || isNaN(productData.stock)) {
            throw new Error('Dados obrigatórios faltando ou inválidos');
          }

          // Verificar se produto já existe
          const existingProduct = await Product.findOne({ code: productData.code });
          if (existingProduct) {
            // Atualizar produto existente
            await Product.updateOne({ code: productData.code }, {
              $set: productData,
              $push: { importHistory: productData.importHistory[0] }
            });
          } else {
            // Criar novo produto
            await new Product(productData).save();
          }

          results.success++;
          callback();
        } catch (error) {
          results.errors.push({
            line: lineNumber,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
          callback();
        }
      }
    });

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .pipe(processLine)
        .on('finish', () => resolve(results))
        .on('error', reject);
    });
  }
}