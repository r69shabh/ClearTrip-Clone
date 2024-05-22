import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!userDetails.email || !userDetails.password) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://academics.newtonschool.co/api/v1/user/login', {
        email: userDetails.email,
        password: userDetails.password,
        appType: "bookingportals"
      }, {
        headers: {
          'accept': 'application/json',
          'projectID': 'f104bi07c490',
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 'success') {
        alert('Login successful');
        onLogin(); // Call the onLogin function passed via props to update the login state
        navigate('/hotels'); // Redirect to home page or dashboard after successful login
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center px-16 py-8 bg-white max-md:px-5">
      <div className="flex flex-col px-10 py-9 max-w-full bg-white w-[450px] max-md:px-5 rounded-lg shadow-lg">
        <div className="self-center text-xl font-bold leading-6 text-center text-orange-600">
          Login with ClearTrip
        </div>
        <div className="flex flex-col py-2 pr-2 pl-5 mt-5 border-b border-solid border-stone-300">
          <div className="flex gap-5 justify-between self-start text-base leading-6 text-center uppercase whitespace-nowrap">
            <Link to="/login" className="px-16 py-5 text-white bg-orange-600 rounded-t-lg shadow-md">
              Login
            </Link>
            <Link to="/register" className="my-auto text-orange-600 hover:underline">Register</Link>
          </div>
        </div>
        <div className="flex flex-col justify-end px-8 pt-10 pb-9 text-base font-light bg-zinc-100 border border-neutral-400 text-zinc-400 rounded-b-lg shadow-inner max-md:px-5">
          <input
            className="justify-center items-start px-3.5 py-4 mt-8 bg-white rounded-xl border border-solid border-black border-opacity-10 shadow-inner"
            type="email"
            name="email"
            placeholder="Email ID *"
            value={userDetails.email}
            onChange={handleChange}
          />
          <input
            className="justify-center items-start px-3.5 py-4 mt-6 bg-white rounded-xl border border-solid border-black border-opacity-10 shadow-inner"
            type="password"
            name="password"
            placeholder="Password *"
            value={userDetails.password}
            onChange={handleChange}
          />
          <button
            className="justify-center items-center px-16 py-4 mt-16 font-semibold text-center text-white uppercase bg-orange-600 rounded-lg shadow-lg"
            onClick={handleLogin}
          >
            Proceed
          </button>
          <Link to="/register" className="self-center mt-9 leading-6 text-center text-orange-600 underline">
            New User?{' '}
            <span className="underline">Create Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;