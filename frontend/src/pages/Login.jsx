import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", formData);

      // Store token
      localStorage.setItem("token", res.data.token);

      // Store user role
      localStorage.setItem("role", res.data.user.role);

      alert("Login successful");

      console.log(res.data);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-black px-4">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-2xl border border-cyan-400">

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

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

          <button
            type="submit"
            className="bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;