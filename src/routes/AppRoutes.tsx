import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Venues from "../pages/Venues";
import VenueDetails from "../pages/VenueDetails";
import BookingConfirmation from "../pages/BookingConfirmation";
import Manager from "../pages/Manager";
import CreateVenue from "../pages/CreateVenue";
import EditVenue from "../pages/EditVenue";
import UpcomingBookings from "../pages/UpcomingBookings";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/venues/new" element={<CreateVenue />} />
        <Route path="/manager/venues/:id/edit" element={<EditVenue />} />
        <Route path="/manager/venues/:id/bookings" element={<UpcomingBookings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;