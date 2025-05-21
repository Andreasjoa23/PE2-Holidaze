import { useState } from "react";
import { registerUser } from "../../api/auth";
import { UserProfile } from "../../types/api";

interface RegisterFormProps {
  onSuccess?: (user: UserProfile) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
    venueManager: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      const response = await registerUser(payload);
      const user = (response as { data: UserProfile }).data;
      localStorage.setItem("user", JSON.stringify(user));
      if (onSuccess) onSuccess(user);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try a different name or email.");
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

      <button
        type="submit"
        className="w-full bg-[#0E1E34] text-white py-3 rounded-full font-medium hover:bg-[#182944] transition"
      >
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
