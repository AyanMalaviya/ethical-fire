import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ChatWindow from '../components/chat/ChatWindow';
// import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Navbar from '../components/layout/Navbar';

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
      <Navbar 
        user={user}
        gameName="Global Chat"
        onSignOut={handleSignOut}
        unreadMessages={0}
      />

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl">
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
