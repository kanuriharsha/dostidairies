import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MissionPage } from './pages/MissionPage';
import { FeaturePage } from './pages/FeaturePage';
import { LoginPage } from './pages/LoginPage';
import { FeedPage } from './pages/FeedPage';

type Page = 'home' | 'about' | 'mission' | 'feature' | 'login' | 'feed';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'mission':
        return <MissionPage />;
      case 'feature':
        return <FeaturePage />;
      case 'login':
        return <LoginPage onSuccess={() => setCurrentPage('feed')} />;
      case 'feed':
        return <FeedPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
        {renderPage()}
        <footer className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img
              src="/dostidairies1.png"
              alt="Dosti Diaries logo"
              className="mx-auto w-24 h-auto mb-4 rounded-md shadow-lg"
            />
            <p className="text-lg font-medium italic mb-2">
              "Every story begins with a heartbeat."
            </p>
            <p className="text-pink-100 text-sm">
              © {new Date().getFullYear()} Dosti Diaries. Made with love for storytellers
              everywhere.
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
