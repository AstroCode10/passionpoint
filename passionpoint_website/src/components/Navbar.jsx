import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Make sure auth is correctly exported

function Navbar() {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    const user = auth.currentUser;
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">PassionPoint</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleAccountClick} className="hover:underline">
          Account
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

