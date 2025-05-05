import { useState } from "react";
import { createVenue } from "../../api/venues";

const CreateVenueForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: {
      country: "",
      city: "",
      address: "",
    },
    media: [""],
    price: 0,
    maxGuests: 1,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    const payload = {
      name: formData.title,
      description: formData.description,
      media: [
        {
          url: formData.media[0],
          alt: `${formData.title} cover image`,
        },
      ],
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      meta: {
        wifi: formData.meta.wifi,
        parking: formData.meta.parking,
        breakfast: formData.meta.breakfast,
        pets: formData.meta.pets,
      },
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
      setTimeout(() => {
        onSuccess();
      }, 1500);
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
          placeholder="Enter a catchy title"
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
          placeholder="Describe your venue (amenities, vibe, etc.)"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="font-medium">Cover Image URL</span>
        <input
          type="url"
          placeholder="Provide a main image URL"
          value={formData.media[0] || ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, media: [e.target.value] }))}
          className="w-full border px-3 py-2 rounded mt-1"
          required
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="font-medium">Country</span>
          <input
            type="text"
            name="location.country"
            placeholder="e.g., Norway"
            value={formData.location.country}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>
        <label className="block">
          <span className="font-medium">City</span>
          <input
            type="text"
            name="location.city"
            placeholder="e.g., Oslo"
            value={formData.location.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>
      </div>

      <label className="block">
        <span className="font-medium">Address</span>
        <input
          type="text"
          name="location.address"
          placeholder="Street address"
          value={formData.location.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Price per Night (NOK)</span>
        <input
          type="number"
          name="price"
          placeholder="Set a nightly price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          min={0}
        />
        <small className="text-gray-500">This is the cost per night for guests.</small>
      </label>

      <label className="block">
        <span className="font-medium">Maximum Guests</span>
        <input
          type="number"
          name="maxGuests"
          placeholder="Max number of guests"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1"
          min={1}
        />
        <small className="text-gray-500">Specify the maximum number of people the venue can accommodate.</small>
      </label>

      <fieldset className="mt-4">
        <legend className="font-medium mb-2">Amenities</legend>
        <div className="flex gap-4">
          <label>
            <input type="checkbox" name="wifi" checked={formData.meta.wifi} onChange={handleCheckbox} /> Wi-Fi
          </label>
          <label>
            <input type="checkbox" name="parking" checked={formData.meta.parking} onChange={handleCheckbox} /> Parking
          </label>
          <label>
            <input type="checkbox" name="breakfast" checked={formData.meta.breakfast} onChange={handleCheckbox} /> Breakfast
          </label>
          <label>
            <input type="checkbox" name="pets" checked={formData.meta.pets} onChange={handleCheckbox} /> Pets allowed
          </label>
        </div>
      </fieldset>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

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
