import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthDropdown = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="bg-white shadow-lg rounded-md w-80 p-4 border border-gray-200">
      <div className="flex justify-around mb-4">
        <button
          className={`w-full py-2 font-medium rounded-l ${
            activeTab === "login" ? "bg-blue-900 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Log In
        </button>
        <button
          className={`w-full py-2 font-medium rounded-r ${
            activeTab === "register" ? "bg-blue-900 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      <div>
        {activeTab === "login" && <LoginForm />}
        {activeTab === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthDropdown;
