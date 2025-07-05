import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useUserContext } from '../context/userAuth';

function Loginpage() {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { Login } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");
    await Login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white px-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-xl p-6 space-y-5 shadow-md">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <div>
          <label className="text-sm text-neutral-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-400"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-md p-2 font-medium transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-neutral-400">
          Don’t have an account?{' '}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => (window.location = '/signup')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Loginpage;
