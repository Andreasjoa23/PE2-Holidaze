import React from "react";
import VenueForm from "./VenueForm";
import { Venue } from "../../types/api";

interface CreateVenueProps {
  /** Mode of the form - either creating a new venue or editing an existing one */
  mode: "create" | "edit";

  /** Optional initial data used to pre-fill the form during edit mode */
  initialData?: Partial<Venue>;

  /** Callback to close the form/modal */
  onClose: () => void;

  /** Callback triggered after successful submission; optional venue ID can be returned */
  onSuccess: (id?: string) => void;
}

/**
 * Wrapper component for rendering the VenueForm with mode and props.
 *
 * @param mode - Defines whether the form is for creating or editing.
 * @param initialData - Optional initial values for editing.
 * @param onClose - Handler to close the form/modal.
 * @param onSuccess - Callback when venue creation/editing is successful.
 */
const CreateVenue: React.FC<CreateVenueProps> = ({
  mode,
  initialData,
  onClose,
  onSuccess,
}) => {
  return (
    <VenueForm
      mode={mode}
      initialData={initialData}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
};

export default CreateVenue;
