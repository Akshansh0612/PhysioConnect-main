function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center border-b border-gray-800">
      <h1 className="text-2xl font-bold text-cyan-400">
        PhysioConnect
      </h1>

      <div className="flex gap-6">
        <a href="/" className="hover:text-cyan-400 transition">
          Home
        </a>

        <a href="/physios" className="hover:text-cyan-400 transition">
          Physios
        </a>

        <a href="/login" className="hover:text-cyan-400 transition">
          Login
        </a>

        <a href="/signup" className="hover:text-cyan-400 transition">
          Signup
        </a>
      </div>
    </nav>
  );
}

export default Navbar;