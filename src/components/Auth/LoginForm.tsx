import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../api/auth";
import { UserProfile } from "../../types/api";

interface LoginFormProps {
  onSuccess?: (user: UserProfile) => void;
  prefillEmail?: string;
}

interface LoginResponse extends UserProfile {
  accessToken: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, prefillEmail = "" }) => {
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefillEmail && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [prefillEmail]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await loginUser({ email, password });
      const data = response.data as { data: LoginResponse };

      const { accessToken, ...userWithoutToken } = data.data;

      const user: UserProfile = {
        ...userWithoutToken,
        banner: userWithoutToken.banner ?? {
          url: "",
          alt: "Default banner",
        },
      };

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (onSuccess) {
        onSuccess(user);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please check your email and password.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1E34]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        ref={passwordInputRef}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1E34]"
        required
      />
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <button
        type="submit"
        className="w-full bg-[#0E1E34] text-white py-3 rounded-full font-medium hover:bg-[#182944] transition"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
