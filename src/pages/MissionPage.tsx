import { Target, Heart, Globe, Lightbulb, Users, BookOpen } from 'lucide-react';
import { FloatingHearts } from '../components/FloatingHearts';

export const MissionPage = () => {
  const goals = [
    {
      icon: Heart,
      title: 'Celebrate Every Connection',
      description:
        'Honor and celebrate all forms of human connection, from romantic love to deep friendships, recognizing that each relationship adds color to our lives.',
    },
    {
      icon: Globe,
      title: 'Build a Global Community',
      description:
        'Create a worldwide community where people from different cultures and backgrounds can share their stories and find common ground in universal emotions.',
    },
    {
      icon: BookOpen,
      title: 'Preserve Precious Memories',
      description:
        'Provide a beautiful digital space where people can document and preserve their most cherished moments and relationships for years to come.',
    },
    {
      icon: Users,
      title: 'Foster Understanding',
      description:
        'Help people understand that they are not alone in their experiences, creating empathy and connection through shared stories.',
    },
    {
      icon: Lightbulb,
      title: 'Inspire Others',
      description:
        'Inspire hope, love, and courage in others by sharing authentic stories of connection, showing that love in all its forms is worth celebrating.',
    },
    {
      icon: Heart,
      title: 'Promote Emotional Wellness',
      description:
        'Encourage emotional expression and healing through storytelling, recognizing the therapeutic power of sharing our experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 relative">
      <FloatingHearts />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block">
              <Target className="w-20 h-20 text-pink-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To create a sanctuary where every heart has a voice and every story finds an audience
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Vision</h2>
            <p className="text-lg text-center text-pink-50 leading-relaxed max-w-3xl mx-auto">
              We envision a world where love and friendship are celebrated openly, where people feel
              empowered to share their emotions, and where every story, no matter how big or small,
              is valued and cherished. Dosti Diaries aims to be the world's most heartfelt
              collection of human connection stories.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Goals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => {
                const Icon = goal.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{goal.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              How We Achieve Our Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Safe & Welcoming Space</h4>
                    <p className="text-gray-600">
                      Creating a judgment-free environment where everyone feels comfortable sharing
                      their authentic experiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Quality Over Quantity</h4>
                    <p className="text-gray-600">
                      Focusing on meaningful, heartfelt stories rather than viral content, ensuring
                      every story receives the attention it deserves.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Community Engagement</h4>
                    <p className="text-gray-600">
                      Encouraging interaction through comments, likes, and shared experiences that
                      build genuine connections.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Beautiful Design</h4>
                    <p className="text-gray-600">
                      Crafting an aesthetically pleasing platform that mirrors the beauty and
                      emotion of the stories shared.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Accessibility</h4>
                    <p className="text-gray-600">
                      Making the platform easy to use and accessible to everyone, regardless of
                      technical expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-bold">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Continuous Growth</h4>
                    <p className="text-gray-600">
                      Regularly improving our platform based on community feedback and evolving
                      needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-pink-600 italic text-lg font-medium">
                "Together, we're writing the most beautiful book of human connections."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
