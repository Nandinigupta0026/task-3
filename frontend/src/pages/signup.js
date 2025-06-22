import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/auth/signup', form);
    console.log('Signup success:', res.data);
    setMessage("Signup successful!");
  }
   catch (err) {
    console.error('Signup error:', err.response?.data || err.message);
    setError(err.response?.data?.message || "Something went wrong");
  }
  }  ;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-white focus:outline-none"
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
