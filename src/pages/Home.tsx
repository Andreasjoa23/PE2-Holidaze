import { useEffect, useState } from "react";
import { getAllVenues } from "../api/venues"; 

const Home = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await getAllVenues();
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
    <div>
      <h1>Available Venues</h1>
      <div>
        {venues.map((venue) => (
          <div key={venue.id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
            <h2>{venue.name}</h2>
            <p>{venue.location?.city}</p>
            <p>{venue.price} NOK / night</p>
            {venue.media?.[0]?.url && (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
                style={{ width: "100%", maxWidth: "300px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
