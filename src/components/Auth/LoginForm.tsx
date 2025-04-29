import { useState } from "react";
import { loginUser } from "../../api/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const userData = response.data;

      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Login success:", userData);

      window.location.reload();
    } catch (error: any) {
      setErrorMsg("Login failed. Please check your username and password.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
