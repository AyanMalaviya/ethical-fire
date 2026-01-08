import { motion } from 'framer-motion';

interface GameCardProps {
  name: string;
  displayName: string;
  icon?: string;
  imagePath?: string;
  isActive: boolean;
  onSelect: () => void;
  delay: number;
}

export default function GameCard({ 
  displayName, 
  icon, 
  imagePath,
  isActive, 
  onSelect, 
  delay 
}: GameCardProps) {
  if (!isActive) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="relative bg-zinc-900 border-2 border-amber-600/30 rounded-2xl p-8 hover:border-amber-500 transition-all group overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Use image if available, fallback to icon */}
        {imagePath ? (
          <div className="w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-amber-600/50 shadow-lg">
            <img 
              src={imagePath} 
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="text-6xl mb-4">{icon}</div>
        )}
        
        <h3 className="text-2xl font-bold text-white mb-2">{displayName}</h3>
        <p className="text-amber-400 text-sm">Click to select</p>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/20 blur-3xl rounded-full" />
    </motion.button>
  );
}
