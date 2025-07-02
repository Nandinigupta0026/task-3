import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../components/confirmModal";

const BookingTicket = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEventAndBooking = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
         if (!userId) {
          console.error("User not logged in");
          return;
        }
        const [eventRes, bookingRes] = await Promise.all([
          axios.get(`http://localhost:8080/events/${eventId}`),
          axios.get(`http://localhost:8080/bookings/user/${userId}`),
        ]);

        setEvent(eventRes.data);

        const alreadyBooked = bookingRes.data.some(
          (booking) =>
            booking.eventId?._id === eventId && booking.status !== "cancelled"
        );
        setBooked(alreadyBooked);
      } catch (err) {
        console.error("Error loading event or bookings:", err);
      }
    };

    fetchEventAndBooking();
  }, [eventId]);

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      if (!userId) {
      alert("User not logged in");
      return;
    }
      console.log("userId from localStorage:", userId);

       if (
      event.category === "movie" &&
      (!selectedDate || !selectedTime)
    ) {
      alert("Please select date and time for the movie.");
      return;
    }
      const bookingData = {
        userId,
        eventId,
        seats,
        date: selectedDate || event.date,
        time: selectedTime || event.time,
      };

      await axios
        .post("http://localhost:8080/bookings", bookingData)
        .then((res) => {
          alert("Booking successful!");
          navigate("/mybookings");
        });
    } catch (err) {
      alert("Booking failed!");
      console.error("BOOKING ERROR:", err.response?.data || err.message);
      console.error(err);
    }
  };

  const handleBookedClick = () => {
    setShowModal(true);
  };

  if (!event) return <div className="text-center mt-10">Loading event...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">Book for {event.title}</h2>
      <p className="mb-2 text-gray-600">{event.description}</p>
      <p className="mb-2 text-sm text-gray-500">{event.location}</p>

      {event.category === "movie" && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Select Date</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Choose a date --</option>
              {event.availableDates?.map((d, idx) => (
                <option key={idx} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Select Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Choose a time --</option>
              {event.availableTimes?.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {(event.category === "concert" || event.category === "train") && (
        <div className="mb-4 text-sm text-gray-700">
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">Number of Seats</label>
        <input
          type="number"
          value={seats}
          min="1"
          max={event.seatsAvailable}
          onChange={(e) => setSeats(Number(e.target.value) || 1)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {booked ? (
        <button
          onClick={handleBookedClick}
          className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700"
        >
          Booked
        </button>
      ) : (
        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      )}
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          navigate("/mybookings");
        }}
        message="This ticket has already been booked. Do you want to view your bookings?"
      />
    </div>
  );
};

export default BookingTicket;
