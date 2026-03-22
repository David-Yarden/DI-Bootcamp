import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectAllCategories } from '../store/taskSlice';

function AddTask() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 0);

  // useCallback prevents a new function reference on every render
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && categoryId) {
      dispatch(addTask({ title: title.trim(), categoryId }));
      setTitle('');
    }
  }, [dispatch, title, categoryId]);

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1, minWidth: '200px' }}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button
        type="submit"
        style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
