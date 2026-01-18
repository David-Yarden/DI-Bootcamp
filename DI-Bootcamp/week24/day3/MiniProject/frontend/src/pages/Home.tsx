import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchStories } from '../features/stories/storiesSlice';
import StoryCard from '../components/StoryCard';
import Loading from '../components/Loading';

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');

  const { stories, isLoading, error } = useAppSelector((state) => state.stories);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStories(filter || undefined));
  }, [dispatch, filter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {filter === 'mine' ? 'My Stories' : 'All Stories'}
          </h1>
          <p className="text-base-content/60 mt-1">
            {filter === 'mine'
              ? 'Stories you have created'
              : 'Discover and collaborate on stories'}
          </p>
        </div>
        <Link to="/create" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Story
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="tabs tabs-boxed mb-6 w-fit">
        <Link
          to="/"
          className={`tab ${!filter ? 'tab-active' : ''}`}
        >
          All Stories
        </Link>
        <Link
          to="/?filter=mine"
          className={`tab ${filter === 'mine' ? 'tab-active' : ''}`}
        >
          My Stories
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
          <p className="text-base-content/60 mb-4">
            {filter === 'mine'
              ? "You haven't created any stories yet."
              : 'Be the first to create a story!'}
          </p>
          <Link to="/create" className="btn btn-primary">
            Create Your First Story
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
