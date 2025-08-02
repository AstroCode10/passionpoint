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
    <nav className="bg-black p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="PassionPoint Logo" className="h-10 w-10" />
          <div className="text-2xl font-bold">PassionPoint</div>
      </div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleAccountClick}>
          Account
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

