// src/components/Layout/Navbar.tsx
import { Navbar as BNavbar, Container } from 'react-bootstrap';
import { User } from 'lucide-react';

export function Navbar() {
  return (
    <BNavbar bg="white" className="border-bottom">
      <Container fluid>
        <BNavbar.Brand>Sistema de Vendas</BNavbar.Brand>
        <div className="d-flex align-items-center">
          <span className="me-3">Bem-vindo, Usuário</span>
          <User size={20} />
        </div>
      </Container>
    </BNavbar>
  );
}