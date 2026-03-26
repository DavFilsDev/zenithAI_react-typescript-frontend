import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { useEffect } from 'react';
import { useChatStore } from './store/chatStore';
import { Loader } from './components/ui/Loader';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { user } = useAuth();
  const { loadConversations } = useChatStore();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/chat" element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path="/chat/:id" element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
          </Routes>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              className:
                "bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] backdrop-blur-md border border-white/10 shadow-lg",
              
              success: {
                duration: 3000,
                iconTheme: {
                  primary: 'rgb(var(--color-success))',
                  secondary: 'white',
                },
              },

              error: {
                duration: 4000,
                iconTheme: {
                  primary: 'rgb(var(--color-error))',
                  secondary: 'white',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;