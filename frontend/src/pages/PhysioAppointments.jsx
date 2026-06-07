import { useEffect, useState } from "react";
import API from "../services/api";

function PhysioAppointments() {

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/appointments/physio-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.appointments);

    } catch (error) {

      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.put(
        `/appointments/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchAppointments();

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl text-cyan-400 font-bold text-center mb-10">
        Patient Appointments
      </h1>

      <div className="space-y-6">

        {appointments.map((appointment) => (

          <div
            key={appointment.id}
            className="bg-[#111] border border-cyan-400 p-6 rounded-xl"
          >

            <h2 className="text-2xl text-cyan-400 font-bold">
              {appointment.patient.name}
            </h2>

            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Status: {appointment.status}</p>

            <div className="flex gap-4 mt-4">

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "ACCEPTED"
                  )
                }
                className="bg-green-500 px-5 py-2 rounded-xl"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "REJECTED"
                  )
                }
                className="bg-red-500 px-5 py-2 rounded-xl"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default PhysioAppointments;