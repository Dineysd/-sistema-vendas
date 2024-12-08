// src/components/Layout/index.tsx
import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="vh-100 d-flex">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <Navbar />
        <main className="flex-grow-1 overflow-auto bg-light p-3">
          <Container fluid>
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}