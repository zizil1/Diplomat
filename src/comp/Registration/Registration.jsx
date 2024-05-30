import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Импортируем Link и useNavigate из react-router-dom
import Login from '../../Login/Login';

const Registration = ({ setRegistrationSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Registration successful:', response.data);
      setRegistrationSuccess({ username: formData.username, email: formData.email }); // Передаем данные пользователя
      navigate('/profile'); // Перенаправление на страницу Profile
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data);
        setErrorMessage(error.response.data);
      } else {
        console.error('Error:', error.message);
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>

      {/* Используем Link для создания ссылки на страницу входа */}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Registration;