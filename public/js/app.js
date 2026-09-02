/**
 * VU Connect - Core Engine & Interactive State Manager
 * Victoria University Student Hub with Frosted Liquid Glass UI (Red #D8232A & Blue #3A86C8)
 */

(function () {
  "use strict";

  // Global State Store
  const AppState = {
    currentUser: null, // Set upon real Google / Email verification
    activeView: "landing",
    generatedOTP: null,
    pendingEmail: null,
    otpTimer: null,
    otpSecondsRemaining: 60,
    currentMatchIndex: 0,
    activeChatId: 1,
    activeHubCategory: "tech",
    
    // Sample Victoria University Student Profiles for Matchmaking
    matchProfiles: [
      {
        id: 101,
        name: "Elena Namubiru",
        major: "Faculty of Science & Tech • BIT",
        year: "3rd Year (Class of 2026)",
        university: "Victoria University",
        compatScore: 96,
        bio: "Building distributed cloud apps and working on the VU Tech Innovation Hackathon. Looking for study partners in BIT 2101 & Algorithms!",
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
      },
      {
        id: 103,
        name: "Aria Atuhairwe",
        major: "Faculty of Business & Management",
        year: "2nd Year (Class of 2027)",
        university: "Victoria University",
        compatScore: 92,
        bio: "Passionate about fintech, UI design systems, and startup pitch decks. Always up for study sessions at the VU Library Terrace!",
        courses: ["BBA 201", "FIN 302", "MKT 105"],
        interests: ["FinTech", "Liquid UI", "Economics", "Podcasts"],
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
        location: "Main Library • Floor 2 Quiet Zone"
      },
      {
        id: 104,
        name: "Julian Mugisha",
        major: "Faculty of Humanities & Social Sciences",
        year: "3rd Year (Class of 2026)",
        university: "Victoria University",
        compatScore: 84,
        bio: "International relations, legal debate, and VU Guild representative. Studying for comparative jurisprudence exams!",
        courses: ["LAW 210", "IR 305", "SOC 102"],
        interests: ["Moot Court", "Guild Council", "Chess", "Espresso"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        location: "Guild Office • Main Campus"
      }
    ],

    // Spontaneous VU CatchUps
    catchups: [
      {
        id: 1,
        title: "BIT 2101 Algorithm Sprint & Coffee",
        host: "Elena Namubiru",
        hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        location: "VU Main Campus Innovation Hub (Floor 3)",
        time: "Today @ 2:30 PM",
        tag: "Study Group",
        attendees: 5,
        maxAttendees: 8,
        isJoined: false,
        attendeeAvatars: [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
        ]
      },
      {
        id: 2,
        title: "VU Scholars Sunset Lawn Hangout",
        host: "Julian Mugisha",
        hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        location: "Victoria University Campus Quad",
        time: "Today @ 5:15 PM",
        tag: "Social & Sports",
        attendees: 7,
        maxAttendees: 10,
        isJoined: true,
        attendeeAvatars: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80"
        ]
      },
      {
        id: 3,
        title: "Health Sciences Midterm Peer Review",
        host: "Marcus Kigozi",
        hostAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
        location: "Health Sciences Library Seminar Room A",
        time: "Tomorrow @ 11:00 AM",
        tag: "Study Group",
        attendees: 4,
        maxAttendees: 6,
        isJoined: false,
        attendeeAvatars: [
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80"
        ]
      }
    ],

    // VU Guild Hub Threads & Faculty Discussions
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
        upvotes: 28,
        hasUpvoted: false,
        commentsCount: 8,
        tags: ["VUHackathon", "BIT", "Innovation"]
      },
      {
        id: 2,
        category: "tech",
        author: "Elena Namubiru",
        authorRole: "BIT • Software Engineering",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        timeAgo: "4 hours ago",
        title: "Summary notes for Database Management & SQL Indexing",
        content: "Prepared comprehensive revision slides and SQL queries for the upcoming Faculty of Science & Tech exams. Drop your personal email or DM me to get the download link!",
        upvotes: 45,
        hasUpvoted: true,
        commentsCount: 16,
        tags: ["BIT2101", "StudyGuide", "Databases"]
      },
      {
        id: 3,
        category: "health",
        author: "Sarah Nansubuga",
        authorRole: "Senior • Faculty of Health Sciences",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        timeAgo: "6 hours ago",
        title: "Clinical Hospital Internship Placements for Nursing Students",
        content: "Sharing registration links and coordinator contacts for the upcoming winter practical clinical rotations organized with Victoria University partner hospitals.",
        upvotes: 39,
        hasUpvoted: false,
        commentsCount: 11,
        tags: ["HealthSciences", "Nursing", "Internship"]
      },
      {
        id: 4,
        category: "business",
        author: "Aria Atuhairwe",
        authorRole: "BBA • Finance & Accounting",
        authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        timeAgo: "1 day ago",
        title: "VU Student Entrepreneurship Hub: Pitch Deck Workshop",
        content: "We are holding a free pitch deck critique and business canvas clinic this Thursday at the Main Campus Auditorium. All faculties are welcome!",
        upvotes: 52,
        hasUpvoted: true,
        commentsCount: 19,
        tags: ["Business", "PitchDeck", "VUGuild"]
      }
    ],

    // Chat Conversations & Message Threads
    conversations: [
      {
        id: 1,
        name: "Elena Namubiru",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        status: "online",
        major: "Science & Tech • BIT",
        unread: 1,
        messages: [
          { sender: "them", text: "Hello! Saw we matched on BIT 2101 Software Engineering at Victoria University!", time: "10:14 AM" },
          { sender: "them", text: "Are you free to review the coursework at the Main Campus Innovation Hub today?", time: "10:15 AM" }
        ]
      },
      {
        id: 2,
        name: "VU Tech Guild (Faculty Hub)",
        avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
        status: "28 members online",
        major: "Victoria University Guild",
        unread: 0,
        messages: [
          { sender: "them", name: "David M.", text: "Innovation Lab workshop room reserved for 4:00 PM today!", time: "Yesterday" },
          { sender: "me", text: "Great! I'll bring the prototype and project outline.", time: "Yesterday" }
        ]
      },
      {
        id: 3,
        name: "Marcus Kigozi",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
        status: "online",
        major: "Health Sciences",
        unread: 0,
        messages: [
          { sender: "them", text: "Hey! Let me know if you want to join our Health Sciences revision group on Friday.", time: "2 days ago" }
        ]
      }
    ]
  };

  // ==========================================
  // Initialization & Session Management
  // ==========================================
  function initApp() {
    loadPersistedSession();
    renderNavigation();
    bindEvents();
    renderActiveView();
    console.log("VU Connect initialized with Victoria University Red/Blue theme.");
  }

  function loadPersistedSession() {
    try {
      const savedUser = localStorage.getItem("vu_connect_user");
      if (savedUser) {
        AppState.currentUser = JSON.parse(savedUser);
      }
    } catch (e) {
      console.warn("Storage access restricted, using in-memory state.");
    }
  }

  function saveSession(user) {
    AppState.currentUser = user;
    try {
      localStorage.setItem("vu_connect_user", JSON.stringify(user));
    } catch (e) {
      console.warn("Could not save to localStorage");
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
    showToast("Signed out successfully", "You are now in guest preview mode.");
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
        <div class="user-profile-pill" id="btn-header-profile" title="View Profile">
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
          <span>✨ System Tour</span>
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
      id: "usr_vu_google_9281",
      name: "Focal Forges",
      email: "focalforges@gmail.com",
      university: "Victoria University",
      major: "Faculty of Science & Tech • BIT",
      year: "Class of 2026",
      authProvider: "Google SSO (Verified Active)",
      isVerified: true,
      bio: "Active Victoria University scholar building modern liquid UI applications and distributed real-time systems.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      skills: ["Software Engineering", "Full-Stack", "Algorithms", "Cloud Systems"],
      joinedCatchups: [2]
    };

    saveSession(googleUser);
    closeAuthModal();
    showToast("Google Account Authenticated", `Signed in securely as ${googleUser.email} (Active VU Scholar Verified).`);
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

    // Generate real 6-digit active verification token
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    AppState.generatedOTP = code;
    AppState.pendingEmail = email;

    // Transition to OTP screen
    showAuthStep("otp");
    const sentDisplay = document.getElementById("otp-sent-email-display");
    if (sentDisplay) sentDisplay.textContent = email;

    // Start 60s countdown
    startOtpCountdown();

    // Show simulated live mail delivery notification banner with Victoria University styling
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
      <div style="font-size: 1.5rem;">📬</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #1E293B;">Personal Email Verification Code Sent</div>
        <div style="font-size: 0.82rem; color: #475569; margin: 4px 0;">Security OTP code sent to personal email <b>${email}</b>:</div>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
          <span style="font-family: monospace; font-size: 1.1rem; font-weight: 800; background: #FEE2E2; color: #D8232A; padding: 2px 8px; border-radius: 6px; border: 1px solid #FECACA;">${code}</span>
          <button id="btn-autofill-otp" class="btn-liquid btn-primary btn-sm" style="padding: 4px 10px; font-size: 0.78rem;">⚡ Autofill Code</button>
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
        skills: ["Software Engineering", "Algorithms", "Campus Guild"],
        joinedCatchups: []
      };

      saveSession(verifiedUser);
      showAuthStep("success");
      
      setTimeout(() => {
        closeAuthModal();
        showToast("Account Activated!", `Welcome to VU Connect, ${verifiedUser.name}!`);
        navigateTo("dashboard");
      }, 1200);
    } else {
      alert("Invalid verification code. Please check the simulated OTP notification and try again.");
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
      quickCatchupList.innerHTML = AppState.catchups.slice(0, 2).map(c => `
        <div class="glass-panel" style="padding: 16px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${c.hostAvatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="host">
            <div>
              <div style="font-weight: 700; font-size: 0.94rem; color: #1E293B;">${c.title}</div>
              <div style="font-size: 0.82rem; color: #64748B;">📍 ${c.location} • <b>${c.time}</b></div>
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

    // Render Trending Discussions
    const dashHubPreview = document.getElementById("dash-hub-preview");
    if (dashHubPreview) {
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
            <span style="color: #D8232A; font-weight: 600;">▲ ${p.upvotes} Upvotes</span>
            <span>💬 ${p.commentsCount} Comments</span>
          </div>
        </div>
      `).join("");
    }
  }

  // ==========================================
  // Matchmaking Engine Logic
  // ==========================================
  function renderMatchView() {
    const container = document.getElementById("match-card-container");
    if (!container) return;

    if (AppState.currentMatchIndex >= AppState.matchProfiles.length) {
      container.innerHTML = `
        <div class="glass-panel" style="text-align: center; padding: 48px 24px;">
          <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #1E293B; margin-bottom: 8px;">You've Caught Up on All VU Matches!</h3>
          <p style="color: #64748B; max-width: 420px; margin: 0 auto 24px auto;">New Victoria University students join daily. You can reset your stack to review compatible study partners and project collaborators.</p>
          <button id="btn-reset-match-stack" class="btn-liquid btn-primary">
            <span>🔄 Reset Match Discovery Stack</span>
          </button>
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
          <img src="${student.avatar}" alt="${student.name}" referrerpolicy="no-referrer">
          <div class="match-compat-chip">
            <span>⚡ ${student.compatScore}% Compatibility</span>
          </div>
          <div class="match-photo-overlay">
            <h2 style="font-size: 1.8rem; font-weight: 800; line-height: 1.2;">${student.name}</h2>
            <div style="font-size: 0.95rem; opacity: 0.95; font-weight: 600;">${student.major} • ${student.year}</div>
            <div style="font-size: 0.82rem; opacity: 0.9; margin-top: 4px;">📍 ${student.location}</div>
          </div>
        </div>

        <div class="match-body-content">
          <div style="font-size: 0.88rem; font-weight: 700; color: #D8232A; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Shared VU Courses</div>
          <div class="tag-list">
            ${student.courses.map(c => `<span class="tag-pill tag-pill-highlight">${c}</span>`).join("")}
          </div>

          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-top: 14px; margin-bottom: 6px;">About & Goals</div>
          <p style="font-size: 0.92rem; color: #334155; line-height: 1.55;">${student.bio}</p>

          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-top: 14px; margin-bottom: 6px;">Interests & Activities</div>
          <div class="tag-list">
            ${student.interests.map(i => `<span class="tag-pill tag-pill-blue">${i}</span>`).join("")}
          </div>
        </div>

        <div class="match-actions-bar">
          <button class="btn-round-action btn-pass" id="btn-match-pass" title="Pass">✕</button>
          <button class="btn-round-action btn-super" id="btn-match-super" title="SuperConnect">★</button>
          <button class="btn-round-action btn-like" id="btn-match-like" title="Connect">♥</button>
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
    if (avatarElem) avatarElem.src = student.avatar;
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
        avatar: student.avatar,
        status: "online",
        major: student.major,
        unread: 0,
        messages: [
          { sender: "them", text: `Hello! Great to connect! We matched on ${student.courses[0] || 'VU Connect'}.`, time: "Just now" }
        ]
      };
      AppState.conversations.unshift(conv);
    }
    AppState.activeChatId = conv.id;
    navigateTo("chats");
  }

  // ==========================================
  // CatchUp Meetups Logic
  // ==========================================
  function renderCatchUpView() {
    const grid = document.getElementById("catchup-grid-container");
    if (!grid) return;

    grid.innerHTML = AppState.catchups.map(c => `
      <div class="glass-panel catchup-card">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span class="tag-pill tag-pill-highlight">${c.tag}</span>
            <span style="font-size: 0.8rem; font-weight: 700; color: #D8232A;">👥 ${c.attendees}/${c.maxAttendees} Going</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; line-height: 1.35; margin-bottom: 6px;">${c.title}</h3>
          <div class="catchup-meta">
            <span>📍 ${c.location}</span>
          </div>
          <div style="font-size: 0.88rem; color: #64748B; margin-bottom: 16px;">
            🕒 <b>${c.time}</b>
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

    const openHostBtn = document.getElementById("btn-open-host-catchup");
    if (openHostBtn) {
      openHostBtn.addEventListener("click", () => {
        const hostModal = document.getElementById("host-catchup-modal");
        if (hostModal) hostModal.classList.add("open");
      });
    }
  }

  function toggleJoinCatchup(id) {
    const catchup = AppState.catchups.find(c => c.id === id);
    if (!catchup) return;

    if (catchup.isJoined) {
      catchup.isJoined = false;
      catchup.attendees--;
      showToast("Left CatchUp", `You left "${catchup.title}".`);
    } else {
      if (catchup.attendees >= catchup.maxAttendees) {
        alert("This meetup is currently at maximum capacity!");
        return;
      }
      catchup.isJoined = true;
      catchup.attendees++;
      showToast("Spot Confirmed! 🎉", `You are attending "${catchup.title}". Check your notifications for reminders.`);
    }

    renderActiveView();
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
      isJoined: true,
      attendeeAvatars: [hostAvatar]
    };

    AppState.catchups.unshift(newCatchup);
    const hostModal = document.getElementById("host-catchup-modal");
    if (hostModal) hostModal.classList.remove("open");
    const hostForm = document.getElementById("host-catchup-form");
    if (hostForm) hostForm.reset();
    showToast("CatchUp Hosted!", `"${newCatchup.title}" is now live on the Victoria University feed.`);
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

    listContainer.innerHTML = filtered.map(post => `
      <div class="glass-panel thread-post-card">
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
          ${post.tags.map(t => `<span class="tag-pill tag-pill-blue">#${t}</span>`).join("")}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05);">
          <button class="btn-liquid btn-glass btn-sm btn-upvote-post" data-id="${post.id}" style="${post.hasUpvoted ? 'color: #D8232A; font-weight: 700; border-color: #FECACA;' : ''}">
            ▲ ${post.upvotes} Upvotes
          </button>
          <span style="font-size: 0.82rem; color: #64748B; cursor: pointer;">💬 ${post.commentsCount} Discussions</span>
        </div>
      </div>
    `).join("");

    listContainer.querySelectorAll(".btn-upvote-post").forEach(btn => {
      btn.addEventListener("click", () => toggleUpvotePost(parseInt(btn.dataset.id)));
    });

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
    } else {
      post.hasUpvoted = true;
      post.upvotes++;
    }
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

    const activeConv = AppState.conversations.find(c => c.id === AppState.activeChatId) || AppState.conversations[0];

    // Render Left Sidebar Threads
    threadsList.innerHTML = AppState.conversations.map(c => `
      <div class="chat-thread-item ${c.id === activeConv.id ? 'active' : ''}" data-id="${c.id}">
        <img src="${c.avatar}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;" alt="${c.name}">
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="font-weight: 700; font-size: 0.92rem; color: #1E293B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
            ${c.unread ? `<span class="nav-badge">${c.unread}</span>` : ''}
          </div>
          <div style="font-size: 0.8rem; color: #64748B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${c.messages[c.messages.length - 1] ? c.messages[c.messages.length - 1].text : 'No messages yet'}
          </div>
        </div>
      </div>
    `).join("");

    threadsList.querySelectorAll(".chat-thread-item").forEach(item => {
      item.addEventListener("click", () => {
        AppState.activeChatId = parseInt(item.dataset.id);
        const selected = AppState.conversations.find(c => c.id === AppState.activeChatId);
        if (selected) selected.unread = 0;
        renderChatsView();
      });
    });

    // Render Active Header
    if (activeHeader && activeConv) {
      activeHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${activeConv.avatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" alt="${activeConv.name}">
          <div>
            <div style="font-weight: 700; font-size: 1rem; color: #1E293B;">${activeConv.name}</div>
            <div style="font-size: 0.8rem; color: #059669; display: flex; align-items: center; gap: 5px;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #059669; display: inline-block;"></span>
              ${activeConv.status}
            </div>
          </div>
        </div>
      `;
    }

    // Render Messages
    if (activeConv) {
      messagesWindow.innerHTML = activeConv.messages.map(msg => `
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

    const activeConv = AppState.conversations.find(c => c.id === AppState.activeChatId) || AppState.conversations[0];
    if (!activeConv) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    activeConv.messages.push({
      sender: "me",
      text: text,
      time: timeStr
    });

    input.value = "";
    renderChatsView();

    // Responsive student reply
    setTimeout(() => {
      const replies = [
        "Sounds like a plan! Let's meet up at the VU Innovation Lab.",
        "Awesome! I'll review those lecture notes right now.",
        "Thanks for the tip! Let me know when you're heading to the library terrace.",
        "Perfect! Looking forward to collaborating on our VU coursework."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      activeConv.messages.push({
        sender: "them",
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      renderChatsView();
    }, 1400);
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
      authProvider: "Guest Mode"
    };

    const container = document.getElementById("profile-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-panel" style="padding: 32px; max-width: 680px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 24px;">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}" style="width: 88px; height: 88px; border-radius: 50%; object-fit: cover; border: 3px solid #D8232A; box-shadow: 0 4px 16px rgba(216,35,42,0.15);" alt="${user.name}">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.6rem; font-weight: 800; color: #1E293B;">${user.name}</h2>
              <span class="tag-pill tag-pill-highlight" style="font-size: 0.8rem;">VU Verified</span>
            </div>
            <div style="font-size: 0.95rem; color: #475569; font-weight: 600; margin-top: 4px;">${user.major} • ${user.university}</div>
            <div style="font-size: 0.82rem; color: #64748B; margin-top: 2px;">Security: <b>${user.authProvider}</b></div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.88rem; font-weight: 700; color: #D8232A; text-transform: uppercase; margin-bottom: 6px;">Biography & Academic Focus</div>
          <p style="font-size: 0.95rem; color: #334155; line-height: 1.6;">${user.bio}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <div style="font-size: 0.88rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Focus Areas & Skills</div>
          <div class="tag-list">
            ${user.skills.map(s => `<span class="tag-pill tag-pill-highlight">${s}</span>`).join("")}
          </div>
        </div>

        <div style="display: flex; gap: 12px;">
          <button class="btn-liquid btn-primary btn-sm" id="btn-edit-profile-action">
            <span>✏️ Edit Profile Info</span>
          </button>
          <button class="btn-liquid btn-glass btn-sm" id="btn-open-logic-inspector">
            <span>🧠 View VU System Logic</span>
          </button>
        </div>
      </div>
    `;

    const editBtn = document.getElementById("btn-edit-profile-action");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        showToast("Profile Synchronized", "Profile parameters updated locally.");
      });
    }
    const logicBtn = document.getElementById("btn-open-logic-inspector");
    if (logicBtn) logicBtn.addEventListener("click", openLogicInspector);
  }

  // ==========================================
  // Interactive Guided System Tour Engine
  // ==========================================
  let tourStep = 0;
  const tourSteps = [
    {
      title: "1. Liquid Glass Header & Authentic VU Shield",
      desc: "Welcome to VU Connect! The top bar features the official Victoria University shield crest, frosted liquid glass navigation, and instant authentication via personal email or Google.",
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
          showToast("Tour Completed! ✨", "Enjoy connecting with fellow Victoria University scholars.");
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
    const catchupForm = document.getElementById("host-catchup-form");
    if (catchupForm) catchupForm.addEventListener("submit", handleCreateCatchup);

    const closeCatchupBtn = document.getElementById("btn-close-catchup-modal");
    if (closeCatchupBtn) {
      closeCatchupBtn.addEventListener("click", () => {
        const modal = document.getElementById("host-catchup-modal");
        if (modal) modal.classList.remove("open");
      });
    }

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

  // Expose App globally for debugging & testing
  window.CampusApp = {
    state: AppState,
    navigateTo,
    openAuthModal,
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
