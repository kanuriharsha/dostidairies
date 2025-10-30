import { useEffect, useState } from 'react';
import { Heart, PenLine, BookOpen, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Story } from '../lib/types';
import { StoryCard } from '../components/StoryCard';
import { StoryModal } from '../components/StoryModal';
import { FloatingHearts } from '../components/FloatingHearts';

export const FeedPage = () => {
  const { user, getToken } = useAuth();
  const [myStories, setMyStories] = useState<Story[]>([]);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStories();
    }
  }, [user, activeTab]);

  const fetchStories = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { apiUrl } = await import('../lib/api');
      const token = getToken();

      if (activeTab === 'my') {
        const res = await fetch(apiUrl(`api/stories?author_id=${user.id}`) , {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (!res.ok) {
          console.error('Failed to fetch my stories:', await res.text());
          setMyStories([]);
        } else {
          const json = await res.json();
          setMyStories(json.stories || []);
        }
      } else {
        const res = await fetch(apiUrl('api/stories?limit=20'));
        if (!res.ok) {
          console.error('Failed to fetch all stories:', await res.text());
          setAllStories([]);
        } else {
          const json = await res.json();
          setAllStories(json.stories || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch stories', err);
      setMyStories([]);
      setAllStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    try {
      const { apiUrl } = await import('../lib/api');
      const token = getToken();
      const res = await fetch(apiUrl(`api/stories/${storyId}`), {
        method: 'DELETE',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Error deleting story. Please try again.');
      } else {
        setMyStories(myStories.filter((s) => s.id !== storyId));
        alert('Story deleted successfully');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting story. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative flex items-center justify-center">
        <FloatingHearts />
        <div className="relative z-10 text-center px-4">
          <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-xl text-gray-600">Please login to access your stories feed</p>
        </div>
      </div>
    );
  }

  const displayStories = activeTab === 'my' ? myStories : allStories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative">
      <FloatingHearts />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block">
              <BookOpen className="w-16 h-16 text-pink-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Stories Feed
            </h1>
            <p className="text-xl text-gray-600">
              Welcome back! Read stories from the community or manage your own
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex space-x-2 bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span className="font-semibold">All Stories</span>
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${
                  activeTab === 'my'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <PenLine className="w-4 h-4" />
                <span className="font-semibold">My Stories</span>
              </button>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-gray-600">
                {activeTab === 'my' ? (
                  <>
                    You have <span className="font-bold text-pink-600">{myStories.length}</span>{' '}
                    {myStories.length === 1 ? 'story' : 'stories'}
                  </>
                ) : (
                  <>
                    <span className="font-bold text-pink-600">{allStories.length}</span> recent
                    stories
                  </>
                )}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent" />
            </div>
          ) : displayStories.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">
                {activeTab === 'my'
                  ? 'You have not shared any stories yet'
                  : 'No stories available'}
              </p>
              {activeTab === 'my' && (
                <p className="text-gray-500">Start by sharing your first beautiful story!</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayStories.map((story) => (
                <div key={story.id} className="relative group">
                  <StoryCard story={story} onClick={() => setSelectedStory(story)} />
                  {activeTab === 'my' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(story.id);
                      }}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                      title="Delete story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
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
