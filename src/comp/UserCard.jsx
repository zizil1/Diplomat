import React from 'react';

const UserCard = ({ user, onDelete }) => {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <button onClick={() => onDelete(user._id)}>Delete</button>
    </div>
  );
};

export default UserCard;