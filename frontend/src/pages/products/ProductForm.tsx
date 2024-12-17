import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Form, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { productService } from '../../services/productService';
import { ProductInput } from '../../types/product';

interface ProductFormProps {
  productCode?: string;
  onCancel: () => void;
}

const defaultValues: ProductInput = {
  code: '',
  name: '',
  description: '',
  costPrice: 0,
  sellingPrice: 0,
  stock: 0,
  category: '',
  status: true
};

export function ProductForm({ productCode, onCancel }: ProductFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductInput>({
    defaultValues
  });
  const isEditing = !!productCode;

  // Buscar dados do produto se estiver editando
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productCode],
    queryFn: () => productCode ? productService.getByCode(productCode) : Promise.resolve(null),
    enabled: isEditing
  });

  // Carregar dados do produto no formulário quando disponíveis
  useEffect(() => {
    if (product) {
      reset({
        code: product.code,
        name: product.name,
        description: product.description,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
        stock: product.stock,
        category: product.category,
        status: product.status
      });
    }
  }, [product, reset]);

  // Mutação para criar/atualizar produto
  const productMutation = useMutation({
    mutationFn: (data: ProductInput) => 
      isEditing 
        ? productService.update(productCode, data)
        : productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['product', productCode] });
        onCancel();
      } else {
        // Apenas limpa o formulário se for uma nova inserção
        reset(defaultValues);
      }
    }
  });

  const onSubmit = (data: ProductInput) => {
    productMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Card className="p-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Card>
    );
  }

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
              disabled={isEditing}
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
              {...register('costPrice', { 
                required: 'Preço de custo é obrigatório',
                min: { value: 0, message: 'Preço deve ser maior que 0' }
              })}
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
              {...register('sellingPrice', { 
                required: 'Preço de venda é obrigatório',
                min: { value: 0, message: 'Preço deve ser maior que 0' }
              })}
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
              {...register('stock', { 
                required: 'Estoque é obrigatório',
                min: { value: 0, message: 'Estoque não pode ser negativo' }
              })}
              isInvalid={!!errors.stock}
            />
            <Form.Control.Feedback type="invalid">
              {errors.stock?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
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
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select {...register('status')}>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={productMutation.isPending}
        >
          {productMutation.isPending 
            ? (isEditing ? 'Atualizando...' : 'Salvando...') 
            : (isEditing ? 'Atualizar Produto' : 'Salvar Produto')}
        </Button>
      </div>
    </Form>
  );
}