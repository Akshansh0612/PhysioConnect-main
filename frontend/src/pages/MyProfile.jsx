import { useEffect, useState } from "react";
import API from "../services/api";

function MyProfile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/physio/my-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.profile);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  if (!profile) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-[#111] p-8 rounded-2xl border border-cyan-400 w-full max-w-lg">

        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          My Profile
        </h1>

        <p><strong>Name:</strong> {profile.user.name}</p>
        <p><strong>Email:</strong> {profile.user.email}</p>
        <p><strong>Specialization:</strong> {profile.specialization}</p>
        <p><strong>Experience:</strong> {profile.experience} Years</p>
        <p><strong>Fees:</strong> ₹{profile.fees}</p>
        <p><strong>Location:</strong> {profile.location}</p>

      </div>

    </div>
  );
}

export default MyProfile;