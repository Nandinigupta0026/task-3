import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import TrainEvents from "./pages/trainevents";
import MovieEvents from "./pages/movieevents";
import ConcertEvents from "./pages/concertevents";
import EventDetails from "./pages/eventdetails";
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events/train" element={<TrainEvents />} />
        <Route path="/events/movie" element={<MovieEvents />} />
        <Route path="/events/concert" element={<ConcertEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        
        {/* {<Route path="*" element={<h2>404 Not Found</h2>} />} */}
      </Routes>
    </Router>
  );
}

export default App;
