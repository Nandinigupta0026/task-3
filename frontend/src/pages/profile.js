import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    profilePic: "",
  });
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/auth/user/${userId}`)
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error("Failed to load profile", err);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, profilePic: previewUrl }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/auth/user/${userId}`, {
        name: form.name,
        email: form.email,
      });

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const imageRes = await axios.post(
          `http://localhost:8080/auth/user/${userId}/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setForm((prev) => ({ ...prev, profilePic: imageRes.data.profilePic }));
      }

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      setMessage("Failed to update profile.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setPasswordMessage("New passwords do not match.");
    }

    try {
      const res = await axios.post(`http://localhost:8080/auth/change-password`, {
        userId,
        currentPassword,
        newPassword,
      });

      setPasswordMessage(res.data.message || "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Change password failed", err);
      setPasswordMessage(err.response?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 bg-gradient-to-br from-white via-blue-50 to-purple-100 p-10 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
         My Profile
      </h1>

      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img
          src={
            form.profilePic?.startsWith("blob:")
              ? form.profilePic
              : form.profilePic
              ? `http://localhost:8080/${form.profilePic}`
              : "/default-avatar.png"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload New Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
      </div>

    
      <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <p className="text-sm text-gray-600"><strong> Role:</strong> {form.role}</p>
          <p className="text-sm text-gray-600 mt-1"><strong>Wallet:</strong> ₹{form.wallet}</p>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg text-lg font-semibold hover:opacity-90 transition duration-200"
          >
             Save Profile
          </button>
          {message && <p className="text-green-700 mt-2">{message}</p>}
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/mybookings"
          className="inline-block bg-gray-100 text-blue-700 hover:bg-gray-200 py-2 px-6 rounded-full text-sm font-medium shadow"
        >
           View My Bookings
        </Link>
      </div>


      <div className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4"> Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
          >
            Update Password
          </button>
          {passwordMessage && <p className="text-sm mt-2 text-blue-700">{passwordMessage}</p>}
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Forgot password?{" "}
          <Link to="/forgot-password" className="text-blue-600 underline hover:text-blue-800">
            Reset it here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
