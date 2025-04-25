import { useEffect, useState } from "react";
import { getAllVenues } from "../../api/venues";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles/Trending.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Trending = () => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 20,
      origin: "center",
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await getAllVenues();
        const shuffled = [...response.data].sort(() => 0.5 - Math.random());
        setVenues(shuffled.slice(0, 10));
      } catch (err) {
        setError("Failed to fetch trending stays.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenues();
  }, []);

  if (isLoading) return <p className="text-center">Loading trending stays...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="py-12 px-4 mb-12">
      <h2 className="text-3xl font-bold text-center text-[#0E1E34] mb-10">Trending stays</h2>
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="arrow left-arrow"
        >
          <ChevronLeft size={48} />
        </button>

        <div ref={sliderRef} className="keen-slider w-full max-w-6xl">
          {venues.map((venue, index) => (
            <div
              key={venue.id}
              className={`keen-slider__slide slide-card ${index === currentSlide ? "active" : ""}`}
            >
              <div className="card-container">
                <img
                  src={venue.media?.[0]?.url || "fallback.jpg"}
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="card-image"
                />
                <p className="venue-title">{venue.name}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => instanceRef.current?.next()}
          className="arrow right-arrow"
        >
          <ChevronRight size={48} />
        </button>
      </div>
    </section>
  );
};

export default Trending;