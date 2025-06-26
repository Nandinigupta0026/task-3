import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user , setUser] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if(userId){
            axios.get(`http://localhost:8080/auth/user/${userId}`)
            .then((res) => setUser(res.data))
            .catch((err) =>{ console.error("Failed to load profile" ,err);
             setUser(null);
        });
            }
    } ,[userId]);
  
    if(!user) return <p className="text-center mt-10">Loading profile.....</p>;
    return ( 
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p><strong>Name:</strong>{user.name}</p>
            <p><strong>Email:</strong>{user.email}</p>
            <p><strong>Role:</strong>{user.role}</p>
            <p><strong>Wallet Balance:</strong> {user.wallet}</p>
        </div>
      );
}
 
export default Profile;
