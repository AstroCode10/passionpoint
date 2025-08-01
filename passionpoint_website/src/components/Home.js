import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-cover bg-center text-white" style={{ backgroundImage: "url('/path-to-hero-image.jpg')" }}>
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md z-10">
        <div className="text-2xl font-bold">PassionPoint</div>
        <nav className="space-x-6 text-lg">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Blog</a>
          <a href="#" className="hover:text-gray-300">Forum</a>
          <a href="#" className="hover:text-gray-300">Account</a>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold max-w-3xl drop-shadow-xl"
        >
          Welcome to PassionPoint!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
          className="mt-4 text-xl md:text-2xl max-w-xl drop-shadow-lg"
        >
          A space where students spark ideas, explore passions, and build something bigger - together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.4 }}
          className="mt-10"
        >
          <a href="/register">
            <Button className="text-lg px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 rounded-2xl shadow-lg">
              Join the Community
            </Button>
          </a>
        </motion.div>
      </main>

      {/* Optional Vertical Dots Navigation */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-4 z-10">
        <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
        <div className="w-3 h-3 bg-white/50 rounded-full"></div>
        <div className="w-3 h-3 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
}
