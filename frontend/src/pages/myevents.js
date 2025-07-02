import React, { useEffect, useState } from "react";
import axios from "axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const vendor = JSON.parse(localStorage.getItem("user"));
    console.log(vendor._id);
    const vendorId = vendor?._id;
    if (!vendorId) {
      setError("Vendor not logged in");
      return;
    }
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/events/vendor-events/${vendorId}`
        );
        console.log("Fetched events:", res.data);
        setEvents(res.data);
      } catch (err) {
        setError("failed to fetch your events.");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        My Created Events
      </h2>
      {error && <p className="text-center text-red-500">{error}</p>}

      {Array.isArray(events) && events.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't created any events yet.
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold text-indigo-600">
                {event.title}
              </h3>
              <p>
                <strong>Category:</strong> {event.category}
              </p>
              {event.category === "movie" ? (
                <>
                  <p>
                    <strong>Available Dates:</strong>{" "}
                    {event.availableDates?.join(", ")}
                  </p>
                  <p>
                    <strong>Available Times:</strong>{" "}
                    {event.availableTimes?.join(", ")}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
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
                <strong>Seats Available:</strong> {event.seatsAvailable}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
