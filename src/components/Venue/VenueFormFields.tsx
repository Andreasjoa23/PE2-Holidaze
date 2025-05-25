import React from "react";
import { calculateBeds } from "../ui/Beds";
import { VenueFormFieldsProps } from "../../types/props";

/**
 * Form content for creating or editing a venue.
 * Handles field layout, labels, prefilled values, and validation messages.
 */
const VenueFormFields: React.FC<VenueFormFieldsProps> = ({
  formData,
  error,
  mode,
  showImageLimitWarning,
  onChange,
  onCheckbox,
  onMediaChange,
  onAddImage,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-sm">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Cozy mountain cabin"
          value={formData.title}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Describe your place..."
          value={formData.description}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Country</label>
          <input
            name="location.country"
            placeholder="Norway"
            value={formData.location.country}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            name="location.city"
            placeholder="Oslo"
            value={formData.location.city}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Street address</label>
        <input
          name="location.address"
          placeholder="Storgata 23B"
          value={formData.location.address}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Max guests</label>
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={onChange}
            min={1}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Beds (auto)</label>
          <input
            type="text"
            disabled
            value={calculateBeds(formData.maxGuests)}
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Cover image URL</label>
        <input
          type="url"
          placeholder="https://example.com/cover.jpg"
          value={formData.media[0]}
          onChange={(e) => onMediaChange(0, e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {formData.media.slice(1).map((url, i) => (
        <input
          key={i + 1}
          type="url"
          placeholder={`Image URL ${i + 2}`}
          value={url}
          onChange={(e) => onMediaChange(i + 1, e.target.value)}
          className="w-full border px-3 py-2 rounded mt-2"
        />
      ))}

      <div className="space-y-1">
        <button
          type="button"
          onClick={onAddImage}
          disabled={formData.media.length >= 8}
          className={`text-sm ${
            formData.media.length >= 8
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-700 hover:underline"
          }`}
        >
          ➕ Add more images
        </button>
        {showImageLimitWarning && (
          <p className="text-xs text-red-500">You can only add up to 8 images.</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Price per night (USD)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={onChange}
          min={0}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <fieldset>
        <legend className="font-medium mb-2">Facilities</legend>
        <div className="flex flex-wrap gap-3">
          {Object.entries(formData.meta).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={onCheckbox}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          {mode === "create" ? "Post" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default VenueFormFields;
