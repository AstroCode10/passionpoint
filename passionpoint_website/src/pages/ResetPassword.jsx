import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [oobCodeValid, setOobCodeValid] = useState(false);


  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
  if (!oobCode) return;

  const auth = getAuth();
  verifyPasswordResetCode(auth, oobCode)
    .then(() => setOobCodeValid(true))
    .catch(() => setError("Invalid or expired link."));
}, [oobCode]);

  const handleReset = async () => {
    if (!password) return setError("Password cannot be empty");
    const auth = getAuth();
    try {
      await confirmPasswordReset(auth, oobCode, password);
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

if (!oobCode) {
  return (
    <p className="p-8 text-center">
      Please open the password reset link from your email.
    </p>
  );
}

return (
  <div className="p-8 max-w-md mx-auto">
    <h2 className="text-2xl mb-4">Reset Password</h2>
    {error && <p className="text-red-500">{error}</p>}
    <input
      type="password"
      placeholder="New password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border p-2 mb-4 w-full"
    />
    <button
      onClick={handleReset}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Reset Password
    </button>
  </div>
);

};

export default ResetPassword;

