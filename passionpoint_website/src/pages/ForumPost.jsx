import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const ForumPost = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const [viewed, setViewed] = useState(false);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, "forumPosts", id);
      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPost(data);

        // Only increment views once per user
        const userId = user?.uid || "guest";
        if (!data.viewedBy?.includes(userId)) {
          await updateDoc(postRef, {
            views: increment(1),
            viewedBy: arrayUnion(userId), // track who viewed
          });
          setPost((prev) => ({
            ...prev,
            views: (prev.views || 0) + 1,
            viewedBy: [...(prev.viewedBy || []), userId],
          }));
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, user]);

  // Listen to comments subcollection
  useEffect(() => {
    const commentsRef = collection(db, "forumPosts", id, "comments");
    const q = query(commentsRef, orderBy("date", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(loadedComments);
    });

    return () => unsubscribe();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    try {
      // ✅ Fetch username from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const username = userDoc.exists() ? userDoc.data().username : "Anonymous";

      const commentsRef = collection(db, "forumPosts", id, "comments");

      await addDoc(commentsRef, {
        text: comment,
        authorId: user.uid,
        authorName: username,
        date: serverTimestamp(),
      });

      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!post) return <p className="p-4 text-center">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">
          By {post.authorName || "Anonymous"} •{" "}
          {post.date?.toDate().toLocaleString() || "Just now"}
        </p>
        <p className="mb-4">{post.content}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>👍 {post.likes || 0}</span>
          <span>👁️ {post.views || 0} views</span>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className="border-b pb-2">
            <p className="text-gray-800">{c.text}</p>
            <p className="text-sm text-gray-500">
              {c.authorName || "Anonymous"} •{" "}
              {c.date?.toDate()?.toLocaleString() || "Just now"}
            </p>
          </div>
        ))}

        {user && (
          <form onSubmit={handleAddComment} className="mt-4 space-y-2">
            <Textarea
              rows={3}
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <Button type="submit">Post Comment</Button>
          </form>
        )}
        {!user && <p className="text-gray-500">Log in to add a comment.</p>}
      </div>
    </div>
  );
};

export default ForumPost;



