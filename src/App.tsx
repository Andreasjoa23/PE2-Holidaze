import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/common/Loader";

/**
 * Root application component.
 * - Displays a loading spinner (`Loader`) for 2 seconds on initial load.
 * - After loading, renders the main application routes (`AppRoutes`).
 */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Loader /> : <AppRoutes />}</>;
}

export default App;
