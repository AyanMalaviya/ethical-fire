import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import GameSelection from './pages/GameSelection';
import Slots from './pages/Slots';
import { useAuth } from './hooks/useAuth';
import Spinner from './components/ui/Spinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/game-selection" /> : <Login />} />
        <Route 
          path="/game-selection" 
          element={
            <ProtectedRoute>
              <GameSelection />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Slots />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to={user ? "/game-selection" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
