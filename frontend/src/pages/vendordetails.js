import React, { useEffect, useState } from "react";
import axios from 'axios';

function VendorDetails() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchvendorDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8080/users');
        const filteredUsers = res.data.filter(user => user.role === 'vendor');
        setUsers(filteredUsers);
      } catch (error) {
        setError("Failed to load users");
      }
    };
    fetchvendorDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">Vendors</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-pink-600 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600 mb-1"><strong>Wallet:</strong> {user.wallet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VendorDetails;
