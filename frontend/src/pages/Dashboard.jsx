import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {

    const checkProfile = async () => {

      if (role !== "PHYSIO") return;

      try {

        const token = localStorage.getItem("token");

        await API.get("/physio/my-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileExists(true);

      } catch (error) {

        setProfileExists(false);
      }
    };

    checkProfile();

  }, [role]);

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

      {role === "PHYSIO" && !profileExists && (
        <button
          onClick={() => navigate("/create-profile")}
          className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 mb-6"
        >
          Create Profile
        </button>
      )}

      {role === "PHYSIO" && profileExists && (
        <button
          onClick={() => navigate("/my-profile")}
          className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 mb-6"
        >
          My Profile
        </button>
      )}

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