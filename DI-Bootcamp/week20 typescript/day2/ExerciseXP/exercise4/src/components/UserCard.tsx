interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

function UserCard({ name = 'Anonymous', age = 0, role = 'Guest' }: UserCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <h3>{name}</h3>
      <p>Age: {age > 0 ? age : 'Not specified'}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default UserCard;
