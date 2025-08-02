import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Import your pages
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Account from "./pages/Account"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  )
}

export default App