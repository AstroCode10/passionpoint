import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Import your pages
import HomePage from "./pages/Home"
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <h1>Hello from App</h1>
      <Routes>
        <Route path="/" element={<h2>Home Route Works</h2>} />
        <Route path="/register" element={<h2>Register Page</h2>} />
      </Routes>
    </Router>
  )
}

export default App