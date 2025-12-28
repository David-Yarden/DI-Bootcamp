interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: '8px' }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;
