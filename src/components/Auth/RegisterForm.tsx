/**
 * RegisterForm.tsx
 * 
 * A form component for user registration. Includes validation for:
 * - username format
 * - Noroff student email
 * - minimum password length
 * - optional avatar URL
 * - venue manager registration option
 * 
 * On successful submission, the user is registered and redirected to login.
 */

import { useState, useEffect } from "react";
import { registerUser } from "../../api/auth";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { RegisterFormProps } from "../../types/props";

/**
 * Form for user registration.
 * Validates input fields and sends a registration request to the API.
 */
const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin, setPrefillEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
    venueManager: false,
  });

  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Extract form fields
  const { name, email, password, avatarUrl } = formData;

  // Input field validations
  const validName = /^[a-zA-Z0-9_]+$/.test(name);
  const validEmail = email.toLowerCase().endsWith("@stud.noroff.no");
  const validPassword = password.length >= 8;
  const validAvatar = !avatarUrl || /^https?:\/\/.+\..+/.test(avatarUrl);

  // Enable submit only when all validations pass
  useEffect(() => {
    setIsFormValid(validName && validEmail && validPassword && validAvatar);
  }, [validName, validEmail, validPassword, validAvatar]);

  /**
   * Handles input updates and toggles for form state.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Handles form submission and registers a new user.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const safeName = name.trim().toLowerCase().replace(/\s+/g, "_");
    
    const payload = {
      name: safeName,
      email: email.toLowerCase(),
      password,
      venueManager: formData.venueManager,
      avatar: avatarUrl
        ? {
            url: avatarUrl.trim(),
            alt: `${name}'s avatar`,
          }
        : undefined,
    };

    try {
      await registerUser(payload);
      setPrefillEmail?.(email.toLowerCase());
      switchToLogin?.();
    } catch (error: unknown) {
      if (isApiError(error)) {
        setError("Registration failed: " + (error.response.data.message || "Try a different name or email."));
      } else {
        setError("Unexpected error occurred during registration.");
      }
    }
  };

  /**
   * Renders a validation icon based on field validity.
   */
  const InputIcon = ({ isValid }: { isValid: boolean }) =>
    isValid ? (
      <FaCheckCircle className="text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
    ) : (
      <FaTimesCircle className="text-red-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm animate-slide-in">
      {/* Form instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0E1E34] shadow-sm">
        <p className="font-semibold mb-2">Instructions</p>
        <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
          <li><strong>Name:</strong> Only letters, numbers, and underscores (_)</li>
          <li><strong>Email:</strong> Must end with <code>@stud.noroff.no</code></li>
          <li><strong>Password:</strong> At least 8 characters</li>
          <li><strong>Avatar URL:</strong> Optional, must be a valid image link</li>
        </ul>
      </div>

      {/* Name field */}
      <div className="relative">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          className={`w-full border ${name && !validName ? "border-red-500" : "border-gray-300"} px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E1E34]`}
          required
        />
        {name && <InputIcon isValid={validName} />}
      </div>

      {/* Email field */}
      <div className="relative">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          className={`w-full border ${email && !validEmail ? "border-red-500" : "border-gray-300"} px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E1E34]`}
          required
        />
        {email && <InputIcon isValid={validEmail} />}
      </div>

      {/* Password field */}
      <div className="relative">
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className={`w-full border ${password && !validPassword ? "border-red-500" : "border-gray-300"} px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E1E34]`}
          required
        />
        {password && <InputIcon isValid={validPassword} />}
      </div>

      {/* Avatar URL field */}
      <div className="relative">
        <input
          name="avatarUrl"
          type="url"
          placeholder="Avatar URL (optional)"
          value={avatarUrl}
          onChange={handleChange}
          className={`w-full border ${avatarUrl && !validAvatar ? "border-red-500" : "border-gray-300"} px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E1E34]`}
        />
        {avatarUrl && <InputIcon isValid={validAvatar} />}
      </div>

      {/* Venue manager checkbox */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
          className="accent-[#0E1E34]"
        />
        Register as a venue manager
      </label>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 rounded-full font-medium transition ${
          isFormValid
            ? "bg-[#0E1E34] text-white hover:bg-[#182944]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Sign up
      </button>
    </form>
  );
};

/**
 * Type guard to detect structured API errors with messages.
 */
function isApiError(error: unknown): error is {
  response: { data: { message?: string } };
} {
  return typeof error === "object" && error !== null && "response" in error;
}

export default RegisterForm;
