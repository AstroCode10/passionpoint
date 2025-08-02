import React, { useState } from "react";

const AboutMe = () => {
  const [aboutMe, setAboutMe] = useState("This is a short bio about me...");
  const [editing, setEditing] = useState(false);
  const [tempBio, setTempBio] = useState(aboutMe);

  const maxChars = 150;

  const handleSave = () => {
    setAboutMe(tempBio);
    setEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-20 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div>
          <textarea
            value={tempBio}
            onChange={(e) =>
              e.target.value.length <= maxChars && setTempBio(e.target.value)
            }
            rows={3}
            className="w-full p-2 border rounded text-sm"
            placeholder="Describe yourself in 150 characters or less"
          />

          <div className="text-right text-xs text-gray-500 mt-1">
            {tempBio.length}/{maxChars} characters
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setEditing(false)}
              className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-sm">{aboutMe}</p>
      )}
    </div>
  );
};

export default AboutMe;
