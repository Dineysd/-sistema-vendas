// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { PageContainer } from './components/PageContainer';
import { ProductList } from './pages/products/ProductList';
import { ProductForm } from './pages/products/ProductForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <PageContainer title="Cadastro de Produto">
          <ProductForm />
        </PageContainer>
        
        <PageContainer title="Lista de Produtos">
          <ProductList />
        </PageContainer>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;