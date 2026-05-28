import { useState } from "react";
import API from "../services/api";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/signup", formData);

      alert(res.data.message);

      console.log(res.data);

    } catch (error) {

      console.log(error);

      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-black px-4">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-2xl border border-cyan-400">

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-black border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400"
          >
            <option value="USER">User</option>
            <option value="PHYSIO">Physio</option>
          </select>

          <button
            type="submit"
            className="bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;