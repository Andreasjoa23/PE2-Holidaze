import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Loader /> : <AppRoutes />}</>;
}

export default App;
