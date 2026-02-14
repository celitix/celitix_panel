import { create } from "zustand";

// ------------------
// PURE STATE (no actions here)
// ------------------
const initialState = {
  // UI / Navigation
  activePage: "appearance",
  openSettings: false,
  openAnalytics: false,
  openInbox: false,
  openKnowledge: false,
  isOpen: false,
  contentOpen: true,
  screen: "home",
  visibilityOpen: true,

  // Appearance
  colors: [
    { name: "Color1", value: "#3B2CF3" },
    { name: "Color2", value: "#5A33C2" },
    { name: "Color3", value: "#F35A7E" },
    { name: "Color4", value: "#A7E2FF" },
    { name: "Color5", value: "#2E2E2E" },
  ],
  actionColors: [
    { name: "Color1", value: "#3B2CF3" },
    { name: "Color2", value: "#5A33C2" },
    { name: "Color3", value: "#F35A7E" },
    { name: "Color4", value: "#A7E2FF" },
    { name: "Color5", value: "#2E2E2E" },
  ],
  selected: { name: "Color1", value: "#3B2CF3" },
  selectedActionColor: { name: "Color1", value: "#3B2CF3" },
  bgColor: "#5D9CEB",
  textColor: "white",
  buttonType: "corner",
  position: "right",

  // Home content
  previewImage: null,
  homeHeader: "Hi there 👋",
  homeMessage: "Welcome to our website. Ask us anything 🎉",
  conversationStarters: [
    { text: "I have a question about the product", enabled: false },
    { text: "Do you offer discount codes?", enabled: false },
    { text: "What is my order status?", enabled: false },
  ],
  minimizedValue: "Chat with us👋",
  showMinimizedLabel: true,
  onlineStatus: "We reply immediately",
  offlineStatus: "We typically reply within a few minutes",

  // Chat page
  chatBgColor: "white",
  chatAvatar: null,
  chatHeader: "Bot Assistant",
  chatWelcomeMessage: "",
  companyUrl: "www.google.com",
  chatBubbleColor: "#3B82F6",

  // Offline / survey
  offlineTicket: false,
  privacyMsg: false,
  offlineTextMsg:
    "We're currently unavailable. We’ll get back to you when one of our agents is able to respond. Please provide your email address.",
  preChatSurvey: false,

  surveyFields: [{ label: "Email", type: "email", value: "" }],
  showNewsLetter: false,
  emailIntroMsg: "Please introduce yourself:",
  sendConversationStarter: "",
};

// ------------------
// Zustand Store
// ------------------
const useWidgetStore = create((set, get) => ({
  ...initialState,

  // Global update
  setWidget: (updates) =>
    set((state) => ({
      ...state,
      ...updates,
    })),

  // Appearance
  setSelected: (color) => set({ selected: color }),
  setSelectedActionColor: (color) => set({ selectedActionColor: color }),
  setBgColor: (v) => set({ bgColor: v }),
  setTextColor: (v) => set({ textColor: v }),
  setButtonType: (v) => set({ buttonType: v }),
  setPosition: (v) => set({ position: v }),
  setVisibilityOpen: (v) => set({ visibilityOpen: v }),

  // Home content setters
  setPreviewImage: (img) => set({ previewImage: img }),
  setHomeHeader: (v) => set({ homeHeader: v }),
  setHomeMessage: (v) => set({ homeMessage: v }),
  // setConversationStarters: (v) => set({ conversationStarters: v }),
  setConversationStarters: (v) =>
    set((state) => ({
      conversationStarters:
        typeof v === "function" ? v(state.conversationStarters) : v,
    })),

  setSendConversationStarter: (v) =>
    set((state) => ({
      sendConversationStarter:
        typeof v === "function" ? v(state.sendConversationStarter) : v,
    })),

  setMinimizedValue: (v) => set({ minimizedValue: v }),
  setShowMinimizedLabel: (v) => set({ showMinimizedLabel: v }),
  setOnlineStatus: (v) => set({ onlineStatus: v }),
  setOfflineStatus: (v) => set({ offlineStatus: v }),

  // CONTENT / TABS
  setIsOpen: (v) => set({ isOpen: v }),
  setContentOpen: (v) => set({ contentOpen: v }),
  setScreen: (v) => set({ screen: v }),

  // Offline / survey setters
  setOfflineTicket: (v) => set({ offlineTicket: v }),
  setPrivacyMsg: (v) => set({ privacyMsg: v }),
  setOfflineTextMsg: (v) => set({ offlineTextMsg: v }),
  setPreChatSurvey: (v) => set({ preChatSurvey: v }),
  setSurveyFields: (v) => set({ surveyFields: v }),
  setShowNewsletter: (v) => set({ showNewsLetter: v }),
  setEmailIntroMsg: (v) => set({ emailIntroMsg: v }),

  // Needed for Sidebar.jsx
  setOpenSettings: (v) => set({ openSettings: v }),
  setOpenAnalytics: (v) => set({ openAnalytics: v }),
  setOpenInbox: (v) => set({ openInbox: v }),
  setOpenKnowledge: (v) => set({ openKnowledge: v }),

  // Common actions
  setActivePage: (page) => set({ activePage: page }),
  toggleSettings: () => set((s) => ({ openSettings: !s.openSettings })),
  toggleAnalytics: () => set((s) => ({ openAnalytics: !s.openAnalytics })),
  toggleInbox: () => set((s) => ({ openInbox: !s.openInbox })),

  // Reset
  reset: () => set({ ...initialState }),
}));

export default useWidgetStore;
