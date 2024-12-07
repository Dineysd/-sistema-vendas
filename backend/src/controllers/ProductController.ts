// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import multer from 'multer';
import path from 'path';

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: './uploads/products',
  filename: (req, file, cb) => {
    cb(null, `products-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
      return cb(new Error('Apenas arquivos CSV são permitidos'));
    }
    cb(null, true);
  }
});

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Criar produto
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const product = await this.productService.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar produto'
      });
    }
  }

  // Listar produtos
  list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const products = await this.productService.findAll(page, limit);
      return res.json(products);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar produtos'
      });
    }
  }

  // Buscar produto por código
  findByCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const product = await this.productService.findByCode(req.params.code);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar produto'
      });
    }
  }

  // Atualizar produto
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const product = await this.productService.update(req.params.code, req.body);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao atualizar produto'
      });
    }
  }

  // Importar produtos via CSV
  import = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
      }

      const results = await this.productService.importFromCSV(
        req.file.path,
        req.body.importedBy || 'system'
      );

      return res.json({
        message: 'Importação concluída',
        ...results
      });
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro na importação'
      });
    }
  }
}



