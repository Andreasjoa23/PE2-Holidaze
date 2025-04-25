// src/components/homepage/HeroBanner.tsx

import HeroBannerImg from "../../assets/HeroImg.png";
const HeroBanner = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white">
      {/* Left: Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0E1E34]">
          Welcome to Holidaze
        </h1>
        <p className="text-gray-700">
          Find your place in the world – whether it’s a seaside cabin, a mountain escape, or a city stay.
          With Holidaze, every journey starts with a space that feels like yours.
        </p>
        <p className="text-gray-700">
          Create an account to unlock exclusive stays and start planning your next adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-[#0E1E34] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1d2d50] transition">
            Become a dazer
          </button>
          <button className="border border-[#0E1E34] text-[#0E1E34] px-6 py-3 rounded-full font-semibold hover:bg-[#0E1E34] hover:text-white transition">
            Explore properties
          </button>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <img
          src={HeroBannerImg}
          alt="City travelers"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default HeroBanner;