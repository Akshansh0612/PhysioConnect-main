import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function CreateProfile() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    fees: "",
    location: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/physio/create-profile",
        {
          specialization: formData.specialization,
          experience: Number(formData.experience),
          fees: Number(formData.fees),
          location: formData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile created successfully");

      console.log(res.data);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">

      <div className="w-full max-w-lg bg-[#111] p-8 rounded-2xl border border-cyan-400 shadow-2xl">

        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8">
          Create Physio Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <input
            type="number"
            name="fees"
            placeholder="Fees"
            value={formData.fees}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            className="bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Create Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateProfile;