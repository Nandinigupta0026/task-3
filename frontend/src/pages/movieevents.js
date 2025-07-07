import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/events");
        const movieEvents = res.data.filter(
          (event) => event.category === "movie"
        );
        setEvents(movieEvents);
      } catch (err) {
        setError("Failed to load movie events.");
      }
    };

    fetchMovieEvents();
  }, []);

  return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Movie Events
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {event.title}
            </h2>

            {event.availableDates?.length > 0 ? (
              <p className="text-gray-700 mb-1">
                <strong>Dates:</strong>{" "}
                {event.availableDates
                  .map((date) =>
                    new Date(date).toLocaleDateString("en-IN")
                  )
                  .join(", ")}
              </p>
            ) : (
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString("en-IN")}
              </p>
            )}

            {event.availableTimes?.length > 0 ? (
              <p className="text-gray-700 mb-1">
                <strong>Times:</strong> {event.availableTimes.join(", ")}
              </p>
            ) : (
              <p className="text-gray-700 mb-1">
                <strong>Time:</strong> {event.time}
              </p>
            )}

            <p className="text-gray-700 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price:</strong> ₹{event.price}
            </p>

            <Link
              to={`/events/${event._id}`}
              className="mt-auto text-center text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MovieEvents;
