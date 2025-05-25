import { useState } from "react";
import { createVenue, updateVenue } from "../../api/venues";
import { VenueFormData } from "../../types/forms";
import { Venue } from "../../types/api";

const MAX_IMAGES = 8;

/**
 * Custom hook for managing venue form state and logic.
 * Handles validation, input changes, image upload limit, and submission.
 */
const useVenueForm = (
  mode: "create" | "edit",
  initialData: Partial<Venue> | undefined,
  onSuccess: (id?: string) => void
) => {
  const [formData, setFormData] = useState<VenueFormData>({
    title: initialData?.name || "",
    description: initialData?.description || "",
    location: {
      country: initialData?.location?.country || "",
      city: initialData?.location?.city || "",
      address: initialData?.location?.address || "",
    },
    media:
      initialData?.media?.length && initialData.media.length > 0
        ? initialData.media.slice(0, MAX_IMAGES).map((m) => m.url)
        : [""],
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
  const [newVenueId, setNewVenueId] = useState<string | null>(null);
  const [showImageLimitWarning, setShowImageLimitWarning] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1] as keyof VenueFormData["location"];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
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
    if (formData.media.length >= MAX_IMAGES) {
      setShowImageLimitWarning(true);
      setTimeout(() => setShowImageLimitWarning(false), 3000);
      return;
    }
    setFormData((prev) => ({ ...prev, media: [...prev.media, ""] }));
  };

  const handleMediaChange = (index: number, value: string) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index] = value;
    setFormData((prev) => ({ ...prev, media: updatedMedia }));
  };

  const validateForm = () => {
    if (formData.price < 0) return "Price must be zero or positive.";
    if (formData.maxGuests < 1) return "At least 1 guest must be allowed.";
    if (!formData.media.some((url) => url.trim() !== "")) {
      return "Please provide at least one image URL.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
        address: formData.location.address,
        city: formData.location.city,
        country: formData.location.country,
        zip: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    };

    try {
      if (mode === "create") {
        const response = await createVenue(payload);
        setNewVenueId(response.data.id);
      } else if (mode === "edit" && initialData?.id) {
        await updateVenue(initialData.id, payload);
        onSuccess(initialData.id);
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to ${mode} venue. Please check your inputs.`);
    }
  };

  return {
    formData,
    error,
    newVenueId,
    showImageLimitWarning,
    handleChange,
    handleCheckbox,
    handleAddImage,
    handleMediaChange,
    handleSubmit,
  };
};

export default useVenueForm;
