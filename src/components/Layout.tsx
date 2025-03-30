import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              Math Games
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/multiples-hopper"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Multiples Hopper
              </Link>
              <Link
                to="/arithmetic"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Arithmetic
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          <p>© 2024 Math Games. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
