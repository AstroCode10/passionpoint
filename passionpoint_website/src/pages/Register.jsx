// Register.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button.tsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // 🔹 Prevent logged-in users from registering again
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate(`/account`);
        } else {
          navigate("/verify-email");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 🔹 Check if email already exists
  const checkEmailExists = async (email) => {
    if (!email) return;
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError("This email is already registered.");
      } else {
        setEmailError("");
      }
    } catch (err) {
      console.error("Error checking email:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (emailError) {
      setError("Please use a different email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        role: "member",
        profilePic: null,
        banner: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 🔹 Send email verification
      await sendEmailVerification(user);

      // Go to verification page
      navigate("/verify-email");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">
      {/* Back button */}
      <Button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 space-x-2 flex items-center"
      >
        <ArrowLeft className="w-6 h-6 cursor-pointer" />
          Back to PassionPoint
      </Button>

      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => checkEmailExists(email)}
          required
        />
        {emailError && <p className="text-red-400 text-sm">{emailError}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}