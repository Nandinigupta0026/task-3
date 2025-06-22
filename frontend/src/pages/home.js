import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
function Home() {
  return (
    
         <>
      <Navbar/>
            <div className="bg-gray-100 min-h-screen py-10 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Universal Ticket Booking </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Book movie tickets, concert passes, and train journeys — all in one place. Fast, secure, and easy.
        </p>
        <div className="mt-6">
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
            Get Started
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie Card */}
        <Link to="/events/movie" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-xl font-bold text-blue-600 mb-2"> Movie Tickets</h2>
          <p className="text-gray-600">Browse latest movies and book your favorite seats at nearby theaters.</p>
        </Link>

        {/* Concert Card */}
        <Link to="/events/concert" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-xl font-bold text-pink-600 mb-2"> Concerts</h2>
          <p className="text-gray-600">Discover live performances and musical events happening near you.</p>
        </Link>

        {/* Train Card */}
        <Link to="/events/train" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <h2 className="text-xl font-bold text-green-600 mb-2"> Train Tickets</h2>
          <p className="text-gray-600">Plan your journey and book intercity or long-distance train tickets.</p>
        </Link>
      </div>
    </div>
     <Footer />
    </>
  );
}
export default Home;