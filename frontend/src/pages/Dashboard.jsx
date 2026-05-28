import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    alert("Logged out");

    navigate("/login");
  };

  return (
    <div className="min-h-[90vh] bg-black text-white flex flex-col items-center justify-center px-4">

      <h1 className="text-5xl font-bold text-cyan-400 mb-6">
        Dashboard
      </h1>

      <p className="text-2xl mb-4">
        Welcome,
        <span className="text-cyan-400 font-semibold">
          {" "} {role}
        </span>
      </p>

      <p className="text-gray-400 mb-8 text-center">
        You are successfully logged into PhysioConnect 🚀
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-semibold transition duration-300"
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;