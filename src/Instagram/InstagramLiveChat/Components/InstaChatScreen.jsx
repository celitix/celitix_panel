import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpeedDial } from "primereact/speeddial";
import { FaPlus } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import CannedMessageDropdown from "@/cannedmessage/components/CannedMessageDropdown";
// ICONS
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FiUpload, FiMessageSquare, FiLayers } from "react-icons/fi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MicIcon from "@mui/icons-material/Mic";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { PiSticker } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaRegFileAudio } from "react-icons/fa6";
import { FiEdit2, FiSend } from "react-icons/fi";
import { FiMessageCircle, FiShield, FiClock } from "react-icons/fi";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import { TbZoomScan } from "react-icons/tb";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  PersonOutline,
  Groups2Outlined,
  CheckCircleOutline,
  NoteAltOutlined,
} from "@mui/icons-material";
import { RxCross2 } from "react-icons/rx";
import { LuHistory } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { MdOutlineReply } from "react-icons/md";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

// APIS
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import {
  getInstaChatsOneUser,
  loadInstaChat,
  sendInstaMessage,
  viewUpdate,
  getInstaOtherProfile
} from "@/apis/instagram/Instagram";

// ASSETS
import Bye from "../../StickersNew/bye.png";
import CassetteTape from "../../StickersNew/cassette-tape.png";
import Chat from "../../StickersNew/chat.png";
import Flirt from "../../StickersNew/flirt.png";
import XoXo from "../../StickersNew/xoxo.png";
import Wtf from "../../StickersNew/wtf.png";
import Cute from "../../StickersNew/cute.png";
import Wow from "../../StickersNew/wow.png";
import Why from "../../StickersNew/why.png";
import WebChat from "../../StickersNew/web-chat.png";
import ValentinesDay from "../../StickersNew/valentines-day.png";
import Stop from "../../StickersNew/stop.png";
import Stamp from "../../StickersNew/stamp.png";
import SpeechBubble from "../../StickersNew/speech-bubble.png";
import SeeYou from "../../StickersNew/see-you.png";
import NoChat from "../../StickersNew/no-chat.png";
import Message from "../../StickersNew/message.png";
import MedicalApp from "../../StickersNew/medical-app.png";
import Love from "../../StickersNew/love.png";
import LoveMessage from "../../StickersNew/love-message.png";
import Lol from "../../StickersNew/lol.png";
import Internet from "../../StickersNew/internet.png";
import Humorous from "../../StickersNew/humorous.png";
import HowAreYou from "../../StickersNew/how-are-you.png";
import Hiring from "../../StickersNew/hiring.png";
import GotYou from "../../StickersNew/got-you.png";
import GoodNight from "../../StickersNew/good-night.png";
import GoodMorning from "../../StickersNew/good-morning.png";
import EmailMarketing from "../../StickersNew/email-marketing.png";
import DontWorry from "../../StickersNew/dont-worry.png";
import Laugh from "../../StickersNew/laugh.png";
import stickerimg from "@/assets/images/stickernew.jpg";
import handwave from "@/assets/animation/handwave.json";
import { Paperclip } from "../icon/Paperclip";

// COMPONENTS
import AddTemplate from "./Template/AddTemplate";
import QuickReply, { ShowQuickReply } from "./QuickReply";
import ChatBalloon from "../../StickersNew/chat_balloon.png";
import CustomTabsMaterial from "@/instagram/components/CustomTabsMaterial";
import InstaTemplateLibrary from "./Template/InstaTemplateLibrary";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import EmptyChatWelcomeInsta from "./EmptyChatWelcomeInsta";
import { useInstagramContext } from "@/context/InstagramContext";
import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";
import moment from "moment";

