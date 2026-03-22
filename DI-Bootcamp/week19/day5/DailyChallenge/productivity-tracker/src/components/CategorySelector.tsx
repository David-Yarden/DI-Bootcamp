import { useSelector, useDispatch } from 'react-redux';
import { selectAllCategories, selectSelectedCategoryId, setSelectedCategory } from '../store/taskSlice';

// Uses memoized createSelector selectors: selectAllCategories, selectSelectedCategoryId
function CategorySelector() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const selectedCategoryId = useSelector(selectSelectedCategoryId);

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by Category:</label>
      <select
        value={selectedCategoryId ?? ''}
        onChange={(e) => dispatch(setSelectedCategory(e.target.value ? Number(e.target.value) : null))}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelector;
