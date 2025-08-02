// pages/ProfilePage.jsx
import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import AboutMe from "../components/profile/AboutMe";
import SocialLinks from "../components/profile/SocialLinks";
import LogoutButton from "../components/profile/LogoutButton";
import SettingsButton from "../components/profile/SettingsModal";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <ProfileHeader />

      <div className="max-w-4xl mx-auto p-6">
        <AboutMe />
        <SocialLinks />

        <div className="mt-6 flex gap-4 justify-end">
          <SettingsButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
