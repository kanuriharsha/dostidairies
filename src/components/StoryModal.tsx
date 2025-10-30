import { X, Heart, Calendar, Eye, User } from 'lucide-react';
import { Story } from '../lib/types';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

type StoryModalProps = {
  story: Story;
  onClose: () => void;
};

export const StoryModal = ({ story, onClose }: StoryModalProps) => {
  const { user, getToken } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(story.likes);

  useEffect(() => {
    if (user) {
      checkIfLiked();
    }
    incrementViews();
  }, [user]);

  const checkIfLiked = async () => {
    if (!user) return;
    try {
      const { apiUrl } = await import('../lib/api');
      const token = getToken();
      const res = await fetch(apiUrl(`api/stories/${story.id}/liked`), {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) {
        console.error('Failed to check liked status:', await res.text());
      } else {
        const json = await res.json();
        setLiked(!!json.liked);
      }
    } catch (err) {
      console.error('Failed to check like:', err);
    }
  };

  const incrementViews = async () => {
    try {
  const { apiUrl } = await import('../lib/api');
  await fetch(apiUrl(`api/stories/${story.id}/views`), { method: 'PATCH' });
    } catch (err) {
      console.error('Failed to increment views', err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like stories');
      return;
    }
    try {
      const { apiUrl } = await import('../lib/api');
      const token = getToken();
      if (liked) {
        const res = await fetch(apiUrl(`api/stories/${story.id}/like`), {
          method: 'DELETE',
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (res.ok) {
          setLiked(false);
          setLikesCount((c) => c - 1);
        }
      } else {
        const res = await fetch(apiUrl(`api/stories/${story.id}/like`), {
          method: 'POST',
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (res.ok) {
          setLiked(true);
          setLikesCount((c) => c + 1);
        }
      }
    } catch (err) {
      console.error('Like action failed', err);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-rose-500 p-6 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{story.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-pink-100">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {story.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-1 text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">{story.author_name}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(story.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="flex items-center space-x-1 text-gray-600">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">{story.views + 1}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-all ${
                  liked ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-pink-600' : ''}`} />
                <span className="font-semibold">{likesCount}</span>
              </button>
            </div>
          </div>

          {story.image && (
            <div className="mb-6">
              <img
                src={story.image}
                alt={story.title}
                className="w-full max-h-96 object-cover rounded-xl"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
              {story.content}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-pink-100 text-center">
            <p className="text-pink-600 italic font-medium">
              "Every story begins with a heartbeat."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
