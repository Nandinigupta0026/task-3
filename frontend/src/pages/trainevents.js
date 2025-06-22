import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TrainEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/events');
        const trainEvents = res.data.filter(event => event.category === 'train');
        setEvents(trainEvents);
      } catch (err) {
        setError('Failed to load train events.');
      }
    };

    fetchTrainEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Available Train Tickets </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-green-700 mb-1">{event.title}</h2>
            <p className="text-gray-600 mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-1"><strong>Time:</strong> {event.time}</p>
            <p className="text-gray-600 mb-1"><strong>From:</strong> {event.location}</p>
            <p className="text-gray-600 mb-2"><strong>Price:</strong> ₹{event.price}</p>

            <Link
              to={`/events/${event._id}`}
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 inline-block mt-2"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  ); 
     

}

export default TrainEvents;
