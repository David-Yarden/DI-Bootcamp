import React from 'react';
import './user.css';

export default function User(props) {
  console.log(props);
  const { name, email, username } = props;

  const userStyle = {
    display: 'inline-block',
    margin: '20px',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    backgroundColor: 'lightblue'
  };

  return (
    <div className="box" style={userStyle}>
      <h2>{name}</h2>
      <p>{email}</p>
      <h4>{username}</h4>
    </div>
  );
}
