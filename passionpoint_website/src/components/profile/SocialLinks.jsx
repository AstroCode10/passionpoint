import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  github: FaGithub,
  facebook: FaFacebook,
  twitter: FaTwitter,
};

const defaultLinks = {
  instagram: "",
  linkedin: "",
  youtube: "",
  github: "",
  facebook: "",
  twitter: "",
};

const SocialLinks = () => {
  const [links, setLinks] = useState(defaultLinks);
  const [editing, setEditing] = useState(false);
  const [tempLinks, setTempLinks] = useState(defaultLinks);
  const [user, setUser] = useState(null);

  // Listen to auth and fetch links
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          const storedLinks = data.socialLinks || defaultLinks;
          setLinks(storedLinks);
          setTempLinks(storedLinks);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (platform, value) => {
    setTempLinks({ ...tempLinks, [platform]: value });
  };

  const handleSave = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        socialLinks: tempLinks,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    setLinks(tempLinks);
    setEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Social Links</h2>
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
        <div className="space-y-3">
          {Object.keys(iconMap).map((platform) => {
            const Icon = iconMap[platform];
            return (
              <div key={platform} className="flex items-center gap-2">
                <Icon className="text-xl text-gray-600" />
                <input
                  type="url"
                  placeholder={`Enter ${platform} URL`}
                  value={tempLinks[platform]}
                  onChange={(e) => handleChange(platform, e.target.value)}
                  className="w-full px-3 py-1 border rounded text-sm"
                />
              </div>
            );
          })}
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
        <div className="flex flex-wrap gap-4 mt-2">
          {Object.entries(links).map(([platform, url]) => {
            const Icon = iconMap[platform];
            return (
              url && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 text-xl"
                  title={platform}
                >
                  <Icon />
                </a>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;


