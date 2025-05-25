import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useVenueForm from "./useVenueForm";
import VenueFormFields from "./VenueFormFields";
import { VenueFormProps } from "../../types/forms";

/**
 * Modal wrapper for creating a new venue listing.
 * Uses shared form logic and UI via `useVenueForm` and `VenueFormFields`.
 */
const CreateVenue: React.FC<VenueFormProps> = ({
  mode,
  initialData,
  onSuccess,
  onClose,
}) => {
  const navigate = useNavigate();

  const {
    formData,
    error,
    newVenueId,
    showImageLimitWarning,
    handleChange,
    handleCheckbox,
    handleAddImage,
    handleMediaChange,
    handleSubmit,
  } = useVenueForm(mode, initialData, (id) => {
    onClose();
    if (mode === "create" && id) {
      navigate(`/venue/${id}`);
    } else {
      onSuccess(id);
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        className="bg-white max-w-lg w-full p-6 rounded-2xl shadow-xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          aria-label="Close form"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {newVenueId ? (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-green-700">
              Venue created successfully!
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="px-4 py-2 border rounded text-sm"
              >
                Great, thanks!
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate(`/venue/${newVenueId}`);
                }}
                className="px-4 py-2 bg-blue-900 text-white rounded text-sm"
              >
                View Venue Page
              </button>
            </div>
          </div>
        ) : (
          <VenueFormFields
            mode={mode}
            formData={formData}
            error={error}
            showImageLimitWarning={showImageLimitWarning}
            onChange={handleChange}
            onCheckbox={handleCheckbox}
            onAddImage={handleAddImage}
            onMediaChange={handleMediaChange}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CreateVenue;
