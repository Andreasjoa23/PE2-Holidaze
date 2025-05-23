import VenueForm from "./VenueForm";
import { Venue } from "../../types/api";

interface CreateVenueProps {
  mode: "create" | "edit";
  initialData?: Partial<Venue>;
  onClose: () => void;
  onSuccess: (id?: string) => void;
}

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