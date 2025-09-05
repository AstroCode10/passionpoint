// VerifyEmail.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Mail, RefreshCw } from "lucide-react";

export default function VerifyEmail() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResend = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setMessage("✅ Verification email re-sent! Check your inbox.");
      } catch (err) {
        setMessage("❌ Failed to resend email. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md">
        <Mail className="mx-auto mb-4 text-blue-400" size={48} />
        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
        <p className="text-gray-300 mb-4">
          We’ve sent a verification link to your email. <br />
          Please check your inbox and click the link to activate your account.
        </p>

        {message && <p className="text-sm text-green-400 mb-4">{message}</p>}

        <button
          onClick={handleResend}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
        >
          <RefreshCw size={18} /> Resend Email
        </button>

        <p className="text-sm text-gray-400 mt-6">
          Once verified,{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-300"
          >
            log in here →
          </button>
        </p>
      </div>
    </div>
  );
}
