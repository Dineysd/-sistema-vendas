import { FC } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const ProductPagination: FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  return (
    <Row className="align-items-center bg-white p-3">
      <Col>
        <small className="text-muted">
          Mostrando {itemsPerPage} de {totalItems} resultados
        </small>
      </Col>
      <Col xs="auto">
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} /> Anterior
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima <ChevronRight size={16} />
          </Button>
        </div>
      </Col>
    </Row>
  );
};