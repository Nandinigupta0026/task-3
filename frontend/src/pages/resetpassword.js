import React, { useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token,id } = useParams();
   console.log("ResetPassword component loaded");
  console.log("Params => ID:", id, "Token:", token);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
 axios.defaults.withCredentials = true;
  const handleReset = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`http://localhost:8080/auth/reset_password/${id}/${token}`, {
      newPassword,
    });
    if (res.data.Status === "Success") {
      navigate('/login');
    }

    setMessage(res.data.message || "Password reset successful!");
  } catch (err) {
    console.error("Reset error:", err.response?.data || err.message);
    setMessage(err.response?.data?.message || "Reset failed.");
  }
};


  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
        Reset Password
      </h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-700">{message}</p>}
    </div>
  );
};

export default ResetPassword;
