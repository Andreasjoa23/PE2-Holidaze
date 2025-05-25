import { useState, useEffect } from "react";
import { updateProfile } from "../../api/profile";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { UserProfile } from "../../types/api";
import { getPlaceholderImage } from "../../utils/image/missingImage";

interface EditProfileProps {
  /** Called when the profile is successfully updated */
  onSuccess: (updatedUser: UserProfile) => void;
  /** Called when the modal is closed */
  onClose: () => void;
}

/**
 * Modal form for editing the user's avatar and banner.
 * Allows previewing and submitting profile updates.
 */
const EditProfile: React.FC<EditProfileProps> = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    avatar: { url: "", alt: "" },
    banner: { url: "", alt: "" },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Load current user data from localStorage on mount.
   */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setFormData({
      avatar: {
        url: user.avatar?.url || "",
        alt: user.avatar?.alt || "",
      },
      banner: {
        url: user.banner?.url || "",
        alt: user.banner?.alt || "",
      },
    });
  }, []);

  /**
   * Handle input changes in both avatar and banner fields.
   */
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

  /**
   * Submit profile updates via API and update localStorage.
   */
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
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Update failed. Please check your inputs.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h3 className="text-xl font-bold mb-4 text-center">Edit Profile</h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Banner */}
            <div>
              <label className="block font-medium">Banner image</label>
              <img
                src={getPlaceholderImage(formData.banner.url, 300, 100)}
                alt="Banner preview"
                className="w-full h-24 object-cover rounded mt-2 mb-2"
              />
              <input
                type="url"
                name="banner.url"
                placeholder="Banner URL"
                value={formData.banner.url}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="banner.alt"
                placeholder="Banner alt text"
                value={formData.banner.alt}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-2"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block font-medium">Avatar image</label>
              <img
                src={getPlaceholderImage(formData.avatar.url, 80, 80)}
                alt="Avatar preview"
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <input
                type="url"
                name="avatar.url"
                placeholder="Avatar URL"
                value={formData.avatar.url}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="avatar.alt"
                placeholder="Avatar alt text"
                value={formData.avatar.alt}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-2"
              />
            </div>

            {/* Feedback */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm"
              >
                Save changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProfile;
