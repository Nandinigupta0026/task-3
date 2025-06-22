import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login');
  };

  const role = user?.role;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
           Universal Tickets
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {!user && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
            </>
          )}

          {/* User Navigation */}
          {role === 'user' && (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/bookings" className="text-gray-700 hover:text-blue-600">My Bookings</Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
              <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
            </>
          )}

          {/* Vendor Navigation */}
          {role === 'vendor' && (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/add-event" className="text-gray-700 hover:text-blue-600">Add Event</Link>
              <Link to="/my-events" className="text-gray-700 hover:text-blue-600">My Events</Link>
              <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
            </>
          )}

          {/* Admin Navigation */}
          {role === 'admin' && (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/users" className="text-gray-700 hover:text-blue-600">Users</Link>
              <Link to="/vendors" className="text-gray-700 hover:text-blue-600">Vendors</Link>
              <Link to="/moderate-events" className="text-gray-700 hover:text-blue-600">Moderate</Link>
              <Link to="/analytics" className="text-gray-700 hover:text-blue-600">Analytics</Link>
              <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
