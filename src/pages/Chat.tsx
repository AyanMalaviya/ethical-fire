import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ChatWindow from '../components/chat/ChatWindow';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function Chat() {
  const navigate = useNavigate();
  const { user, signOut, loading, isAdmin } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  if (loading) {
    return <Spinner />;
  }

  const userName = user?.signInDetails?.loginId?.split('@')[0] || 
                  user?.username || 
                  'User';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-amber-600/30 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30 shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/EF.jpg" 
                alt="EthicalFire" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-600 shadow-lg shadow-amber-500/30"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  EthicalFire
                </h1>
                <p className="text-xs text-gray-400">Global Chat</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/home')}
                variant="secondary"
                className="text-sm"
              >
                ← Slots
              </Button>
              <Button
                onClick={handleSignOut}
                variant="secondary"
                className="text-sm"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <div className="bg-zinc-900 border-2 border-amber-600/30 rounded-2xl shadow-2xl h-[calc(100vh-180px)] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-amber-600/30 bg-zinc-800/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Community Chat</h2>
                <p className="text-xs text-gray-400">
                  {isAdmin ? '👑 Admin' : `Logged in as ${userName}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <ChatWindow
            roomId="global"
            currentUserId={user?.userId || ''}
            currentUserName={userName}
            isAdmin={isAdmin}
          />
        </div>

        {/* Chat Rules */}
        <div className="mt-4 p-4 bg-zinc-900/50 border border-amber-600/20 rounded-xl">
          <h3 className="text-amber-400 font-semibold text-sm mb-2">💬 Chat Rules:</h3>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>• Be respectful to all community members</li>
            <li>• No spam or excessive caps</li>
            <li>• Keep conversations relevant to gaming</li>
            <li>• Max message length: 500 characters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
