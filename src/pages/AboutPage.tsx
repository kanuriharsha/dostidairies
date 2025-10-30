import { Heart, Users, BookHeart, Sparkles } from 'lucide-react';
import { FloatingHearts } from '../components/FloatingHearts';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative">
      <FloatingHearts />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block animate-pulse">
              <BookHeart className="w-20 h-20 text-pink-500 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              About Dosti Diaries
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A sanctuary for hearts to share their most beautiful moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Dosti Diaries was born from a simple belief: every love story, every friendship,
                every connection deserves to be celebrated. We created this space as a digital
                diary where hearts can speak freely, where emotions find their words, and where
                every story becomes a thread in the beautiful tapestry of human connection.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Community</h2>
              <p className="text-gray-600 leading-relaxed">
                We are a growing family of dreamers, lovers, and friends who believe in the power
                of storytelling. Each member brings their unique experiences, their heartfelt
                moments, and their authentic emotions. Together, we create a space where
                vulnerability is strength and sharing is caring.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What We Believe</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-semibold mb-3">Love Transcends</h3>
                <p className="text-pink-100">
                  Every form of love, whether romantic or platonic, deserves to be honored and
                  shared.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Stories Connect</h3>
                <p className="text-pink-100">
                  When we share our stories, we realize we're never alone in our feelings and
                  experiences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Hearts Heal</h3>
                <p className="text-pink-100">
                  Reading and sharing stories can be therapeutic, helping us process emotions and
                  find comfort.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Why Dosti Diaries?
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                In a world that often moves too fast, we wanted to create a space that encourages
                people to slow down, reflect, and connect with their emotions. Dosti Diaries is
                more than just a platform, it's a movement to celebrate the beauty of human
                relationships.
              </p>
              <p>
                Whether you've experienced a love that changed your life, a friendship that shaped
                who you are, or a moment that touched your heart, we invite you to share it here.
                Your story might be exactly what someone else needs to hear today.
              </p>
              <p className="text-center italic text-pink-600 text-lg font-medium pt-6">
                "In every story shared, a heart finds home."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
