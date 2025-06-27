import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
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
console.log("MyBookings:", MyBookings);
function App() {
  // const user = JSON.parse(localStorage.getItem("user")||{});
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events/train" element={<TrainEvents />} />
        <Route path="/events/movie" element={<MovieEvents />} />
        <Route path="/events/concert" element={<ConcertEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/book/:eventId" element={<BookTicket />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/mybookings" element={<MyBookings />} />
        {/* {<Route path="*" element={<h2>404 Not Found</h2>} />} */}
      </Routes>
    </Router>
  );
}

export default App;
