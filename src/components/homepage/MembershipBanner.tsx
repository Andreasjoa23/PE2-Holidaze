
import { LogIn } from "lucide-react"; // Importer ikon, kan bytte hvis ønsket

const MembershipBanner = () => {
  return (
    <div className="bg-[#0E1E34] rounded-[20px] p-4 flex items-center justify-between max-w-5xl mx-auto my-10">
      {/* Venstre side: ikon og tekst */}
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full">
          <LogIn className="text-[#0E1E34]" size={24} />
        </div>
        <p className="text-white font-medium">
          Members get access to offers, and exclusive properties first hand.
        </p>
      </div>

      {/* Høyre side: knapper */}
      <div className="flex gap-4">
        <button className="bg-white text-[#0E1E34] font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
          Log In
        </button>
        <button className="border border-white text-white font-semibold px-4 py-2 rounded-full hover:bg-white hover:text-[#0E1E34] transition">
          Register
        </button>
      </div>
    </div>
  );
};

export default MembershipBanner;