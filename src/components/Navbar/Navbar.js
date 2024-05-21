import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };
  
  return (
    <div className="flex justify-center items-center px-16 py-4 text-base leading-5 text-center whitespace-nowrap bg-white border-b border-solid shadow-sm border-zinc-300 text-zinc-900 max-md:px-5">
      <div className="flex justify-between items-center w-full max-w-[1419px] max-md:flex-wrap max-md:max-w-full">
        <div className="p-4">
          <Link to={isLoggedIn ? "/hotels" : "/"}>
            <img
              loading="lazy"
              src="/Images/cleartrip.png"
              className="shrink-0 self-start mt-3 max-w-full aspect-[4.55] w-[107px]"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 p-4 ml-auto">
          <img
            loading="lazy"
            src="/Images/profile.png"
            className="shrink-0 w-10 aspect-square"
            alt="User Icon"
          />
          {isLoggedIn ? (
            <button className="my-auto" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="my-auto">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;