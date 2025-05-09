import { useState } from "react";
import { createVenue, updateVenue } from "../../api/venues";
import { AnimatePresence, motion } from "framer-motion";

const VenueForm = ({
  mode,
  initialData,
  onSuccess,
  onClose,
}: {
  mode: "create" | "edit";
  initialData?: any;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.name || "",
    description: initialData?.description || "",
    location: {
      country: initialData?.location?.country || "",
      city: initialData?.location?.city || "",
      address: initialData?.location?.address || "",
    },
    media: initialData?.media?.map((m: any) => m.url) || [""],
    price: initialData?.price || 0,
    maxGuests: initialData?.maxGuests || 1,
    meta: initialData?.meta || {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [name]: checked },
    }));
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, ""],
    }));
  };

  const handleMediaChange = (index: number, value: string) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index] = value;
    setFormData((prev) => ({ ...prev, media: updatedMedia }));
  };

  const validateForm = () => {
    if (formData.price < 0) return "Price must be zero or positive.";
    if (formData.maxGuests < 1) return "At least 1 guest must be allowed.";
    if (!formData.media.some((url) => url.trim() !== ""))
      return "Please provide at least one image URL.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      name: formData.title,
      description: formData.description,
      media: formData.media
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url, alt: `${formData.title} image` })),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      meta: formData.meta,
      location: {
        address: formData.location.address || null,
        city: formData.location.city || null,
        country: formData.location.country || null,
        zip: null,
        continent: null,
        lat: 0,
        lng: 0,
      },
    };

    try {
      if (mode === "create") {
        await createVenue(payload);
      } else if (mode === "edit" && initialData?.id) {
        await updateVenue(initialData.id, payload);
      }
      setSuccess(
        `Venue ${mode === "create" ? "created" : "updated"} successfully!`
      );
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(`Failed to ${mode} venue. Please check your inputs.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white max-w-lg w-full p-6 rounded-2xl shadow-xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">
            {mode === "create" ? "Create" : "Edit"} Listing
          </h3>

          <div>
            <label className="font-medium block">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="font-medium block">Information</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium block">Country</label>
              <input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="font-medium block">City</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="font-medium block">Address</label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium block">Number of guests</label>
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
                min={1}
              />
            </div>
            <div>
              <label className="font-medium block">Number of beds</label>
              <input
                type="number"
                name="beds"
                value={Math.floor(formData.maxGuests / 2)}
                onChange={() => {}}
                className="w-full border px-3 py-2 rounded mt-1"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="font-medium block">Upload cover image</label>
            <input
              type="url"
              value={formData.media[0]}
              onChange={(e) => handleMediaChange(0, e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Cover image URL"
              required
            />
          </div>

          <div>
            <label className="font-medium block">Additional images</label>
            {formData.media.slice(1).map((url, idx) => (
              <input
                key={idx}
                type="url"
                value={url}
                onChange={(e) => handleMediaChange(idx + 1, e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                placeholder={`Image URL ${idx + 2}`}
              />
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="text-sm text-blue-700 hover:underline mt-2"
            >
              ➕ Add more images
            </button>
          </div>

          <div>
            <label className="font-medium block">Price per night</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              min={0}
            />
          </div>

          <fieldset className="mt-4">
            <legend className="font-medium mb-2">Facilities</legend>
            <div className="flex flex-wrap gap-3">
              {Object.keys(formData.meta).map((key) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData.meta[key as keyof typeof formData.meta]}
                    onChange={handleCheckbox}
                  />
                  <span className="capitalize text-sm">{key}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm"
            >
              {mode === "create" ? "Post" : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VenueForm;
