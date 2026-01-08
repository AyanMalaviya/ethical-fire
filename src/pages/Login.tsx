import { useNavigate } from 'react-router-dom';
import PhoneLogin from '../components/auth/PhoneLogin';

export default function Login() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate('/game-selection');
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Logo (Faded) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/EF.jpg" 
          alt="Background" 
          className="w-1/3 h-auto object-contain"
        />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card - Centered with max width */}
      <div className="relative bg-zinc-900 border-2 border-amber-600/30 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8">
        <PhoneLogin onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
