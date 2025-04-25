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

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      origin: "center",
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 8 },
      },
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
    <section className="py-12 px-4">
      <h2 className="text-7xl text-center text-[#0E1E34] mb-20">Trending stays</h2>
      <div className="relative flex items-center justify-center">
        <button onClick={() => instanceRef.current?.prev()} className="arrow left-arrow">
          <ChevronLeft size={40} />
        </button>

        <div ref={sliderRef} className="keen-slider w-full max-w-6xl">
          {venues.map((venue, index) => (
            <div
              key={venue.id}
              className={`keen-slider__slide slide-card ${index === currentSlide ? "active" : ""}`}
            >
              <div className="card-container">
                <div className="image-wrapper">
                  <img
                    className="venue-img"
                    src={venue.media?.[0]?.url || "fallback.jpg"}
                    alt={venue.media?.[0]?.alt || venue.name}
                  />
                  <button className="overlay-button">See Property</button>
                </div>
                <p className="venue-title">{venue.name}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => instanceRef.current?.next()} className="arrow right-arrow">
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="dots-container mt-6">
        {venues.slice(0, 10).map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`dot ${currentSlide === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Trending;
