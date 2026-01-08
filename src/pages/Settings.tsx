import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { 
    permission, 
    supported, 
    requestPermission, 
    unsubscribe, 
    sendTestNotification 
  } = useNotifications();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
                  Settings
                </h1>
                <p className="text-xs text-gray-400">Notification preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/home')}
                variant="secondary"
                className="text-sm"
              >
                ← Back
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-zinc-900 border-2 border-amber-600/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>

          {/* Support Check */}
          {!supported && (
            <div className="bg-red-900/20 border border-red-600/50 rounded-xl p-4 mb-6">
              <p className="text-red-300 text-sm">
                ⚠️ Your browser doesn't support notifications
              </p>
            </div>
          )}

          {/* Current Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div>
                <h3 className="font-semibold text-white mb-1">Notification Status</h3>
                <p className="text-sm text-gray-400">
                  {permission === 'granted' && '✅ Enabled'}
                  {permission === 'denied' && '❌ Blocked'}
                  {permission === 'default' && '⏳ Not configured'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                permission === 'granted' ? 'bg-green-500' : 
                permission === 'denied' ? 'bg-red-500' : 
                'bg-gray-500'
              }`} />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {permission === 'default' && (
              <Button
                onClick={requestPermission}
                className="w-full"
              >
                🔔 Enable Notifications
              </Button>
            )}

            {permission === 'granted' && (
              <>
                <Button
                  onClick={async () => {
                    const result = await sendTestNotification();
                    if (result.success) {
                      alert('✅ Test notification sent!');
                    } else {
                      alert('❌ Failed: ' + result.error);
                    }
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  🔔 Send Test Notification
                </Button>
                <Button
                  onClick={async () => {
                    const result = await unsubscribe();
                    if (result.success) {
                      alert('✅ Notifications disabled');
                    } else {
                      alert('❌ Failed: ' + result.error);
                    }
                  }}
                  variant="danger"
                  className="w-full"
                >
                  🔕 Disable Notifications
                </Button>
              </>
            )}


            {permission === 'denied' && (
              <div className="text-center p-4 bg-zinc-800/50 rounded-xl">
                <p className="text-sm text-gray-400 mb-2">
                  Notifications are blocked. To enable:
                </p>
                <ol className="text-xs text-gray-500 text-left space-y-1">
                  <li>1. Click the lock icon in your browser's address bar</li>
                  <li>2. Find "Notifications" setting</li>
                  <li>3. Change to "Allow"</li>
                  <li>4. Refresh this page</li>
                </ol>
              </div>
            )}
          </div>

          {/* Notification Types */}
          <div className="mt-8 pt-6 border-t border-amber-600/30">
            <h3 className="font-semibold text-white mb-4">You'll be notified about:</h3>
            <div className="space-y-3">
              {[
                { icon: '🎮', text: 'New slots created in your game' },
                { icon: '⏰', text: 'Reminder 15 minutes before your slot' },
                { icon: '✅', text: 'Players joining your slot' },
                { icon: '⏳', text: 'When a waiting queue spot opens' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
