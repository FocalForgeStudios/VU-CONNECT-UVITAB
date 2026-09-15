/**
 * VU Connect - Firebase Firestore Service & Free-Tier Storage Optimizer
 * Project: aura-engine-499913
 * Database ID: ai-studio-vuconnect-16ba6134-1721-43c7-8df2-3bdc79b645b5
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Applet Credentials
const firebaseConfig = {
  projectId: "aura-engine-499913",
  appId: "1:843648622879:web:c778a58e3ec50cc04cd02a",
  apiKey: "AIzaSyA8UZYD4hFxe-PZDISA4ya3OFbS0gVLllY",
  authDomain: "aura-engine-499913.firebaseapp.com",
  storageBucket: "aura-engine-499913.firebasestorage.app",
  messagingSenderId: "843648622879",
  oAuthClientId: "843648622879-bfk4gnb0hk37j6iujh52ctjo8u6d5l1a.apps.googleusercontent.com"
};

// Initialize Firebase App
let app = null;
let db = null;
let isFirebaseReady = false;

try {
  app = initializeApp(firebaseConfig);
  // Attempt with specified named database ID, fallback to default if not partitioned
  try {
    db = getFirestore(app, "ai-studio-vuconnect-16ba6134-1721-43c7-8df2-3bdc79b645b5");
  } catch (e) {
    db = getFirestore(app);
  }
  isFirebaseReady = true;
  console.log("✓ Firebase & Firestore initialized successfully.");
} catch (err) {
  console.warn("Firebase initialization warning (falling back to local memory):", err);
}

const DEFAULT_STUDENT_AVATAR = "./images/scholar_female.jpg";

// -------------------------------------------------------------
// Free Tier Storage Optimizers & Safe Data Truncation Helpers
// -------------------------------------------------------------
function sanitizeText(text, maxLen = 300) {
  if (typeof text !== "string") return "";
  return text.trim().slice(0, maxLen);
}

function sanitizeAvatar(url) {
  if (!url || typeof url !== "string") {
    return DEFAULT_STUDENT_AVATAR;
  }
  // Free tier safeguard: reject huge data URLs (>20KB) to prevent storage exhaustion
  if (url.startsWith("data:") && url.length > 25000) {
    console.warn("Avatar payload exceeded 20KB limit, defaulting to standard vector.");
    return DEFAULT_STUDENT_AVATAR;
  }
  return url.slice(0, 500);
}

export const FirebaseService = {
  isReady() {
    return isFirebaseReady && db !== null;
  },

  // -----------------------------------------------------------
  // 1. User Profile Management
  // -----------------------------------------------------------
  async saveUser(user) {
    if (!this.isReady() || !user || !user.id) return null;
    try {
      const userRef = doc(db, "users", String(user.id));
      const payload = {
        id: String(user.id),
        name: sanitizeText(user.name, 80),
        email: sanitizeText(user.email, 100),
        university: "IATS",
        major: sanitizeText(user.major, 100) || "Computer Science & IT",
        year: sanitizeText(user.year, 50) || "Class of 2026",
        bio: sanitizeText(user.bio, 500),
        courses: Array.isArray(user.courses) ? user.courses.map(c => sanitizeText(c, 30)) : [],
        interests: Array.isArray(user.interests) ? user.interests.map(i => sanitizeText(i, 30)) : [],
        avatar: sanitizeAvatar(user.avatar),
        location: sanitizeText(user.location, 80) || "IATS Main Campus",
        updatedAt: new Date().toISOString()
      };
      await setDoc(userRef, payload, { merge: true });
      return payload;
    } catch (e) {
      console.warn("Firestore saveUser failed:", e);
      return null;
    }
  },

  // -----------------------------------------------------------
  // 2. Peer Matchmaking Candidates Stack
  // -----------------------------------------------------------
  subscribeMatchProfiles(onUpdate) {
    if (!this.isReady()) return () => {};
    try {
      const q = query(collection(db, "match_profiles"), limit(25));
      return onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        onUpdate(list);
      }, (err) => {
        console.warn("Firestore match_profiles listener error:", err);
      });
    } catch (e) {
      console.warn("subscribeMatchProfiles failed:", e);
      return () => {};
    }
  },

  async addMatchProfile(profile) {
    if (!this.isReady()) return null;
    try {
      const payload = {
        name: sanitizeText(profile.name, 80),
        major: sanitizeText(profile.major, 100),
        year: sanitizeText(profile.year, 50),
        university: "IATS",
        compatScore: profile.compatScore || Math.floor(82 + Math.random() * 16),
        bio: sanitizeText(profile.bio, 500),
        courses: Array.isArray(profile.courses) ? profile.courses.slice(0, 6) : ["CS 201"],
        interests: Array.isArray(profile.interests) ? profile.interests.slice(0, 6) : ["Study"],
        avatar: sanitizeAvatar(profile.avatar),
        location: sanitizeText(profile.location, 80) || "IATS Main Campus",
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "match_profiles"), payload);
      return { id: docRef.id, ...payload };
    } catch (e) {
      console.warn("addMatchProfile failed:", e);
      return null;
    }
  },

  // -----------------------------------------------------------
  // 3. Spontaneous Events & News (Formerly CatchUps)
  // -----------------------------------------------------------
  subscribeCatchups(onUpdate) {
    if (!this.isReady()) return () => {};
    try {
      const q = query(collection(db, "catchups"), limit(30));
      return onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        onUpdate(list);
      }, (err) => {
        console.warn("Firestore catchups listener error:", err);
      });
    } catch (e) {
      console.warn("subscribeCatchups failed:", e);
      return () => {};
    }
  },

  async addCatchup(catchup) {
    if (!this.isReady()) return null;
    try {
      const payload = {
        title: sanitizeText(catchup.title, 120),
        host: sanitizeText(catchup.host, 80),
        hostAvatar: sanitizeAvatar(catchup.hostAvatar),
        location: sanitizeText(catchup.location, 100),
        time: sanitizeText(catchup.time, 60),
        tag: sanitizeText(catchup.tag, 40) || "Academic Event",
        attendees: 1,
        maxAttendees: Math.min(Number(catchup.maxAttendees) || 8, 30),
        attendeeIds: catchup.hostId ? [String(catchup.hostId)] : [],
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "catchups"), payload);
      return { id: docRef.id, ...payload };
    } catch (e) {
      console.warn("addCatchup failed:", e);
      return null;
    }
  },

  async toggleCatchupAttendance(catchupId, userId, isJoining) {
    if (!this.isReady() || !catchupId) return false;
    try {
      const catchupRef = doc(db, "catchups", String(catchupId));
      if (isJoining) {
        await updateDoc(catchupRef, {
          attendees: increment(1),
          attendeeIds: arrayUnion(String(userId || "guest_user"))
        });
      } else {
        await updateDoc(catchupRef, {
          attendees: increment(-1),
          attendeeIds: arrayRemove(String(userId || "guest_user"))
        });
      }
      return true;
    } catch (e) {
      console.warn("toggleCatchupAttendance failed:", e);
      return false;
    }
  },

  // -----------------------------------------------------------
  // 4. Faculty & Guild Hub Discussions
  // -----------------------------------------------------------
  subscribeHubPosts(category, onUpdate) {
    if (!this.isReady()) return () => {};
    try {
      let q = query(collection(db, "hub_posts"), limit(30));
      return onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (!category || category === "all" || data.category === category) {
            list.push({ id: docSnap.id, ...data });
          }
        });
        onUpdate(list);
      }, (err) => {
        console.warn("Firestore hub_posts listener error:", err);
      });
    } catch (e) {
      console.warn("subscribeHubPosts failed:", e);
      return () => {};
    }
  },

  async addHubPost(post) {
    if (!this.isReady()) return null;
    try {
      const payload = {
        category: post.category || "tech",
        author: sanitizeText(post.author, 80),
        authorRole: sanitizeText(post.authorRole, 100),
        authorAvatar: sanitizeAvatar(post.authorAvatar),
        timeAgo: "Just now",
        title: sanitizeText(post.title, 150),
        content: sanitizeText(post.content, 1200),
        upvotes: 1,
        upvoterIds: post.authorId ? [String(post.authorId)] : [],
        commentsCount: 0,
        tags: Array.isArray(post.tags) ? post.tags.slice(0, 5).map(t => sanitizeText(t, 25)) : ["IATSConnect", "Course"],
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "hub_posts"), payload);
      return { id: docRef.id, ...payload };
    } catch (e) {
      console.warn("addHubPost failed:", e);
      return null;
    }
  },

  async togglePostUpvote(postId, userId, isUpvoting) {
    if (!this.isReady() || !postId) return false;
    try {
      const postRef = doc(db, "hub_posts", String(postId));
      if (isUpvoting) {
        await updateDoc(postRef, {
          upvotes: increment(1),
          upvoterIds: arrayUnion(String(userId || "guest_user"))
        });
      } else {
        await updateDoc(postRef, {
          upvotes: increment(-1),
          upvoterIds: arrayRemove(String(userId || "guest_user"))
        });
      }
      return true;
    } catch (e) {
      console.warn("togglePostUpvote failed:", e);
      return false;
    }
  },

  // -----------------------------------------------------------
  // 5. Peer Chat Channels & Live Messages
  // -----------------------------------------------------------
  subscribeConversations(onUpdate) {
    if (!this.isReady()) return () => {};
    try {
      const q = query(collection(db, "conversations"), limit(25));
      return onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        onUpdate(list);
      }, (err) => {
        console.warn("Firestore conversations listener error:", err);
      });
    } catch (e) {
      console.warn("subscribeConversations failed:", e);
      return () => {};
    }
  },

  async saveConversation(conv) {
    if (!this.isReady() || !conv) return null;
    try {
      const convId = String(conv.id || Date.now());
      const convRef = doc(db, "conversations", convId);
      const payload = {
        id: convId,
        name: sanitizeText(conv.name, 80),
        avatar: sanitizeAvatar(conv.avatar),
        status: conv.status || "online",
        major: sanitizeText(conv.major, 100),
        messages: Array.isArray(conv.messages) ? conv.messages.slice(-30).map(m => ({
          sender: m.sender === "me" ? "me" : "them",
          text: sanitizeText(m.text, 500),
          time: m.time || "Just now"
        })) : [],
        updatedAt: new Date().toISOString()
      };
      await setDoc(convRef, payload, { merge: true });
      return payload;
    } catch (e) {
      console.warn("saveConversation failed:", e);
      return null;
    }
  },

  async addMessage(convId, message) {
    if (!this.isReady() || !convId || !message) return false;
    try {
      const convRef = doc(db, "conversations", String(convId));
      const cleanMsg = {
        sender: message.sender === "me" ? "me" : "them",
        text: sanitizeText(message.text, 500),
        time: message.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      await updateDoc(convRef, {
        messages: arrayUnion(cleanMsg),
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.warn("addMessage failed:", e);
      return false;
    }
  }
};

// Export to window for vanilla JS application engine
if (typeof window !== "undefined") {
  window.FirebaseService = FirebaseService;
}
