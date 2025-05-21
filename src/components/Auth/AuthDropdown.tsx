import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type View = "initial" | "login" | "register";

interface AuthDropdownProps {
  onClose: () => void;
}

const AuthDropdown: React.FC<AuthDropdownProps> = ({ onClose }) => {
  const [view, setView] = useState<View>("initial");

  return (
    <div className="relative w-80">
      {view !== "initial" && (
        <button
          onClick={() => setView("initial")}
          className="absolute top-4 left-4 z-10 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={26} />
        </button>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
      >
        <X size={26} />
      </button>

      <div className="bg-white rounded-xl shadow-lg pt-12 px-6 pb-6 space-y-4">
        {view === "initial" && (
          <>
            <button
              onClick={() => setView("register")}
              className="mx-auto w-4/5 bg-[#0E1E34] text-white py-2 rounded-full font-medium hover:bg-[#182944] transition"
            >
              Sign up
            </button>
            <button
              onClick={() => setView("login")}
              className="mx-auto w-4/5 bg-[#0E1E34] text-white py-2 rounded-full font-medium hover:bg-[#182944] transition"
            >
              Log in
            </button>

            <hr className="border-gray-200 my-2" />

            <p className="text-center text-gray-500 text-sm px-2">
              Join Holidaze today, and unlock exclusive offers
            </p>
          </>
        )}

        {view === "login" && (
          <>
            <h2 className="text-center text-lg font-semibold text-[#0E1E34] mb-4">
              Log in
            </h2>
            <LoginForm />
          </>
        )}

        {view === "register" && (
          <>
            <h2 className="text-center text-lg font-semibold text-[#0E1E34] mb-4">
              Sign up
            </h2>
            <RegisterForm onSuccess={onClose} />
          </>
        )}

      </div>
    </div>
  );
};

export default AuthDropdown;
