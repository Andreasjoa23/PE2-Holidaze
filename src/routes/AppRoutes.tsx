import { Routes, Route } from "react-router-dom";
import Layout from "../components/common/Layout";
import Home from "../pages/Home";
import Venues from "../pages/Venues";
import VenueDetails from "../pages/VenueDetails";
import BookingConfirmation from "../pages/BookingConfirmation";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import FAQ from "../pages/FAQ";

/**
 * Defines the application's route configuration using React Router.
 * Includes nested routing within a common `Layout` component and routes
 * for pages like Home, Venues, Venue Details, Booking Confirmation, Profile,
 * FAQ, and a catch-all NotFound route.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/bookingConfirmation" element={<BookingConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
