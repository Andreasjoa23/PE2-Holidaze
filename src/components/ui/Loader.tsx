import logo from "../../assets/logoHolidazeBlue.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0E1E34] flex items-center justify-center z-50">
      <img src={logo} alt="Loading..." className="w-28 h-28 animate-pulse" />
    </div>
  );
};

export default Loader;
