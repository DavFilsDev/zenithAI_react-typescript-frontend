import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Typewriter } from '../components/ui/Typewriter';
import { GlassButton } from '../components/ui/GlassButton';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border backdrop-blur-md">
        <h1 className="text-xl font-bold tracking-wide">
          Zenith<span className="text-primary">AI</span>
        </h1>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {!user && (
            <>
              <Link to="/login" className="text-sm opacity-80 hover:opacity-100 transition">
                Login
              </Link>
              <Link to="/register"  className="text-sm opacity-80 hover:opacity-100 transition">
                Register
              </Link>
            </>
          )}

          {user && (
            <Link
              to="/chat"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
            >
              Chat
            </Link>
          )}
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6 overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 text-center max-w-2xl">
          <Typewriter text="ZenithAI — your AI assistant for debugging code like a pro!" speed={80} />
          
          <p className="mt-4 text-sm md:text-lg opacity-80">
            Get real-time coding guidance and best practices for all languages.
          </p>

          <div className="mt-8">
            <GlassButton to={user ? "/chat" : "/login"}>
              Get Started
            </GlassButton>
          </div>
        </div>

      </main>

      <footer className="w-full py-2 mt-auto bg-card/10 backdrop-blur-md border-t border-border text-sm text-foreground flex flex-col md:flex-row items-center justify-center gap-4 transition-colors shadow-inner shadow-white/5">
        <p>© 2026 ZenithAI</p>

        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline opacity-80 hover:text-primary transition">
            Terms
          </a>

          <a href="/terms" className="hover:underline opacity-80 hover:text-primary transition">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
};