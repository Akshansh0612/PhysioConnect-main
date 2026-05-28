import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center text-white px-6">

      <h1 className="text-6xl md:text-7xl font-bold text-center leading-tight">
        Connect With The Best
        <span className="text-cyan-400"> Physiotherapists</span>
      </h1>

      <p className="text-gray-400 text-center mt-6 max-w-2xl text-lg">
        Book appointments with trusted physiotherapists,
        manage sessions, and recover smarter with PhysioConnect.
      </p>

      <div className="flex gap-6 mt-10">
        <button
          onClick={() => navigate("/signup")}
          className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/physios")}
          className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition duration-300"
        >
          Explore Physios
        </button>
      </div>

    </div>
  );
}

export default Home;