// Daily Challenge: Generic List component using TypeScript generics

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  if (items.length === 0) {
    return <p className="status">No items to display.</p>;
  }

  return (
    <ul className="generic-list">
      {items.map((item, index) => (
        <li key={index} className="generic-list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;
