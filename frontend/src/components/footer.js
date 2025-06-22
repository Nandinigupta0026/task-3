import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo and Text */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold"> Universal Ticket Booking</h3>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/" className="hover:text-teal-300">Home</Link>
          <Link to="/events/movie" className="hover:text-teal-300">Movies</Link>
          <Link to="/events/concert" className="hover:text-teal-300">Concerts</Link>
          <Link to="/events/train" className="hover:text-teal-300">Trains</Link>
          <Link to="/profile" className="hover:text-teal-300">Profile</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
