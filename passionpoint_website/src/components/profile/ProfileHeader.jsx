import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileHeader = () => {
  const [banner, setBanner] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("Loading...");

  const user = auth.currentUser;

  // Load user profile data from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || user.displayName || "anonymous");
        setProfilePic(data.profilePic || null);
        setBanner(data.banner || null);
      } else {
        // If no doc exists, create one
        await setDoc(userRef, {
          username: user.displayName || "new_user",
          profilePic: null,
          banner: null,
        });
        setUsername(user.displayName || "new_user");
      }
    };

    fetchProfile();
  }, [user]);

  // Upload helper
  const uploadFile = async (file, type) => {
    if (!user || !file) return null;

    const path = `users/${user.uid}/${type}.jpg`;
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { [type]: url }, { merge: true });

    return url;
  };

  // Banner Upload
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadFile(file, "banner");
      setBanner(url);
    }
  };

  // Profile Pic Upload
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadFile(file, "profilePic");
      setProfilePic(url);
    }
  };

  return (
    <div className="relative">
      {/* Banner Image */}
      <img
        src={banner || "/images/banner.png"}
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
        <div className="relative">
          <img
            src={profilePic || "/images/profile-pic.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
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
        <span className="text-white font-semibold mt-2">@{username}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;