const InstaChatScreen = ({
  chatState,
  setChatState,
  quickDrop,
  onAddTemplate,
  handleTemplateAdd,
  template,
  setButtonTempList,
  setTemplateList,
  onClose,
  selectedInstaChat,
  chatIndex,
  setChatIndex,
  chatLoading,
  setChatLoading,
  setShowChatSidebar,
  setSelectedInstaChat
}) => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [showQuickDrop, setShowQuickDrop] = useState(false);
  const [showCannedDropdown, setShowCannedDropdown] = useState(false);
  const [addTemplate, setAddTemplate] = useState(false);
  const endOfMessagesRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    type: "", // "image" | "video" | "document"
    url: "",
    caption: "",
  });
  const [activeEmojiPickerIdx, setActiveEmojiPickerIdx] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [text, setText] = useState("");
  const [messageType, setMessageType] = useState("");

  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

  const [openReply, setOpenReply] = useState(false);
  const [msgDetails, setMsgDetails] = useState();
  const [fileUploaded, setFileUploaded] = useState();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loadChatData, setLoadChatData] = useState([]);

  const [preview, setPreview] = useState({
    open: false,
    url: null,
    type: null,
  });

  const [visibleRight, setVisibleRight] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [instaOtherProfileData, setInstaOtherProfileData] = useState(null);


  const textRef = useRef(null);
  const audioInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { instagramData, instaChatData, setInstaChatData } =
    useInstagramContext();

  // fetch instgram chats api
  const fetchInstaChats = async () => {
    if (!instaChatData.length) return;
    const last = instaChatData[instaChatData.length - 1];
    try {
      const payload = {
        businessInstaUserId: instagramData?.selectedInstaUserId,
        instaUserId: selectedInstaChat?.recipientId,
        // businessInstaUserId: 17841475250758842,
        // instaUserId: 1065906638862460,
        // srno: instaChatData[0].srno,
        // replyTime: instaChatData[0].replayTime,
        srno: last.srno,
        replyTime: last.replayTime,
      };

      const res = await loadInstaChat(payload);
      // setLoadChatData(res.data);
      if (res?.data?.length) {
        setInstaChatData((prev) => [...prev, ...res.data]);
      }
    } catch (error) {
      console.error("Error fetching Instagram chats:", error);
    }
  };

  const fetchInstaOtherUserProfile = async () => {
    try {
      const payload = {
        instaOffDetailSrno: instagramData?.selectedOffDetailSrno,
        profileScopeId: selectedInstaChat?.recipientId, //other profile like recipientid id or other user id
        fields: [
          "name",
          "username",
          "profile_pic",
          "follower_count",
          "is_user_follow_business",
          "is_business_follow_user"
        ]
      }
      const response = await getInstaOtherProfile(payload)
      if (response?.success === true) {
        setInstaOtherProfileData(response?.data)
      }

    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchInstaOtherUserProfile()
  }, [selectedInstaChat?.recipientId])

  const getInstaChatsOfOneUser = async () => {
    setChatLoading(true);
    try {
      const payload = {
        businessInstaUserId: selectedInstaChat?.businessInstaUserId,
        instaUserId: selectedInstaChat?.recipientId,
        // businessInstaUserId: 17841475250758842,
        // instaUserId: 1065906638862460,
        chatNo: chatIndex,
      };

      const res = await getInstaChatsOneUser(payload);
      // setInstaChatData(res?.data);
      if (!res?.data || res.data.length === 0) {
        setInstaChatData([]);
        return;
      }

      // IMPORTANT: Reverse so oldest message is first (top of chat)
      const newMessages = res.data.reverse();

      setInstaChatData((prev) => {
        // If this is first load (chatIndex === 1), just set
        if (chatIndex === 1) {
          return newMessages;
        }

        // Otherwise: prepend older messages (avoid duplicates by message ID or timestamp)
        const existingIds = new Set(prev.map((m) => m.id || m.timestamp));
        const filteredNew = newMessages.filter(
          (m) => !existingIds.has(m.id || m.timestamp)
        );

        // Prepend older messages
        return [...filteredNew, ...prev];
      });
    } catch (error) {
      console.error("Error fetching Instagram chats:", error);
      toast.error("Failed to load messages");
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (loadChatData.length > 0) {
      getInstaChatsOfOneUser();
    }
  }, [loadChatData]);

  useEffect(() => {
    if (
      selectedInstaChat &&
      Object.keys(selectedInstaChat).length > 0 &&
      chatIndex
    ) {
      getInstaChatsOfOneUser();
    }
  }, [selectedInstaChat, chatIndex]);

  useEffect(() => {
    if (instaChatData.length === 0) return;
    const interval = setInterval(() => {
      fetchInstaChats();
    }, 3000);

    return () => clearInterval(interval);
  }, [instaChatData]);

  function useSmartScroll({
    containerRef,
    initialKey, // changes when opening/switching a chat (e.g., chatState.active.mobileNo)
    deps = [], // changes when new messages arrive (e.g., last message id)
    bottomThreshold = 120, // px
  }) {
    const stickToBottomRef = useRef(true);

    // Track whether user is near the bottom
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const onScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = el;
        const distance = scrollHeight - (scrollTop + clientHeight);
        stickToBottomRef.current = distance <= bottomThreshold;
      };

      el.addEventListener("scroll", onScroll);
      return () => el.removeEventListener("scroll", onScroll);
    }, [containerRef, bottomThreshold]);

    // Force scroll to bottom when opening/switching a chat
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      // two passes to catch late mounts/layout
      el.scrollTop = el.scrollHeight;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
        setTimeout(() => (el.scrollTop = el.scrollHeight), 100);
      });
    }, [initialKey, containerRef]);

    // On new messages (deps), only scroll if user was near bottom
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      if (stickToBottomRef.current) {
        el.scrollTop = el.scrollHeight;
      }
    }, deps);

    // If images/videos load later, keep bottom if we were sticking
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const relayout = () => {
        if (stickToBottomRef.current) el.scrollTop = el.scrollHeight;
      };

      const nodes = el.querySelectorAll("img, video");
      nodes.forEach((node) => {
        if (node.tagName === "IMG") {
          if (!node.complete)
            node.addEventListener("load", relayout, { once: true });
        } else if (node.tagName === "VIDEO") {
          if (node.readyState < 2)
            node.addEventListener("loadeddata", relayout, { once: true });
        }
      });

      const mo = new MutationObserver(relayout);
      mo.observe(el, { childList: true, subtree: true });

      return () => {
        mo.disconnect();
        nodes.forEach((n) => {
          n.removeEventListener?.("load", relayout);
          n.removeEventListener?.("loadeddata", relayout);
        });
      };
    }, [containerRef]);
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!chatContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;

      // If user is within 100px of bottom → hide button
      if (scrollHeight - scrollTop - clientHeight > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ----------------------------------------------------------------------------------------------------------------

  const handleOpenPreview = (url, type) => {
    setPreview({
      open: true,
      url,
      type,
    });
  };

  const handleClosePreview = () => {
    setPreview({ open: false, url: null, type: null });
  };

  const handleReply = (msg) => {
    setOpenReply(true);
    setMsgDetails(msg);
  };

  const handleReaction = (messageIndex, emoji) => {
    const selectedEmoji = emoji.native || emoji.emoji || emoji;
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) => {
        if (idx === messageIndex) {
          return {
            ...msg,
            reactions: [selectedEmoji],
          };
        }
        return msg;
      })
    );
    setActiveEmojiPickerIdx(null); // hide picker after choosing
  };

  const handleEmojiSelect = (setState, emoji, maxLength = 1000) => {
    if (!textRef.current) return;

    const emojiChar = emoji.native || emoji.emoji || emoji;

    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    const current = textRef.current.value;

    const newText = current.slice(0, start) + emojiChar + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emojiChar.length;
        textRef.current.focus();
        textRef.current.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const handleImageUpload = async () => {
    const fileInput = document.getElementById("fileInput");

    if (fileInput) {
      fileInput.value = "";
      fileInput.click();

      fileInput.onchange = (e) => {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const url = e.target.result;
            const fileType = file.type.toLowerCase();

            const type = fileType.startsWith("image/")
              ? "image"
              : fileType.startsWith("video/")
                ? "video"
                : null;
            setMessageType(type);
            if (type) {
              setPreviewDialog({
                open: true,
                type,
                url,
                caption: file.name,
              });
            }
          };
          reader.readAsDataURL(file);
        }
        setFileUploaded(file);
      };
    }
  };

  const handleSendClick = async () => {
    const trimmed = text.trim();

    // Always work with local vars
    let msgType = "";
    let msgText = null;

    // Case: plain text
    if (trimmed && !fileUploaded) {
      msgType = "text";
      msgText = trimmed;
    }

    // Case: file upload
    if (fileUploaded) {
      try {
        const res = await uploadImageFile(fileUploaded, 0);

        msgText = res?.fileUrl || "";
        const fileType = fileUploaded.type.toLowerCase();

        msgType = fileType.startsWith("image/")
          ? "image"
          : fileType.startsWith("video/")
            ? "video"
            : "file";
      } catch (err) {
        console.error("File upload failed:", err);
        return;
      }
    }

    // Do nothing if no message
    if (!msgText) return;

    const data = {
      type: msgType,
      message: msgText,
      // businessInstaUserId: 17841475250758842,
      // instaUserId: 1697453787584583,
      // businessInstaUserId: "17841404630029041",
      // instaUserId: "1625811624764272",
      businessInstaUserId: instagramData?.selectedInstaUserId,
      instaUserId: selectedInstaChat?.recipientId,
    };

    const msgRes = await sendInstaMessage(data);

    if (msgRes) {
      //  clear everything only after successful send
      setText("");
      setMessageType("");
      setFileUploaded(null);
      setPreviewDialog({ open: false, type: "", url: "", caption: "" });
    }

    if (msgRes.statusCode === 403) {
      toast.error(msgRes.msg);
    }

    // Reset UI flags
    setOpenReply(false);
    setMsgDetails();
    setAddTemplate(false);
  };

  function parseGenericTemplate(msg) {
    try {
      const parsed = JSON.parse(msg.text);

      const element = parsed?.message?.attachment?.payload?.elements?.[0];

      return {
        title: element?.title || "",
        subtitle: element?.subtitle || "",
        imageUrl: element?.image_url || "",
        buttons: element?.buttons || [],
        defaultAction: element?.default_action || null,
      };
    } catch (err) {
      console.error("Invalid generic template JSON", err);
      return null;
    }
  }

  function parseButtonTemplate(msg) {
    try {
      const parsed = JSON.parse(msg.text);

      return {
        recipientId: parsed?.recipient?.id || "",
        messagingType: parsed?.messaging_type || "",
        templateType: parsed?.attachment?.payload?.template_type || "",
        text: parsed?.message?.text || "",
        quickReplies: parsed?.message?.quick_replies || [],
      };
    } catch (err) {
      console.error("Invalid button template JSON", err);
      return null;
    }
  }

  const handleSendAudioFile = () => {
    if (audioInputRef.current) {
      audioInputRef.current.value = ""; // reset
      audioInputRef.current.click(); // open file dialog
    }
  };

  const handleStickerSend = (sticker) => {
    const newMessage = {
      type: "sticker",
      src: sticker.src,
      fromMe: true,
      timestamp: new Date().toISOString(),
    };

    // Replace this with your actual message sending logic
    setMessages((prev) => [...prev, newMessage]);

    setShowStickerPicker(false);
  };

  const handleGifSend = (gify) => {
    const newMessage = {
      type: "gify",
      message: gify.src,
      businessInstaUserId: instagramData?.selectedInstaUserId,
      instaUserId: selectedInstaChat?.recipientId,
    };

    sendInstaMessage(newMessage);
    setShowGif(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }

    const timeout = setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [instaChatData]);

  const lastMsg = instaChatData?.[instaChatData.length - 1];
  const lastMsgKey = lastMsg ? `${lastMsg.timestamp}-${lastMsg.id}` : "none";

  const initialKey = selectedInstaChat?.userName || "none";
  useSmartScroll({
    containerRef: chatContainerRef,
    initialKey,
    deps: [lastMsgKey, chatLoading],
    bottomThreshold: 120,
  });

  const openSticker = () => {
    setShowStickerPicker(true);
    setIsSpeedDialOpen(false);
  };

  const openGify = () => {
    setShowGif(true);
    setIsSpeedDialOpen(false);
  };

  const items = [
    {
      label: "Upload Photo/Videos",
      icon: <FiUpload className="text-blue-400" />,
      command: () => handleImageUpload(),
    },
    {
      label: "Gifs",
      icon: <GifBoxIcon className="text-blue-400" />,
      command: () => openGify(),
    },
    {
      label: "Stickers",
      icon: <PiSticker />,
      command: () => openSticker(),
    },
    {
      label: "Audio Files",
      icon: <FaRegFileAudio className="text-blue-400" />,
      // command: () => handleSendAudioFile(),
    },
    {
      label: "Add Template",
      icon: <FiLayers className="text-blue-400" />,
      command: () => setAddTemplate(true),
    },
    {
      label: "Add Quick Reply",
      icon: <FiMessageSquare className="text-blue-400" />,
      command: () => setOpen(true),
    },
  ];

  const stickerPack = [
    { id: 1, src: ChatBalloon, alt: "Chat Balloon" },
    { id: 1, src: Bye, alt: "Bye" },
    { id: 2, src: CassetteTape, alt: "CassetteTape" },
    { id: 3, src: Wow, alt: "Wow" },
    { id: 4, src: Why, alt: "Why" },
    { id: 5, src: Wtf, alt: "Wtf" },
    { id: 6, src: XoXo, alt: "XoXo" },
    { id: 7, src: Flirt, alt: "Flirt" },
    { id: 8, src: Chat, alt: "Chat" },
    { id: 8, src: Cute, alt: "Cute" },
    { id: 9, src: WebChat, alt: "webChat" },
    { id: 10, src: ValentinesDay, alt: "ValentinesDay" },
    { id: 11, src: Stop, alt: "Stop" },
    { id: 12, src: Stamp, alt: "Stamp" },
    { id: 13, src: SpeechBubble, alt: "SpeechBubble" },
    { id: 15, src: SeeYou, alt: "SeeYou" },
    { id: 16, src: NoChat, alt: "NoChat" },
    { id: 17, src: Message, alt: "Message" },
    { id: 18, src: MedicalApp, alt: "MedicalApp" },
    { id: 19, src: Love, alt: "Love" },
    { id: 20, src: LoveMessage, alt: "LoveMessage" },
    { id: 21, src: Lol, alt: "Lol" },
    { id: 22, src: Laugh, alt: "Laugh" },
    { id: 23, src: Internet, alt: "Internet" },
    { id: 24, src: Humorous, alt: "Humorous" },
    { id: 25, src: HowAreYou, alt: "HowAreYou" },
    { id: 26, src: Hiring, alt: "Hiring" },
    { id: 26, src: GotYou, alt: "GotYou" },
    { id: 26, src: GoodNight, alt: "GoodNight" },
    { id: 26, src: GoodMorning, alt: "GoodMorning" },
    { id: 26, src: EmailMarketing, alt: "EmailMarketing" },
    { id: 26, src: DontWorry, alt: "DontWorry" },
  ];

  const gifPack = [
    {
      id: 1,
      src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejF3ZjV4ZTBwdmw3NmdodncyYWZ0dXA2ZWpnd3d0b3luajAwenM1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WirhZMBF1AZVK/giphy.gif",
      alt: "Excited",
    },
    {
      id: 2,
      src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanphajh2dmJ1cms0dnpya3I1Z3pyZGFmeTFzMDB2NjRmZ2k5ZWc1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3E6BG56dhjuawAX6/giphy.gif",
      alt: "Thumbs Up",
    },
    {
      id: 4,
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdms5d3EybjJucHcxYXh1bGpzYTVidjJoeTRyMW5pbHQ2cXc2NXRsNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gw3MYmhxEv8T52ow/giphy.gif",
      alt: "Frog",
    },
    {
      id: 5,
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzJ2dmZvMGwwM3ZzeXZyZzVxNDNlcTJ0dXQ3cDB2MnFpeHJ6MW45bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A6aHBCFqlE0Rq/giphy.gif",
      alt: "Man",
    },
    {
      id: 6,
      src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG94Y3Nid3Rtcng2Z3I2amx4Mmt4ejRjb3VxeTlvMDBzb2U5aHljcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0IMVPaqrnGfBnZm/giphy.gif",
      alt: "woman",
    },
    {
      id: 7,
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjZqc2d5Z2F3bXBxd3c5MHlxaTQyNTI1MW1ydWpudHU3NGgxZG80ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FFb9yZK6t0oDu/giphy.gif",
      alt: "Dog",
    },
    {
      id: 8,
      src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXFsazdzeTNuZGxqeGNrazJ0bTE2MzlpdTQ0c3E4bXkzenRiazhzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/102A2WXxOWQy40/giphy.gif",
      alt: "Baby",
    },
  ];

  const tabsData = [
    {
      label: "Add Template",
      value: "addTemplate",
      icon: FiLayers,
      content: (
        <AddTemplate
          onAddTemplate={handleTemplateAdd}
          setAddTemplate={setAddTemplate}
        />
      ),
    },
    {
      label: "Template Library",
      value: "tempLibrary",
      icon: RiQuestionAnswerLine,
      content: (
        <InstaTemplateLibrary
          selectedInstaChat={selectedInstaChat}
          handleSendClick={(template, temp) => {
            const messagePayload = {
              type: template ? "template" : "temp",
              text: "template",
              fromMe: true,
            };

            if (template) {
              messagePayload.template = template;
            } else if (temp) {
              messagePayload.temp = temp;
            }

            setMessages((prev) => [...prev, messagePayload]);
            setAddTemplate(false);
          }}
        />
      ),
    },
  ];

  const TemplateCard = ({ template, onSend, onEdit }) => {
    return (
      <div className="w-full max-w-[320px] mx-auto max-h-[480px] overflow-y-auto bg-white rounded-2xl shadow-lg border border-blue-100 relative group">
        <h3 className="text-base font-bold mb-6 text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-4 rounded-t-2xl">
          Template Preview
        </h3>
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <img
              src={template.imageUrl}
              alt="Image Card"
              className="w-full h-[180px] object-cover border-b border-blue-100"
            />
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {template.title || ""}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {template.subtitle || ""}
              </p>
              <div className="space-y-2">
                <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                  {template.defaultAction?.payload || ""}
                </div>
                <div className="flex flex-col gap-1">
                  {(template.buttons || []).map((btn, bidx) => (
                    <div
                      key={bidx}
                      className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                    >
                      <span className="font-semibold">{btn.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ButtonCard = ({ temp, onSend, onEdit }) => {
    return (
      <div className="w-full bg-white max-w-[320px] mx-auto max-h-[250px] overflow-y-auto  rounded-2xl shadow-lg border border-blue-100 relative group">
        <h3 className="text-base font-bold text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-3 rounded-t-2xl">
          Template Preview
        </h3>

        <div className="flex flex-col gap-4">
          <div className="p-4">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {temp.title || ""}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {temp.subtitle || ""}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                {temp.defaultAction?.payload || ""}
              </div>

              <div className="flex flex-col gap-1">
                {(temp.buttons || []).map((btn, bidx) => (
                  <div
                    key={bidx}
                    className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                  >
                    <span className="font-semibold">{btn.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleTempSend = (payload) => {
    console.log("Sending template:", payload);
  };

  const handleTempEdit = (payload) => {
    console.log("Editing template:", payload);
    // Open edit modal or set form state
  };

  if (
    !selectedInstaChat ||
    selectedInstaChat.length === 0 ||
    !instagramData?.selectedAccount
  ) {
    return (
      <div className="hidden md:flex h-full w-full">
        <EmptyChatWelcomeInsta />
      </div>
    );
  }

  const MessageStatus = ({ status, timestamp, replayTime, direction }) => {
    if (direction !== "outgoing") return null; // KEEP THIS ✔

    const statusIcon = () => {
      switch (status) {
        case "sent":
          return <DoneIcon sx={{ color: "#758A93", fontSize: "1.2rem" }} />;
        case "delivered":
          return <DoneAllIcon sx={{ color: "#758A93", fontSize: "1.2rem" }} />;
        case "read":
          return <DoneAllIcon sx={{ color: "#1DA1F2", fontSize: "1.2rem" }} />;
        default:
          return null;
      }
    };

    return (
      <div className="absolute right-2 bottom-[-15px] flex items-center gap-1 group cursor-pointer">
        {/* Main Icon */}
        {statusIcon()}

        {/* Time beside checkmark */}
        <span className="text-[10px] text-gray-500">{timestamp}</span>

        {/* Hover Tooltip */}
        <div
          className="
        absolute bottom-6 right-0
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        bg-white text-gray-800
        border border-gray-200 shadow-xl
        rounded-md px-3 py-2
        w-44 z-50
      "
        >
          <p className="text-xs font-semibold mb-2">Message Status</p>

          {/* Sent */}
          <div className="flex items-center gap-2 mb-1">
            <DoneIcon sx={{ color: "#758A93", fontSize: "1rem" }} />
            <span className="text-xs">Sent</span>
          </div>

          {/* Delivered */}
          <div className="flex items-center gap-2 mb-1">
            <DoneAllIcon sx={{ color: "#758A93", fontSize: "1rem" }} />
            <span className="text-xs">Delivered</span>
          </div>

          {/* Read */}
          <div className="flex items-center gap-2 mb-1">
            <DoneAllIcon sx={{ color: "#1DA1F2", fontSize: "1rem" }} />
            <span className="text-xs">Read</span>
          </div>

          <hr className="my-2" />

          {/* Timestamp */}
          <p className="text-[11px] opacity-70">Time: {timestamp}</p>

          {/* Replay Time */}
          {replayTime && (
            <p className="text-[11px] opacity-70">Reply: {replayTime}</p>
          )}
        </div>
      </div>
    );
  };

  const formatFollowers = (count) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count;
  };

  return (
    <>
      <div className="relative flex flex-col flex-1 h-full md:h-full">
        {/* <div className=" mt-0 md:mt-0 z-51 flex items-center bg-gradient-to-r from-[#F1D3CE] to-[#EECAD5] justify-between w-full h-15 px-2 border rounded-tr-lg">
          <div className="flex items-center gap-2 h-auto">
            <button
              type="button"
              className="md:hidden block z-20 p-2"
              onClick={() => {
                setSelectedInstaChat(null);
                setShowChatSidebar(true);
              }}
            >
              <ArrowBackIosIcon />
            </button>
            {instaOtherProfileData?.profile_pic ? (
              <img
                src={instaOtherProfileData?.profile_pic}
                alt="User"
                className="w-10 h-10 rounded-full shadow-md  border-white object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white text-[#a667d3] font-bold shadow  flex items-center justify-center uppercase">
                {selectedInstaChat?.userName?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}

            <span className="text-md text-gray-800 font-semibold" >
              {selectedInstaChat?.userName || "No User Selected"}
            </span>
            <span className="text-md text-gray-800 font-semibold">
              Follower Count - {instaOtherProfileData?.follower_count || "-"}
            </span>
            <InfoOutlinedIcon
              onClick={() => {
                setVisibleRight(true)
              }}
              sx={{ fontSize: "1.2rem", color: "#A667D3" }}
            />
          </div>
        </div> */}

        <header className="z-50 flex items-center justify-between w-full h-16 px-4 bg-white/100 backdrop-blur-md border-b border-gray-200 shadow-sm z-[99999]">
          <div className="flex items-center gap-4">
            {/* Mobile Back Button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all"
              onClick={() => {
                setSelectedInstaChat(null);
                setShowChatSidebar(true);
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: "1.1rem" }} />
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                {/* Animated Gradient Border (Instagram Style) */}
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>

                <img
                  src={instaOtherProfileData?.profile_pic}
                  alt="Profile"
                  className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />

                {/* Relationship Dot: Green if mutual, Gray if not */}
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${instaOtherProfileData?.is_user_follow_business ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    {instaOtherProfileData?.username || "Unknown User"}
                  </h3>
                  {/* Business Follow Status Badge */}
                  {instaOtherProfileData?.is_business_follow_user && (
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                      Follows You
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium text-[#A667D3]">
                    {formatFollowers(instaOtherProfileData?.follower_count || 0)} followers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-1">
            <div className="relative flex items-center">
              {/* The Border Wrapper */}
              <div className="p-[1.5px] rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                <button
                  className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-[7px] text-xs font-bold tracking-wide text-gray-800 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => window.open(`https://instagram.com/${instaOtherProfileData?.username}`, '_blank')}
                >
                  <span className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent">
                    View Profile
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setVisibleRight(true)}
              className="p-2.5 text-gray-400 hover:text-[#A667D3] hover:bg-purple-50 rounded-xl transition-all"
            >
              <InfoOutlinedIcon sx={{ fontSize: "1.5rem" }} />
            </button>
          </div>
        </header>

        {/* <div className="absolute inset-0 z-0 bg-cover  w-full h-full opacity-20 bg-center bg-[url(/instachatbg.webp)] pointer-events-none" /> */}
        {/* Professional Clean Minimalist Doodle Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
          {/* The Doodle Pattern - High definition, low weight */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2364748b' fill-opacity='0.6' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-40-39c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm43 38c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM46 9c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm33-7c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM32 30c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM10 43c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm48 46c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM54 54c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM45 54c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM15 15c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />

          {/* Smooth Fade Transition at the top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-[#F8FAFC]/80" />
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col mb-0 md:-mt-5 h-full "
        >
          {chatLoading ? (
            <div className="w-full flex gap-2 items-cenetr justify-center">
              <div className="w-full flex flex-col gap-4 p-4">
                {[...Array(10).keys()].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 animate-pulse ${i % 2 === 0
                        ? "bg-[#ece5dd] dark:bg-gray-700/40"
                        : "bg-[#ece5dd] dark:bg-blue-900/30"
                        }`}
                      style={{
                        width: `${120 + (i % 3) * 40}px`,
                        height: `${35 + (i % 2) * 15}px`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {showScrollButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToBottom}
                  className="fixed bottom-24 right-[50%] px-2 py-1 bg-gray-300 hover:bg-[#ece5dd] text-gray-600 hover:text-gray-900 rounded-full shadow-md cursor-pointer transition-all hover:scale-110 z-[999999]"
                >
                  <KeyboardDoubleArrowDownIcon fontSize="small" />
                </motion.div>
              )}

              {instaChatData?.length !== 0 && (
                <div className="flex items-center justify-center py-4">
                  <button
                    className="group flex items-center gap-2 px-5 py-2 rounded-full border  bg-white/50 backdrop-blur-sm text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 text-[#ee2a7b] border-[#f9ce34] shadow-sm transition-all duration-300 z-50 disabled:opacity-50"
                    onClick={() => {
                      setChatIndex((prev) => prev + 1);
                    }}
                  >
                    <LuHistory className="w-3.5 h-3.5 group-hover:rotate-[-45deg] transition-transform duration-300" />
                    <span>Load Older Messages</span>
                  </button>
                </div>
              )}
              {instaChatData?.length === 0 && chatIndex === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center justify-center mt-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur">
                    {/* Top accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />

                    <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
                      {/* Lottie */}
                      <div className="w-[120px] h-auto -mt-2">
                        <Lottie animationData={handwave} loop autoplay />
                      </div>

                      {/* Headline */}
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <FiMessageCircle className="text-indigo-500" />
                        No messages yet
                      </h2>

                      {/* Subtext */}
                      <p className="text-sm text-gray-600 max-w-md">
                        Start the conversation to see messages here. Your chats
                        will appear in real time as soon as a reply comes in.
                      </p>

                      {/* Info strip */}
                      <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <FiClock className="mt-0.5 text-gray-500" />
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-800">
                              Live updates
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Instant delivery
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <FiShield className="mt-0.5 text-gray-500" />
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-800">
                              Secure
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Encrypted transport
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                          <FiMessageCircle className="mt-0.5 text-gray-500" />
                          <div className="text-left">
                            <p className="text-xs font-medium text-gray-800">
                              Multi-format
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Text • Media • Stickers • GIFs • Templates • Posts
                              and much more
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Gentle tip line (no buttons) */}
                      <div className="mt-3 w-full">
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 px-3 py-2">
                          <p className="text-[12px] text-gray-500">
                            Tip: You can paste images or drop files here to
                            share with your contact.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {instaChatData?.map((msg, idx) => {
                const fromMe = msg.direction === "outgoing";
                const formattedTime = msg.timestamp || msg.replayTime
                  ? moment(msg.timestamp || msg.replayTime).format("h:mm A")
                  : "";
                return (
                  <div
                    key={idx}
                    ref={scrollContainerRef}
                    // className="relative mb-4 mt-6 flex w-full"
                    className={`relative mb-6 mt-2 flex w-full flex-col ${fromMe ? "items-end" : "items-start"}`}

                  >

                    {/* Message bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className={`relative w-fit max-w-[85%] sm:max-w-xs px-4 py-2.5 break-words whitespace-pre-line cursor-pointer ${fromMe
                        ? "ml-auto bg-slate-800 text-white rounded-2xl rounded-tr-none border-b border-slate-700"
                        : "mr-auto bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"
                        }`}
                      onMouseEnter={() =>
                        setActiveEmojiPickerIdx(
                          activeEmojiPickerIdx === idx ? null : idx
                        )
                      }
                    >
                      {msg.type === "sticker" ? (
                        <div className="relative inline-block cursor-pointer group">
                          <img
                            src={msg.src}
                            alt="Media"
                            className="w-auto h-auto rounded-lg max-w-full max-h-[200px] object-fit"
                          />

                          {/* Centered Icon */}
                          <div
                            className="absolute inset-0 flex  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                            onClick={() =>
                              handleOpenPreview(
                                msg.attachment || msg.src,
                                msg.type
                              )
                            }
                          >
                            <TbZoomScan className="text-gray-400 w-8 h-8" />
                          </div>
                        </div>
                      ) : msg.type === "gify" ? (
                        <div className="relative inline-block cursor-pointer group">
                          <img
                            src={msg.src}
                            alt="Media"
                            className="w-auto h-auto rounded-lg max-w-full max-h-[200px] object-cover"
                          />

                          {/* Centered Icon */}
                          <div
                            className="absolute inset-0 flex  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                            onClick={() =>
                              handleOpenPreview(
                                msg.attachment || msg.src,
                                msg.type
                              )
                            }
                          >
                            <TbZoomScan className="text-gray-400 w-8 h-8" />
                          </div>
                        </div>
                      ) : msg.type === "image" ? (
                        <div className="relative inline-block cursor-pointer group border-2 w-full md:w-[280px]">
                          <img
                            src={msg.attachment}
                            alt="Image"
                            className="w-full h-50 rounded-lg object-fit border max-w-full max-h-[200px]"
                          />

                          {/* Centered Icon on Hover */}
                          <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                            onClick={() =>
                              handleOpenPreview(
                                msg.attachment || msg.src,
                                msg.type
                              )
                            }
                          >
                            <TbZoomScan className="text-gray-300 w-8 h-8" />
                          </div>
                        </div>
                      ) : msg.type === "video" ? (
                        <div className="relative inline-block cursor-pointer group">
                          <video
                            className="w-full h-50 rounded-lg object-cover border max-w-full max-h-[200px]"
                            muted
                            playsInline
                            controls
                          >
                            <source src={msg.attachment} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                          {/* Centered Icon on Hover */}
                          <div
                            className="absolute inset-0 flex  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-lg"
                            onClick={() =>
                              handleOpenPreview(
                                msg.attachment || msg.src,
                                msg.type
                              )
                            }
                          >
                            <TbZoomScan className="text-gray-300 w-8 h-8" />
                          </div>
                        </div>
                      ) : msg.type === "audio" || msg.text?.endsWith(".mp3") ? (
                        <audio controls className="w-full">
                          <source src={msg.audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : msg.type === "template" && msg.template ? (
                        <div className="w-full">
                          <TemplateCard
                            template={msg.template}
                            onSend={() => handleTempSend(msg.template)}
                            onEdit={() => handleTempEdit(msg.template)}
                          />
                        </div>
                      ) : msg.type === "temp" && msg.temp ? (
                        <div className="w-full">
                          <ButtonCard
                            temp={msg.temp}
                            onSend={(t) => handleTempSend(null, t)}
                            onEdit={() => handleTempEdit(msg.temp)}
                          />
                        </div>
                      ) : msg.type === "generic" ? (
                        <div className="w-full border-2 border-gray-200 rounded-xl p-2 bg-gray-100 opacity-90">
                          {(() => {
                            const template = parseGenericTemplate(msg);
                            if (!template) return <p>Invalid template</p>;

                            return (
                              <div className="flex flex-col gap-6">
                                <div className="w-full">
                                  <img
                                    src={template.imageUrl}
                                    alt="Image Card"
                                    className="w-full h-[180px] object-cover border-b border-blue-100"
                                  />

                                  <div className="p-5">
                                    <h3 className="text-base font-bold text-gray-900 mb-1">
                                      {template.title}
                                    </h3>

                                    <p className="text-xs text-gray-500 mb-3">
                                      {template.subtitle}
                                    </p>

                                    <div className="space-y-2">
                                      {/* Default Action */}
                                      {template.defaultAction?.payload && (
                                        <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                                          {template.defaultAction.payload}
                                        </div>
                                      )}

                                      {/* Buttons */}
                                      <div className="flex flex-col gap-1">
                                        {template.buttons.map((btn, bidx) => (
                                          <div
                                            key={bidx}
                                            className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                                          >
                                            <span className="font-semibold">
                                              {btn.title}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ) : msg.type === "button" ? (
                        <div className="w-full border-2 border-gray-200 rounded-xl bg-gray-100 opacity-90">
                          {(() => {
                            const template = parseButtonTemplate(msg);
                            if (!template) return <p>Invalid template</p>;

                            return (
                              <div className="flex flex-col gap-6">
                                <div className="w-full">
                                  <div className="p-2">
                                    {/* Template Text */}
                                    <h3 className="text-base font-bold text-gray-900 mb-1">
                                      {template.text}
                                    </h3>

                                    {/* Quick Replies */}
                                    {template.quickReplies?.length > 0 && (
                                      <div className="flex flex-col gap-1 mt-3">
                                        {template.quickReplies.map(
                                          (qr, idx) => (
                                            <div
                                              key={idx}
                                              className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                                            >
                                              <span className="font-semibold">
                                                {qr.title}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <p className="text-sm font-normal tracking-wide">
                          {msg.text}
                        </p>
                      )}

                      <div ref={endOfMessagesRef} />

                      {/* <div className="absolute right-2 bottom-[-22px]">
                        {msg.status === "delivered" &&
                          msg.direction === "outgoing" && (
                            <DoneAllIcon
                              sx={{ color: "#758A93", fontSize: "1.2rem" }}
                            />
                          )}
                        {msg.status === "sent" &&
                          msg.direction === "outgoing" && (
                            <DoneIcon
                              sx={{ color: "#758A93", fontSize: "1.2rem" }}
                            />
                          )}
                        {msg.status === "read" &&
                          msg.direction === "outgoing" && (
                            <DoneAllIcon
                              sx={{ color: "#1DA1F2", fontSize: "1.2rem" }}
                            />
                          )}
                      </div> */}

                      {/* switch (status) {
              case "sent":
              return <DoneIcon sx={{ color: "#758A93", fontSize: "1.2rem" }} />;
             case "delivered":
            return <DoneAllIcon sx={{ color: "#758A93", fontSize: "1.2rem" }} />;
            case "read":
            return <DoneAllIcon sx={{ color: "#1DA1F2", fontSize: "1.2rem" }} />;
            default:
            return null;
            } */}
                      {/* <MessageStatus
                        status={msg.status}
                        timestamp={msg.timestamp}
                        replayTime={msg.replayTime}
                        direction={msg.direction}
                      /> */}

                      {/* {activeEmojiPickerIdx === idx && (
                        <div
                          className={`
  p-1 rounded-full flex gap-2 items-center justify-center
  absolute top-0
  ${fromMe ? "right-full mr-0" : "left-full ml-0"}
`}
                        >
                          <CustomEmojiPicker
                            onSelect={(emoji) => handleReaction(idx, emoji)}
                            className="z-[1000] absolute"
                          />
                        </div>
                      )} */}
                    </motion.div>
                    {formattedTime && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 px-1 text-slate-400 opacity-80`}>
                        {formattedTime}
                      </span>
                    )}
                    {/* Reactions display */}
                    {
                      msg.reactions && msg.reactions.length > 0 && (
                        <div
                          className={`mt-1 flex space-x-1 text-sm ${fromMe ? "justify-end" : "justify-start"
                            }`}
                        >
                          {msg.reactions.map((reaction, rIdx) => (
                            <span key={rIdx}>{reaction}</span>
                          ))}
                        </div>
                      )
                    }

                    {/* Custom Emoji Picker (conditionally rendered) */}

                    {/* <div
                      className={`p-1 rounded-full flex gap-2 items-center justify-center absolute mx-2 z-50 top-0 ${fromMe ? "right-85" : "left-85"
                        }`}
                    >
                      {msg.type !== "text" && (
                        <a
                          href={msg.src}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiDownload className="cursor-pointer text-gray-700 hover:text-black" />
                        </a>
                      )}

                      <MdOutlineReply
                        className="cursor-pointer text-gray-700 hover:text-black"
                        onClick={() => handleReply(msg)}
                      />
                    </div> */}
                  </div>
                );
              })}

              {isSpeedDialOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="fixed bg-white right-4 bottom-20 shadow-lg rounded-lg p-2 w-56 z-99"
                >
                  {items.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.command}
                      className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                    }}
                  />

                  <input
                    type="file"
                    accept="audio/*"
                    ref={audioInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Example: show preview or push to messages
                        const audioUrl = URL.createObjectURL(file);
                        setMessages((prev) => [
                          ...prev,
                          {
                            fromMe: true,
                            type: "audio",
                            audioUrl,
                            reactions: [],
                          },
                        ]);
                      }
                    }}
                  />
                </motion.div>
              )}
            </>
          )}

          {/* {chatIndex > 1 && (
            <button
              className="text-[#E49BA6] border-2 border-[#FFD3D5] px-4 py-2 rounded-md flex gap-2 items-center mx-auto mt-2 cursor-pointer text-xs tracking-wider font-medium transition-all hover:bg-[#E49BA6] hover:text-white hover:border-white"
              onClick={() => {
                setChatIndex((prev) => prev - 1);
                // handleFetchSpecificConversation(true);
              }}
            >
              <LuHistory />
              Load more
            </button>
          )} */}
          {chatIndex > 1 && (
            <div className="flex items-center justify-center py-6">
              <button
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-[11px] font-bold uppercase tracking-widest text-white shadow-lg hover:bg-slate-800 active:scale-95 transition-all"
                onClick={() => {
                  setChatIndex((prev) => prev - 1);
                }}
              >
                <LuHistory className="w-4 h-4" />
                <span>Load More Recent</span>
              </button>
            </div>
          )}
        </div>

        {/* media full screen preview */}
        {previewDialog.open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-22 left-4 z-50 bg-white shadow-lg border border-gray-300 rounded-xl w-50 h-45 flex flex-col items-center justify-center p-1"
          >
            {/* Close Button */}
            <button
              className="self-end text-gray-500 hover:text-black text-lg font-bold mr-2 cursor-pointer"
              onClick={() =>
                setPreviewDialog({ ...previewDialog, open: false })
              }
            >
              &times;
            </button>

            {/* Image or Video */}
            {previewDialog.type === "image" && (
              <img
                src={previewDialog.attachment}
                alt="Preview"
                className="w-full h-full rounded-md object-fit-contain object-center"
              />
            )}
            {previewDialog.type === "video" && (
              <video
                src={previewDialog.attachment}
                controls
                className="w-full h-full rounded-md"
              />
            )}

            {/* Optional Caption */}
            {previewDialog.caption && (
              <div className="text-center text-xs text-gray-700 my-1">
                {previewDialog.caption}
              </div>
            )}
          </motion.div>
        )}

        {/* Sticker container */}
        {showStickerPicker && (
          <motion.div
            initial={{ opacity: 0, y: 20, width: "13rem" }}
            animate={{ opacity: 1, y: 0, width: "55rem" }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-5 z-40 rounded-xl shadow-2xl w-full bg-white border-1 border-gray-400 border-dashed"
          >
            {/* Header */}
            <div className="w-full flex items-center justify-between py-1 px-2 border-b-1 border-dashed  border-gray-400">
              <h2 className="text-md font-semibold text-gray-500">
                Choose a Sticker
              </h2>
              <button
                onClick={() => setShowStickerPicker(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Sticker Grid */}
            <div className="overflow-x-auto p-4 border-b scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
              <div className="grid grid-rows-2 auto-cols-max gap-2 grid-flow-col">
                {stickerPack.map((sticker) => (
                  <img
                    key={sticker.id}
                    src={sticker.src}
                    alt={sticker.alt}
                    className="w-12 h-12 object-contain cursor-pointer rounded-md border border-transparent hover:border-blue-400 hover:scale-110 transition-transform"
                    onClick={() => handleStickerSend(sticker)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Gif container */}
        {showGif && (
          <motion.div
            initial={{ opacity: 0, y: 20, width: "13rem" }}
            animate={{ opacity: 1, y: 0, width: "55rem" }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-5 z-40 rounded-xl shadow-2xl w-full bg-white border-1 border-gray-400 border-dashed"
          >
            <div className="bg-white rounded-xl shadow-xl">
              {/* Header */}
              <div className="w-full flex items-center justify-between py-1 px-2 border-b-1 border-dashed  border-gray-400">
                <h2 className="text-md font-semibold text-gray-500">
                  Choose a Gif
                </h2>
                <button
                  onClick={() => setShowGif(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="overflow-x-auto p-4 border-b scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <div className="grid grid-rows-2 auto-cols-max gap-2 grid-flow-col">
                  {gifPack.map((gify) => (
                    <img
                      key={gify.id}
                      src={gify.src}
                      alt={gify.alt}
                      className="w-28 h-16 object-contain cursor-pointer rounded-md border border-transparent hover:border-blue-400 hover:scale-110 transition-transform"
                      onClick={() => handleGifSend(gify)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {openReply && (
          <motion.div
            initial={{ opacity: 0, y: 100, width: "55rem" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="absolute bottom-20 left-5 h-auto rounded-lg bg-white border border-gray-400 p-4 z-50"
          >
            <div className="w-full flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600 capitalize">
                Replying to {msgDetails.type}
              </span>
              <RxCross2
                className="text-xl cursor-pointer"
                onClick={() => setOpenReply(false)}
              />
            </div>

            {/* Dynamic Content Rendering */}
            <div className="w-full">
              {msgDetails.type === "text" && (
                <p className="text-base font-medium">{msgDetails.text}</p>
              )}

              {(msgDetails.type === "image" ||
                msgDetails.type === "gify" ||
                msgDetails.type === "sticker") && (
                  <img
                    src={msgDetails.src}
                    alt="replied image"
                    className="max-w-[60px] max-h-[45px] rounded-md object-cover"
                  />
                )}

              {msgDetails.type === "video" && (
                <video
                  src={msgDetails.src}
                  controls
                  className="max-w-[80px] max-h-[60px] rounded-md"
                />
              )}

              {msgDetails.type === "audio" && (
                <audio controls className="max-w-[60px] max-h-[45px]">
                  <source src={msgDetails.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </motion.div>
        )}

        {/* Input Section */}
        <div className="sticky bottom-0 z-50 w-full border-t border-slate-100 bg-white/100 backdrop-blur-xl p-3 shadow-lg">

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 pb-1">
              {/* Sticker Button with cleaner ring */}
              <div
                onClick={openSticker}
                className="p-[2px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
                  <img src={stickerimg} className="w-5 h-5 object-contain" alt="Sticker" />
                </div>
              </div>

              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <CustomEmojiPicker
                  position="top"
                  onSelect={(emoji) => handleEmojiSelect(setText, emoji, 80)}
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Textarea (FULL WIDTH ON MOBILE) */}
            <textarea
              ref={textRef}
              placeholder="Type / for quick reply..."
              value={text}
              onChange={(e) => {
                const value = e.target.value;
                setText(value);
                const lastChar = value[e.target.selectionStart - 1];
                // setShowQuickDrop(lastChar === "/");
                const cursorPos = e.target.selectionStart;
                setShowCannedDropdown(lastChar === "/");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendClick();
                }
              }}
              //         className="
              //   w-full sm:flex-1
              //   border
              //   rounded-lg sm:rounded-full
              //   px-3 sm:px-4
              //   py-2
              //   text-xs sm:text-sm
              //   resize-none
              //   outline-none
              //   order-3 sm:order-none
              // "
              className="
                w-full sm:flex-1
                border
                rounded-lg sm:rounded-full
                px-3 sm:px-4
                py-2
                text-xs sm:text-sm
                resize-none
                outline-none
                order-3 sm:order-none
                bg-slate-50
                text-sm
                focus:ring-[#ee2a7b]/10 focus:border-[#ee2a7b] outline-none transition-all resize-none
              "
            />

            {/* Buttons */}
            <div className="flex gap-1 ml-auto order-4 sm:order-none">
              {/* {text.trim() ? (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={handleSendClick}
                  className="p-3 bg-[#000000] text-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <FiSend className="w-4 h-4" />
                </motion.button>
              ) : (
                <></>
              )} */}
              <button
                onClick={handleSendClick}
                className="p-3 bg-white text-gray-900 rounded-full border-slate-800 border-2"
              >
                <FiSend className="w-4 h-4" />
              </button>

              {/* <button
                onClick={() => setIsRecording(true)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200"
              >
                <MicIcon size={16} />
              </button> */}

              <button
                onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
                className={`p-3 bg-slate-900 text-white rounded-full transition-all ${isSpeedDialOpen ? 'rotate-45' : ''}`}

              >
                <FaPlus className="w-4 h-4" />

              </button>
            </div>




            {/* Quick Reply */}
            <AnimatePresence>
              {showCannedDropdown && (
                <CannedMessageDropdown
                  onSelect={(msg) => {
                    const textarea = textRef.current;
                    if (!textarea) return;

                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;

                    const newText =
                      text.slice(0, start - 1) + msg + text.slice(end);

                    setText(newText);
                    setShowCannedDropdown(false);

                    requestAnimationFrame(() => {
                      const cursorPos = start - 1 + msg.length;
                      textarea.focus();
                      textarea.setSelectionRange(cursorPos, cursorPos);
                    });
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick reply */}
        {/* <QuickReply open={open} setOpen={setOpen} /> */}

        {/* Recording Dialog */}
        {isRecording && (
          <Dialog visible={isRecording} onHide={() => setIsRecording(false)}>
            <div className="p-4 space-y-4 z-10">
              <h2 className="text-lg font-semibold">Preview Voice Message</h2>
              {/* <audio controls src={audioFile.url} className="w-full" /> */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setMessages([
                      ...messages,
                      { audio: audioFile.url, fromMe: true },
                    ]);
                    setAudioFile(null);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Send
                </button>
                <button
                  onClick={() => setIsRecording(false)}
                  className="text-gray-600 px-4 py-2 rounded-md border"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog>
        )}

        {/* Add template dialog */}
        {addTemplate && (
          <Dialog
            visible={addTemplate}
            onHide={() => setAddTemplate(false)}
            className="w-[90vw] max-w-4xl"
            draggable={false}
            onClose={() => setAddTemplate(false)}
          >
            {/* <CustomTabsMaterial
              tabsData={tabsData}
              defaultValue="addTemplate"
              onClose={() => setAddTemplate(false)}
            /> */}
            <InstaTemplateLibrary
              selectedInstaChat={selectedInstaChat}
              handleSendClick={(template, temp) => {
                const messagePayload = {
                  type: template ? "template" : "temp",
                  text: "template",
                  fromMe: true,
                };

                if (template) {
                  messagePayload.template = template;
                } else if (temp) {
                  messagePayload.temp = temp;
                }

                setMessages((prev) => [...prev, messagePayload]);
                setAddTemplate(false);
              }}
            />
          </Dialog>
        )}

        {preview.open && preview.url && (
          <Dialog
            visible={preview.open}
            onHide={handleClosePreview}
            header="Media Preview"
            closable
            dismissableMask
            className="w-full max-w-4xl"
            contentClassName="p-0"
            draggable={false}
            maximizable
          >
            <div className="flex items-center justify-center bg-black">
              {preview.type === "video" ? (
                <video
                  src={preview.url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full object-contain"
                />
              ) : preview.type === "audio" ? (
                <audio
                  src={preview.url}
                  controls
                  className="w-full px-4 py-6"
                />
              ) : (
                <img
                  src={preview.url}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </Dialog>
        )}

        {/* InfoSidebar */}
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => {
            setVisibleRight(false);
            setExpanded(false);
          }}
          style={{
            width: expanded ? "48rem" : "24rem",
            maxWidth: "95vw",
            overflow: "hidden",
          }}
        >
          <div
            className={`flex h-full transition-all duration-300 ${expanded ? "gap-4" : ""
              }`}
          >
            <div className="flex-1 flex flex-col border-r pr-2">
              <div className="flex flex-col items-center rounded-t-2xl border-b pb-3 bg-gradient-to-r from-[#F1D3CE] to-[#EECAD5]">
                <img
                  src={instaOtherProfileData?.profile_pic}
                  alt="User"
                  className="w-20 h-20 rounded-full shadow-md border-2 border-white mt-4"
                />
                <h1 className="mt-3 text-lg font-semibold text-gray-900">
                  {selectedInstaChat?.userName || "No User Selected"}
                </h1>

                <p className="text-xs text-gray-600">
                  {/* {chatState?.active.mobileNo || "+91 9876543210"} */}
                </p>
                <span className="mt-1 px-2 py-0.5 text-[11px] font-medium bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              </div>
              <div className="py-4 space-y-2 text-sm">
                {[
                  {
                    label: "Agent",
                    value: chatState?.agentName?.agentName || "-",
                    icon: <PersonOutline fontSize="small" />,
                  },
                  {
                    label: "Group",
                    value: chatState?.agentName?.groupName || "-",
                    icon: <Groups2Outlined fontSize="small" />,
                  },
                  {
                    label: "Status",
                    value: "-",
                    icon: <CheckCircleOutline fontSize="small" />,
                  },
                  {
                    label: "Follower Count",
                    value: instaOtherProfileData?.follower_count,
                    icon: <CheckCircleOutline fontSize="small" />,
                  },
                  {
                    label: "User Follow Business",
                    value: instaOtherProfileData?.is_user_follow_business ? "Following" : "Not Follow",
                    icon: <CheckCircleOutline fontSize="small" />,
                  },
                  {
                    label: "Business Follow User",
                    value: instaOtherProfileData?.is_business_follow_user ? "True" : "Not Following",
                    icon: <CheckCircleOutline fontSize="small" />,
                  },
                ].map(({ label, value, icon }, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2 text-gray-600">
                      {icon} {label}
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="py-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                  <NoteAltOutlined fontSize="small" /> Notes
                </p>
                <div className="p-3 bg-gray-50 border rounded-md text-xs text-gray-700">
                  Customer prefers evening calls. Interested in bulk instagram
                  messaging.
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      </div >
    </>
  );
};

export default InstaChatScreen;
