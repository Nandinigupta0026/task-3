import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import TrainEvents from "./pages/trainevents";
import MovieEvents from "./pages/movieevents";
import ConcertEvents from "./pages/concertevents";
import EventDetails from "./pages/eventdetails";
import BookTicket from "./pages/bookingticket";
import MyBookings from "./pages/mybookings";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from './pages/resetpassword';
import UserDetails from './pages/userdetails';
import VendorDetails from './pages/vendordetails'
import AddEvent from './pages/addevent';
import MyEvents from './pages/myevents';

 function App() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <Router>
       <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login  setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events/train" element={<TrainEvents />} />
        <Route path="/events/movie" element={<MovieEvents />} />
        <Route path="/events/concert" element={<ConcertEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/book/:eventId" element={<BookTicket />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/users" element={<UserDetails/>}/>
        <Route path="/vendors" element={<VendorDetails/>}/>
        <Route path="/add-event" element={<AddEvent />}/>
        <Route path="/my-events" element={<MyEvents/>}/>
        {/* {<Route path="*" element={<h2>404 Not Found</h2>} />} */}
      </Routes>
    </Router>
  );
}

export default App;
