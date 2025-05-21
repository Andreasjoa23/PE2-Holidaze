import React from "react";
import { LogIn } from "lucide-react";

const MembershipBanner: React.FC = () => {
  return (
    <div className="bg-[#0E1E34] rounded-[20px] p-6 max-w-6xl mx-auto my-8">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
          <div className="bg-white p-2 rounded-full flex-shrink-0">
            <LogIn className="text-[#0E1E34]" size={24} />
          </div>
          <p className="text-white font-medium text-sm sm:text-base">
            Members get access to offers, and exclusive properties first hand.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-white text-[#0E1E34] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Log In
          </button>
          <button className="w-full sm:w-auto border border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-[#0E1E34] transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipBanner;
