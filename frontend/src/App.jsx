import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Physios from "./pages/Physios";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import MyProfile from "./pages/MyProfile";

import ProtectedRoute from "./routes/ProtectedRoute";
import MyAppointments from "./pages/MyAppointments";
import PhysioAppointments from "./pages/PhysioAppointments";
function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/physios" element={<Physios />} />

          <Route
  path="/my-appointments"
  element={
    <ProtectedRoute>
      <MyAppointments />
    </ProtectedRoute>
  }
/>

<Route
  path="/physio-appointments"
  element={
    <ProtectedRoute>
      <PhysioAppointments />
    </ProtectedRoute>
  }
/>

          <Route
            path="/create-profile"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;