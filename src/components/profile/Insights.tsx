import React from "react";

interface InsightsProps {
  bookingsCount: number;
  viewsCount: number;
  income: number;
  nextBooking?: string;
}

const Insights: React.FC<InsightsProps> = ({
  bookingsCount,
  viewsCount,
  income,
  nextBooking,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-xs text-gray-500 mb-1">Bookings (last 30 days)</p>
        <p className="text-2xl font-semibold text-[#0E1E34]">{bookingsCount}</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 ring-2 ring-blue-500">
        <p className="text-xs text-gray-500 mb-1">Views (last 30 days)</p>
        <p className="text-2xl font-semibold text-[#0E1E34]">
          {viewsCount} total
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-xs text-gray-500 mb-1">Income (this month)</p>
        <p className="text-2xl font-bold text-[#0E1E34]">
          {income.toLocaleString("en-US")} USD
        </p>
      </div>

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
