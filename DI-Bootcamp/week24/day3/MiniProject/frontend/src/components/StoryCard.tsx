import { Link } from 'react-router-dom';
import { Story } from '../app/types';

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <h2 className="card-title">
          {story.title}
          {story.contributors && story.contributors.length > 0 && (
            <div className="badge badge-secondary badge-sm">
              +{story.contributors.length} collaborators
            </div>
          )}
        </h2>
        <p className="text-base-content/70 line-clamp-3">
          {story.content}
        </p>
        <div className="flex items-center gap-2 text-sm text-base-content/50">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-6">
              <span className="text-xs">
                {story.author?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <span>by {story.author?.username}</span>
          <span>•</span>
          <span>{formatDate(story.updated_at)}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/story/${story.id}`} className="btn btn-primary btn-sm">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
