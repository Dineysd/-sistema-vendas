// src/pages/Products/ProductForm.tsx
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { productService } from '../../services/productService';
import { ProductInput } from '../../types/product';

export function ProductForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductInput>();

  const createProduct = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
    }
  });

  const onSubmit = (data: ProductInput) => {
    createProduct.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: PROD001"
              {...register('code', { required: 'Código é obrigatório' })}
              isInvalid={!!errors.code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do produto"
              {...register('name', { required: 'Nome é obrigatório' })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Descrição detalhada do produto"
          {...register('description')}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Preço de Custo</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('costPrice', { required: 'Preço de custo é obrigatório' })}
              isInvalid={!!errors.costPrice}
            />
            <Form.Control.Feedback type="invalid">
              {errors.costPrice?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Preço de Venda</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('sellingPrice', { required: 'Preço de venda é obrigatório' })}
              isInvalid={!!errors.sellingPrice}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sellingPrice?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Estoque</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              {...register('stock', { required: 'Estoque é obrigatório' })}
              isInvalid={!!errors.stock}
            />
            <Form.Control.Feedback type="invalid">
              {errors.stock?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          type="text"
          placeholder="Categoria do produto"
          {...register('category', { required: 'Categoria é obrigatória' })}
          isInvalid={!!errors.category}
        />
        <Form.Control.Feedback type="invalid">
          {errors.category?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => reset()}
        >
          Limpar
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={createProduct.isPending}
        >
          {createProduct.isPending ? 'Salvando...' : 'Salvar Produto'}
        </Button>
      </div>
    </Form>
  );
}