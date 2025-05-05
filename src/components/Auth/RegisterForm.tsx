import { useState } from "react";
import { registerUser } from "../../api/auth";

const HOLIDAZE_BLUE = "#0E1E34";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("Email must be a @stud.noroff.no address.");
      return;
    }
    const payload: any = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      venueManager: false,
    };
    if (formData.avatarUrl.trim()) {
      payload.avatar = {
        url: formData.avatarUrl,
        alt: `${formData.name}'s avatar`,
      };
    }
    try {
      await registerUser(payload);
      window.location.reload();
    } catch {
      setError("Registration failed. Try again.");
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
