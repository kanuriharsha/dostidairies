import { useEffect, useState } from 'react';
import { Heart, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Story } from '../lib/types';
import { StoryCard } from '../components/StoryCard';
import { StoryModal } from '../components/StoryModal';
import { FloatingHearts } from '../components/FloatingHearts';

export const HomePage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'popular'>('recent');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, [activeTab]);

  const fetchStories = async () => {
    setLoading(true);
    try {
  // Use centralized apiUrl helper which reads VITE_BACKEND_URL
  const { apiUrl } = await import('../lib/api');

  // featured
      const fRes = await fetch(apiUrl('api/stories?featured=true&limit=3'));
      if (!fRes.ok) {
        console.error('Failed to fetch featured stories:', await fRes.text());
        setFeaturedStories([]);
      } else {
        const fjson = await fRes.json();
        setFeaturedStories(fjson.stories || []);
      }

      // all stories
      const sort = activeTab === 'popular' ? 'popular' : 'recent';
      const res = await fetch(apiUrl(`api/stories?sort=${sort}&limit=12`));
      if (!res.ok) {
        console.error('Failed to fetch stories:', await res.text());
        setStories([]);
      } else {
        const json = await res.json();
        setStories(json.stories || []);
      }
    } catch (err) {
      console.error('Failed to fetch stories', err);
      setFeaturedStories([]);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative">
      <FloatingHearts />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block animate-bounce">
              <Heart className="w-16 h-16 text-pink-500 fill-pink-500 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Dosti Diaries
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Where hearts speak, stories bloom, and every word carries the warmth of love and
              friendship
            </p>
            <div className="flex items-center justify-center space-x-2 text-pink-500">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="italic">A digital diary of love stories that touches hearts</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {featuredStories.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center space-x-2 mb-8">
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                <h2 className="text-3xl font-bold text-gray-800">Featured Stories</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onClick={() => setSelectedStory(story)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">All Stories</h2>
            <div className="flex space-x-2 bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveTab('recent')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${
                  activeTab === 'recent'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Recent</span>
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${
                  activeTab === 'popular'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">Popular</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent" />
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No stories yet. Be the first to share yours!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onClick={() => setSelectedStory(story)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </div>
  );
};
