import { useEffect, useState } from "react";
import API from "../services/api";

function Physios() {

  const [physios, setPhysios] = useState([]);
  const [selectedPhysio, setSelectedPhysio] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialization, setSpecialization] = useState("");
const [location, setLocation] = useState("");


  const [reviewPhysio, setReviewPhysio] = useState(null);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");

  const getPhysios = async () => {
    try {

      const res = await API.get("/physio/all");

      setPhysios(res.data.physios);

     console.log(JSON.stringify(res.data, null, 2));

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getPhysios();
  }, []);

  const searchPhysios = async () => {

  try {

    const res = await API.get(
      `/physio/search?specialization=${specialization}&location=${location}`
    );

    setPhysios(res.data.physios);

  } catch (error) {

    console.log(error);
  }
};

const resetSearch = () => {

  setSpecialization("");
  setLocation("");

  getPhysios();
};

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
      getPhysios();

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
    getPhysios();

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

      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">

  <input
    type="text"
    placeholder="Search by specialization"
    value={specialization}
    onChange={(e) => setSpecialization(e.target.value)}
    className="bg-[#111] border border-cyan-400 px-4 py-3 rounded-xl text-white"
  />

  <input
    type="text"
    placeholder="Search by location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="bg-[#111] border border-cyan-400 px-4 py-3 rounded-xl text-white"
  />

  <button
    onClick={searchPhysios}
    className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold"
  >
    Search
  </button>

  <button
    onClick={resetSearch}
    className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
  >
    Reset
  </button>

</div>

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
            <div className="mb-6">

  <h3 className="text-yellow-400 font-bold mb-2">
    Reviews
  </h3>

  {physio.user.reviewsReceived?.length > 0 ? (

    physio.user.reviewsReceived.map((review) => (

      <div
        key={review.id}
        className="bg-black border border-gray-700 rounded-lg p-3 mb-2"
      >

        <p className="text-yellow-400">
          ⭐ {review.rating}/5
        </p>

        <p className="text-white">
          {review.comment}
        </p>

        <p className="text-gray-400 text-sm">
          - {review.user.name}
        </p>

      </div>

    ))

  ) : (

    <p className="text-gray-500">
      No reviews yet
    </p>

  )}

</div>

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
{reviewPhysio && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

    <div className="bg-[#111] p-8 rounded-2xl border border-yellow-400 w-full max-w-md">

      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Add Review
      </h2>

      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full mb-4 px-4 py-3 bg-black border border-gray-700 rounded-xl"
      />

      <textarea
        placeholder="Write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full mb-6 px-4 py-3 bg-black border border-gray-700 rounded-xl"
      />

      <div className="flex gap-4">

        <button
          onClick={submitReview}
          className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-semibold"
        >
          Submit
        </button>

        <button
          onClick={() => setReviewPhysio(null)}
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