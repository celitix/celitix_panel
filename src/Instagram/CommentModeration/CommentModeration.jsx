import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { FaRegSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { Drawer, IconButton, Box } from "@mui/material";

// ICONS
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPause,
  FaEye,
  FaPlusCircle,
} from "react-icons/fa";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaBoxOpen,
  FaComments,
  FaStar,
} from "react-icons/fa";
import { InputSwitch } from "primereact/inputswitch";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MessageSquareMore } from "lucide-react";
import { Share } from "lucide-react";
import { Play } from "lucide-react";
import { CirclePlus } from "lucide-react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { IoMdSync } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import GridOnIcon from "@mui/icons-material/GridOn";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { HiDotsVertical } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiArrowSync } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { RxCross2 } from "react-icons/rx";

// APIS
import {
  instaUserList,
  getInstaAllPost,
  getInstaComment,
  syncInstaComment,
  syncInstaPost,
  sendInstaComment,
  getPostAutoReply,
  setInstaPostAutoReply,
  deleteInstaComment,
  hideInstaComment,
  sendMediaCommentInsta,
  getInstaPostPublishingLimit,
  getPostChildMedia
} from "@/apis/Instagram/Instagram";

// COMPONENTS
import CommentModerationTable from "./components/CommentModerationTable";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { Preview } from "./components/preview";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalSkeleton from "@/components/common/UniversalSkeleton";

