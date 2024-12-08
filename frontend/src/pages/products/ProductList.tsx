// src/pages/Products/ProductList.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Card, Button, Form, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pencil, 
  Trash2,
  ArrowUp,
  ArrowDown,
  FileText,
  Plus
} from 'lucide-react';
import { productService } from '../../services/productService';

export function ProductList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page],
    queryFn: () => productService.list(page)
  });

  // Query para buscar categorias únicas dos produtos
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const allProducts = await productService.list(1, 1000);
      const uniqueCategories = [...new Set(allProducts.products.map(p => p.category))];
      return uniqueCategories;
    }
  });

  if (isLoading) {
    return (
      <Card className="p-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Card>
    );
  }

  if (error) {
    return (
      <Card bg="danger" text="white" className="p-4">
        <Card.Body>
          <Card.Title>Erro ao carregar produtos</Card.Title>
          <Card.Text>Por favor, tente novamente mais tarde.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header className="bg-white">
        <Row className="align-items-center mb-3">
          <Col>
            <h5 className="mb-0">Produtos</h5>
            <small className="text-muted">{data?.total || 0} produtos cadastrados</small>
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
              {categoriesData?.map(category => (
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
      </Card.Header>

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
          {data?.products.map((product) => (
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
                  <Button variant="link" className="p-0 text-danger">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card.Footer className="bg-white">
        <Row className="align-items-center">
          <Col>
            <small className="text-muted">
              Mostrando {data?.products.length} de {data?.total} resultados
            </small>
          </Col>
          <Col xs="auto">
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={16} /> Anterior
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setPage(p => p + 1)}
                disabled={data?.page === data?.totalPages}
              >
                Próxima <ChevronRight size={16} />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}