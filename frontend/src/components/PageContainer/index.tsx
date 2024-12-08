// src/components/PageContainer/index.tsx
import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

export function PageContainer({ title, children }: PageContainerProps) {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="m-0">{title}</h5>
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}