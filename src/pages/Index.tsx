import { Link } from 'react-router-dom';
import { UI } from '@/constants';

const Index = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className={`${UI.TYPOGRAPHY.HEADING.MOBILE} ${UI.TYPOGRAPHY.HEADING.DESKTOP} font-bold ${UI.SPACING.MARGIN.BOTTOM.SMALL} text-purple-800`}>
        Welcome to Math Games
      </h1>
      <p className={`${UI.SPACING.MARGIN.BOTTOM.MEDIUM} text-gray-600`}>
        Choose a game from the menu to start learning and having fun!
      </p>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Available Games</h2>
        <div className="space-y-4">
          <Link
            to="/multiples-hopper"
            className="block p-4 rounded-lg border border-purple-200 hover:border-purple-400 transition-colors"
          >
            <h3 className="text-xl font-medium text-purple-800">Multiples Hopper</h3>
            <p className="text-gray-600 mt-2">
              Practice finding the Least Common Denominator by hopping along number lines.
              A fun and interactive way to understand multiples and common denominators.
            </p>
          </Link>
          {/* Add more game cards here as they are created */}
        </div>
      </div>
    </div>
  );
};

export default Index;
