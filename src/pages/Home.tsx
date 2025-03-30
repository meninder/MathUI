import React from 'react';
import { Link } from 'react-router-dom';

interface GameCard {
  title: string;
  description: string;
  path: string;
  icon?: string;
}

const games: GameCard[] = [
  {
    title: "Multiples Hopper",
    description: "Practice your multiplication skills by hopping between multiples.",
    path: "/multiples",
  },
  {
    title: "Arithmetic Practice",
    description: "Practice basic arithmetic operations with customizable difficulty.",
    path: "/arithmetic",
  },
  // Future games can be added here
];

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Math Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.path}
            to={game.path}
            className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
            <p className="text-muted-foreground">
              {game.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
