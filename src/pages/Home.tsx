import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar - Responsive */}
      <nav className="border-b border-amber-600/30 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/EF.jpg" 
                alt="EthicalFire" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-600"
              />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400">
                EthicalFire
              </h1>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="text-sm sm:text-base">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered with max width */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-zinc-900 border border-amber-600/30 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Welcome to the Game!
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-8">
            Dashboard coming soon... Slots, Chat, and more!
          </p>
          <img 
            src="/bgmi-logo.jpg" 
            alt="BGMI" 
            className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-xl border-2 border-amber-600 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
