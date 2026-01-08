import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

interface NavbarProps {
  user: any;
  gameName: string;
  onSignOut: () => void;
  unreadMessages?: number;
}

export default function Navbar({ user, gameName, onSignOut, unreadMessages = 0 }: NavbarProps) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userName = user?.signInDetails?.loginId?.split('@')[0] || user?.username || 'User';
  const userEmail = user?.signInDetails?.loginId || '';

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-amber-600/30 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800 backdrop-blur-md sticky top-0 z-30 shadow-xl">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative cursor-pointer" onClick={() => navigate('/home')}>
              <img 
                src="/EF.jpg" 
                alt="EthicalFire" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 border-amber-600 shadow-lg shadow-amber-500/50 hover:scale-110 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-zinc-900 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 
                className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate('/home')}
              >
                EthicalFire
              </h1>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-amber-600 text-black font-bold rounded text-[10px] sm:text-xs">
                  {gameName.length > 10 ? gameName.substring(0, 10) + '...' : gameName}
                </span>
                <span className="hidden sm:inline text-xs text-gray-400">• Online</span>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Chat Button */}
            <div className="relative">
              <Button
                onClick={() => navigate('/chat')}
                variant="secondary"
                className="relative flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base"
              >
                <span className="text-base sm:text-xl">💬</span>
                <span className="hidden md:inline text-sm font-semibold">Chat</span>
              </Button>
              
              {/* Unread Badge */}
              {unreadMessages > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 min-w-[18px] sm:min-w-[24px] h-4.5 sm:h-6 px-1 sm:px-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {unreadMessages > 99 ? '99+' : unreadMessages}
                </motion.span>
              )}
            </div>

            {/* Settings Button */}
            <Button
              onClick={() => navigate('/settings')}
              variant="secondary"
              className="w-9 h-9 sm:w-12 sm:h-12 p-0 flex items-center justify-center hover:rotate-90 transition-transform duration-300"
              title="Settings"
            >
              <span className="text-base sm:text-xl">⚙️</span>
            </Button>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <Button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-zinc-900 rounded-full flex items-center justify-center font-bold text-sm sm:text-base text-amber-400 border-2 border-zinc-900">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-bold max-w-[70px] lg:max-w-[100px] truncate">
                  {userName}
                </span>
                <svg 
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 sm:w-64 bg-zinc-900 border-2 border-amber-600/40 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="p-3 sm:p-4 bg-zinc-800/50 border-b border-amber-600/30">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl text-black">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate text-sm sm:text-base">{userName}</p>
                          <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/home');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 sm:gap-3"
                      >
                        <span className="text-base sm:text-lg">🎮</span>
                        <span>My Slots</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/chat');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 sm:gap-3"
                      >
                        <span className="text-base sm:text-lg">💬</span>
                        <span>Chat</span>
                        {unreadMessages > 0 && (
                          <span className="ml-auto px-1.5 sm:px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {unreadMessages}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 sm:gap-3"
                      >
                        <span className="text-base sm:text-lg">⚙️</span>
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-amber-600/30 my-2" />
                      <button
                        onClick={() => {
                          onSignOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors flex items-center gap-2 sm:gap-3"
                      >
                        <span className="text-base sm:text-lg">🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
