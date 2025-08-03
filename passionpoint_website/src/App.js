import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Import your pages
import HomePage from "./pages/Home"
import Register from "./pages/Register"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Account from "./pages/Account"
import ResetPassword from "./pages/ResetPassword"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App