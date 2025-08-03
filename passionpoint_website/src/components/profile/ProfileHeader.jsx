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
    <div className="relative">
      {/* Banner Image */}
      <img
        src={banner || "/images/banner.png"} // Placeholder path
        alt="Banner"
        className="w-full h-48 object-cover rounded-b-lg"
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
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
          <img
            src={profilePic || "/images/profile-pic.png"} // Placeholder path
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />

          {/* Upload Profile Pic */}
          <label className="absolute top-0 right-0 bg-white px-1 py-0.5 text-xs rounded-full shadow cursor-pointer">
            ✏️
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              className="hidden"
            />
          </label>
          <span className="text-white font-semibold mt-2">@{username}</span>
        </div>
      </div>
  );
};

export default ProfileHeader;
