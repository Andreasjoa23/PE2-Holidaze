import { useState } from "react";
import { updateProfile } from "../../api/profile";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const EditProfile = ({ onSuccess }: { onSuccess: (updatedUser: any) => void }) => {
  const [formData, setFormData] = useState({
    avatar: {
      url: user.avatar?.url || "",
      alt: user.avatar?.alt || "",
    },
    banner: {
      url: user.banner?.url || "",
      alt: user.banner?.alt || "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [section, key] = e.target.name.split(".");
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as "avatar" | "banner"],
        [key]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const updated = await updateProfile(formData);
      localStorage.setItem("user", JSON.stringify(updated.data));
      setSuccess("Profile updated successfully!");

      setTimeout(() => {
        onSuccess(updated.data);
      }, 1500);
    } catch (err) {
      setError("Update failed. Please check your inputs.");
    }
  };
  

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-center font-semibold text-lg mb-4">Edit Profile</h3>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Banner */}
        <div className="text-center">
          <img
            src={formData.banner.url || "https://placehold.co/300x100"}
            alt="Banner preview"
            className="w-full h-24 object-cover rounded mb-2"
          />
          <input
            type="url"
            name="banner.url"
            placeholder="Banner URL"
            value={formData.banner.url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <input
            type="text"
            name="banner.alt"
            placeholder="Banner alt text"
            value={formData.banner.alt}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="text-center mt-4">
          <img
            src={formData.avatar.url || "https://placehold.co/80"}
            alt="Avatar preview"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <input
            type="url"
            name="avatar.url"
            placeholder="Avatar URL"
            value={formData.avatar.url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <input
            type="text"
            name="avatar.alt"
            placeholder="Avatar alt text"
            value={formData.avatar.alt}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          Submit changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
