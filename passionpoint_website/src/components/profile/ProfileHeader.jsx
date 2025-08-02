import React, { useState } from "react";

const ProfileHeader = () => {
  const [banner, setBanner] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const username = "username_placeholder"; // Replace with actual username logic

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-full h-64 bg-gray-300 rounded-b-lg overflow-hidden">
      {/* Banner Image */}
      <img
        src={banner || "/images/default-banner.jpg"} // Placeholder path
        alt="Banner"
        className="object-cover w-full h-full"
      />

      {/* Upload Banner */}
      <label className="absolute top-4 right-4 bg-white text-sm px-3 py-1 rounded shadow cursor-pointer">
        Change Banner
        <input
          type="file"
          accept="image/*"
          onChange={handleBannerUpload}
          className="hidden"
        />
      </label>

      {/* Profile Picture */}
      <div className="absolute left-6 -bottom-12">
        <div className="relative w-24 h-24">
          <img
            src={profilePic || "/images/default-profile.jpg"} // Placeholder path
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
          />

          {/* Upload Profile Pic */}
          <label className="absolute bottom-0 right-0 bg-white px-1 py-0.5 text-xs rounded-full shadow cursor-pointer">
            ✏️
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Username */}
      <div className="absolute bottom-2 left-36 text-white text-xl font-semibold drop-shadow-lg">
        @{username}
      </div>
    </div>
  );
};

export default ProfileHeader;
