/**
 * VU Connect - Core Engine & Interactive State Manager
 * Victoria University Student Hub with Frosted Liquid Glass UI (Red #D8232A & Blue #3A86C8)
 * Clean SVG-based icon system with dynamic local data persistence & real interactive testing.
 */

(function () {
  "use strict";

  // SVG Icon Templates
  const ICONS = {
    spark: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`,
    coffee: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
    pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    users: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    chat: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    upvote: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
    mail: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    star: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    cross: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
  };

  // Global Dynamic State Store
  const AppState = {
    currentUser: null, // Initialized from localStorage if exists
    activeView: "landing",
    generatedOTP: null,
    pendingEmail: null,
    otpTimer: null,
    otpSecondsRemaining: 60,
    currentMatchIndex: 0,
    activeChatId: null,
    activeHubCategory: "tech",
    
    // Dynamic lists (starts clean or from localStorage)
    matchProfiles: [],
    catchups: [],
    hubPosts: [],
    conversations: []
  };

  // Default Sample Data (Available only on explicit user request / seed button)
  const SAMPLE_DATA = {
    matchProfiles: [
      {
        id: 101,
        name: "Elena Namubiru",
        major: "Faculty of Science & Tech • BIT",
        year: "3rd Year (Class of 2026)",
        university: "Victoria University",
        compatScore: 96,
        bio: "Building distributed cloud apps and working on the VU Tech Innovation Hackathon. Looking for study partners in BIT 2101 & Algorithms.",
        courses: ["BIT 2101", "CS 204", "DATA 301"],
        interests: ["Cloud Architecture", "Hackathons", "Tech Innovation", "Robotics"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        location: "VU Main Campus • Innovation Lab Floor 3"
      },
      {
        id: 102,
        name: "Marcus Kigozi",
        major: "Faculty of Health Sciences • Nursing",
        year: "4th Year (Class of 2025)",
        university: "Victoria University",
        compatScore: 89,
        bio: "Clinical researcher and health tech advocate. Let's form an anatomy prep study group or grab coffee at the Jinja Road campus cafe.",
        courses: ["NURS 310", "BIO 202", "PUBH 401"],
        interests: ["Public Health", "Clinical Research", "Badminton", "Photography"],
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
        location: "Health Sciences Lab • 150m away"
      }
    ],
    catchups: [
      {
        id: 1,
        title: "BIT 2101 Algorithm Sprint & Coffee",
        host: "Elena Namubiru",
        hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        location: "VU Main Campus Innovation Hub (Floor 3)",
        time: "Today @ 2:30 PM",
        tag: "Study Group",
        attendees: 3,
        maxAttendees: 8,
        isJoined: false
      }
    ],
    hubPosts: [
      {
        id: 1,
        category: "tech",
        author: "David Mukasa",
        authorRole: "BIT 3rd Year • VU Tech Guild",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        timeAgo: "2 hours ago",
        title: "Victoria University Annual Innovation Hackathon — Teammates Wanted!",
        content: "Forming a 4-person team for the upcoming VU Tech Guild Hackathon. Looking for someone with frontend UI skills and someone in data analytics. Join us at the Innovation Lab!",
        upvotes: 18,
        hasUpvoted: false,
        commentsCount: 5,
        tags: ["VUHackathon", "BIT", "Innovation"]
      }
    ],
    conversations: [
      {
        id: 1,
        name: "Elena Namubiru",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        status: "online",
        major: "Science & Tech • BIT",
        unread: 0,
        messages: [
          { sender: "them", text: "Hello! Saw we connected on VU Connect!", time: "10:14 AM" }
        ]
      }
    ]
  };

  // ==========================================
  // Initialization & Local Storage Management
  // ==========================================
  function initApp() {
    loadPersistedData();
    renderNavigation();
    bindEvents();
    renderActiveView();
    updateUnreadBadge();
    initFirebaseSync();
  }

  function initFirebaseSync() {
    if (!window.FirebaseService || typeof window.FirebaseService.isReady !== "function") {
      setTimeout(initFirebaseSync, 300);
      return;
    }

    if (!window.FirebaseService.isReady()) {
      setTimeout(initFirebaseSync, 500);
      return;
    }

    // Real-time Cloud Firestore Matchmaking Candidates Listener
    window.FirebaseService.subscribeMatchProfiles((cloudProfiles) => {
      if (cloudProfiles && cloudProfiles.length > 0) {
        AppState.matchProfiles = cloudProfiles;
        persistData("vu_match_profiles", AppState.matchProfiles);
        if (AppState.activeView === "match" || AppState.activeView === "dashboard") {
          renderActiveView();
        }
      }
    });

    // Real-time Cloud Firestore CatchUps (Study Meetups) Listener
    window.FirebaseService.subscribeCatchups((cloudCatchups) => {
      if (cloudCatchups && cloudCatchups.length > 0) {
        AppState.catchups = cloudCatchups;
        persistData("vu_catchups", AppState.catchups);
        if (AppState.activeView === "catchup" || AppState.activeView === "dashboard") {
          renderActiveView();
        }
      }
    });

    // Real-time Cloud Firestore Faculty Hub Posts Listener
    window.FirebaseService.subscribeHubPosts(AppState.activeHubCategory, (cloudPosts) => {
      if (cloudPosts && cloudPosts.length > 0) {
        AppState.hubPosts = cloudPosts;
        persistData("vu_hub_posts", AppState.hubPosts);
        if (AppState.activeView === "hubs" || AppState.activeView === "dashboard") {
          renderActiveView();
        }
      }
    });

    // Real-time Cloud Firestore Direct Messages Listener
    window.FirebaseService.subscribeConversations((cloudConvs) => {
      if (cloudConvs && cloudConvs.length > 0) {
        AppState.conversations = cloudConvs;
        persistData("vu_conversations", AppState.conversations);
        if (!AppState.activeChatId && cloudConvs.length > 0) {
          AppState.activeChatId = cloudConvs[0].id;
        }
        if (AppState.activeView === "chats") {
          renderActiveView();
        }
        updateUnreadBadge();
      }
    });
  }

  function loadPersistedData() {
    try {
      const savedUser = localStorage.getItem("vu_connect_user");
      if (savedUser) AppState.currentUser = JSON.parse(savedUser);

      const savedMatches = localStorage.getItem("vu_match_profiles");
      if (savedMatches) AppState.matchProfiles = JSON.parse(savedMatches);

      const savedCatchups = localStorage.getItem("vu_catchups");
      if (savedCatchups) AppState.catchups = JSON.parse(savedCatchups);

      const savedPosts = localStorage.getItem("vu_hub_posts");
      if (savedPosts) AppState.hubPosts = JSON.parse(savedPosts);

      const savedChats = localStorage.getItem("vu_conversations");
      if (savedChats) {
        AppState.conversations = JSON.parse(savedChats);
        if (AppState.conversations.length > 0 && !AppState.activeChatId) {
          AppState.activeChatId = AppState.conversations[0].id;
        }
      }
    } catch (e) {
      console.warn("Storage access restricted, using in-memory state.");
    }
  }

  function persistData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to persist ${key}`, e);
    }
  }

  function saveSession(user) {
    AppState.currentUser = user;
    persistData("vu_connect_user", user);
    if (window.FirebaseService && typeof window.FirebaseService.saveUser === "function") {
      window.FirebaseService.saveUser(user);
    }
    renderNavigation();
  }

  function clearSession() {
    AppState.currentUser = null;
    try {
      localStorage.removeItem("vu_connect_user");
    } catch (e) {}
    renderNavigation();
    navigateTo("landing");
    showToast("Signed Out", "You are currently in guest preview mode.");
  }

  function seedSampleData() {
    AppState.matchProfiles = JSON.parse(JSON.stringify(SAMPLE_DATA.matchProfiles));
    AppState.catchups = JSON.parse(JSON.stringify(SAMPLE_DATA.catchups));
    AppState.hubPosts = JSON.parse(JSON.stringify(SAMPLE_DATA.hubPosts));
    AppState.conversations = JSON.parse(JSON.stringify(SAMPLE_DATA.conversations));
    AppState.currentMatchIndex = 0;
    if (AppState.conversations.length > 0) {
      AppState.activeChatId = AppState.conversations[0].id;
    }

    persistData("vu_match_profiles", AppState.matchProfiles);
    persistData("vu_catchups", AppState.catchups);
    persistData("vu_hub_posts", AppState.hubPosts);
    persistData("vu_conversations", AppState.conversations);

    renderActiveView();
    updateUnreadBadge();
    showToast("Sample Data Loaded", "Sample student profiles, catchups, and guild posts are now available for testing.");
  }

  function clearAllData() {
    AppState.matchProfiles = [];
    AppState.catchups = [];
    AppState.hubPosts = [];
    AppState.conversations = [];
    AppState.currentMatchIndex = 0;
    AppState.activeChatId = null;

    localStorage.removeItem("vu_match_profiles");
    localStorage.removeItem("vu_catchups");
    localStorage.removeItem("vu_hub_posts");
    localStorage.removeItem("vu_conversations");

    renderActiveView();
    updateUnreadBadge();
    showToast("All Data Cleared", "All student records, meetups, discussions, and chat messages have been reset.");
  }

  // ==========================================
  // Navigation & View Routing
  // ==========================================
  function navigateTo(viewId) {
    AppState.activeView = viewId;
    
    // Update bottom dock nav buttons and any nav-item-btn elements
    document.querySelectorAll(".dock-nav-btn, .nav-item-btn").forEach(btn => {
      if (btn.dataset.view === viewId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Hide all view sections and show target
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });
    
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
      targetSection.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    renderActiveView();
  }

  function renderActiveView() {
    switch (AppState.activeView) {
      case "dashboard":
        renderDashboardView();
        break;
      case "match":
        renderMatchView();
        break;
      case "catchup":
        renderCatchUpView();
        break;
      case "hubs":
        renderHubsView();
        break;
      case "chats":
        renderChatsView();
        break;
      case "profile":
        renderProfileView();
        break;
      default:
        // Landing view
        break;
    }
  }

  function renderNavigation() {
    const userContainer = document.getElementById("header-user-area");
    if (!userContainer) return;

    if (AppState.currentUser) {
      userContainer.innerHTML = `
        <div class="user-profile-pill" id="btn-header-profile" title="View Profile" style="cursor: pointer;">
          <img src="${AppState.currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}" class="user-avatar-sm" alt="User">
          <span style="font-weight: 700; font-size: 0.88rem; color: #1E293B;">${AppState.currentUser.name}</span>
          <span class="tag-pill tag-pill-highlight" style="font-size: 0.72rem; padding: 2px 8px;">VU Verified</span>
        </div>
        <button class="btn-liquid btn-glass btn-sm" id="btn-header-logout" title="Sign Out">
          <span>Sign Out</span>
        </button>
      `;
      const profBtn = document.getElementById("btn-header-profile");
      if (profBtn) profBtn.addEventListener("click", () => navigateTo("profile"));
      const logoutBtn = document.getElementById("btn-header-logout");
      if (logoutBtn) logoutBtn.addEventListener("click", clearSession);
    } else {
      userContainer.innerHTML = `
        <button class="btn-liquid btn-glass btn-sm" id="btn-open-system-tour" style="display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          <span>System Tour</span>
        </button>
        <button class="btn-liquid btn-primary btn-sm" id="btn-open-auth-modal">
          <span>Sign In / Verify</span>
        </button>
      `;
      const authBtn = document.getElementById("btn-open-auth-modal");
      if (authBtn) authBtn.addEventListener("click", openAuthModal);
      const tourBtn = document.getElementById("btn-open-system-tour");
      if (tourBtn) tourBtn.addEventListener("click", startSystemTour);
    }
  }

  function updateUnreadBadge() {
    const badge = document.getElementById("chat-unread-badge");
    if (!badge) return;
    const totalUnread = AppState.conversations.reduce((acc, c) => acc + (c.unread || 0), 0);
    if (totalUnread > 0) {
      badge.textContent = totalUnread;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  }

  // ==========================================
  // Auth Engine: Google Identity + Active Email OTP
  // ==========================================
  function openAuthModal() {
    const modal = document.getElementById("auth-modal-backdrop");
    if (modal) {
      modal.classList.add("open");
      showAuthStep("main");
    }
  }

  function closeAuthModal() {
    const modal = document.getElementById("auth-modal-backdrop");
    if (modal) modal.classList.remove("open");
    clearInterval(AppState.otpTimer);
  }

  function showAuthStep(step) {
    const stepMain = document.getElementById("auth-step-main");
    const stepOtp = document.getElementById("auth-step-otp");
    const stepSuccess = document.getElementById("auth-step-success");
    
    if (stepMain) stepMain.style.display = (step === "main") ? "block" : "none";
    if (stepOtp) stepOtp.style.display = (step === "otp") ? "block" : "none";
    if (stepSuccess) stepSuccess.style.display = (step === "success") ? "block" : "none";
  }

  function handleGoogleSignIn() {
    const googleUser = {
      id: "usr_vu_google_" + Math.random().toString(36).substring(2, 7),
      name: "Focal Forges",
      email: "focalforges@gmail.com",
      university: "Victoria University",
      major: "Faculty of Science & Tech • BIT",
      year: "Class of 2026",
      authProvider: "Google SSO (Verified)",
      isVerified: true,
      bio: "Active Victoria University scholar building modern liquid UI applications and distributed real-time systems.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      skills: ["Software Engineering", "Full-Stack", "Algorithms", "Cloud Systems"]
    };

    saveSession(googleUser);
    closeAuthModal();
    showToast("Google Account Verified", `Signed in securely as ${googleUser.email}.`);
    navigateTo("dashboard");
  }

  function handleEmailOTPRequest(e) {
    e.preventDefault();
    const emailInput = document.getElementById("auth-email-input");
    const email = emailInput ? emailInput.value.trim() : "";

    if (!email || !validateEmail(email)) {
      alert("Please enter a valid personal email address (e.g. name@gmail.com, name@outlook.com, etc.).");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    AppState.generatedOTP = code;
    AppState.pendingEmail = email;

    showAuthStep("otp");
    const sentDisplay = document.getElementById("otp-sent-email-display");
    if (sentDisplay) sentDisplay.textContent = email;

    startOtpCountdown();
    showInteractiveMailNotification(email, code);
  }

  function startOtpCountdown() {
    clearInterval(AppState.otpTimer);
    AppState.otpSecondsRemaining = 60;
    const timerElem = document.getElementById("otp-countdown-timer");
    const resendBtn = document.getElementById("btn-resend-otp");

    if (resendBtn) resendBtn.disabled = true;

    AppState.otpTimer = setInterval(() => {
      AppState.otpSecondsRemaining--;
      if (timerElem) timerElem.textContent = `${AppState.otpSecondsRemaining}s`;

      if (AppState.otpSecondsRemaining <= 0) {
        clearInterval(AppState.otpTimer);
        if (timerElem) timerElem.textContent = "Expired";
        if (resendBtn) resendBtn.disabled = false;
      }
    }, 1000);
  }

  function showInteractiveMailNotification(email, code) {
    const toast = document.createElement("div");
    toast.className = "live-toast-alert";
    toast.innerHTML = `
      <div style="color: #D8232A;">${ICONS.mail}</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #1E293B;">Email Verification Token Sent</div>
        <div style="font-size: 0.82rem; color: #475569; margin: 4px 0;">Security token sent to <b>${email}</b>:</div>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
          <span style="font-family: monospace; font-size: 1.1rem; font-weight: 800; background: #FEE2E2; color: #D8232A; padding: 2px 8px; border-radius: 6px; border: 1px solid #FECACA;">${code}</span>
          <button id="btn-autofill-otp" class="btn-liquid btn-primary btn-sm" style="padding: 4px 10px; font-size: 0.78rem;">Autofill Code</button>
        </div>
      </div>
      <button id="btn-close-otp-toast" style="background:none; border:none; color:#64748B; cursor:pointer; font-size:1.1rem;">✕</button>
    `;

    document.body.appendChild(toast);

    const autofillBtn = toast.querySelector("#btn-autofill-otp");
    if (autofillBtn) {
      autofillBtn.addEventListener("click", () => {
        fillOtpCode(code);
        toast.remove();
      });
    }

    const closeBtn = toast.querySelector("#btn-close-otp-toast");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => toast.remove());
    }

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 12000);
  }

  function fillOtpCode(code) {
    const inputs = document.querySelectorAll(".otp-digit-box");
    code.split("").forEach((digit, i) => {
      if (inputs[i]) inputs[i].value = digit;
    });
    verifyOtpCode();
  }

  function verifyOtpCode() {
    const inputs = document.querySelectorAll(".otp-digit-box");
    let enteredCode = "";
    inputs.forEach(input => enteredCode += input.value);

    if (enteredCode.length !== 6) {
      alert("Please enter the complete 6-digit verification code.");
      return;
    }

    if (enteredCode === AppState.generatedOTP) {
      clearInterval(AppState.otpTimer);
      const email = AppState.pendingEmail || "student@gmail.com";
      const namePart = email.split("@")[0].replace(/[\._]/g, " ");
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

      const verifiedUser = {
        id: "usr_vu_" + Math.random().toString(36).substring(2, 9),
        name: formattedName || "Victoria University Scholar",
        email: email,
        university: "Victoria University",
        major: "Faculty of Science & Technology",
        year: "Class of 2026",
        authProvider: "Personal Email OTP Verification",
        isVerified: true,
        bio: "Victoria University student connected on VU Connect via personal email.",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
        skills: ["Software Engineering", "Algorithms", "Campus Guild"]
      };

      saveSession(verifiedUser);
      showAuthStep("success");
      
      setTimeout(() => {
        closeAuthModal();
        showToast("Account Activated", `Welcome to VU Connect, ${verifiedUser.name}!`);
        navigateTo("dashboard");
      }, 1000);
    } else {
      alert("Invalid verification code. Please enter the token shown in the notification.");
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ==========================================
  // Dashboard Logic View
  // ==========================================
  function renderDashboardView() {
    const userBanner = document.getElementById("dash-user-welcome");
    if (userBanner && AppState.currentUser) {
      userBanner.textContent = `Welcome back, ${AppState.currentUser.name}!`;
    }

    // Render Quick CatchUps in Dashboard
    const quickCatchupList = document.getElementById("dash-catchup-preview");
    if (quickCatchupList) {
      if (AppState.catchups.length === 0) {
        quickCatchupList.innerHTML = `
          <div class="glass-panel" style="padding: 24px; text-align: center;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #1E293B; margin-bottom: 4px;">No Scheduled CatchUps</div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 12px;">Host a spontaneous study sprint or coffee meetup to kickstart campus activities.</p>
            <button class="btn-liquid btn-primary btn-sm" onclick="CampusApp.openHostCatchupModal()">
              <span>+ Host First CatchUp</span>
            </button>
          </div>
        `;
      } else {
        quickCatchupList.innerHTML = AppState.catchups.slice(0, 2).map(c => `
          <div class="glass-panel" style="padding: 16px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${c.hostAvatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="host">
              <div>
                <div style="font-weight: 700; font-size: 0.94rem; color: #1E293B;">${c.title}</div>
                <div style="font-size: 0.82rem; color: #64748B; display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                  ${ICONS.pin} <span>${c.location}</span> • <b>${c.time}</b>
                </div>
              </div>
            </div>
            <button class="btn-liquid ${c.isJoined ? 'btn-glass' : 'btn-primary'} btn-sm btn-join-catchup" data-id="${c.id}">
              ${c.isJoined ? "Joined ✓" : "Join"}
            </button>
          </div>
        `).join("");

        quickCatchupList.querySelectorAll(".btn-join-catchup").forEach(btn => {
          btn.addEventListener("click", () => toggleJoinCatchup(parseInt(btn.dataset.id)));
        });
      }
    }

    // Render Trending Discussions in Dashboard
    const dashHubPreview = document.getElementById("dash-hub-preview");
    if (dashHubPreview) {
      if (AppState.hubPosts.length === 0) {
        dashHubPreview.innerHTML = `
          <div class="glass-panel" style="padding: 24px; text-align: center;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #1E293B; margin-bottom: 4px;">No Guild Discussions Yet</div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 12px;">Share coursework notes or ask study questions in your faculty hub.</p>
            <button class="btn-liquid btn-primary btn-sm" onclick="CampusApp.openCreatePostModal()">
              <span>+ Create Discussion Post</span>
            </button>
          </div>
        `;
      } else {
        dashHubPreview.innerHTML = AppState.hubPosts.slice(0, 2).map(p => `
          <div class="glass-panel" style="padding: 16px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <img src="${p.authorAvatar}" style="width: 28px; height: 28px; border-radius: 50%;" alt="author">
                <span style="font-weight: 700; font-size: 0.85rem; color: #1E293B;">${p.author}</span>
              </div>
              <span class="tag-pill tag-pill-highlight" style="font-size: 0.75rem;">${p.category.toUpperCase()}</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; color: #1E293B;">${p.title}</div>
            <div style="font-size: 0.84rem; color: #475569; margin-bottom: 10px;">${p.content.substring(0, 110)}...</div>
            <div style="display: flex; align-items: center; gap: 14px; font-size: 0.8rem; color: #64748B;">
              <span style="color: #D8232A; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                ${ICONS.upvote} ${p.upvotes} Upvotes
              </span>
              <span style="display: flex; align-items: center; gap: 4px;">
                ${ICONS.chat} ${p.commentsCount} Discussions
              </span>
            </div>
          </div>
        `).join("");
      }
    }

    // Match radar status
    const radarText = document.getElementById("dash-match-radar-text");
    if (radarText) {
      const count = AppState.matchProfiles.length;
      if (count === 0) {
        radarText.innerHTML = "No candidate profiles in the stack yet. Tap <b>+ Profile</b> to add candidate students and test matchmaking.";
      } else {
        radarText.innerHTML = `You have <b>${count} candidate scholar${count > 1 ? 's' : ''}</b> ready in the matchmaking discovery stack.`;
      }
    }
  }

  // ==========================================
  // Matchmaking Engine Logic
  // ==========================================
  function renderMatchView() {
    const container = document.getElementById("match-card-container");
    if (!container) return;

    if (AppState.matchProfiles.length === 0) {
      container.innerHTML = `
        <div class="glass-panel" style="text-align: center; padding: 48px 24px; max-width: 580px; margin: 0 auto;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #FEE2E2; color: #D8232A; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            ${ICONS.heart}
          </div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #1E293B; margin-bottom: 8px;">No Match Profiles Yet</h3>
          <p style="color: #64748B; max-width: 420px; margin: 0 auto 24px auto;">
            The matchmaking stack is currently empty. You can add a student profile to test compatibility scoring, or load sample profiles.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn-liquid btn-primary" onclick="CampusApp.openCreateProfileModal()">
              <span>+ Add Student Profile</span>
            </button>
            <button class="btn-liquid btn-glass" onclick="CampusApp.seedSampleData()">
              <span>Load Sample Profiles</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    if (AppState.currentMatchIndex >= AppState.matchProfiles.length) {
      container.innerHTML = `
        <div class="glass-panel" style="text-align: center; padding: 48px 24px; max-width: 580px; margin: 0 auto;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #D1FAE5; color: #059669; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            ${ICONS.check}
          </div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #1E293B; margin-bottom: 8px;">You've Reviewed All Current Matches</h3>
          <p style="color: #64748B; max-width: 420px; margin: 0 auto 24px auto;">You can reset the stack to browse candidates again, or add a new profile.</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button id="btn-reset-match-stack" class="btn-liquid btn-primary">
              <span>Reset Discovery Stack</span>
            </button>
            <button class="btn-liquid btn-glass" onclick="CampusApp.openCreateProfileModal()">
              <span>+ Add New Candidate</span>
            </button>
          </div>
        </div>
      `;
      const resetBtn = document.getElementById("btn-reset-match-stack");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          AppState.currentMatchIndex = 0;
          renderMatchView();
        });
      }
      return;
    }

    const student = AppState.matchProfiles[AppState.currentMatchIndex];
    container.innerHTML = `
      <div class="glass-panel match-card-main">
        <div class="match-photo-holder">
          <img src="${student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}" alt="${student.name}" referrerpolicy="no-referrer">
          <div class="match-compat-chip">
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              ${ICONS.spark} ${student.compatScore || 92}% Compatibility
            </span>
          </div>
          <div class="match-photo-overlay">
            <h2 style="font-size: 1.8rem; font-weight: 800; line-height: 1.2;">${student.name}</h2>
            <div style="font-size: 0.95rem; opacity: 0.95; font-weight: 600;">${student.major} • ${student.year}</div>
            <div style="font-size: 0.82rem; opacity: 0.9; margin-top: 4px; display: flex; align-items: center; gap: 4px;">
              ${ICONS.pin} ${student.location}
            </div>
          </div>
        </div>

        <div class="match-body-content">
          <div style="font-size: 0.88rem; font-weight: 700; color: #D8232A; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Shared VU Courses</div>
          <div class="tag-list">
            ${(student.courses || []).map(c => `<span class="tag-pill tag-pill-highlight">${c}</span>`).join("")}
          </div>

          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-top: 14px; margin-bottom: 6px;">About & Goals</div>
          <p style="font-size: 0.92rem; color: #334155; line-height: 1.55;">${student.bio}</p>

          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-top: 14px; margin-bottom: 6px;">Interests & Focus</div>
          <div class="tag-list">
            ${(student.interests || []).map(i => `<span class="tag-pill tag-pill-blue">${i}</span>`).join("")}
          </div>
        </div>

        <div class="match-actions-bar">
          <button class="btn-round-action btn-pass" id="btn-match-pass" title="Pass" aria-label="Pass">
            ${ICONS.cross}
          </button>
          <button class="btn-round-action btn-super" id="btn-match-super" title="SuperConnect" aria-label="SuperConnect">
            ${ICONS.star}
          </button>
          <button class="btn-round-action btn-like" id="btn-match-like" title="Connect" aria-label="Connect">
            ${ICONS.heart}
          </button>
        </div>
      </div>
    `;

    const passBtn = document.getElementById("btn-match-pass");
    if (passBtn) passBtn.addEventListener("click", () => handleMatchAction("pass"));
    const likeBtn = document.getElementById("btn-match-like");
    if (likeBtn) likeBtn.addEventListener("click", () => handleMatchAction("like"));
    const superBtn = document.getElementById("btn-match-super");
    if (superBtn) superBtn.addEventListener("click", () => handleMatchAction("super"));
  }

  function handleMatchAction(action) {
    const student = AppState.matchProfiles[AppState.currentMatchIndex];
    if (!student) return;

    if (action === "like" || action === "super") {
      showMatchSuccessModal(student);
    } else {
      AppState.currentMatchIndex++;
      renderMatchView();
    }
  }

  function showMatchSuccessModal(student) {
    const modal = document.getElementById("match-success-modal");
    if (!modal) return;

    const nameElem = document.getElementById("match-modal-name");
    if (nameElem) nameElem.textContent = student.name;
    const avatarElem = document.getElementById("match-modal-avatar");
    if (avatarElem) avatarElem.src = student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
    modal.classList.add("open");

    const msgBtn = document.getElementById("btn-match-message-now");
    if (msgBtn) {
      msgBtn.onclick = () => {
        modal.classList.remove("open");
        AppState.currentMatchIndex++;
        startChatWithStudent(student);
      };
    }

    const keepBtn = document.getElementById("btn-match-keep-browsing");
    if (keepBtn) {
      keepBtn.onclick = () => {
        modal.classList.remove("open");
        AppState.currentMatchIndex++;
        renderMatchView();
      };
    }
  }

  function startChatWithStudent(student) {
    let conv = AppState.conversations.find(c => c.name === student.name);
    if (!conv) {
      conv = {
        id: Date.now(),
        name: student.name,
        avatar: student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        status: "online",
        major: student.major,
        unread: 0,
        messages: [
          { sender: "them", text: `Hello! Great to connect! We matched on ${student.courses && student.courses[0] ? student.courses[0] : 'VU Connect'}.`, time: "Just now" }
        ]
      };
      AppState.conversations.unshift(conv);
      persistData("vu_conversations", AppState.conversations);
    }
    AppState.activeChatId = conv.id;
    navigateTo("chats");
  }

  // Create Profile Modal
  function openCreateProfileModal() {
    const modal = document.getElementById("create-profile-modal");
    if (modal) modal.classList.add("open");
  }

  function closeCreateProfileModal() {
    const modal = document.getElementById("create-profile-modal");
    if (modal) modal.classList.remove("open");
  }

  function handleCreateProfile(e) {
    e.preventDefault();
    const name = document.getElementById("new-student-name").value.trim();
    const major = document.getElementById("new-student-major").value.trim();
    const year = document.getElementById("new-student-year").value.trim();
    const coursesStr = document.getElementById("new-student-courses").value.trim();
    const location = document.getElementById("new-student-location").value.trim();
    const bio = document.getElementById("new-student-bio").value.trim();
    const interestsStr = document.getElementById("new-student-interests").value.trim();

    if (!name || !major || !bio) {
      alert("Please fill in all required fields.");
      return;
    }

    const courses = coursesStr.split(",").map(c => c.trim()).filter(Boolean);
    const interests = interestsStr.split(",").map(i => i.trim()).filter(Boolean);

    const newStudent = {
      id: Date.now(),
      name,
      major,
      year: year || "Victoria University Scholar",
      university: "Victoria University",
      compatScore: Math.floor(82 + Math.random() * 16),
      bio,
      courses: courses.length ? courses : ["BIT 2101", "VU Core"],
      interests: interests.length ? interests : ["Collaborative Study", "Tech"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      location: location || "VU Main Campus"
    };

    AppState.matchProfiles.push(newStudent);
    persistData("vu_match_profiles", AppState.matchProfiles);

    if (window.FirebaseService && typeof window.FirebaseService.addMatchProfile === "function") {
      window.FirebaseService.addMatchProfile(newStudent);
    }

    closeCreateProfileModal();
    const form = document.getElementById("create-profile-form");
    if (form) form.reset();

    showToast("Profile Added", `${name} added to the matchmaking stack.`);
    renderMatchView();
  }

  // ==========================================
  // CatchUp Meetups Logic
  // ==========================================
  function renderCatchUpView() {
    const grid = document.getElementById("catchup-grid-container");
    if (!grid) return;

    if (AppState.catchups.length === 0) {
      grid.innerHTML = `
        <div class="glass-panel" style="grid-column: 1 / -1; text-align: center; padding: 48px 24px;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #EFF6FF; color: #3A86C8; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            ${ICONS.coffee}
          </div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #1E293B; margin-bottom: 8px;">No Active CatchUps</h3>
          <p style="color: #64748B; max-width: 440px; margin: 0 auto 20px auto;">
            Spontaneous meetups are pop-up revision sessions, coffee discussions, or campus hangouts. Host your first meetup below.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn-liquid btn-primary" onclick="CampusApp.openHostCatchupModal()">
              <span>+ Host First CatchUp</span>
            </button>
            <button class="btn-liquid btn-glass" onclick="CampusApp.seedSampleData()">
              <span>Load Sample CatchUp</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = AppState.catchups.map(c => `
      <div class="glass-panel catchup-card">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span class="tag-pill tag-pill-highlight">${c.tag}</span>
            <span style="font-size: 0.8rem; font-weight: 700; color: #D8232A; display: flex; align-items: center; gap: 4px;">
              ${ICONS.users} ${c.attendees}/${c.maxAttendees} Going
            </span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; line-height: 1.35; margin-bottom: 6px;">${c.title}</h3>
          <div class="catchup-meta" style="display: flex; align-items: center; gap: 4px; color: #64748B; font-size: 0.86rem; margin-bottom: 6px;">
            ${ICONS.pin} <span>${c.location}</span>
          </div>
          <div style="font-size: 0.86rem; color: #64748B; margin-bottom: 16px; display: flex; align-items: center; gap: 4px;">
            ${ICONS.clock} <b>${c.time}</b>
          </div>
        </div>

        <div class="catchup-attendees">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="${c.hostAvatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" alt="${c.host}">
            <span style="font-size: 0.82rem; font-weight: 500;">Host: <b>${c.host}</b></span>
          </div>
          <button class="btn-liquid ${c.isJoined ? 'btn-glass' : 'btn-primary'} btn-sm btn-catchup-toggle" data-id="${c.id}">
            ${c.isJoined ? "Leave Hangout" : "Join CatchUp"}
          </button>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll(".btn-catchup-toggle").forEach(btn => {
      btn.addEventListener("click", () => toggleJoinCatchup(parseInt(btn.dataset.id)));
    });
  }

  function toggleJoinCatchup(id) {
    const catchup = AppState.catchups.find(c => c.id === id);
    if (!catchup) return;

    if (catchup.isJoined) {
      catchup.isJoined = false;
      catchup.attendees--;
      if (window.FirebaseService && typeof window.FirebaseService.toggleCatchupAttendance === "function") {
        window.FirebaseService.toggleCatchupAttendance(id, AppState.currentUser ? AppState.currentUser.id : "guest", false);
      }
      showToast("Left CatchUp", `You left "${catchup.title}".`);
    } else {
      if (catchup.attendees >= catchup.maxAttendees) {
        alert("This meetup is currently at maximum capacity!");
        return;
      }
      catchup.isJoined = true;
      catchup.attendees++;
      if (window.FirebaseService && typeof window.FirebaseService.toggleCatchupAttendance === "function") {
        window.FirebaseService.toggleCatchupAttendance(id, AppState.currentUser ? AppState.currentUser.id : "guest", true);
      }
      showToast("Spot Confirmed", `You are attending "${catchup.title}".`);
    }

    persistData("vu_catchups", AppState.catchups);
    renderActiveView();
  }

  function openHostCatchupModal() {
    const hostModal = document.getElementById("host-catchup-modal");
    if (hostModal) hostModal.classList.add("open");
  }

  function closeHostCatchupModal() {
    const hostModal = document.getElementById("host-catchup-modal");
    if (hostModal) hostModal.classList.remove("open");
  }

  function handleCreateCatchup(e) {
    e.preventDefault();
    const title = document.getElementById("new-catchup-title") ? document.getElementById("new-catchup-title").value.trim() : "";
    const location = document.getElementById("new-catchup-location") ? document.getElementById("new-catchup-location").value.trim() : "";
    const time = document.getElementById("new-catchup-time") ? document.getElementById("new-catchup-time").value.trim() : "";
    const tag = document.getElementById("new-catchup-tag") ? document.getElementById("new-catchup-tag").value : "Study Group";
    const capacity = document.getElementById("new-catchup-capacity") ? (parseInt(document.getElementById("new-catchup-capacity").value) || 8) : 8;

    if (!title || !location || !time) {
      alert("Please fill out all required fields for your VU CatchUp.");
      return;
    }

    const hostName = AppState.currentUser ? AppState.currentUser.name : "Victoria University Scholar";
    const hostAvatar = AppState.currentUser ? AppState.currentUser.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

    const newCatchup = {
      id: Date.now(),
      title: title,
      host: hostName,
      hostAvatar: hostAvatar,
      location: location,
      time: time,
      tag: tag,
      attendees: 1,
      maxAttendees: capacity,
      isJoined: true
    };

    AppState.catchups.unshift(newCatchup);
    persistData("vu_catchups", AppState.catchups);

    if (window.FirebaseService && typeof window.FirebaseService.addCatchup === "function") {
      window.FirebaseService.addCatchup(newCatchup);
    }

    closeHostCatchupModal();
    const hostForm = document.getElementById("host-catchup-form");
    if (hostForm) hostForm.reset();
    showToast("CatchUp Hosted", `"${newCatchup.title}" is now published on the feed.`);
    renderCatchUpView();
  }

  // ==========================================
  // Campus Hubs & Discussion Logic
  // ==========================================
  function renderHubsView() {
    const listContainer = document.getElementById("hub-posts-list");
    if (!listContainer) return;

    const filtered = AppState.hubPosts.filter(p => {
      if (AppState.activeHubCategory === "all") return true;
      return p.category === AppState.activeHubCategory;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="glass-panel" style="text-align: center; padding: 48px 24px;">
          <div style="font-weight: 700; font-size: 1.1rem; color: #1E293B; margin-bottom: 6px;">No Discussions in this Faculty Channel</div>
          <p style="font-size: 0.88rem; color: #64748B; max-width: 420px; margin: 0 auto 20px auto;">
            Be the first to post lecture revision notes, questions, or project announcements in this guild hub.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn-liquid btn-primary btn-sm" onclick="CampusApp.openCreatePostModal()">
              <span>+ Post in This Channel</span>
            </button>
            <button class="btn-liquid btn-glass btn-sm" onclick="CampusApp.seedSampleData()">
              <span>Load Sample Post</span>
            </button>
          </div>
        </div>
      `;
    } else {
      listContainer.innerHTML = filtered.map(post => `
        <div class="glass-panel thread-post-card" style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${post.authorAvatar}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" alt="${post.author}">
              <div>
                <div style="font-weight: 700; font-size: 0.92rem; color: #1E293B;">${post.author}</div>
                <div style="font-size: 0.78rem; color: #64748B;">${post.authorRole} • ${post.timeAgo}</div>
              </div>
            </div>
            <span class="tag-pill tag-pill-highlight">${post.category.toUpperCase()}</span>
          </div>

          <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">${post.title}</h3>
          <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin-bottom: 14px;">${post.content}</p>

          <div class="tag-list" style="margin-bottom: 16px;">
            ${(post.tags || []).map(t => `<span class="tag-pill tag-pill-blue">#${t}</span>`).join("")}
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05);">
            <button class="btn-liquid btn-glass btn-sm btn-upvote-post" data-id="${post.id}" style="${post.hasUpvoted ? 'color: #D8232A; font-weight: 700; border-color: #FECACA;' : ''}">
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                ${ICONS.upvote} ${post.upvotes} Upvotes
              </span>
            </button>
            <span style="font-size: 0.82rem; color: #64748B; cursor: pointer; display: flex; align-items: center; gap: 4px;">
              ${ICONS.chat} ${post.commentsCount} Discussions
            </span>
          </div>
        </div>
      `).join("");

      listContainer.querySelectorAll(".btn-upvote-post").forEach(btn => {
        btn.addEventListener("click", () => toggleUpvotePost(parseInt(btn.dataset.id)));
      });
    }

    // Handle channel selection
    document.querySelectorAll(".hub-channel-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".hub-channel-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        AppState.activeHubCategory = btn.dataset.category;
        renderHubsView();
      };
    });
  }

  function toggleUpvotePost(id) {
    const post = AppState.hubPosts.find(p => p.id === id);
    if (!post) return;

    if (post.hasUpvoted) {
      post.hasUpvoted = false;
      post.upvotes--;
      if (window.FirebaseService && typeof window.FirebaseService.togglePostUpvote === "function") {
        window.FirebaseService.togglePostUpvote(id, AppState.currentUser ? AppState.currentUser.id : "guest", false);
      }
    } else {
      post.hasUpvoted = true;
      post.upvotes++;
      if (window.FirebaseService && typeof window.FirebaseService.togglePostUpvote === "function") {
        window.FirebaseService.togglePostUpvote(id, AppState.currentUser ? AppState.currentUser.id : "guest", true);
      }
    }
    persistData("vu_hub_posts", AppState.hubPosts);
    renderHubsView();
  }

  function openCreatePostModal() {
    const modal = document.getElementById("create-post-modal");
    if (modal) modal.classList.add("open");
  }

  function closeCreatePostModal() {
    const modal = document.getElementById("create-post-modal");
    if (modal) modal.classList.remove("open");
  }

  function handleCreatePost(e) {
    e.preventDefault();
    const channel = document.getElementById("new-post-channel").value;
    const title = document.getElementById("new-post-title").value.trim();
    const content = document.getElementById("new-post-content").value.trim();
    const tagsStr = document.getElementById("new-post-tags").value.trim();

    if (!title || !content) {
      alert("Please enter title and content.");
      return;
    }

    const tags = tagsStr.split(",").map(t => t.trim().replace(/^#/, "")).filter(Boolean);
    const author = AppState.currentUser ? AppState.currentUser.name : "Victoria University Scholar";
    const authorRole = AppState.currentUser ? (AppState.currentUser.major || "VU Scholar") : "Victoria University";
    const authorAvatar = AppState.currentUser ? AppState.currentUser.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

    const newPost = {
      id: Date.now(),
      category: channel,
      author,
      authorRole,
      authorAvatar,
      timeAgo: "Just now",
      title,
      content,
      upvotes: 1,
      hasUpvoted: true,
      commentsCount: 0,
      tags: tags.length ? tags : ["VUConnect"]
    };

    AppState.hubPosts.unshift(newPost);
    persistData("vu_hub_posts", AppState.hubPosts);

    if (window.FirebaseService && typeof window.FirebaseService.addHubPost === "function") {
      window.FirebaseService.addHubPost(newPost);
    }

    closeCreatePostModal();
    const form = document.getElementById("create-post-form");
    if (form) form.reset();

    showToast("Post Published", "Your discussion is live on the faculty feed.");
    renderHubsView();
  }

  // ==========================================
  // Real-Time Chat Engine Logic
  // ==========================================
  function renderChatsView() {
    const threadsList = document.getElementById("chat-threads-container");
    const messagesWindow = document.getElementById("chat-messages-container");
    const activeHeader = document.getElementById("chat-active-peer-header");

    if (!threadsList || !messagesWindow) return;

    if (AppState.conversations.length === 0) {
      threadsList.innerHTML = `
        <div style="text-align: center; padding: 24px 12px; color: #64748B; font-size: 0.88rem;">
          No active conversations yet.
          <button class="btn-liquid btn-primary btn-sm" style="margin-top: 12px; width: 100%;" onclick="CampusApp.openNewChatModal()">
            <span>+ Start New Chat</span>
          </button>
        </div>
      `;

      if (activeHeader) {
        activeHeader.innerHTML = `
          <div style="font-weight: 700; color: #64748B; font-size: 0.95rem;">No Chat Selected</div>
        `;
      }

      messagesWindow.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: #64748B;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: #EFF6FF; color: #3A86C8; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
            ${ICONS.chat}
          </div>
          <div style="font-weight: 700; font-size: 1.1rem; color: #1E293B; margin-bottom: 4px;">Direct & Group Messaging</div>
          <p style="font-size: 0.88rem; max-width: 360px; margin: 0 auto 16px auto;">
            Connect directly with fellow Victoria University students, form study circles, and collaborate.
          </p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn-liquid btn-primary btn-sm" onclick="CampusApp.openNewChatModal()">
              <span>Start New Chat</span>
            </button>
            <button class="btn-liquid btn-glass btn-sm" onclick="CampusApp.seedSampleData()">
              <span>Load Sample Chat</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    const activeConv = AppState.conversations.find(c => c.id === AppState.activeChatId) || AppState.conversations[0];
    if (activeConv) AppState.activeChatId = activeConv.id;

    // Render Left Sidebar Threads
    threadsList.innerHTML = AppState.conversations.map(c => `
      <div class="chat-thread-item ${c.id === activeConv.id ? 'active' : ''}" data-id="${c.id}">
        <img src="${c.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;" alt="${c.name}">
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="font-weight: 700; font-size: 0.92rem; color: #1E293B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
            ${c.unread ? `<span class="nav-badge">${c.unread}</span>` : ''}
          </div>
          <div style="font-size: 0.8rem; color: #64748B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${c.messages && c.messages.length > 0 ? c.messages[c.messages.length - 1].text : 'No messages yet'}
          </div>
        </div>
      </div>
    `).join("");

    threadsList.querySelectorAll(".chat-thread-item").forEach(item => {
      item.addEventListener("click", () => {
        AppState.activeChatId = parseInt(item.dataset.id);
        const selected = AppState.conversations.find(c => c.id === AppState.activeChatId);
        if (selected) {
          selected.unread = 0;
          persistData("vu_conversations", AppState.conversations);
          updateUnreadBadge();
        }
        renderChatsView();
      });
    });

    // Render Active Header
    if (activeHeader && activeConv) {
      activeHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${activeConv.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="${activeConv.name}">
          <div>
            <div style="font-weight: 700; font-size: 1rem; color: #1E293B;">${activeConv.name}</div>
            <div style="font-size: 0.8rem; color: #059669; display: flex; align-items: center; gap: 5px;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #059669; display: inline-block;"></span>
              ${activeConv.status || 'online'}
            </div>
          </div>
        </div>
      `;
    }

    // Render Messages
    if (activeConv) {
      messagesWindow.innerHTML = (activeConv.messages || []).map(msg => `
        <div class="message-bubble ${msg.sender === 'me' ? 'msg-outgoing' : 'msg-incoming'}">
          <div>${msg.text}</div>
          <div style="font-size: 0.72rem; opacity: 0.75; text-align: right; margin-top: 4px;">${msg.time}</div>
        </div>
      `).join("");

      messagesWindow.scrollTop = messagesWindow.scrollHeight;
    }
  }

  function handleSendMessage(e) {
    e.preventDefault();
    const input = document.getElementById("chat-input-message");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    let activeConv = AppState.conversations.find(c => c.id === AppState.activeChatId);
    if (!activeConv) {
      if (AppState.conversations.length === 0) {
        activeConv = {
          id: Date.now(),
          name: "Victoria University Peer",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          status: "online",
          major: "Science & Tech",
          unread: 0,
          messages: []
        };
        AppState.conversations.push(activeConv);
        AppState.activeChatId = activeConv.id;
      } else {
        activeConv = AppState.conversations[0];
        AppState.activeChatId = activeConv.id;
      }
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    activeConv.messages.push({
      sender: "me",
      text: text,
      time: timeStr
    });

    persistData("vu_conversations", AppState.conversations);
    input.value = "";
    renderChatsView();

    if (window.FirebaseService && typeof window.FirebaseService.addMessage === "function") {
      window.FirebaseService.addMessage(activeConv.id, { sender: "me", text: text, time: timeStr });
    }

    // Automated Interactive Reply for test messaging
    setTimeout(() => {
      const replies = [
        "Sounds like a great plan! Let's meet up at the VU Innovation Lab.",
        "Awesome! I'll review those lecture notes right now.",
        "Thanks for reaching out! Let me know when you're heading to the library.",
        "Perfect! Looking forward to collaborating on our VU coursework."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      activeConv.messages.push({
        sender: "them",
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      persistData("vu_conversations", AppState.conversations);
      renderChatsView();
    }, 1200);
  }

  function openNewChatModal() {
    const modal = document.getElementById("new-chat-modal");
    if (modal) modal.classList.add("open");
  }

  function closeNewChatModal() {
    const modal = document.getElementById("new-chat-modal");
    if (modal) modal.classList.remove("open");
  }

  function handleCreateChat(e) {
    e.preventDefault();
    const recipient = document.getElementById("new-chat-recipient").value.trim();
    const faculty = document.getElementById("new-chat-faculty").value.trim();
    const firstMsg = document.getElementById("new-chat-first-msg").value.trim();

    if (!recipient || !firstMsg) {
      alert("Please fill in the recipient name and initial message.");
      return;
    }

    const newConv = {
      id: Date.now(),
      name: recipient,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      status: "online",
      major: faculty || "Victoria University",
      unread: 0,
      messages: [
        { sender: "me", text: firstMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };

    AppState.conversations.unshift(newConv);
    AppState.activeChatId = newConv.id;
    persistData("vu_conversations", AppState.conversations);

    if (window.FirebaseService && typeof window.FirebaseService.saveConversation === "function") {
      window.FirebaseService.saveConversation(newConv);
    }

    closeNewChatModal();
    const form = document.getElementById("new-chat-form");
    if (form) form.reset();

    showToast("Chat Started", `Conversation with ${recipient} created.`);
    navigateTo("chats");
  }

  // ==========================================
  // Student Profile Logic View
  // ==========================================
  function renderProfileView() {
    const user = AppState.currentUser || {
      name: "Victoria University Scholar",
      university: "Victoria University",
      major: "Faculty of Science & Technology • BIT",
      year: "3rd Year (Class of 2026)",
      bio: "Liquid glass UI builder & distributed systems explorer at Victoria University. Connect with me for hackathons and group revisions!",
      skills: ["Software Engineering", "Algorithms", "Cloud Architecture", "Liquid UI", "TypeScript"],
      authProvider: "Guest Session (Preview)"
    };

    const container = document.getElementById("profile-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-panel" style="padding: 32px; max-width: 680px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap;">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}" style="width: 88px; height: 88px; border-radius: 50%; object-fit: cover; border: 3px solid #D8232A; box-shadow: 0 4px 16px rgba(216,35,42,0.15);" alt="${user.name}">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.6rem; font-weight: 800; color: #1E293B;">${user.name}</h2>
              <span class="tag-pill tag-pill-highlight" style="font-size: 0.8rem;">VU Verified</span>
            </div>
            <div style="font-size: 0.95rem; color: #475569; font-weight: 600; margin-top: 4px;">${user.major} • ${user.university}</div>
            <div style="font-size: 0.82rem; color: #64748B; margin-top: 2px;">Auth: <b>${user.authProvider}</b></div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.88rem; font-weight: 700; color: #D8232A; text-transform: uppercase; margin-bottom: 6px;">Biography & Academic Focus</div>
          <p style="font-size: 0.95rem; color: #334155; line-height: 1.6;">${user.bio}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Focus Areas & Skills</div>
          <div class="tag-list">
            ${(user.skills || []).map(s => `<span class="tag-pill tag-pill-highlight">${s}</span>`).join("")}
          </div>
        </div>

        <!-- Testing & Data Management Tools -->
        <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 20px; margin-top: 20px;">
          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-bottom: 12px;">Testing & Local State Controls</div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-liquid btn-primary btn-sm" onclick="CampusApp.seedSampleData()">
              <span>Load Sample Test Data</span>
            </button>
            <button class="btn-liquid btn-glass btn-sm" onclick="CampusApp.clearAllData()" style="color: #D8232A; border-color: #FECACA;">
              <span>Clear All Local Data</span>
            </button>
            <button class="btn-liquid btn-glass btn-sm" onclick="CampusApp.openLogicInspector()">
              <span>View System Architecture</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // Interactive Guided System Tour Engine
  // ==========================================
  let tourStep = 0;
  const tourSteps = [
    {
      title: "1. Liquid Glass Header & Authentic VU Shield",
      desc: "Welcome to VU Connect. The top bar features the official Victoria University shield crest, frosted liquid glass navigation, and instant authentication via personal email or Google.",
      view: "landing"
    },
    {
      title: "2. Live Victoria University Pulse",
      desc: "The Dashboard aggregates spontaneous catch-up meetups, guild announcements, and trending discussions across faculties in real time.",
      view: "dashboard"
    },
    {
      title: "3. Smart Multi-Factor Matchmaker",
      desc: "Discover compatible classmates based on shared course syllabus codes (BIT, Nursing, BBA), revision preferences, and campus proximity.",
      view: "match"
    },
    {
      title: "4. Spontaneous VU CatchUps",
      desc: "Discover or host immediate hangouts around the Main Campus Innovation Hub, Library Terrace, or Jinja Road cafes.",
      view: "catchup"
    },
    {
      title: "5. Real-Time DMs & Faculty Guild Hubs",
      desc: "Direct message study partners, reply to faculty forum threads, and receive instant interactive updates.",
      view: "chats"
    }
  ];

  function startSystemTour() {
    tourStep = 0;
    renderTourStep();
  }

  function renderTourStep() {
    let overlay = document.getElementById("system-tour-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "system-tour-overlay";
      overlay.style.cssText = "position: fixed; inset: 0; z-index: 1800; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); pointer-events: auto;";
      document.body.appendChild(overlay);
    }

    const step = tourSteps[tourStep];
    navigateTo(step.view);

    overlay.innerHTML = `
      <div class="tour-step-card" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <div style="font-size: 0.8rem; font-weight: 700; color: #D8232A; text-transform: uppercase; margin-bottom: 4px;">Guided System Tour (${tourStep + 1}/${tourSteps.length})</div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: #1E293B; margin-bottom: 8px;">${step.title}</h3>
        <p style="font-size: 0.92rem; color: #475569; line-height: 1.55; margin-bottom: 18px;">${step.desc}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button id="btn-tour-close" class="btn-liquid btn-glass btn-sm">Exit Tour</button>
          <button id="btn-tour-next" class="btn-liquid btn-primary btn-sm">
            ${tourStep === tourSteps.length - 1 ? "Finish Tour ✓" : "Next Step →"}
          </button>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById("btn-tour-close");
    if (closeBtn) closeBtn.addEventListener("click", () => overlay.remove());

    const nextBtn = document.getElementById("btn-tour-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        tourStep++;
        if (tourStep < tourSteps.length) {
          renderTourStep();
        } else {
          overlay.remove();
          showToast("Tour Completed", "Enjoy connecting with fellow Victoria University scholars.");
        }
      });
    }
  }

  // ==========================================
  // System Logic Inspector Modal
  // ==========================================
  function openLogicInspector() {
    const modal = document.getElementById("logic-inspector-modal");
    if (modal) modal.classList.add("open");
  }

  function closeLogicInspector() {
    const modal = document.getElementById("logic-inspector-modal");
    if (modal) modal.classList.remove("open");
  }

  // ==========================================
  // Toast Helper
  // ==========================================
  function showToast(title, message) {
    const toast = document.createElement("div");
    toast.className = "live-toast-alert";
    toast.innerHTML = `
      <div class="pulse-dot" style="margin-top: 5px;"></div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #1E293B;">${title}</div>
        <div style="font-size: 0.84rem; color: #475569; margin-top: 2px;">${message}</div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ==========================================
  // Event Bindings
  // ==========================================
  function bindEvents() {
    // Bottom dock navigation items & general nav buttons
    document.querySelectorAll(".dock-nav-btn, .nav-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        if (view) navigateTo(view);
      });
    });

    // Brand logo returns to landing/dash
    const brandLink = document.getElementById("brand-logo-link");
    if (brandLink) {
      brandLink.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(AppState.currentUser ? "dashboard" : "landing");
      });
    }

    // Landing Page CTAs
    const heroExplore = document.getElementById("btn-hero-explore");
    if (heroExplore) {
      heroExplore.addEventListener("click", () => {
        if (AppState.currentUser) {
          navigateTo("match");
        } else {
          openAuthModal();
        }
      });
    }

    const heroTour = document.getElementById("btn-hero-tour");
    if (heroTour) heroTour.addEventListener("click", startSystemTour);

    const heroLogic = document.getElementById("btn-hero-logic-info");
    if (heroLogic) heroLogic.addEventListener("click", openLogicInspector);

    // Auth Modal buttons
    const googleBtn = document.getElementById("btn-auth-google");
    if (googleBtn) googleBtn.addEventListener("click", handleGoogleSignIn);

    const emailForm = document.getElementById("form-email-auth");
    if (emailForm) emailForm.addEventListener("submit", handleEmailOTPRequest);

    const verifyOtpBtn = document.getElementById("btn-verify-otp");
    if (verifyOtpBtn) verifyOtpBtn.addEventListener("click", verifyOtpCode);

    const resendBtn = document.getElementById("btn-resend-otp");
    if (resendBtn) resendBtn.addEventListener("click", () => {
      if (AppState.pendingEmail) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        AppState.generatedOTP = code;
        startOtpCountdown();
        showInteractiveMailNotification(AppState.pendingEmail, code);
      }
    });

    const closeAuthBtn = document.getElementById("btn-close-auth");
    if (closeAuthBtn) closeAuthBtn.addEventListener("click", closeAuthModal);

    const authBackdrop = document.getElementById("auth-modal-backdrop");
    if (authBackdrop) {
      authBackdrop.addEventListener("click", (e) => {
        if (e.target.id === "auth-modal-backdrop") closeAuthModal();
      });
    }

    // OTP Input auto-tabbing
    const otpBoxes = document.querySelectorAll(".otp-digit-box");
    otpBoxes.forEach((box, index) => {
      box.addEventListener("input", (e) => {
        if (e.target.value && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });
      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          otpBoxes[index - 1].focus();
        }
      });
    });

    // Host CatchUp form
    const openHostCatchup = document.getElementById("btn-open-host-catchup");
    if (openHostCatchup) openHostCatchup.addEventListener("click", openHostCatchupModal);

    const catchupForm = document.getElementById("host-catchup-form");
    if (catchupForm) catchupForm.addEventListener("submit", handleCreateCatchup);

    const closeCatchupBtn = document.getElementById("btn-close-catchup-modal");
    if (closeCatchupBtn) closeCatchupBtn.addEventListener("click", closeHostCatchupModal);

    // Create Profile form
    const profileForm = document.getElementById("create-profile-form");
    if (profileForm) profileForm.addEventListener("submit", handleCreateProfile);

    const closeProfileBtn = document.getElementById("btn-close-create-profile");
    if (closeProfileBtn) closeProfileBtn.addEventListener("click", closeCreateProfileModal);

    // Create Guild Post form
    const openPostBtn = document.getElementById("btn-open-create-post");
    if (openPostBtn) openPostBtn.addEventListener("click", openCreatePostModal);

    const postForm = document.getElementById("create-post-form");
    if (postForm) postForm.addEventListener("submit", handleCreatePost);

    const closePostBtn = document.getElementById("btn-close-post-modal");
    if (closePostBtn) closePostBtn.addEventListener("click", closeCreatePostModal);

    // Start New Chat form
    const openChatBtn = document.getElementById("btn-start-new-chat");
    if (openChatBtn) openChatBtn.addEventListener("click", openNewChatModal);

    const chatModalForm = document.getElementById("new-chat-form");
    if (chatModalForm) chatModalForm.addEventListener("submit", handleCreateChat);

    const closeChatBtn = document.getElementById("btn-close-chat-modal");
    if (closeChatBtn) closeChatBtn.addEventListener("click", closeNewChatModal);

    // Chat Message Form
    const chatForm = document.getElementById("chat-send-form");
    if (chatForm) chatForm.addEventListener("submit", handleSendMessage);

    // Logic Inspector Close
    const closeLogicBtn = document.getElementById("btn-close-logic-modal");
    if (closeLogicBtn) closeLogicBtn.addEventListener("click", closeLogicInspector);

    const logicBackdrop = document.getElementById("logic-inspector-modal");
    if (logicBackdrop) {
      logicBackdrop.addEventListener("click", (e) => {
        if (e.target.id === "logic-inspector-modal") closeLogicInspector();
      });
    }
  }

  // Expose App globally for inline handlers & programmatic navigation
  window.CampusApp = {
    state: AppState,
    navigateTo,
    openAuthModal,
    openHostCatchupModal,
    openCreateProfileModal,
    openCreatePostModal,
    openNewChatModal,
    seedSampleData,
    clearAllData,
    startSystemTour,
    openLogicInspector
  };

  // Run on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
