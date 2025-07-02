import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    if (!userId) return;

    axios
      .get(`http://localhost:8080/bookings/user/${userId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings :", err));
  }, []);
    
    const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.put(`http://localhost:8080/bookings/${bookingId}/cancel`);
      alert("Booking cancelled successfully");
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      console.error("Cancellation failed:", err);
      alert("Failed to cancel booking");
    }
  };



  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border-b pb-4">
              <h3 className="text-lg font-semibold">
                {booking.eventId?.title}
              </h3>
              <p>
                Date: {booking.date} | Time: {booking.time}
              </p>
              <p>
                Seats: {booking.seats} | Status: {booking.status}
              </p>
              <p>Total: ₹{booking.totalPrice}</p>

               {booking.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
