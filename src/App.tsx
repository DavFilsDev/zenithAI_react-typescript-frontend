import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { useEffect } from 'react';
import { useChatStore } from './store/chatStore';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useAuth();
  const { loadConversations } = useChatStore();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/:id"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const AppWithTheme = () => {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <AppContent />
      
      {/* Toast notifications - now has access to theme */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#363636' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#363636',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: theme === 'dark' ? '#ffffff' : '#ffffff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: theme === 'dark' ? '#ffffff' : '#ffffff',
            },
          },
        }}
      />
    </AuthProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;