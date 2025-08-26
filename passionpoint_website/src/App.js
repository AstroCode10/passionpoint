import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Import your pages
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Account from "./pages/Account";
import ResetPassword from "./pages/ResetPassword"
import CreateBlogForm from "./components/blog/CreateBlogForm";
import Forum from "./pages/Forum";
import CreateForumPost from "./pages/CreateForumPost";
import ForumPost from "./pages/ForumPost";

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
        <Route path="/create-blog" element={<CreateBlogForm />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/create-forum" element={<CreateForumPost />} />
        <Route path="/forum/:id" element={<ForumPost />} />  {/* <-- dynamic post page */}
      </Routes>
    </Router>
  )
}

export default App