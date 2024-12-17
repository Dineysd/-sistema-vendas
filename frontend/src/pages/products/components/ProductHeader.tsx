import { FC } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FileText, Plus } from 'lucide-react';

interface ProductHeaderProps {
  totalProducts: number;
  categories: string[];
}

export const ProductHeader: FC<ProductHeaderProps> = ({ totalProducts, categories }) => {
  return (
    <div className="bg-white p-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h5 className="mb-0">Produtos</h5>
          <small className="text-muted">{totalProducts} produtos cadastrados</small>
        </Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
              <FileText size={16} />
              Exportar
            </Button>
            <Button variant="primary" className="d-flex align-items-center gap-2">
              <Plus size={16} />
              Novo Produto
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar produtos..."
          />
        </Col>
        <Col md={3}>
          <Form.Select>
            <option value="">Todas as categorias</option>
            {categories?.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};