import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

function LogIn() {
  const [form, setForm] = useState({
    user_email: '',
    user_password: '',
  });

  const navigate = useNavigate();

  const onClickChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://syoft.dev/Api/userlogin/api/userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      });
      navigate('/dashboard', { replace: true });
    } else {
      alert(data.error_msg);
    }
  };

  const onClickSignUp = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className='bg-container'>
      <div className='login-form-container'>
        <h2>Log In</h2>
        <form onSubmit={onClickSubmit}>
          <label htmlFor='emailid'>Email address</label>
          <input type='email' name='user_email' id='emailid' placeholder='username@gmail.com' value={form.user_email} onChange={onClickChange} required />
          <label htmlFor='passwordid'>Password</label>
          <input type='password' name='user_password' id='passwordid' placeholder='Password' value={form.user_password} onChange={onClickChange} required />
          <button type='submit'>Log In</button>
        </form>
        <p>Don't have an account? <span onClick={onClickSignUp}>Sign Up</span></p>
      </div>
    </div>
  );
}

export default LogIn;
