// pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");

  // Smooth scroll helper
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Track which section is visible
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Reusable fade-in animation
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative w-full text-white scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInVariant}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-xl">
            Welcome to PassionPoint!
          </h1>
          <p className="mt-4 text-xl md:text-2xl max-w-xl mx-auto drop-shadow-lg">
            A space where students spark ideas, explore passions, and build
            something bigger - together.
          </p>
          <div className="mt-10">
            <Button className="text-lg px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 rounded-2xl shadow-lg">
              Join the Community
            </Button>
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gray-900 px-6"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInVariant}
          className="max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="mt-4 text-lg text-gray-300">
            PassionPoint is built for curious minds. We bring together students
            from across the world to share ideas, collaborate on projects, and
            spark innovation that lasts beyond the classroom.
          </p>
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center bg-gray-800 px-6"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInVariant}
          className="w-full max-w-xl text-center"
        >
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-300">
            Got a question, an idea, or just want to say hi? We’d love to hear
            from you.
          </p>

          {/* Contact Form */}
          <form className="mt-8 space-y-4 text-left">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            ></textarea>
            <Button className="w-full bg-white text-black font-semibold hover:bg-gray-200 rounded-lg py-2">
              Send Message
            </Button>
          </form>

          {/* Join Our Team */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold">Want to join our team?</h3>
            <p className="mt-2 text-gray-300">
              We’re always looking for driven students to help us grow this
              community. Apply below!
            </p>

            {/* Join Our Team Form */}
            <form className="mt-6 space-y-4 text-left">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Role you’re applying for"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <textarea
                placeholder="Your experience in this role"
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              ></textarea>
              <Button className="w-full bg-white text-black font-semibold hover:bg-gray-200 rounded-lg py-2">
                Apply Now
              </Button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Vertical Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-10">
        <button
          onClick={() => scrollToSection("hero")}
          className={`w-4 h-4 rounded-full transition transform hover:scale-125 ${
            activeSection === "hero" ? "bg-white" : "bg-gray-500"
          }`}
        ></button>
        <button
          onClick={() => scrollToSection("about")}
          className={`w-4 h-4 rounded-full transition transform hover:scale-125 ${
            activeSection === "about" ? "bg-white" : "bg-gray-500"
          }`}
        ></button>
        <button
          onClick={() => scrollToSection("contact")}
          className={`w-4 h-4 rounded-full transition transform hover:scale-125 ${
            activeSection === "contact" ? "bg-white" : "bg-gray-500"
          }`}
        ></button>
      </div>
    </div>
  );
}



