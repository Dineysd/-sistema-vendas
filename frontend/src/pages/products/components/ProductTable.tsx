import { FC } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Product } from '../../../types/product';

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

export const ProductTable: FC<ProductTableProps> = ({ products, onDelete }) => {
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Código/Nome</th>
          <th>Preços</th>
          <th>Estoque</th>
          <th>Status</th>
          <th>Última Atualização</th>
          <th className="text-end">Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <div className="d-flex align-items-center">
                <div className="bg-light rounded p-2 me-3 text-center" style={{ width: 40 }}>
                  {product.code.slice(0, 2)}
                </div>
                <div>
                  <div>{product.name}</div>
                  <small className="text-muted">{product.code}</small>
                  <br />
                  <small className="text-muted">{product.category}</small>
                </div>
              </div>
            </td>
            <td>
              <div>R$ {product.sellingPrice.toFixed(2)}</div>
              <small className="text-muted">Custo: R$ {product.costPrice.toFixed(2)}</small>
              <br />
              <small className="text-success">
                Margem: {((product.sellingPrice - product.costPrice) / product.sellingPrice * 100).toFixed(1)}%
              </small>
            </td>
            <td>
              <div className={`d-flex align-items-center ${product.stock < 10 ? 'text-danger' : ''}`}>
                {product.stock}
                {product.stock < 10 && <ArrowDown size={16} className="ms-1 text-danger" />}
                {product.stock > 100 && <ArrowUp size={16} className="ms-1 text-success" />}
              </div>
              {product.stock < 10 && (
                <small className="text-danger">Estoque baixo</small>
              )}
            </td>
            <td>
              <Badge bg={product.status ? 'success' : 'danger'}>
                {product.status ? 'Ativo' : 'Inativo'}
              </Badge>
            </td>
            <td>{new Date(product.updatedAt).toLocaleDateString('pt-BR')}</td>
            <td>
              <div className="d-flex gap-2 justify-content-end">
                <Button variant="link" className="p-0 text-primary">
                  <Pencil size={18} />
                </Button>
                <Button 
                  variant="link" 
                  className="p-0 text-danger"
                  onClick={() => onDelete(product)}
                  disabled={!product.status}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};