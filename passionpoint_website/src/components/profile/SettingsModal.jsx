import React, { useState } from "react";
import { X } from "lucide-react";

const SettingsModal = ({ isOpen, onClose, onSave }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    if (!currentEmail || !newUsername || !newEmail || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword.length > 20) {
      alert("Password must not exceed 20 characters.");
      return;
    }

    // You can add backend validation logic here
    console.log("Settings saved.");
    onSave?.({
      currentEmail,
      newUsername,
      newEmail,
      newPassword,
    });
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Account Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              placeholder="Verify with current email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">New Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
            />
          </div>

          <div>
            <label className="text-sm font-medium">New Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Max 20 characters"
              maxLength={20}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
