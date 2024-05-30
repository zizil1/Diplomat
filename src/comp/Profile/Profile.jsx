import React, { useState } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = ({ username, email }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: username,
    email: email,
    phone: '',
    dateOfBirth: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/updateProfile', formData);
      console.log('Profile updated successfully:', response.data);
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error.response.data);
      setMessage('Error updating profile');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/logout'); // Здесь используется метод GET
      window.location.href = '/'; // Перенаправляем на страницу регистрации
    } catch (error) {
      console.error('Error logging out:', error);
    }
};

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {isEditing ? (
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </div>
          <button type="button" onClick={handleSaveClick}>Save</button>
         
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;