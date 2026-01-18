import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchStory, updateStory, deleteStory } from '../features/stories/storiesSlice';
import { contributorsApi, usersApi } from '../app/api';
import { User } from '../app/types';
import Loading from '../components/Loading';

const StoryViewer = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentStory, isLoading, error } = useAppSelector((state) => state.stories);
  const { user } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const isAuthor = user?.id === currentStory?.author_id;
  const isContributor = currentStory?.contributors?.some(c => c.id === user?.id);
  const canEdit = isAuthor || isContributor;

  useEffect(() => {
    if (id) {
      dispatch(fetchStory(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentStory) {
      setEditTitle(currentStory.title);
      setEditContent(currentStory.content);
    }
  }, [currentStory]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (currentStory) {
      setEditTitle(currentStory.title);
      setEditContent(currentStory.content);
    }
  };

  const handleSave = async () => {
    if (!currentStory) return;

    const result = await dispatch(updateStory({
      id: currentStory.id,
      data: { title: editTitle, content: editContent }
    }));

    if (updateStory.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!currentStory) return;

    const result = await dispatch(deleteStory(currentStory.id));
    if (deleteStory.fulfilled.match(result)) {
      navigate('/');
    }
  };

  const handleSearchUsers = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await usersApi.search(searchQuery);
      // Filter out author and existing contributors
      const filtered = results.filter(u =>
        u.id !== currentStory?.author_id &&
        !currentStory?.contributors?.some(c => c.id === u.id)
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddContributor = async (userId: number) => {
    if (!currentStory) return;

    try {
      await contributorsApi.add(currentStory.id, userId);
      dispatch(fetchStory(currentStory.id));
      setSearchQuery('');
      setSearchResults([]);
    } catch (err) {
      console.error('Failed to add contributor:', err);
    }
  };

  const handleRemoveContributor = async (contributorId: number) => {
    if (!currentStory) return;

    try {
      await contributorsApi.remove(contributorId);
      dispatch(fetchStory(currentStory.id));
    } catch (err) {
      console.error('Failed to remove contributor:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!currentStory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning">
          <span>Story not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        {isEditing ? (
          <input
            type="text"
            className="input input-bordered input-lg w-full text-3xl font-bold"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-4xl font-bold">{currentStory.title}</h1>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-4 text-base-content/60">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-8">
                <span className="text-sm">
                  {currentStory.author?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <span>by {currentStory.author?.username}</span>
            {isAuthor && <span className="badge badge-primary badge-sm">Author</span>}
          </div>
          <span>•</span>
          <span>Updated {formatDate(currentStory.updated_at)}</span>
        </div>
      </div>

      {/* Action buttons */}
      {canEdit && (
        <div className="flex gap-2 mb-6">
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn btn-ghost" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" onClick={handleEdit}>
                Edit Story
              </button>
              {isAuthor && (
                <>
                  <button
                    className="btn btn-outline"
                    onClick={() => setShowContributorModal(true)}
                  >
                    Manage Contributors
                  </button>
                  <button
                    className="btn btn-error btn-outline"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* Contributors */}
      {currentStory.contributors && currentStory.contributors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-base-content/60 mb-2">Contributors</h3>
          <div className="flex flex-wrap gap-2">
            {currentStory.contributors.map((contributor) => (
              <div key={contributor.id} className="badge badge-lg gap-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-4">
                    <span className="text-[10px]">
                      {contributor.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                {contributor.username}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {isEditing ? (
          <textarea
            className="textarea textarea-bordered w-full min-h-[500px] text-base"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <div className="whitespace-pre-wrap">{currentStory.content}</div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Story</h3>
            <p className="py-4">
              Are you sure you want to delete "{currentStory.title}"? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}></div>
        </div>
      )}

      {/* Add Contributor Modal */}
      {showContributorModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Manage Contributors</h3>

            {/* Current contributors */}
            {currentStory.contributors && currentStory.contributors.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Current Contributors</h4>
                <div className="space-y-2">
                  {currentStory.contributors.map((contributor) => (
                    <div key={contributor.id} className="flex items-center justify-between p-2 bg-base-200 rounded">
                      <span>{contributor.username} ({contributor.email})</span>
                      <button
                        className="btn btn-ghost btn-xs text-error"
                        onClick={() => handleRemoveContributor(contributor.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search for users */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Add Contributor</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by username or email"
                  className="input input-bordered flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchUsers()}
                />
                <button
                  className={`btn btn-primary ${isSearching ? 'loading' : ''}`}
                  onClick={handleSearchUsers}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                {searchResults.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 bg-base-200 rounded">
                    <span>{user.username} ({user.email})</span>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => handleAddContributor(user.id)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setShowContributorModal(false)}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowContributorModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
