import { Router } from 'express';
import { ProductController, upload } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

// Rotas para CRUD básico
router.post('/', productController.create.bind(productController));
router.get('/', productController.list.bind(productController));
router.get('/:code', productController.findByCode.bind(productController));
router.put('/:code', productController.update.bind(productController));

// Rota para importação de arquivo
router.post('/import', 
  upload.single('file'),
  productController.import.bind(productController)
);

export default router;