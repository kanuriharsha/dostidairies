import { useState, useCallback } from 'react';
import { PenLine, Heart, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { FloatingHearts } from '../components/FloatingHearts';

export const FeaturePage = () => {
  const { user, getToken } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'love' | 'friendship' | 'both'>('love');
  const [authorName, setAuthorName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to submit your story');
      return;
    }

    if (!title.trim() || !content.trim() || !authorName.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { apiUrl } = await import('../lib/api');
      const token = getToken();
      let imageBase64 = '';
      if (image) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      }
      const res = await fetch(apiUrl('api/stories'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          author_id: user.id,
          author_name: authorName,
          title: title.trim(),
          content: content.trim(),
          category,
          image: imageBase64,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || 'Error submitting story. Please try again.');
        console.error(data);
      } else {
        setSuccess(true);
        setTitle('');
        setContent('');
        setAuthorName('');
        setImage(null);
        setImagePreview(null);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setLoading(false);
      alert('Error submitting story. Please try again.');
      console.error(err);
    }
  };

  const navigateToLogin = useCallback(() => {
    window.dispatchEvent(new CustomEvent('dosti:navigate', { detail: 'login' }));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative flex items-center justify-center">
        <FloatingHearts />
        <div className="relative z-10 text-center px-4">
          <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-xl text-gray-600 mb-6">
            Please login to share your beautiful story with the world
          </p>

          {/* Added buttons for quick navigation to the login/subscribe page */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={navigateToLogin}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Login
            </button>
            <button
              onClick={navigateToLogin}
              className="px-6 py-3 border border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative">
      <FloatingHearts />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block">
              <PenLine className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Share Your Story
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let your heart speak. Share a moment that moved you, a love that changed you, or a
              friendship that shaped you.
            </p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center animate-fade-in">
              <Heart className="w-12 h-12 text-green-500 fill-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Story Submitted Successfully!
              </h3>
              <p className="text-green-700">
                Thank you for sharing your beautiful story with our community
              </p>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="How should we call you?"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Story Category</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setCategory('love')}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      category === 'love'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                    }`}
                  >
                    Love
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('friendship')}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      category === 'friendship'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                    }`}
                  >
                    Friendship
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('both')}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      category === 'both'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Story Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story a beautiful title"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Story</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Pour your heart out here... Tell us about a moment, a feeling, a connection that touched your soul."
                  rows={12}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all resize-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Characters: {content.length} (Minimum 100 characters recommended)
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Story Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="max-w-full h-48 object-cover rounded-xl" />
                  </div>
                )}
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Your story will be visible to everyone on Dosti Diaries.
                  Please ensure it's appropriate and respectful. Stories that inspire and touch
                  hearts may be featured on our homepage!
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Share My Story</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-pink-600 italic font-medium">
                "Every story shared is a gift to the world."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
