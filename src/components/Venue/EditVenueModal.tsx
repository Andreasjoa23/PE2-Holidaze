import React from "react";
import { X } from "lucide-react";
import { EditVenueModalProps } from "../../types/props";
import VenueFormFields from "./VenueFormFields";
import useVenueForm from "./useVenueForm";

/**
 * Modal wrapper for editing an existing venue.
 * Uses the shared venue form and form logic.
 */
const EditVenueModal: React.FC<EditVenueModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const {
    formData,
    error,
    showImageLimitWarning,
    handleChange,
    handleCheckbox,
    handleAddImage,
    handleMediaChange,
    handleSubmit,
  } = useVenueForm("edit", initialData, () => {
    onClose();
    onSuccess();
  });

  if (!isOpen || !initialData) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close edit venue modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

        <VenueFormFields
          formData={formData}
          error={error}
          mode="edit"
          onChange={handleChange}
          onCheckbox={handleCheckbox}
          onMediaChange={handleMediaChange}
          onAddImage={handleAddImage}
          onSubmit={handleSubmit}
          onCancel={onClose}
          showImageLimitWarning={showImageLimitWarning}
        />
      </div>
    </div>
  );
};

export default EditVenueModal;