const CommentModeration = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [persistMenuItems, setPersistMenuItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openRightDrawer, setOpenRightDrawer] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(true);

  // POST UI
  const [postList, setPostList] = useState([]);
  const [postData, setPostData] = useState(null);
  const [activeTab, setActiveTab] = useState("POSTS");
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (openPostDialog) setCarouselIndex(0);
  }, [openPostDialog]);

  // instagram states

  const post = postData?.post;
  const mediaList = postData?.media || [];
  const media = mediaList[0];

  const isCarousel = selectedPost?.post?.mediaType === "CAROUSEL_ALBUM";

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [replyComment, setReplyComment] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [openInstaSettings, setOpenInstaSettings] = useState(false);
  const [privateComment, setPrivateComment] = useState("");
  const [publicComment, setPublicComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [likedComments, setLikedComments] = useState({});

  const [openPostDetails, setOpenPostDetails] = useState(false);

  // USERLIST APIS FUNCTIONS
  const [instaUsers, setInstaUsers] = useState([]);
  const [selectedInstaUser, setSelectedInstaUser] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [rotate, setRotate] = useState(false);
  const [rotatingId, setRotatingId] = useState(null);
  const [selectedInstaUserDetails, setSelectedInstaUserDetails] = useState([]);
  const [hideChecked, setHideChecked] = useState({});

  useEffect(() => {
    if (!openPostDetails) {
      setComment(``);
      setReplyComment((prev) => ({
        ...prev,
        userName: "",
      }));
    }
  }, [openPostDetails]);

  console.log("post", post)

  const fetchPostChildMedia = async () => {
    const postId = post?.postId
    try {
      const res = await getPostChildMedia(postId)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchPostChildMedia()
  }, [openPostDetails])

  useEffect(() => {
    const fetchInstaPostPublishingLimit = async () => {
      try {
        const response = await getInstaPostPublishingLimit()
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchInstaPostPublishingLimit()
  }, [])

  const userOption = [
    { label: "Demo1", value: "demo1" },
    { label: "Demo2", value: "demo2" },
    { label: "Demo3", value: "demo3" },
  ];
  const mediaOption = [
    { label: "Keyword1", value: "Keyword1" },
    { label: "Keyword2", value: "Keyword2" },
    { label: "Keyword3", value: "Keyword3" },
  ];
  // const statusOption= [
  //   {label: 'Disable', value: 'disable'},
  //   {label: 'Enable ', value: 'enable '}
  // ]

  // useEffect(() => {
  //   const close = () => setShowEmojiPicker("");
  //   window.addEventListener("click", close);
  //   return () => window.removeEventListener("click", close);
  // }, []);

  const toggleCommentLike = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  useEffect(() => {
    if (selectedInstaUser && instaUsers.length > 0) {
      const details = instaUsers.find(
        (item) => item.instaOffDetailSrNo === selectedInstaUser,
      );
      setSelectedInstaUserDetails(details);
    } else {
      setSelectedInstaUserDetails(null);
    }
  }, [selectedInstaUser, instaUsers]);

  const statsData = [
    {
      label: "Total Comments",
      count: (
        <CountUp
          start={0}
          end={1000}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaUsers,
      bg: "from-pink-100 to-pink-50",
      iconBg: "bg-pink-300",
    },
    {
      label: "Replied Comments",
      count: (
        <CountUp
          start={0}
          end={800}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaShoppingCart,
      bg: "from-blue-100 to-blue-50",
      iconBg: "bg-blue-300",
    },
    {
      label: "Deleted Comments",
      count: (
        <CountUp
          start={0}
          end={500}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaDollarSign,
      bg: "from-green-100 to-green-50",
      iconBg: "bg-green-300",
    },
    {
      label: "Growth",
      count: (
        <CountUp
          start={0}
          end={100}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaChartLine,
      bg: "from-purple-100 to-purple-50",
      iconBg: "bg-purple-300",
    },
    {
      label: "Private Replies",
      count: (
        <CountUp
          start={0}
          end={12}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaBoxOpen,
      bg: "from-yellow-100 to-yellow-50",
      iconBg: "bg-yellow-300",
    },
    {
      label: "Hide Comments",
      count: (
        <CountUp
          start={0}
          end={1200}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaComments,
      bg: "from-teal-100 to-teal-50",
      iconBg: "bg-teal-300",
    },
    {
      label: "Comments Enabled Media",
      count: (
        <CountUp
          start={0}
          end={700}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey}
        />
      ),
      icon: FaStar,
      bg: "from-orange-100 to-orange-50",
      iconBg: "bg-orange-300",
    },
  ];

  const StatsCards = () => {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl  shadow-md bg-gradient-to-br ${stat.bg} p-3 flex items-center justify-between hover:shadow-lg transition`}
          >
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-md font-bold text-gray-800 mt-1">
                {stat.count}
              </p>
            </div>
            <div
              className={`p-2 rounded-full ${stat.iconBg} text-white shadow-md`}
            >
              <stat.icon className="text-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const fetchInstaUsers = async () => {
    try {
      const response = await instaUserList();
      if (response.statusCode === 200) {
        setInstaUsers(response.data);

        setSelectedInstaUser(response.data[0].instaOffDetailSrNo);
      }
    } catch (error) {
      console.log("Error fetching insta users: ", error);
    }
  };

  useEffect(() => {
    fetchInstaUsers();
  }, []);

  const instaUserOptions = instaUsers?.map((user) => ({
    value: user.instaOffDetailSrNo,
    label: user.userName,
  }));

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // GET All Insta Post API
  const handleSearch = async () => {
    if ((fromDate && !toDate) || (!fromDate && toDate)) {
      toast.error("Please select both From Date and To Date");
      return;
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      toast.error("From Date cannot be greater than To Date");
      return;
    }

    const payload = {
      instaOffDetailSrno: selectedInstaUser,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    };

    try {
      setIsPostLoading(true);
      const res = await getInstaAllPost(payload);
      if (res?.statusCode === 200 && Array.isArray(res?.data)) {
        setPostList(res?.data || []);
        toast.success(res?.message || "Request completed successfully");
      } else {
        toast.error(res?.message || "Failed to fetch posts");
      }
    } catch (error) {
      console.error("Get Insta All Post Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedInstaUser]);

  const tabs = [
    { key: "POSTS", label: "Posts", icon: <GridOnIcon fontSize="small" /> },
    {
      key: "REELS",
      label: "Reels",
      icon: <VideoLibraryIcon fontSize="small" />,
    },
    {
      key: "SAVED",
      label: "Saved",
      icon: <BookmarkBorderIcon fontSize="small" />,
    },
    {
      key: "TAGGED",
      label: "Tagged",
      icon: <PersonPinIcon fontSize="small" />,
    },
  ];

  const filteredPosts = postList.filter((item) => {
    const postType = item.post?.postType;

    if (activeTab === "POSTS") return postType === "FEED";
    if (activeTab === "REELS") return postType === "REELS";

    if (activeTab === "SAVED") return false;
    if (activeTab === "TAGGED") return false;

    return true;
  });

  const timeAgo = (dateTime) => {
    const past = new Date(dateTime.replace(" ", "T"));
    const now = new Date();

    const diffMs = now - past;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffHours < 24) {
      return `${diffHours}h`;
    }

    if (diffDays < 7) {
      return `${diffDays}d`;
    }

    return `${diffWeeks}w`;
  };

  const handleSyncComment = async (post, id) => {
    setRotate(true);
    setTimeout(() => setRotate(false), 800);
    const payload = {
      instaOffDetailSrno: selectedInstaUser,
      postId: post.post.postId,
      commentId: id?.commentId,
      // commentId: "17850828510610599",
    };

    try {
      const res = await syncInstaComment(payload);

      if (res?.statusCode === 200 || res?.success) {
        // toast.success("Comment synced successfully");
        toast.success(
          <>
            <div className="text-sm">
              <p className="font-semibold mb-1">Instagram Sync Completed ✅</p>
              <p>Found Comments: {res.data.foundComments}</p>
              <p>Inserted Comments: {res.data.insertedComments}</p>
              <p>Updated Comments: {res.data.updatedComments}</p>
              <p>Found Replies: {res.data.foundReplies}</p>
            </div>
          </>,
        );
        handleSearch();

        setOpenDialog(false);
      } else {
        toast.error(res?.message || "Sync failed");
      }
    } catch (err) {
      console.error("Sync Comment Error:", err);
      toast.error("Something went wrong");
    }
  };
  const handleDeleteComment = async (post, id) => {
    console.log("post", post);
    const payload = {
      postSrNo: post.post.srNo,
      commentId: id?.commentId,
    };

    try {
      const res = await deleteInstaComment(payload);

      if (res?.statusCode === 200 || res?.success) {
        toast.success("Comment deleted successfully");
        handleSearch();
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Comment Error:", err);
      toast.error("Something went wrong");
    }
  };
  const handleHideComment = async (post, comment, hide) => {
    const payload = {
      postSrNo: post?.post?.srNo,
      commentId: comment?.commentId,
      hide: hide,
    };

    try {
      const res = await hideInstaComment(payload);

      if (res?.statusCode === 200 || res?.success) {
        toast.success(
          hide
            ? "Comment hidden successfully"
            : "Comment unhidden successfully",
        );
        handleSearch();
      } else {
        toast.error(res?.message || "Action failed");
      }
    } catch (err) {
      console.error("Hide Comment Error:", err);
      toast.error("Something went wrong");
    }
  };

  const handleSyncInstaPost = async (post) => {
    setLoading(true);

    const postId = post?.post?.postId || selectedPost?.post?.postId;

    const data = {
      instaOffDetailSrno: selectedInstaUser,
      ...(postId && { postId }),
    };

    try {
      const response = await syncInstaPost(data);

      if (response?.statusCode === 200) {
        toast(
          `Post found: ${response.data.found},
          Post inserted: ${response.data.inserted},
          Post updated: ${response.data.updated}`,
        );
        handleSearch();

        // setSelectedPost(null);
        // setSyncPostDialog(false);
        // fetchAllInstaPosts();
      }
    } catch (error) {
      console.error("Error syncing post:", error);
      toast.error("Failed to sync post");
    } finally {
      setLoading(false);
    }
  };

  const menuRef = useRef(null);

  const PAGE_SIZE = 10;

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const renderCaptionWithHashtags = (text) => {
    if (!text) return null;

    const parts = text.split(/(#\w+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <a
            key={index}
            href={`https://www.instagram.com/explore/tags/${part.replace(
              "#",
              "",
            )}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const formatDateForPost = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const selectedUser = instaUsers.find(
    (u) => u.instaOffDetailSrNo === selectedInstaUser,
  );

  const fetchInstaComment = async (pageNo = 1) => {
    if (!post?.srNo) return;

    const payload = {
      postSrno: post.srNo,
      page: pageNo,
      size: 10,
    };

    try {
      const res = await getInstaComment(payload);

      if (res?.statusCode === 200) {
        const apiData = res.data;

        setCommentList((prev) =>
          pageNo === 1 ? apiData.comments : [...prev, ...apiData.comments],
        );

        setHasMore(apiData.comments.length === 10);
      }
    } catch (error) {
      console.error("Fetch Comment Error:", error);
    }
  };

  console.log("post", post)

  useEffect(() => {
    if (post?.srNo && openPostDetails) {
      setCommentList([]);
      setHasMore(true);
      setPage(1);
      fetchInstaComment(1);
    }
  }, [post?.srNo, openPostDetails]);

  const handleLoadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchInstaComment(nextPage);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendComment = async () => {
    const cleanMessage = comment
      ?.split(" ")
      ?.filter((word) => !word.startsWith("@"))
      ?.join(" ");

    const payload = {
      postId: selectedPost?.post.postId,
      instaOffDetailSrno: selectedPost?.post?.instaOffDetailSrno,
      message: comment,
    };

    const data = {
      postSrno: selectedPost?.post.srNo,
      commentId: replyComment?.commentId,
      comment: cleanMessage,
      commentType: "private",
    };
    try {
      if (replyComment?.userName) {
        const res = await sendInstaComment(data);
        if (res?.statusCode === 200) {
          toast.success(res?.message)
          setOpenPostDetails(false)
          handleSyncInstaPost(post)
        } else {
          toast.error("Error in posting a comment")
        }
      } else {
        const res = await sendMediaCommentInsta(payload);
        if (res?.success) {
          toast.success("Comment posted successfully!!")
          setOpenPostDetails(false)
          handleSyncInstaPost(post)
        } else {
          toast.error("Error in posting a comment")
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Setting functions starts
  const fetchInstaAutoReplies = async () => {
    const postSrNo = selectedPost?.post?.srNo;

    if (!postSrNo) return;

    try {
      const res = await getPostAutoReply(postSrNo);

      if (res?.statusCode === 200 && Array.isArray(res?.data)) {
        setCommentsData(res.data);

        // If API returns array
        const firstReply = res.data[0];

        setPublicComment(firstReply?.commentReplyPublic || "");
        setPrivateComment(firstReply?.commentReplyPrivate || "");
      } else {
        setCommentsData([]);
        setPublicComment("");
        setPrivateComment("");
      }
    } catch (error) {
      console.error("error", error);
      setCommentsData([]);
      setPublicComment("");
      setPrivateComment("");
    }
  };

  useEffect(() => {
    if (openInstaSettings && selectedPost?.post?.srNo) {
      fetchInstaAutoReplies();
    }
  }, [openInstaSettings, selectedPost]);

  const handleInstaPostAutoReply = async () => {
    const privateText = privateComment.trim();
    const publicText = publicComment.trim();

    // Min length validation
    if (!privateText && !publicText) {
      toast.error("private or public comment is required");
      return;
    }

    const data = {
      postSrno: selectedPost?.post?.srNo,
      privateComment: privateComment, // min =1 ,max=300 , Private comment contains invalid characters. Only letters, numbers, punctuation, spaces, and emojis are allowed. //in dm
      publicComment: publicComment, // min =1 ,max=300 , Private comment contains invalid characters. Only letters, numbers, punctuation, spaces, and emojis are allowed. //in cmmnt section
    };
    try {
      const res = await setInstaPostAutoReply(data);
      if (res.statusCode === 200) {
        fetchInstaAutoReplies();
        setPublicComment("");
        setPrivateComment("");
        toast.success(res?.message);
        setOpenInstaSettings(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // Setting functions ends

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
        <div className="flex flex-wrap items-end w-full gap-2 mb-4">
          {/* ================= RIGHT : DRAWER ================= */}
          {/* <div>
              <IconButton
                onClick={() => setOpenRightDrawer(true)}
                className="ml-auto"
              >
                <MenuOpenIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={openRightDrawer}
                onClose={() => setOpenRightDrawer(false)}
              >
                <Box sx={{ width: 320 }} className="p-4 space-y-4">
                  <div className="w-max-content">
                    <DropdownWithSearch
                      id="istaUser"
                      name="instaUser"
                      label="Instagram User"
                      placeholder="Select Instagram User"
                      options={instaUserOptions}
                      value={selectedInstaUser}
                      onChange={(val) => setSelectedInstaUser(val)}
                    />
                  </div>

                  {selectedInstaUser && (
                    <>
                      <div className="flex flex-col items-end gap-4">
                        <UniversalDatePicker
                          label="From Date"
                          value={fromDate}
                          onChange={(date) => setFromDate(date)}
                        />

                        <UniversalDatePicker
                          label="To Date"
                          value={toDate}
                          onChange={(date) => setToDate(date)}
                        />

                        <button
                          type="button"
                          onClick={handleSearch}
                          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                        >
                          Search
                        </button>
                      </div>
                    </>
                  )}

                  <DropdownWithSearch
                    label="Media"
                    options={mediaOption}
                    onChange={(e) => console.log(e)}
                  />

                  <InputField label="User" placeholder="Enter User Name" />
                </Box>
              </Drawer>
            </div> */}
        </div>

        {selectedInstaUser && (
          <>
            {/* =====================================================================ALL POST DISPLAY STARTS HERE============================================================ */}
            <div className="flex items-center justify-center text-sm font-medium">
              <div className="flex flex-1 justify-center gap-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-3 uppercase tracking-wide border-t-2 transition flex items-center gap-2 ${activeTab === tab.key
                      ? "border-black text-black"
                      : "border-transparent text-gray-400 hover:text-black"
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <IconButton
                  onClick={() => setOpenRightDrawer(true)}
                  className="ml-auto"
                >
                  <MenuOpenIcon />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={openRightDrawer}
                  onClose={() => setOpenRightDrawer(false)}
                >
                  <Box sx={{ width: 320 }} className="p-4 space-y-4">
                    <div className="w-max-content">
                      <DropdownWithSearch
                        id="istaUser"
                        name="instaUser"
                        label="Instagram User"
                        placeholder="Select Instagram User"
                        options={instaUserOptions}
                        value={selectedInstaUser}
                        onChange={(val) => setSelectedInstaUser(val)}
                      />
                    </div>

                    {selectedInstaUser && (
                      <>
                        <div className="flex flex-col items-end gap-4">
                          <UniversalDatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(date) => setFromDate(date)}
                          />

                          <UniversalDatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(date) => setToDate(date)}
                          />

                          <button
                            type="button"
                            onClick={handleSearch}
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                          >
                            Search
                          </button>
                        </div>
                      </>
                    )}

                    <DropdownWithSearch
                      label="Media"
                      options={mediaOption}
                      onChange={(e) => console.log(e)}
                    />

                    <InputField label="User" placeholder="Enter User Name" />
                  </Box>
                </Drawer>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {isPostLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100">
                    <UniversalSkeleton
                      variant="rectangular"
                    // height="100%"
                    // width="100%"
                    />
                  </div>
                ))
                : filteredPosts.map((item, index) => {
                  const post = item.post;
                  const media = item.media?.[0];
                  const isCarousel =
                    item.post?.mediaType === "CAROUSEL_ALBUM";

                  return (
                    <div
                      key={post.srNo || index}
                      className="relative group aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                      // onClick={() => window.open(post.postUrl, "_blank")}
                      onClick={() => {
                        setSelectedPost(item);
                        setOpenPostDetails(true);
                        setPostData(item);
                      }}
                    >
                      {/* IMAGE */}
                      {media?.mediaType === "IMAGE" && (
                        <img
                          src={media.mediaUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      )}

                      {/* VIDEO */}
                      {media?.mediaType === "VIDEO" && (
                        <video
                          src={media.mediaUrl}
                          // muted
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* REELS ICON */}
                      {post.postType === "REELS" && (
                        <div className="absolute top-2 right-2 text-white text-lg">
                          <Play />
                        </div>
                      )}

                      {/* HOVER OVERLAY */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white font-semibold">
                        <FavoriteBorderIcon />
                        {post.likeCount}
                        <MessageSquareMore />
                        {post.commentsCount}
                      </div>

                      {/* 🔹 CAROUSEL ICON */}
                      {isCarousel && (
                        <div className="absolute top-2 left-2 text-white drop-shadow-md">
                          <ViewCarouselIcon />
                        </div>
                      )}

                      <div
                        className={`cursor-pointer transition ${rotatingId === item.post.postId
                          ? "animate-spin text-blue-600"
                          : "text-gray-400 hover:text-blue-600"
                          } absolute right-2 top-2 p-2 rounded-full bg-white shadow-md cursor-pointer hover:bg-gray-100 z-50`}
                        title="Sync comments"
                        onClick={(e) => {
                          setRotatingId(item.post.postId);
                          setTimeout(() => setRotatingId(null), 700);
                          e.stopPropagation();
                          handleSyncComment(item);
                          handleSyncInstaPost(item);
                        }}
                      >
                        <TiArrowSync className="text-xl text-gray-900" />
                      </div>
                      <div
                        className="absolute right-14 top-2 p-1 rounded-full bg-white shadow-md cursor-pointer hover:bg-gray-100 z-50"
                        title="Setting"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenInstaSettings(true);
                          setSelectedPost(item);
                        }}
                      >
                        <MdOutlineSettings className="text-xl text-gray-900" />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* =========================================================================ALL POST DISPLAY ENDS HERE=========================================================== */}
          </>
        )}
      </div>
      {/* <div className="mx-auto">
        <Preview />
      </div> */}

      {/* POST PREVIEW DIALOG */}
      <Dialog
        visible={openPostDetails}
        onHide={() => setOpenPostDetails(false)}
        maximizable
        className="rounded-2xl overflow-hidden"
        style={{ width: "900px", maxWidth: "95vw" }}
        header={<span className="font-semibold text-lg">Post</span>}
      >
        {/* ================= HEADER ================= */}
        <div className="h-[80vh] overflow-hidden">
          <div className="sticky top-0 z-20 bg-white border-b px-4 py-3 flex justify-between items-center">
            {/* USER INFO */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedInstaUserDetails?.media?.[0]?.mediaUrl}
                className="w-9 h-9 rounded-full object-cover"
                alt="user"
              />

              <h2 className="font-semibold text-sm truncate">
                {selectedInstaUserDetails?.userName}
              </h2>
            </div>

            {/* ACTION MENU */}
            <div className="relative">
              <button
                onClick={() => setOpenDialog((prev) => !prev)}
                className="p-1 rounded-full hover:bg-gray-100 transition"
              >
                <HiDotsVertical className="text-lg" />
              </button>

              {openDialog && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-50"
                >
                  <button
                    onClick={() => {
                      handleSyncComment(selectedPost);
                      setOpenDialog(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    🔄 <span>Sync comments</span>
                  </button>

                  <button
                    onClick={() => setOpenDialog(false)}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MAIN CONTAINER */}
          <div className="bg-gray-50">
            {/* ================= MEDIA (STORY STYLE) ================= */}
            <div className="bg-gray-200 h-[350px] flex items-center justify-center relative">
              {/* ================= CAROUSEL ================= */}
              {isCarousel && (
                <>
                  {mediaList[carouselIndex]?.mediaType === "IMAGE" && (
                    <img
                      src={mediaList[carouselIndex].mediaUrl}
                      className="h-full w-full object-contain rounded-xl"
                    />
                  )}

                  {mediaList[carouselIndex]?.mediaType === "VIDEO" && (
                    <video
                      src={mediaList[carouselIndex].mediaUrl}
                      controls
                      autoPlay
                      className="h-full w-full object-contain rounded-xl"
                    />
                  )}

                  {/* LEFT ARROW */}
                  {carouselIndex > 0 && (
                    <button
                      onClick={() => setCarouselIndex((i) => i - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2"
                    >
                      ❮
                    </button>
                  )}

                  {/* RIGHT ARROW */}
                  {carouselIndex < mediaList.length - 1 && (
                    <button
                      onClick={() => setCarouselIndex((i) => i + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2"
                    >
                      ❯
                    </button>
                  )}

                  {/* DOTS */}
                  <div className="absolute bottom-4 w-full flex justify-center gap-2">
                    {mediaList.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === carouselIndex ? "bg-gray-400" : "bg-gray-400/40"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* ================= SINGLE IMAGE ================= */}
              {!isCarousel && media?.mediaType === "IMAGE" && (
                <img
                  src={media.mediaUrl}
                  className="h-full w-full object-contain rounded-xl"
                />
              )}

              {/* ================= SINGLE VIDEO ================= */}
              {!isCarousel && media?.mediaType === "VIDEO" && (
                <video
                  src={media.mediaUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain rounded-xl"
                />
              )}
            </div>

            {/* ================= CONTENT ================= */}
            <div className="h-[85vh] overflow-y-auto bg-gray-50">
              <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
                {/* CAPTION */}

                <div>
                  {selectedPost?.post?.caption && (
                    <p className="text-gray-800 text-sm whitespace-pre-line leading-relaxed">
                      {selectedPost.post.caption
                        .split(/(#\w+)/g)
                        .map((part, i) =>
                          part.startsWith("#") ? (
                            <span
                              key={i}
                              className="text-blue-500 cursor-pointer"
                            >
                              {part}
                            </span>
                          ) : (
                            part
                          ),
                        )}
                    </p>
                  )}
                </div>

                {/* ACTION BAR */}
                <div className="flex flex-col mx-2">
                  <div className="flex gap-5 text-gray-600  text-xl">
                    <FaRegHeart />
                    <FaRegComment />
                    <LuSend />
                  </div>

                  <div className="flex gap-2">
                    <p className="text-gray-600 text-sm">
                      {selectedPost?.post?.likeCount} likes
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedPost?.post?.commentsCount} comments
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedPost?.post?.isShared} share
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {formatDateForPost(selectedPost?.post?.postDateTime)}
                  </p>
                </div>

                {/* ================= COMMENTS ================= */}
                <div className="space-y-6 mb-[32rem]">
                  {commentList?.map((item) => {
                    const c = item.comment;

                    return (
                      <div
                        key={c.srNo}
                        className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition min-w-0"
                      >
                        {/* AVATAR */}
                        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                          {c.userName?.charAt(0)?.toUpperCase()}
                        </div>

                        {/* COMMENT BODY */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex justify-between">
                            {/* TEXT */}
                            <p className="text-sm text-gray-800 break-words">
                              <span className="font-semibold mr-1">
                                {c.userName}
                              </span>
                              {c.commentText}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-4 ">
                              <InputSwitch
                                checked={
                                  hideChecked[c.srNo] !== undefined
                                    ? hideChecked[c.srNo]
                                    : c.isHidden === 1
                                }
                                onChange={(e) => {
                                  const isHidden = e.value;

                                  // update UI state
                                  setHideChecked((prev) => ({
                                    ...prev,
                                    [c.srNo]: isHidden,
                                  }));

                                  // call API
                                  handleHideComment(selectedPost, c, isHidden);
                                }}
                                className="scale-75 origin-left"
                              />

                              <HiOutlineTrash
                                size={22}
                                className="cursor-pointer transition text-gray-400 hover:text-blue-600"
                                onClick={() => {
                                  handleDeleteComment(selectedPost, c);
                                }}
                              />
                              <TiArrowSync
                                size={22}
                                className={`cursor-pointer transition ${rotatingId === c.commentId
                                  ? "animate-spin text-blue-600"
                                  : "text-gray-400 hover:text-blue-600"
                                  }`}
                                onClick={() => {
                                  setRotatingId(c.commentId);
                                  setTimeout(() => setRotatingId(null), 700);
                                  handleSyncComment(selectedPost, c);
                                }}
                              />

                              <div
                                className="cursor-pointer"
                                onClick={() => toggleCommentLike(c.commentId)}
                              >
                                {likedComments[c.commentId] ? (
                                  <FaHeart className="text-red-600" />
                                ) : (
                                  <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />
                                )}
                              </div>
                            </div>
                          </div>
                          {/* META */}
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{timeAgo(c.commentDateTime)}</span>
                            <span>{c.likeCount} likes</span>
                            <button
                              className="hover:underline"
                              onClick={() => setReplyComment(c)}
                            >
                              Reply
                            </button>
                          </div>

                          {/* REPLIES */}
                          {item.replies?.length > 0 && (
                            <div className="mt-3 ml-6 space-y-3 border-l pl-4">
                              {item.replies.map((r, idx) => (
                                <div key={idx} className="flex gap-3 min-w-0">
                                  {/* Reply Avatar */}
                                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold shrink-0">
                                    {c.userName?.charAt(0)?.toUpperCase()}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="text-sm text-gray-800 break-words">
                                      <span className="font-semibold mr-1">
                                        {c.userName}
                                      </span>
                                      {r.subCommentText || r.commentText || r}
                                    </p>

                                    <div className="flex gap-4 text-xs text-gray-400 mt-1">
                                      <span>{timeAgo(r.commentDateTime)}</span>
                                      <span>{r.likeCount || 0} likes</span>
                                      {/* <button className="hover:underline">
                                              Reply
                                            </button> */}
                                    </div>
                                  </div>

                                  {/* Reply Like */}
                                  <FaRegHeart className="text-gray-400 cursor-pointer hover:text-red-500 transition" />
                                </div>
                              ))}

                              <button className="text-xs text-gray-400 hover:underline mt-1">
                                Hide replies
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* LOAD MORE */}
                  {hasMore && (
                    <div className="flex justify-center py-4">
                      <button
                        onClick={handleLoadMore}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm hover:bg-gray-100 transition"
                      >
                        <IoAddCircleOutline className="text-lg" />
                        Load more
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ================= COMMENT INPUT ================= */}
            {/* <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex gap-3">
              <MdOutlineEmojiEmotions className="text-xl text-gray-400 mt-2" />

              <input
                className="flex-1 bg-white border rounded-full px-4 py-2 text-sm focus:outline-none"
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={handleSendComment}
                className="text-blue-500 font-semibold"
              >
                Post
              </button>
            </div> */}
            <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex flex-col gap-2">
              {/* Warning */}
              {replyComment?.userName && (
                <div className="relative">
                  <p className="text-xs text-amber-600">
                    This reply will be sent directly to @
                    {replyComment?.userName} in DM.
                  </p>
                  <div
                    className="absolute right-3 bottom-1"
                    onClick={() => {
                      setReplyComment((prev) => ({
                        ...prev,
                        userName: "",
                      }));
                      setComment("");
                    }}
                  >
                    <RxCross2 />
                  </div>
                </div>
              )}

              <div className="flex gap-3 items-center">
                <MdOutlineEmojiEmotions className="text-xl text-gray-400" />

                {/* Input wrapper */}
                <div className="relative flex-1">
                  <div className="flex items-center bg-white border rounded-full px-4 py-2">
                    {replyComment?.userName && (
                      <span className="text-blue-700 text-sm mr-2">
                        @{replyComment?.userName}
                      </span>
                    )}

                    <input
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                      placeholder="Write a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendComment}
                  className="text-blue-500 font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Instagram Settings"
        visible={openInstaSettings}
        onHide={() => setOpenInstaSettings(false)}
        dismissableMask
        draggable={false}
        className="w-[90vw] max-w-[1200px] h-[70vh]"
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Private Comment */}
            <div className="relative">
              {/* Emoji Icon */}
              <FaRegSmile
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 mt-1"
                onClick={() => setShowEmojiPicker("private")}
                size={18}
              />

              {/* Input Field */}
              <div className="flex flex-col gap-1">
                <InputField
                  maxLength={300}
                  label="Private Comment"
                  placeholder="Enter private comment"
                  value={privateComment}
                  onChange={(e) => setPrivateComment(e.target.value)}
                  className="pl-10"
                />
                <p className="text-xs text-gray-500 text-right">
                  {privateComment?.length}/300
                </p>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker === "private" && (
                <div className="absolute z-50 mt-2">
                  <EmojiPicker
                    onEmojiClick={(emojiData) => {
                      setPrivateComment((prev) => prev + emojiData.emoji);
                      setShowEmojiPicker("");
                    }}
                  />
                </div>
              )}
            </div>

            {/* Public Comment */}
            <div className="relative">
              {/* Emoji Icon */}
              <FaRegSmile
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 mt-1"
                onClick={() => setShowEmojiPicker("public")}
                size={18}
              />

              {/* Input Field */}
              <div className="flex flex-col gap-1">
                <InputField
                  maxLength={300}
                  label="Public Comment"
                  placeholder="Enter public comment"
                  value={publicComment}
                  onChange={(e) => setPublicComment(e.target.value)}
                  className="pl-10"
                />
                <p className="text-xs text-gray-500 text-right">
                  {publicComment?.length}/300
                </p>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker === "public" && (
                <div className="absolute z-50 mt-2">
                  <EmojiPicker
                    onEmojiClick={(emojiData) => {
                      setPublicComment((prev) => prev + emojiData.emoji);
                      setShowEmojiPicker("");
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <UniversalButton label="Save" onClick={handleInstaPostAutoReply} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CommentModeration;
