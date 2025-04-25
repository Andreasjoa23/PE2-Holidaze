import { useEffect, useState } from "react";
import { getAllVenues } from "../api/venues"; 
import HeroBanner from "../components/homepage/HeroBanner";
import Trending from "../components/homepage/Trending";

const Home = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await getAllVenues();
        console.log(response);
        setVenues(response.data);
      } catch (err: any) {
        setError("Failed to load venues.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (isLoading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <HeroBanner />
      <Trending />
    </>
  );
};

export default Home;
