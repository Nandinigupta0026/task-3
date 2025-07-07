import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import movieImg from "../assets/movie.jpg";
import concertImg from "../assets/concert.jpg";
import trainImg from "../assets/train.jpg";

function Home({ user }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    } else {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored?.role) setRole(stored.role);
    }
  }, [user]);

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 min-h-screen py-16 px-4">
        {role === "user" ? (
          <>
            <div className="text-center mb-16">
              <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow">
                Welcome to Universal Ticket Booking
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Book movie tickets, concert passes, and train journeys — all in
                one place. Fast, secure, and easy.
              </p>
            </div>

            <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Movie */}
              <Link
                to="/events/movie"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={movieImg}
                  alt="Movie"
                  className="w-full h-80 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  Movie Tickets
                </h2>
                <p className="text-gray-600">
                  Browse latest movies and book your favorite seats at nearby
                  theaters.
                </p>
              </Link>

              {/* Concert */}
              <Link
                to="/events/concert"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={concertImg}
                  alt="Concert"
                  className="w-full h-80 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold text-pink-600 mb-2">
                  Concert Tickets
                </h2>
                <p className="text-gray-600">
                  Discover live performances and musical events happening near
                  you.
                </p>
              </Link>

              {/* Train */}
              <Link
                to="/events/train"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={trainImg}
                  alt="Train"
                  className="w-full h-80 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold text-green-600 mb-2">
                  Train Tickets
                </h2>
                <p className="text-gray-600">
                  Plan your journey and book intercity or long-distance train
                  tickets.
                </p>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center mt-24">
            <h1 className="text-5xl font-extrabold text-purple-700 mb-6 drop-shadow">
              Welcome to Universal Ticket Booking
            </h1>
            <p className="text-gray-700 text-lg max-w-xl mx-auto mb-8">
              Book tickets for movies, concerts, and trains — all from one platform.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
