import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { useUserContext } from '../context/userAuth';

function Navbar({ param }) {
  const { authUser } = useUserContext();
  const email = authUser?.email || "";
  const hash = md5(email);

  return (
    <div className="navbar bg-gray-800 text-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-bold">ChatApp</div>
      <div className="dropdown dropdown-end relative">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Profile Picture"
              src={
                authUser?.profilePic ||
                `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`
              }
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="absolute right-0 top-14 z-10 bg-white text-black rounded-box shadow w-52 p-2 menu menu-sm dropdown-content"
        >
          <li>
            <Link to={`/${param}`}>{param}</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;