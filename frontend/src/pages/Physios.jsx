import { useEffect, useState } from "react";
import API from "../services/api";

function Physios() {

  const [physios, setPhysios] = useState([]);
  const [selectedPhysio, setSelectedPhysio] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");


  const [reviewPhysio, setReviewPhysio] = useState(null);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");

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

  const bookAppointment = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/appointments/book",
        {
          physioId: selectedPhysio,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setSelectedPhysio(null);
      setDate("");
      setTime("");

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const submitReview = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await API.post(
      "/reviews/create",
      {
        physioId: reviewPhysio,
        rating: Number(rating),
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    setReviewPhysio(null);
    setRating("");
    setComment("");

  } catch (error) {

    console.log(error);

    alert(error.response?.data?.message || "Review failed");
  }
};

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
  onClick={() => setSelectedPhysio(physio.user.id)}
  className="w-full bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
>
  Book Appointment
</button>

<button
  onClick={() => setReviewPhysio(physio.user.id)}
  className="w-full mt-3 bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
>
  Add Review
</button>

          </div>
        ))}

      </div>

      {selectedPhysio && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-[#111] p-8 rounded-2xl border border-cyan-400 w-full max-w-md">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Book Appointment
            </h2>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-black border border-gray-700 rounded-xl"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full mb-6 px-4 py-3 bg-black border border-gray-700 rounded-xl"
            />

            <div className="flex gap-4">

              <button
                onClick={bookAppointment}
                className="flex-1 bg-cyan-400 text-black py-3 rounded-xl font-semibold"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedPhysio(null)}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Physios;