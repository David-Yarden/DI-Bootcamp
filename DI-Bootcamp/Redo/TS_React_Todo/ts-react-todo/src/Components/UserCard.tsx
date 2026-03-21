// Exercise 4: React Component with Optional Props

interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

function UserCard({ name = 'Anonymous', age, role = 'Guest' }: UserCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: <strong>{role}</strong></p>
      {age !== undefined ? (
        <p>Age: <strong>{age}</strong></p>
      ) : (
        <p><em>Age not provided</em></p>
      )}
    </div>
  );
}

export default UserCard;
