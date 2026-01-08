import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import OnboardingModal from '../components/onboarding/OnboardingModal';

interface Game {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  imagePath: string;
  isActive: boolean;
}

export default function GameSelection() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const games: Game[] = [
    {
      id: '1',
      name: 'BGMI',
      displayName: 'BGMI',
      icon: '🎮',
      imagePath: '/bgmi-logo.jpg',
      isActive: true,
    },
    {
      id: '2',
      name: 'Free Fire',
      displayName: 'Free Fire',
      icon: '🔥',
      imagePath: '/freefire-logo.jpg',
      isActive: false,
    },
    {
      id: '3',
      name: 'COD Mobile',
      displayName: 'Call of Duty Mobile',
      icon: '🎯',
      imagePath: '/cod-logo.jpg',
      isActive: false,
    },
    {
      id: '4',
      name: 'Valorant',
      displayName: 'Valorant',
      icon: '🎭',
      imagePath: '/valorant-logo.jpg',
      isActive: false,
    },
  ];

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  function handleGameSelect(gameName: string) {
    const game = games.find(g => g.name === gameName);
    if (game?.isActive) {
      setSelectedGame(gameName);
    }
  }

  async function handleContinue() {
    if (!selectedGame) return;

    setLoading(true);

    try {
      // Store selected game in localStorage
      localStorage.setItem('selectedGame', selectedGame);
      
      // Navigate to slots page
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-screen-2xl">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-10">
          <img 
            src="/EF.jpg" 
            alt="EthicalFire" 
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto rounded-full border-3 sm:border-4 border-amber-600 shadow-2xl shadow-amber-500/50 mb-3 sm:mb-6"
          />
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Choose Your Game
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Select a game to find or create slots</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {games.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: game.isActive ? 1.05 : 1 }}
              whileTap={{ scale: game.isActive ? 0.95 : 1 }}
              className={`relative cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 transition-all ${
                selectedGame === game.name
                  ? 'border-amber-500 shadow-xl sm:shadow-2xl shadow-amber-500/50'
                  : game.isActive
                  ? 'border-amber-600/30 hover:border-amber-500/50'
                  : 'border-gray-700 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => handleGameSelect(game.name)}
            >
              {/* Game Image */}
              <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-4 sm:p-6">
                <div className="text-4xl sm:text-6xl lg:text-7xl">{game.icon}</div>
              </div>

              {/* Game Info */}
              <div className="p-3 sm:p-4 bg-zinc-900 border-t-2 border-amber-600/30">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 truncate">
                  {game.displayName}
                </h3>
                {game.isActive ? (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] sm:text-xs text-green-400">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                    <span className="text-[10px] sm:text-xs text-gray-500">Coming Soon</span>
                  </div>
                )}
              </div>

              {/* Selected Overlay */}
              {selectedGame === game.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-amber-500/20 border-4 border-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* Coming Soon Overlay */}
              {!game.isActive && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-zinc-900 border-2 border-amber-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2">
                    <p className="text-xs sm:text-sm font-bold text-amber-400">Coming Soon</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="max-w-md mx-auto px-2 sm:px-0">
          <Button
            onClick={handleContinue}
            disabled={!selectedGame || loading}
            isLoading={loading}
            className="w-full text-base sm:text-lg py-3 sm:py-4"
          >
            Continue to {selectedGame || 'Game'} Slots
          </Button>

          {/* Info Text */}
          <p className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">
            More games coming soon! Stay tuned 🎮
          </p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 bg-zinc-900/50 border border-amber-600/20 rounded-xl sm:rounded-2xl max-w-4xl mx-auto"
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 text-center">
            Platform Features
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-amber-400 mb-1">1000+</div>
              <div className="text-xs sm:text-sm text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-amber-400 mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-gray-400">Live Slots</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-amber-400 mb-1">4</div>
              <div className="text-xs sm:text-sm text-gray-400">Games</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-amber-400 mb-1">∞</div>
              <div className="text-xs sm:text-sm text-gray-400">Fun</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
