import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.password || !userDetails.confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (!userDetails.email.includes('@')) {
      alert('Email must include "@"');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_])[A-Za-z\d@#$%^&*()_]{6,}$/;
    if (!passwordRegex.test(userDetails.password)) {
      alert('Password must be at least 6 characters and include at least 1 lower case letter, 1 upper case letter, and 1 symbol');
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://academics.newtonschool.co/api/v1/user/signup', {
        name: userDetails.name,
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

      alert('Registration successful');
      navigate('/register');
    } catch (error) {
      console.error('Registration error', error);
      alert(`An error occurred during registration: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center px-16 py-8 bg-white max-md:px-5">
      <div className="flex flex-col px-10 py-9 max-w-full bg-white w-[450px] max-md:px-5">
        <div className="self-center text-base font-bold leading-6 text-center text-zinc-600">
          Register with ClearTrip
        </div>
        <div className="flex flex-col py-px pr-px pl-20 mt-5 border border-solid border-stone-300 max-md:pl-5">
          <div className="flex gap-5 justify-between self-start text-base leading-6 text-center uppercase whitespace-nowrap">
            <Link to="/login" className="my-auto text-zinc-600">Login</Link>
            <Link to="/register" className="justify-center items-start px-16 py-5 text-white bg-orange-600 max-md:pr-5 max-md:pl-6">
              Register
            </Link>
          </div>
          <div className="flex flex-col justify-center self-end py-px mt-2 mr-20 w-5 max-md:mr-2.5">
            <div className="z-10 shrink-0 h-2.5" />
          </div>
        </div>
        <div className="flex z-10 flex-col justify-end px-8 pt-20 pb-9 text-base font-light border border-solid bg-zinc-100 border-neutral-400 text-zinc-400 max-md:px-5">
          <input
            className="justify-center items-start px-3.5 py-4 mt-11 whitespace-nowrap bg-white rounded-xl border border-solid border-black border-opacity-10 max-md:pr-5 max-md:mt-10"
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleChange}
          />
          <input
            className="justify-center items-start px-3.5 py-3.5 mt-6 bg-white rounded-xl border border-solid border-black border-opacity-10 max-md:pr-5"
            type="email"
            name="email"
            placeholder="Email ID *"
            value={userDetails.email}
            onChange={handleChange}
          />
          <input
            className="justify-center items-start px-3.5 py-3.5 mt-4 bg-white rounded-xl border border-solid border-black border-opacity-10 max-md:pr-5"
            type="password"
            name="password"
            placeholder="Choose New Password *"
            value={userDetails.password}
            onChange={handleChange}
          />
          <input
            className="justify-center items-start px-3.5 py-3.5 mt-4 bg-white rounded-xl border border-solid border-black border-opacity-10 max-md:pr-5"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            value={userDetails.confirmPassword}
            onChange={handleChange}
          />
          <button
            className="justify-center items-center px-16 py-4 mt-28 font-semibold text-center text-white uppercase whitespace-nowrap bg-orange-600 rounded border border-teal-700 border-solid leading-[200%] max-md:px-5 max-md:mt-10"
            onClick={handleRegister}
          >
            Register
          </button>
          <Link to="/login" className="self-center mt-9 leading-6 text-center text-red-600 underline">
            Already a Customer?{' '}
            <span className="text-red-600 underline">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;