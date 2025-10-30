import { Heart, Calendar, Eye } from 'lucide-react';
import { Story } from '../lib/types';

type StoryCardProps = {
  story: Story;
  onClick: () => void;
};

export const StoryCard = ({ story, onClick }: StoryCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'love':
        return 'bg-pink-100 text-pink-700';
      case 'friendship':
        return 'bg-blue-100 text-blue-700';
      case 'both':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
    >
      {story.image && (
        <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
      )}
      <div className="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500" />

      <div className="p-6">
        {story.is_featured && (
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full mb-3">
            ⭐ Featured Story
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(story.category)}`}>
            {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
          </span>
          <div className="flex items-center space-x-3 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{story.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{story.likes}</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
          {story.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {truncateContent(story.content, 150)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-pink-100">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
              {story.author_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{story.author_name}</p>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(story.created_at)}</span>
              </div>
            </div>
          </div>

          <button className="text-pink-600 font-semibold text-sm group-hover:underline">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};
