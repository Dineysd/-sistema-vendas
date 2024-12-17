import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Product } from '../../../types/product';

interface DeleteProductModalProps {
  show: boolean;
  product: Product | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteProductModal: FC<DeleteProductModalProps> = ({
  show,
  product,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Desativação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja desativar o produto "{product?.name}"?
        <br />
        <small className="text-muted">
          O produto será marcado como inativo e não aparecerá nas listagens padrão.
        </small>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Desativando...' : 'Desativar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};