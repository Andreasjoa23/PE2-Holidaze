import { useState } from "react";
import { createVenue } from "../../api/venues";
import { useNavigate } from "react-router-dom";

const CreateVenueForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: { country: "", city: "", address: "" },
    media: [""],
    price: 0,
    maxGuests: 1,
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.media.some((url) => url.trim() !== "")) return "Please provide at least one image URL.";
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
      media: formData.media.filter((url) => url.trim() !== "").map((url) => ({
        url,
        alt: `${formData.title} image`,
      })),
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
      await createVenue(payload);
      setSuccess("Venue created successfully!");
    } catch (err) {
      console.error("Failed payload:", payload);
      console.error(err);
      setError("Failed to create venue. Please check your inputs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-4 rounded">
      <h3 className="text-lg font-semibold">Create a New Listing</h3>

      <label className="block">
        <span className="font-medium">Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="font-medium">Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          required
        />
      </label>

      <div>
        <span className="font-medium">Images</span>
        {formData.media.map((url, index) => (
          <input
            key={index}
            type="url"
            placeholder={`Image URL ${index + 1}`}
            value={url}
            onChange={(e) => handleMediaChange(index, e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        ))}
        <button
          type="button"
          onClick={handleAddImage}
          className="mt-2 text-sm text-blue-700 hover:underline"
        >
          ➕ Add another image
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label>
          <span className="font-medium">Country</span>
          <input
            type="text"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>
        <label>
          <span className="font-medium">City</span>
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>
      </div>

      <label>
        <span className="font-medium">Address</span>
        <input
          type="text"
          name="location.address"
          value={formData.location.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </label>

      <label>
        <span className="font-medium">Price per Night (NOK)</span>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          min={0}
        />
      </label>

      <label>
        <span className="font-medium">Maximum Guests</span>
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          min={1}
        />
      </label>

      {/* AMENITIES */}
      <fieldset className="mt-4">
        <legend className="font-medium mb-2">Amenities</legend>
        <div className="flex gap-4">
          {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                name={amenity}
                checked={formData.meta[amenity as keyof typeof formData.meta]}
                onChange={handleCheckbox}
              />{" "}
              {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <div className="text-green-600">
          <p>{success}</p>
          <button
            type="button"
            onClick={() => navigate("/listings")}
            className="mt-2 text-blue-700 hover:underline"
          >
            ➔ Go to My Listings
          </button>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
      >
        Post Venue
      </button>
    </form>
  );
};

export default CreateVenueForm;
