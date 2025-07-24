import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setToken, clearToken, getToken } from '../utils/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [users, setUsers]     = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  // Hydrate current user on mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Login
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setUser(data.user);

    // Redirect by role
    switch (data.user.role) {
      case 'admin':
        navigate('/admin/dashboard', { replace: true });
        break;
      case 'educator':
        navigate('/educator/dashboard', { replace: true });
        break;
      default:
        navigate('/student/dashboard', { replace: true });
    }

    return data.user;
  };

  // Logout
  const logout = () => {
    clearToken();
    setUser(null);
    navigate('/login', { replace: true });
  };

  // Fetch all users for admin panel
  const fetchUsers = useCallback(async () => {
    const res = await api.get('/auth/users');
    setUsers(res.data);
  }, []);

  // Update a user's role
  const updateUserRole = async (id, role) => {
    const { data } = await api.put(`/auth/users/${id}/role`, { role });
    setUsers(us => us.map(u => (u.id === id ? data : u)));
  };

  // Delete a user
  const deleteUser = async (id) => {
    await api.delete(`/auth/users/${id}`);
    setUsers(us => us.filter(u => u.id !== id));
  };

  // Only render children once we've attempted hydration
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading…</div>
      </div>
    );
  }

  // Bookmark toggler
  const toggleBookmark = async (experimentId) => {
    const res = await api.post(`/auth/bookmark/${experimentId}`);
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      login,
      logout,
      fetchUsers,
      updateUserRole,
      deleteUser,
      toggleBookmark
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
