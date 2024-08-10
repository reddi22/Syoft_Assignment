import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react';
import './index.css';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  };

  return (
    <div className='dashboard-container'>
      <nav className='nav-bar'>
        <h1>Syoft</h1>
        <button className='button' onClick={onClickLogout}>Logout</button>
      </nav>
      <div className='user-details-container'>
        <h1>Welcome, {user?.user_firstname}</h1>
        <p><strong>Email:</strong> {user?.user_email}</p>
        <p><strong>Phone:</strong> {user?.user_phone}</p>
        <p><strong>City:</strong> {user?.user_city}</p>
        <p><strong>Zip Code:</strong> {user?.user_zipcode}</p>
      </div>
    </div>
  );
}

export default Dashboard;
