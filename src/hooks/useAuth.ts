import { useState, useEffect } from 'react';
import { getCurrentUser, signOut as amplifySignOut, fetchAuthSession } from 'aws-amplify/auth';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      const groups = session.tokens?.accessToken?.payload['cognito:groups'] as string[] || [];
      setIsAdmin(groups.includes('ADMIN'));
      
      setUser(currentUser);
    } catch (error) {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await amplifySignOut();
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  return { user, loading, isAdmin, signOut, refreshAuth: checkAuth };
}
