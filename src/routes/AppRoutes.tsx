import { Routes, Route } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Home from "../pages/Home";
import Venues from "../pages/Venues";
import VenueDetails from "../pages/VenueDetails";
import BookingConfirmation from "../pages/BookingConfirmation";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import FAQ from "../pages/FAQ";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venue/:id" element={<VenueDetails />} />{" "}
        <Route path="/bookingConfirmation" element={<BookingConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
