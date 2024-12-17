import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Spinner } from 'react-bootstrap';
import { productService } from '../../services/productService';
import { Product, ProductListResponse } from '../../types/product';
import { ProductHeader } from './components/ProductHeader';
import { ProductTable } from './components/ProductTable';
import { ProductPagination } from './components/ProductPagination';
import { DeleteProductModal } from './components/DeleteProductModal';

export function ProductList() {
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<ProductListResponse>({
    queryKey: ['products', page],
    queryFn: () => productService.list(page)
  });

  const { data: categoriesData } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const allProducts = await productService.list(1, 1000);
      const uniqueCategories = [...new Set(allProducts.products.map(p => p.category))];
      return uniqueCategories;
    }
  });

  const deactivateProductMutation = useMutation({
    mutationFn: (productCode: string) => 
      productService.update(productCode, { status: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  });

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deactivateProductMutation.mutate(selectedProduct.code);
    }
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
    <>
      <Card>
        <ProductHeader 
          totalProducts={data?.total || 0}
          categories={categoriesData || []}
        />

        <ProductTable 
          products={data?.products || []}
          onDelete={handleDelete}
        />

        <ProductPagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          totalItems={data?.total || 0}
          itemsPerPage={data?.products.length || 0}
          onPageChange={setPage}
        />
      </Card>

      <DeleteProductModal
        show={showDeleteModal}
        product={selectedProduct}
        isDeleting={deactivateProductMutation.isPending}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}