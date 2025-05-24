import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteConfirmationModalProps } from "../../types/ui";

/**
 * A modal component to confirm the deletion of a venue.
 *
 * @component
 * @param isOpen - Controls whether the modal is visible.
 * @param onClose - Function to call when closing the modal without confirming.
 * @param onConfirm - Function to call when confirming the deletion.
 * @param venueName - Optional name of the venue to display in the confirmation message.
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  venueName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-[#0E1E34] mb-2">
              Delete Venue
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to delete{" "}
              <strong>{venueName || "this venue"}</strong>? This action cannot
              be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
                aria-label="Cancel delete"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                aria-label="Confirm delete"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
