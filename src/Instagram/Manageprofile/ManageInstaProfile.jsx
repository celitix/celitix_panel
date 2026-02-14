import React, { useState, useEffect, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Dialog } from "primereact/dialog";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { Drawer, IconButton, Box } from "@mui/material";

// ICONS
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AddIcon from "@mui/icons-material/Add";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdSync } from "react-icons/io";
import { TiArrowSync } from "react-icons/ti";
import GridOnIcon from "@mui/icons-material/GridOn";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

// APIS
import {
  getInstagramProfile,
  instaUserList,
  getInstaAllPost,
  getInstaComment,
  syncInstaComment,
  syncInstaPost,
  sendInstaComment,
} from "@/apis/instagram/instagram";

// COMPONENTS
import EmbeddedInstagram from "./components/EmbeddedInstagram";
import AddPostDialog from "./components/AddPostDialog";
import InstaBusinessAccountInfo from "./components/InstaBusinessAccountInfo";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import Loader from "@/whatsapp/components/Loader";

const ManageInstaProfile = () => {
  const [userAceessToken, setUserAccessToken] = useState("");
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openPostDetails, setOpenPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onboardedStatus, setOnboaredStatus] = useState(false);
  const [value, setValue] = useState(0);

  const [instaUsers, setInstaUsers] = useState([]);
  const [selectedInstaUser, setSelectedInstaUser] = useState(null);
  const [selectedInstaUserDetails, setSelectedInstaUserDetails] = useState([]);
  const [allInstaPosts, setAllInstaPosts] = useState([]);
  const [instaPostComments, setInstaPostComments] = useState([]);
  const [dates, setDates] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likedComments, setLikedComments] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [syncPostDialog, setSyncPostDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyComment, setReplyComment] = useState(null);
  const [comment, setComment] = useState("");
  const [replyUser, setReplyUser] = useState("");
  const menuRef = useRef();

  const [rotate, setRotate] = useState(false);
  const [rotatingId, setRotatingId] = useState(null);

  useEffect(() => {
    if (replyComment) {
      setReplyUser(replyComment?.userName);
    }
  }, [replyComment]);

  useEffect(() => {
    if (selectedInstaUser && instaUsers.length > 0) {
      const details = instaUsers.find(
        (item) => item.instaOffDetailSrNo === selectedInstaUser
      );
      setSelectedInstaUserDetails(details);
    } else {
      setSelectedInstaUserDetails(null);
    }
  }, [selectedInstaUser, instaUsers]);

  // *********** Time formatting functions starts ***************

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const formatDateForPost = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
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

  // *********** Time formatting functions ends ***************

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCommentLike = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // const fetchInstaUsers = async () => {
  //   try {
  //     const response = await instaUserList();
  //     if (response.statusCode === 200) {
  //       setInstaUsers(response.data);

  //       setSelectedInstaUser(response.data[0].instaOffDetailSrNo);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching insta users: ", error);
  //   }
  // };

  const fetchInstaUsers = async () => {
    try {
      const response = await instaUserList();
      if (response.statusCode === 200) {
        setInstaUsers(response.data);

        // Update status here: if data is empty, we consider it "onboarded but empty"
        setOnboaredStatus(true);

        if (response.data.length > 0) {
          setSelectedInstaUser(response.data[0].instaOffDetailSrNo);
        }
      }
    } catch (error) {
      console.log("Error fetching insta users: ", error);
      // Optional: set to true or false depending on how you handle errors
    }
  };

  const fetchAllInstaPosts = async () => {
    const data = {
      instaOffDetailSrno: selectedInstaUser,
      // fromDate: formatDate(dates?.fromDate) || "",
      // toDate: formatDate(dates?.toDate) || "",
      fromDate: "2017-12-21",
      toDate: formatDate(dates?.toDate) || "",
    };

    try {
      const response = await getInstaAllPost(data);
      if (response.statusCode === 200) {
        setAllInstaPosts(response.data);
      }
    } catch (error) {
      console.log("Error fetching all insta posts: ", error);
    }
  };

  useEffect(() => {
    fetchAllInstaPosts();
  }, [selectedInstaUser]);

  const fetchInstaPostsComments = async (pageNo = 1) => {
    const data = {
      postSrno: selectedPost?.post?.srNo,
      // commentSrno: selectedPost?.post?.instaOffDetailSrno,
      // username: instaUsers?.find(
      //                   (item) => item.instaOffDetailSrNo === selectedInstaUser
      //                 ).userName,
      // fromDate: dates?.fromDate,
      // toDate: dates?.toDate,
      page: pageNo,
      size: 10,
    };

    try {
      const response = await getInstaComment(data);

      if (response?.statusCode === 200) {
        const apiData = response.data;

        setInstaPostComments((prev) =>
          pageNo === 1 ? apiData.comments : [...prev, ...apiData.comments]
        );

        setHasMore(apiData.comments.length === 10);
      }
    } catch (error) {
      console.log("Error fetching all insta posts: ", error);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      setInstaPostComments([]);
      setHasMore(true);
      setPage(1);
      fetchInstaPostsComments(1);
    }
  }, [selectedPost]);

  const handleLoadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchInstaPostsComments(nextPage);
  };

  const handleSyncComment = async (post, id) => {
    const payload = {
      instaOffDetailSrno: selectedInstaUser,
      ...(post?.post?.postId && {
        postId: post?.post?.postId || selectedPost?.post?.postId || "",
      }),
      commentId: id,
    };

    try {
      const res = await syncInstaComment(payload);

      if (res?.statusCode === 200 || res?.success) {
        // toast.success("Comment synced successfully");
        toast(
          `InsertCount: ${res.data.insertedReplies}, \nUpdatedReplies: ${res.data.updatedReplies},\nFoundReplies: ${res.data.foundReplies}, \nInsertedComments: ${res.data.insertedComments}, \nfoundComments: ${res.data.foundComments}, \nupdatedComments: ${res.data.updatedComments}`
        );
        // setSelectedPost(null);
        setOpenDialog(false);
        fetchAllInstaPosts();
      } else {
        toast.error(res?.message || "Sync failed");
      }
    } catch (err) {
      console.error("Sync Comment Error:", err);
      toast.error("Something went wrong");
    }
  };

  const handleSyncInstaPost = async (post) => {
    setRotate(true);

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
          Post updated: ${response.data.updated}`
        );

        // setSelectedPost(null);
        setSyncPostDialog(false);
        fetchAllInstaPosts();
      }
    } catch (error) {
      console.error("Error syncing post:", error);
      toast.error("Failed to sync post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstaUsers();
  }, []);

  const handleSendPost = (user) => {
    setOpenShare(false);
    setSelectedUser(user);
    setOpenPostDetails(false);
  };

  const handleSendComment = async () => {
    const data = {
      postSrno: selectedPost?.post.srNo,
      commentId: replyComment?.commentId,
      comment: comment,
      commentType: "private",
    };
    try {
      const res = await sendInstaComment(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchInstaUserList = async () => {
    try {
      const res = await instaUserList();
      setInstaUsers(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchInstaUserList();
  }, []);

  const handleChange = (newTab) => {
    setActiveTab(newTab);
  };

  const [activeTab, setActiveTab] = useState("POSTS");
  const [openRightDrawer, setOpenRightDrawer] = useState(false);
  const [postList, setPostList] = useState([]);

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

  const instaUserOptions = instaUsers?.map((user) => ({
    value: user.instaOffDetailSrNo,
    label: user.userName,
  }));

  const mediaList = selectedPost?.media || [];
  const isCarousel = selectedPost?.post?.mediaType === "CAROUSEL_ALBUM";
  const [carouselIndex, setCarouselIndex] = useState(0);

  const media = mediaList[carouselIndex] || mediaList[0];

  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedPost]);

  return (
    <>
      {/* {!onboardedStatus &&
        instaUsers.length > 0 &&
        allInstaPosts.length > 0 && ( */}
      {instaUsers.length > 0 && (
        <>
          {/* <InstaBusinessAccountInfo instaUsers={instaUsers} /> */}

          {/* <div className="grid grid-cols-4 gap-4">
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
                {" "}
                <div className="col-span-1">
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
                  <div className=" flex flex-col gap-4">
                    <div className="flex-auto ">
                      <UniversalDatePicker
                        id="instafromdate"
                        name="instafromdate"
                        label="From:"
                        placeholder="dd-mm-yy"
                        tooltipContent="From"
                        tooltipPlacement="right"
                        defaultValue={new Date()}
                        value={dates?.fromDate}
                        onChange={(value) =>
                          setDates((prev) => ({ ...prev, fromDate: value }))
                        }
                      />
                    </div>
                    <div className="flex-auto ">
                      <UniversalDatePicker
                        id="instatodate"
                        name="instatodate"
                        label="To:"
                        placeholder="dd-mm-yy"
                        tooltipContent="To"
                        tooltipPlacement="right"
                        defaultValue={new Date()}
                        value={dates?.toDate}
                        onChange={(value) =>
                          setDates((prev) => ({ ...prev, toDate: value }))
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-end col-span-1">
                  <UniversalButton
                    label="Search"
                    onClick={fetchAllInstaPosts}
                    disabled={!selectedInstaUser}
                  />
                </div>
              </Box>
            </Drawer>
          </div> */}

          {selectedInstaUserDetails && (
            <div className="mb-10">
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-6 mt-2 relative bg-white p-5 rounded-xl shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={selectedInstaUserDetails?.profile_picture_url}
                    alt={selectedInstaUserDetails?.username}
                    className="w-20 h-20 rounded-full border-2 border-gray-600 shadow-md object-cover bg-gray-200"
                  />

                  <div className="text-between  md:text-left flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold">
                      {selectedInstaUserDetails?.userName ?? "Instagram User"}
                    </h2>
                    <div className="flex gap-4 md:flex-row flex-col">
                      <p className="text-gray-600 flex flex-col">
                        <span className="font-semibold text-gray-500 text-sm">
                          INSTA Account ID:
                        </span>
                        <span className="text-black font-semibold text-xs">
                          {selectedInstaUserDetails?.instaUserId}
                        </span>
                      </p>
                      <p className="text-gray-600 flex flex-col">
                        <span className="font-semibold text-gray-500 text-sm">
                          Business ID:
                        </span>
                        <span className="text-black font-semibold text-xs">
                          {selectedInstaUserDetails?.businessInstaUserId}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm mt-1 max-w-md leading-relaxed text-center md:text-start">
                      {selectedInstaUser?.description}
                    </p>
                    <p className="text-sm mt-1 max-w-md leading-relaxed text-center md:text-start">
                      {selectedInstaUser?.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedInstaUser?.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-4">
                  {/* Stats Section */}
                  <div className="flex justify-center lg:justify-start gap-8 text-center">
                    <div>
                      <p className="text-lg font-semibold text-black">
                        {allInstaPosts.length}
                      </p>
                      <p className="text-sm text-gray-600">Posts</p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-black">
                        {selectedInstaUser?.followers_count}
                      </p>
                      <p className="text-sm text-gray-600">Followers</p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-black">
                        {selectedInstaUser?.follows_count}
                      </p>
                      <p className="text-sm text-gray-600">Following</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    {/* Edit Profile */}
                    <button className="px-5 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                      Edit Profile
                    </button>

                    {/* Drawer Button */}
                    <IconButton
                      onClick={() => setOpenRightDrawer(true)}
                      className="border border-gray-300 rounded-lg"
                    >
                      <MenuOpenIcon />
                    </IconButton>

                    {/* Drawer */}
                    <Drawer
                      anchor="right"
                      open={openRightDrawer}
                      onClose={() => setOpenRightDrawer(false)}
                    >
                      <Box sx={{ width: 320 }} className="p-5 space-y-5">
                        {/* Instagram User */}
                        <DropdownWithSearch
                          id="istaUser"
                          name="instaUser"
                          label="Instagram User"
                          placeholder="Select Instagram User"
                          options={instaUserOptions}
                          value={selectedInstaUser}
                          onChange={(val) => setSelectedInstaUser(val)}
                        />

                        {selectedInstaUser && (
                          <div className="flex flex-col gap-4">
                            <UniversalDatePicker
                              id="instafromdate"
                              name="instafromdate"
                              label="From"
                              placeholder="dd-mm-yy"
                              defaultValue={new Date()}
                              value={dates?.fromDate}
                              onChange={(value) =>
                                setDates((prev) => ({
                                  ...prev,
                                  fromDate: value,
                                }))
                              }
                            />

                            <UniversalDatePicker
                              id="instatodate"
                              name="instatodate"
                              label="To"
                              placeholder="dd-mm-yy"
                              defaultValue={new Date()}
                              value={dates?.toDate}
                              onChange={(value) =>
                                setDates((prev) => ({
                                  ...prev,
                                  toDate: value,
                                }))
                              }
                            />
                          </div>
                        )}

                        {/* Search Button */}
                        <UniversalButton
                          label="Search"
                          onClick={fetchAllInstaPosts}
                          disabled={!selectedInstaUser}
                          className="w-full"
                        />
                      </Box>
                    </Drawer>
                  </div>
                </div>
              </div>

              {/* Post Gallery */}

              <div className="flex items-center justify-between mt-6">
                {/* Centered Tabs */}
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center justify-center gap-10 border-t border-gray-200">
                    {tabs.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => handleChange(t.key)}
                        className={`py-3 uppercase tracking-wide border-t-2 transition flex items-center gap-2 ${activeTab === t.key
                          ? "border-black text-black"
                          : "border-transparent text-gray-400 hover:text-black"
                          }`}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <UniversalButton
                    label="Sync Posts"
                    icon={<IoMdSync />}
                    onClick={() => setSyncPostDialog(true)}
                  />
                </div>

                {/* Right-aligned Button */}
                {/* <button
                  onClick={() => setOpenPostDialog(true)}
                  className="ml-4 px-2 py-1 border border-black text-black font-medium hover:bg-black hover:text-white transition-all rounded-md"
                >
                  Add New Post
                </button> */}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-6">
                {allInstaPosts
                  .filter((item) => {
                    const postType = item.post?.postType;

                    if (activeTab === "POSTS") return postType === "FEED";
                    if (activeTab === "REELS") return postType === "REELS";
                    if (activeTab === "TAGGED") return false;

                    return true;
                  })
                  .map((item, idx) => {
                    const media = item.media?.[0];
                    const isCarousel =
                      item.post?.mediaType === "CAROUSEL_ALBUM";
                    const isVideo =
                      item.post?.postType === "REELS" ||
                      media?.mediaType === "VIDEO";

                    return (
                      <div
                        key={item.post.postId || idx}
                        className="relative group overflow-hidden border border-black rounded-md shadow-sm hover:scale-102 transition-transform w-full aspect-square"
                        onClick={() => {
                          setOpenPostDetails(true);
                          setSelectedPost(item);
                        }}
                      >
                        {!loaded && (
                          <Skeleton
                            height="100%"
                            width="100%"
                            className="absolute inset-0 z-0"
                          />
                        )}

                        {/* MEDIA */}
                        {isVideo ? (
                          <video
                            src={media?.mediaUrl}
                            muted
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            onLoadedData={() => setLoaded(true)}
                          />
                        ) : media?.mediaUrl ? (
                          <img
                            src={media.mediaUrl}
                            alt="No Instagram post found"
                            className="w-full h-full object-cover"
                            onLoad={() => setLoaded(true)}
                          />
                        ) : (
                          <p>No image/video found</p>
                        )}

                        {/* 🔹 CAROUSEL ICON */}
                        {isCarousel && (
                          <div className="absolute top-2 left-2 text-white drop-shadow-md">
                            <ViewCarouselIcon />
                          </div>
                        )}

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="text-white flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-1">
                              <FaRegHeart />{" "}
                              <span>{item.post.likeCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaRegComment />{" "}
                              <span>{item.post.commentsCount}</span>
                            </div>
                          </div>
                        </div>

                        {/* SYNC */}
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
                      </div>
                    );
                  })}
              </div>
              <Dialog
                header="Sync Post"
                visible={syncPostDialog}
                style={{ width: "800px", maxWidth: "80vw" }}
                onHide={() => setSyncPostDialog(false)}
                className="rounded-xl overflow-y-hidden"
                maximizable
              >
                <div className="flex items-center justify-center">
                  <UniversalButton
                    label={loading ? "Syncing post" : "Sync Post"}
                    disabled={loading}
                    onClick={handleSyncInstaPost}
                  />
                </div>
              </Dialog>

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
                        src={selectedInstaUser?.media?.[0]?.mediaUrl}
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
                          {media?.mediaType === "IMAGE" && (
                            <img
                              src={media.mediaUrl}
                              className="h-full w-full object-contain rounded-xl"
                            />
                          )}

                          {media?.mediaType === "VIDEO" && (
                            <video
                              src={media.mediaUrl}
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
                                className={`w-2 h-2 rounded-full ${i === carouselIndex
                                  ? "bg-gray-400"
                                  : "bg-gray-400/40"
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
                                  )
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
                            {formatDateForPost(
                              selectedPost?.post?.postDateTime
                            )}
                          </p>
                        </div>

                        {/* ================= COMMENTS ================= */}
                        <div className="space-y-6 mb-[32rem]">
                          {instaPostComments?.map((item) => {
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
                                      <TiArrowSync
                                        size={22}
                                        className={`cursor-pointer transition ${rotatingId === c.commentId
                                          ? "animate-spin text-blue-600"
                                          : "text-gray-400 hover:text-blue-600"
                                          }`}
                                        onClick={() => {
                                          setRotatingId(c.commentId);
                                          setTimeout(
                                            () => setRotatingId(null),
                                            700
                                          );
                                          handleSyncComment(
                                            selectedPost,
                                            c.commentId
                                          );
                                        }}
                                      />

                                      <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                          toggleCommentLike(c.commentId)
                                        }
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
                                        <div
                                          key={idx}
                                          className="flex gap-3 min-w-0"
                                        >
                                          {/* Reply Avatar */}
                                          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold shrink-0">
                                            {c.userName
                                              ?.charAt(0)
                                              ?.toUpperCase()}
                                          </div>

                                          <div className="min-w-0">
                                            <p className="text-sm text-gray-800 break-words">
                                              <span className="font-semibold mr-1">
                                                {c.userName}
                                              </span>
                                              {r.subCommentText ||
                                                r.commentText ||
                                                r}
                                            </p>

                                            <div className="flex gap-4 text-xs text-gray-400 mt-1">
                                              <span>
                                                {timeAgo(r.commentDateTime)}
                                              </span>
                                              <span>
                                                {r.likeCount || 0} likes
                                              </span>
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
                    <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex gap-3">
                      <MdOutlineEmojiEmotions className="text-xl text-gray-400 mt-2" />

                      <input
                        className="flex-1 bg-white border rounded-full px-4 py-2 text-sm focus:outline-none"
                        placeholder={
                          replyUser ? `${replyUser}` : "Write a comment"
                        }
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        onClick={handleSendComment}
                        className="text-blue-500 font-semibold"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog>

              {/* <Dialog
                header="Add New Post"
                visible={openPostDialog}
                style={{ width: "800px", maxWidth: "80vw" }}
                onHide={() => setOpenPostDialog(false)}
                className="rounded-xl"
                maximizable
              ></Dialog> */}

              {openPostDialog && (
                <AddPostDialog
                  open={openPostDialog}
                  setOpenPostDialog={setOpenPostDialog}
                />
              )}
            </div>
          )}
        </>
      )}

      {/* {onboardedStatus &&
        instaUsers.length === 0 &&
        allInstaPosts.length === 0 && (
          <EmbeddedInstagram
            userAceessToken={userAceessToken}
            setUserAccessToken={setUserAccessToken}
            setOnboaredStatus={setOnboaredStatus}
            onboardedStatus={onboardedStatus}
          />
        )} */}

      {onboardedStatus && instaUsers.length === 0 && (
        <EmbeddedInstagram
          userAceessToken={userAceessToken}
          setUserAccessToken={setUserAccessToken}
          setOnboaredStatus={setOnboaredStatus}
          onboardedStatus={onboardedStatus}
        />
      )}

      {!onboardedStatus && instaUsers.length === 0 && (
        // <div className="p-10 text-center">Loading Profile...</div>
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default ManageInstaProfile;
