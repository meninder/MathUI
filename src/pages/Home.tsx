import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Math Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/multiples-hopper"
          className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Multiples Hopper</h2>
          <p className="text-muted-foreground">
            Practice your multiplication skills by hopping between multiples.
          </p>
        </Link>
        <Link
          to="/arithmetic"
          className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Arithmetic Practice</h2>
          <p className="text-muted-foreground">
            Practice basic arithmetic operations with customizable difficulty.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
