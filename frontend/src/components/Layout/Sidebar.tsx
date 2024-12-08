// src/components/Layout/Sidebar.tsx
import { Nav } from 'react-bootstrap';
import { Home, Package, Users, ShoppingCart, User } from 'lucide-react';
import { ElementType } from 'react';

interface NavItem {
  name: string;
  icon: ElementType;
  href: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Produtos', icon: Package, href: '/produtos' },
  { name: 'Clientes', icon: Users, href: '/clientes' },
  { name: 'Vendas', icon: ShoppingCart, href: '/vendas' },
];

export function Sidebar() {
  return (
    <div className="bg-dark text-white" style={{ width: '250px' }}>
      <div className="p-3 border-bottom border-secondary">
        <h5 className="m-0">Admin</h5>
      </div>
      <Nav className="flex-column p-3">
        {navigation.map((item) => (
          <Nav.Link 
            key={item.name} 
            href={item.href}
            className="text-white d-flex align-items-center"
          >
            <item.icon size={20} className="me-2" />
            {item.name}
          </Nav.Link>
        ))}
      </Nav>
      <div className="mt-auto p-3 border-top border-secondary">
        <div className="d-flex align-items-center">
          <div className="bg-secondary rounded-circle p-2">
            <User size={20} />
          </div>
          <div className="ms-2">
            <div className="small">Admin</div>
            <div className="small text-muted">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}