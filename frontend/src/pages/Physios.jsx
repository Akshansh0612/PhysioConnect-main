import { useEffect, useState } from "react";

import API from "../services/api";

function Physios() {

  const [physios, setPhysios] = useState([]);

  const getPhysios = async () => {

    try {

      const res = await API.get("/physio/all");

      setPhysios(res.data.physios);

      console.log(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getPhysios();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10 text-center">
        Explore Physiotherapists
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {physios.map((physio) => (

          <div
            key={physio.id}
            className="bg-[#111] border border-cyan-400 rounded-2xl p-6 shadow-xl hover:scale-105 transition duration-300"
          >

            <h2 className="text-3xl font-bold text-cyan-400 mb-4">
              {physio.user.name}
            </h2>

            <p className="text-gray-300 mb-2">
              Specialization:
              <span className="text-white">
                {" "} {physio.specialization}
              </span>
            </p>

            <p className="text-gray-300 mb-2">
              Experience:
              <span className="text-white">
                {" "} {physio.experience} years
              </span>
            </p>

            <p className="text-gray-300 mb-2">
              Fees:
              <span className="text-white">
                {" "} ₹{physio.fees}
              </span>
            </p>

            <p className="text-gray-300 mb-6">
              Location:
              <span className="text-white">
                {" "} {physio.location}
              </span>
            </p>

            <button
              className="w-full bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
              Book Appointment
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Physios;