import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Typewriter } from '../components/ui/Typewriter';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-full overflow-hidden bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md">
        <h1 className="text-xl font-bold tracking-wide">
          Zenith<span className="text-[rgb(var(--color-primary))]">AI</span>
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
              className="px-4 py-2 rounded-lg bg-[rgb(var(--color-primary))] text-white hover:opacity-90 transition"
            >
              Chat
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <Typewriter text="ZenithAI — your AI assistant for debugging code like a pro!" speed={80} />
          <p className="mt-4 text-sm md:text-lg opacity-80">
            Get real-time coding guidance and best practices for all languages.
          </p>
          
          <div className="mt-8">
            <Link
              to={user ? "/chat" : "/login"}
              className="px-8 py-4 rounded-xl bg-[rgb(var(--color-primary))] text-white font-semibold hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-sm opacity-60 py-4">
        © 2026 ZenithAI
      </footer>
    </div>
  );
};