import React from "react";
import { InsightsProps } from "../../types/props";

/**
 * A dashboard-style component displaying key metrics
 * such as booking count, views, income, and the next booking date.
 */
const Insights: React.FC<InsightsProps> = ({
  bookingsCount,
  viewsCount,
  income,
  nextBooking,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Booked stays */}
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-xs text-gray-500 mb-1">Booked stays</p>
        <p className="text-2xl font-semibold text-[#0E1E34]">{bookingsCount}</p>
      </div>

      {/* Total bookings received */}
      <div className="bg-white rounded-2xl shadow p-6 ring-2 ring-blue-500">
        <p className="text-xs text-gray-500 mb-1">Total bookings received</p>
        <p className="text-2xl font-semibold text-[#0E1E34]">
          {viewsCount} total
        </p>
      </div>

      {/* Total income */}
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-xs text-gray-500 mb-1">Money spent</p>
        <p className="text-2xl font-bold text-[#0E1E34]">
          {income.toLocaleString("en-US")} USD
        </p>
      </div>

      {/* Next upcoming booking */}
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-xs text-gray-500 mb-1">Next Booking</p>
        <p className="text-2xl font-semibold text-[#0E1E34]">
          {nextBooking || "—"}
        </p>
      </div>
    </div>
  );
};

export default Insights;
