/**
 * Props for a modal that asks the user to confirm venue deletion.
 */
export interface DeleteConfirmationModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Callback triggered when the user confirms the deletion */
  onConfirm: () => void;
  /** Optional name of the venue being deleted for context */
  venueName?: string;
}
