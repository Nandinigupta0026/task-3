import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";


function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Event not found");
      }
    };

    fetchEvent();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{event.title}</h1>
      <p>
        <strong>Category:</strong> {event.category}
      </p>
       {event.category === "movie" ? (
    <>
      {event.availableDates?.length > 0 ? (
        <p className="text-gray-700 mb-1">
          <strong>Dates:</strong>{" "}
          {event.availableDates
            .map((date) => new Date(date).toLocaleDateString("en-IN"))
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
    </>
  ) : (
    <>
      <p className="text-gray-700 mb-1">
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString("en-IN")}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Time:</strong> {event.time}
      </p>
    </>
  )}
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Price:</strong> ₹{event.price}
      </p>
      <p>
        <strong>Available Seats:</strong> {event.seatsAvailable}
      </p>
      <Link to={`/book/${event._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Book Now
        </button>
      </Link>
    </div>
  );
}

export default EventDetails;
