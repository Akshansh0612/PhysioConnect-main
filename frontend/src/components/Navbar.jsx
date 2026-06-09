import { Link } from "react-router-dom";

function Navbar() {

  const role = localStorage.getItem("role");

  return (
   <nav className="bg-black text-white px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-800">

      <h1 className="text-2xl font-bold text-cyan-400">
        PhysioConnect
      </h1>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">

        <Link
          to="/"
          className="hover:text-cyan-400 transition"
        >
          Home
        </Link>

        <Link
          to="/physios"
          className="hover:text-cyan-400 transition"
        >
          Physios
        </Link>

        {role === "PHYSIO" && (
          <Link
            to="/create-profile"
            className="hover:text-cyan-400 transition"
          >
            Create Profile
          </Link>
        )}

        <Link
          to="/dashboard"
          className="hover:text-cyan-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/login"
          className="hover:text-cyan-400 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="hover:text-cyan-400 transition"
        >
          Signup
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;