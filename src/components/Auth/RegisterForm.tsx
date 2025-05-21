import { useState } from "react";
import { registerUser } from "../../api/auth";
import { UserProfile } from "../../types/api";

interface RegisterFormProps {
  onSuccess?: (user: UserProfile) => void;
  switchToLogin?: () => void; // 👈 new prop
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
    venueManager: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsRegistered(false);

    if (!formData.email.toLowerCase().endsWith("@stud.noroff.no")) {
      setError("Email must be a @stud.noroff.no address.");
      return;
    }

    const safeName = formData.name.trim().toLowerCase().replace(/\s+/g, "_");

    const payload = {
      name: safeName,
      email: formData.email.toLowerCase(),
      password: formData.password,
      venueManager: formData.venueManager,
      avatar: formData.avatarUrl
        ? {
            url: formData.avatarUrl.trim(),
            alt: `${formData.name}'s avatar`,
          }
        : undefined,
    };

    try {
      const user = await registerUser(payload);
      localStorage.setItem("user", JSON.stringify(user));
      setSuccessMessage("🎉 Registration successful!");
      setIsRegistered(true);

      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error: unknown) {
      if (isApiError(error)) {
        setError("Registration failed: " + (error.response.data.message || "Try a different name or email."));
      } else {
        setError("Unexpected error occurred during registration.");
      }
    }
  };

  const handleSwitchToLogin = () => {
    if (switchToLogin) {
      switchToLogin();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1E34]"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1E34]"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1E34]"
        required
      />
      <input
        name="avatarUrl"
        type="url"
        placeholder="Avatar URL (optional)"
        value={formData.avatarUrl}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1E34]"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
        />
        Register as a venue manager
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg border border-green-300 space-y-2">
          <p>{successMessage}</p>
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      )}

      {!isRegistered && (
        <button
          type="submit"
          className="w-full bg-[#0E1E34] text-white py-3 rounded-full font-medium hover:bg-[#182944] transition"
        >
          Sign up
        </button>
      )}
    </form>
  );
};

function isApiError(error: unknown): error is {
  response: { data: { message?: string } };
} {
  return typeof error === "object" && error !== null && "response" in error;
}

export default RegisterForm;
