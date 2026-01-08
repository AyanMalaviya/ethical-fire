import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GameCard from '../components/game/GameCard';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';
import OnboardingModal from '../components/onboarding/OnboardingModal';

interface Game {
  id: string;
  name: string;
  displayName: string;
  icon?: string;
  imagePath?: string;
  isActive: boolean;
}

export default function GameSelection() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const games: Game[] = [
    {
      id: '1',
      name: 'BGMI',
      displayName: 'BGMI',
      imagePath: '/bgmi-logo.jpg',
      icon: '🎮',
      isActive: true,
    },
    {
      id: '2',
      name: 'VALORANT',
      displayName: 'Valorant',
      imagePath: '/valorant-logo.jpg',
      icon: '🎯',
      isActive: false,
    },
    {
      id: '3',
      name: 'COD',
      displayName: 'Call of Duty',
      imagePath: '/cod-logo.jpg',
      icon: '🔫',
      isActive: false,
    },
  ];
  
  useEffect(() => {
  const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
  if (!hasCompletedOnboarding) {
    setShowOnboarding(true);
  }
}, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  async function handleGameSelect(gameName: string) {
    setSelectedGame(gameName);
    setTimeout(() => {
      navigate('/home');
    }, 800);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content - Centered Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Logo at Top */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4 border-amber-600 shadow-xl shadow-amber-500/50">
            <img 
              src="/EF.jpg" 
              alt="EthicalFire Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Choose Your Game
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Select a game to start creating or joining slots
          </p>
        </motion.div>

        {/* Games Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              name={game.name}
              displayName={game.displayName}
              icon={game.icon}
              imagePath={game.imagePath}
              isActive={game.isActive}
              onSelect={() => handleGameSelect(game.name)}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-amber-700 text-sm">
            🚀 More games coming soon!
          </p>
        </motion.div>
      </div>

      {/* Selection Animation Overlay */}
      {selectedGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-600 shadow-xl shadow-amber-500/50">
              <img 
                src="/bgmi-logo.jpg" 
                alt={selectedGame}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-400">
              Loading {selectedGame}...
            </h2>
          </motion.div>
        </motion.div>
      )}
      
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
