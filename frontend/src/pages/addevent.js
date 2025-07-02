import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const vendorId = storedUser?._id;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    availableDates: [],
    availableTimes: [],
    date: "",
    time: "",
    location: "",
    price: "",
    seatsAvailable: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["price", "seatsAvailable"];

    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleMultiInput = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId) {
      setMessage("Vendor not logged in.");
      return;
    }

    const data = { ...form, vendorId };
    if (form.category === "movie") {
      delete data.date;
      delete data.time;
    } else {
      delete data.availableDates;
      delete data.availableTimes;
    }
    console.log("Submitting event data:", data);
    try {
    
      await axios.post("http://localhost:8080/events", data);
      setMessage("Event added successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        availableDates: [],
        availableTimes: [],
        date: "",
        time: "",
        location: "",
        price: "",
        seatsAvailable: "",
      });
    } catch (err) {
      console.error("FAILED TO ADD EVENT:", err.response?.data || err.message);
      setMessage("Failed to add event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Add Event
      </h2>
      {message && <p className="text-center mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="movie">Movie</option>
          <option value="concert">Concert</option>
          <option value="train">Train</option>
        </select>

        {form.category === "movie" && (
          <>
            <input
              type="text"
              placeholder="2025-07-20,2025-07-21,2025-07-22"
              onChange={(e) =>
                handleMultiInput("availableDates", e.target.value)
              }
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Available Times (comma separated)"
              onChange={(e) =>
                handleMultiInput("availableTimes", e.target.value)
              }
              className="w-full px-4 py-2 border rounded"
            />
          </>
        )}

        {form.category !== "movie" && (
          <>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </>
        )}

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="number"
          name="seatsAvailable"
          value={form.seatsAvailable}
          onChange={handleChange}
          placeholder="Seats Available"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
