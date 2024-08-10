import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function SignUp() {
  const [form, setForm] = useState({
    user_firstname: '',
    user_email: '',
    user_phone: '',
    user_password: '',
    user_city: '',
    user_zipcode: '',
  });

  const navigate = useNavigate();

  const onClickChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitSuccess = (userInfo) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    navigate('/login', { replace: true });
  };

  const onClickSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    try {
      const response = await fetch('https://syoft.dev/Api/user_registeration/api/user_registeration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess(payload);
      } else {
        alert(data.error_msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-container'>
      <div className='heading'>
        <h1>Welcome to our community</h1>
        <p>Fuse helps developers to build organised and well-coded dashboards full of beautiful and rich modules. Join us and start building your application today.</p>
      </div>
      <div className='sign-up-container'>
        <div className='sign-up-headings'>
          <h2>Sign Up</h2>
          <p>Already have an account? <Link to='/login'>Sign In</Link></p>
        </div>
        <form onSubmit={onClickSubmit}>
          <label htmlFor='fullName'>Full Name</label>
          <input type='text' name='user_firstname' placeholder='Enter your Full Name' id='fullName' value={form.user_firstname} onChange={onClickChange} required />
          <label htmlFor='emailId'>Email Address</label>
          <input type='email' name='user_email' placeholder='Enter your Email Address' id='emailId' value={form.user_email} onChange={onClickChange} required />
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input type='number' name='user_phone' placeholder='Enter your Phone Number' id='phoneNumber' value={form.user_phone} onChange={onClickChange} required />
          <label htmlFor='password'>Password</label>
          <input type='password' name='user_password' placeholder='Enter your Password' id='password' value={form.user_password} onChange={onClickChange} required />
          <label htmlFor='cityId'>City</label>
          <input type='text' name='user_city' placeholder='Enter your City' id='cityId' value={form.user_city} onChange={onClickChange} required />
          <label htmlFor='zipCode'>ZipCode</label>
          <input type='number' name='user_zipcode' placeholder='Enter your ZipCode' id='zipCode' value={form.user_zipcode} onChange={onClickChange} required />
          <button type='submit'>Create your free account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
