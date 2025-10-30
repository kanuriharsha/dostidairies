import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type NavbarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { label: 'Home', value: 'home', subtitle: 'Friendship Stories' },
    { label: 'About', value: 'about', subtitle: 'Dosti Diaries' },
    { label: 'Mission', value: 'mission', subtitle: 'Our Goal' },
    { label: 'Feature Me', value: 'feature', subtitle: 'Get Featured' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
            role="button"
            aria-label="Go to home"
          >
            {/* logo image replaces previous icon */}
            <img
              src="/dostidairies.png"
              alt="Dosti Diaries"
              title="Dosti Diaries"
              className="w-12 h-10 md:w-14 md:h-14 object-contain rounded-md shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Dosti Diaries
              </h1>
              <p className="text-xs text-gray-500">Stories of Love & Friendship</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`group relative transition-all duration-300 ${
                  currentPage === item.value ? 'text-pink-600' : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.subtitle}</div>
                </div>
                {currentPage === item.value && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500" />
                )}
              </button>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('feed')}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Stories Feed
                </button>
                <button
                  onClick={signOut}
                  className="px-6 py-2 border border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Login / Subscribe
              </button>
            )}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-pink-100">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.value
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
              >
                <div className="font-semibold">{item.label}</div>
                <div className="text-xs text-gray-500">{item.subtitle}</div>
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('feed');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg"
                >
                  Stories Feed
                </button>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 border border-pink-300 text-pink-600 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg"
              >
                Login / Subscribe
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
