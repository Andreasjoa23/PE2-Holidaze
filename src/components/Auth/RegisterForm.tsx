import { useState } from "react";
import { registerUser } from "../../api/auth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
    venueManager: false,  // added
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      venueManager: formData.venueManager,  // pass checkbox value
    };

    if (formData.avatarUrl.trim()) {
      payload.avatar = {
        url: formData.avatarUrl,
        alt: `${formData.name}'s avatar`,
      };
    }

    try {
      const response = await registerUser(payload);
      console.log("Registration successful:", response);
      window.location.reload();
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="avatarUrl"
        type="url"
        placeholder="Avatar URL (optional)"
        value={formData.avatarUrl}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      
      {/* Venue Manager Checkbox */}
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
      <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
