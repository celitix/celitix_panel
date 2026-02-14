import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";

// ICONS
import { RxCross2 } from "react-icons/rx";

// APIS
import {
  createInstaStoryContainer,
  publishInstaPostContainer,
} from "@/apis/instagram/instagram";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

// COMPONENTS
import Loader from "./Loader";

const FILTERS = [
  { name: "Normal", style: "" },
  { name: "Clarendon", style: "contrast(1.2) saturate(1.25)" },
  { name: "Gingham", style: "grayscale(0.5) contrast(1.1)" },
  { name: "Lark", style: "brightness(1.1) saturate(1.15)" },
  { name: "Juno", style: "contrast(1.15) saturate(1.3)" },
  { name: "Crema", style: "contrast(0.9) brightness(1.1)" },
  { name: "Aden", style: "hue-rotate(20deg) brightness(1.1)" },
];

const CreateInstaStory = () => {
  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [adjustmentTab, setAdjustmentTab] = useState("filters");
  const [aspectRatio, setAspectRatio] = useState("original");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const videoRef = useRef(null);

  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  // Story info starts

  const [postUrls, setPostUrls] = useState(null);
  const [storyFile, setStoryFile] = useState(null);
  const [storyId, setStoryId] = useState("");
  const [input, setInput] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [loader, setLoader] = useState(false);
  // Story info ends

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddUsernames = () => {
    if (!input.trim()) return;

    // Split by comma, space, or newline
    const names = input
      .split(/[\s,]+/)
      .map((n) => n.trim())
      .filter(Boolean); // remove empty strings

    const structured = names.map((username) => ({ username }));

    setUsernames(structured);
    setInput(""); // clear input if needed
  };

  const fileInputRef = useRef(null);

  const generateId = () =>
    window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const MAX_IMAGE_SIZE = 8 * 1024 * 1024 * 1024; // 8 GB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB
  const MIN_VIDEO_DURATION = 3; // seconds
  const MAX_VIDEO_DURATION = 60; // seconds

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image");
    const isVideo = file.type.startsWith("video");

    if (!isImage && !isVideo) {
      toast.error("Only image or video files are allowed for Stories.");
      e.target.value = "";
      return;
    }

    /* ---------------- IMAGE VALIDATION ---------------- */
    if (isImage) {
      if (file.type !== "image/jpeg") {
        toast.error("Only JPEG images are allowed for Stories.");
        e.target.value = "";
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("Image size must be 8 GB or less.");
        e.target.value = "";
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        setStoryFile({
          id: generateId(),
          file,
          previewUrl: URL.createObjectURL(file),
          mediaType: "IMAGE",
        });

        setStep(1);
      };

      img.onerror = () => {
        toast.error("Unable to load image.");
        URL.revokeObjectURL(objectUrl);
        e.target.value = "";
      };

      return;
    }

    /* ---------------- VIDEO VALIDATION ---------------- */
    if (isVideo) {
      if (file.size > MAX_VIDEO_SIZE) {
        toast.error("Video size must be 100 MB or less.");
        e.target.value = "";
        return;
      }

      const video = document.createElement("video");
      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        const duration = video.duration;
        URL.revokeObjectURL(objectUrl);

        if (duration < MIN_VIDEO_DURATION) {
          toast.error("Video must be at least 3 seconds long.");
          e.target.value = "";
          return;
        }

        if (duration > MAX_VIDEO_DURATION) {
          toast.error("Video cannot be longer than 60 seconds.");
          e.target.value = "";
          return;
        }

        setStoryFile({
          id: generateId(),
          file,
          previewUrl: URL.createObjectURL(file),
          mediaType: "VIDEO",
        });

        setStep(1);
      };

      video.onerror = () => {
        toast.error("Unable to load video.");
        URL.revokeObjectURL(objectUrl);
        e.target.value = "";
      };

      return;
    }
  };

  const filteredStyle = {
    transform: `scale(${zoom})`,
    filter: `
      ${selectedFilter}
      brightness(${brightness}%)
      contrast(${contrast}%)
      hue-rotate(${hueRotate}deg)
      grayscale(${grayscale}%)
    `,
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };

  // const aspectRatioOptions = [
  //   { label: "Original", value: "original" },
  //   { label: "1:1", value: "1/1" },
  //   { label: "4:5", value: "4/5" },
  //   { label: "16:9", value: "16/9" },
  // ];

  const STORY_ASPECT_RATIO = "9 / 16";

  const getImageContainerStyle = () => ({
    aspectRatio: STORY_ASPECT_RATIO,
    width: "100%",
    maxWidth: "360px", // optional: Instagram-like width
    margin: "0 auto",
    backgroundColor: "black",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  // Functions starts

  const handlePublishInstaPost = async (id) => {
    setLoader(true);
    const creationId = id;
    try {
      const res = await publishInstaPostContainer(creationId);
      console.log("res from publishing", res);
      if (res.statusCode === 200) {
        toast.success("Posted a story successfully!!");
      } else {
        toast.error(res?.response?.data?.data?.error?.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
      setStoryFile(null)
    }
  };

  const handlePostInstaStory = async (postUrls) => {
    handleAddUsernames();
    const data = {
      mediaUrl: postUrls,
      mediaType: "video",
      userTags: usernames,
    };

    try {
      const res = await createInstaStoryContainer(data);
      if (res?.statusCode === 200) {
        setStoryId(res.data.id);
      } else {
        toast.error("Error in creating a story");
      }
      console.log(res);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (storyId) {
      handlePublishInstaPost(storyId);
    }
  }, [storyId]);

  const getFileUrl = async () => {
    setLoader(true);
    const selectedFile = storyFile.file;

    try {
      const res = await uploadImageFile(selectedFile, 1);
      if (res.status) {
        setPostUrls(res?.fileUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (postUrls) {
      handlePostInstaStory(postUrls);
    }
  }, [postUrls]);

  // Functions ends

  const activeAdjustments = storyFile?.adjustments || {
    brightness: 100,
    contrast: 100,
    hueRotate: 0,
    grayscale: 0,
  };

  const buildFilterString = () => {
    const a = storyFile?.adjustments || {};
    return `
    ${storyFile?.filter || ""}
    brightness(${a.brightness ?? 100}%)
    contrast(${a.contrast ?? 100}%)
    hue-rotate(${a.hueRotate ?? 0}deg)
    grayscale(${a.grayscale ?? 0}%)
  `;
  };

  const updateAdjustment = (key, value) => {
    setStoryFile((prev) => ({
      ...prev,
      adjustments: {
        ...prev.adjustments,
        [key]: value,
      },
    }));
  };

  return (
    <>
      {loader && <Loader text="Posting a story" />}
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-6xl h-[780px] rounded-4xl flex flex-col md:flex-row gap-10 overflow-hidden transition-all duration-300">
          {step === 0 && (
            <div
              className="flex-1 flex flex-col justify-center items-center border-4 border-dashed border-gray-300 rounded-4xl p-10"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 10) {
                  alert("You can upload a maximum of 10 images.");
                  return;
                }
                const urls = files.map((file) => URL.createObjectURL(file));
                setImages(urls);
                setStep(1);
              }}
            >
              <p className="text-3xl font-semibold mb-4">Upload a story</p>
              <div className="my-2">
                <svg viewBox="0 0 64 64" width="96" height="96">
                  {/* Outer story frame */}
                  <rect
                    x="10"
                    y="4"
                    width="44"
                    height="56"
                    rx="14"
                    fill="none"
                    stroke="#9CA3AF" /* neutral gray */
                    strokeWidth="3"
                  />

                  {/* Inner content frame */}
                  <rect
                    x="16"
                    y="10"
                    width="32"
                    height="44"
                    rx="10"
                    fill="#9CA3AF"
                    opacity="0.08"
                  />

                  {/* Play icon */}
                  <path
                    d="M28 26l10 6-10 6V26z"
                    fill="#6B7280" /* darker gray */
                  />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*,video/mp4,video/webm,video/quicktime"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 rounded-md transition bg-blue-500 text-white hover:bg-blue-600"
              >
                Select from computer
              </button>
            </div>
          )}

          {step > 0 && (
            <>
              <div
                className="flex-1 bg-black relative border-3 border-gray-400"
                style={getImageContainerStyle()}
              >
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="h-full"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination]}
                  navigation
                >
                  <SwiperSlide>
                    {storyFile?.mediaType === "VIDEO" ? (
                      <video
                        ref={videoRef}
                        src={storyFile.previewUrl}
                        muted
                        controls
                        playsInline
                        className="object-contain w-full h-full"
                        onLoadedMetadata={(e) => {
                          setVideoDuration(e.target.duration);
                          setTrimEnd(e.target.duration);
                        }}
                        onTimeUpdate={(e) => {
                          if (e.target.currentTime >= trimEnd) {
                            e.target.pause();
                            e.target.currentTime = trimStart;
                          }
                        }}
                        style={{
                          transform: `scale(${zoom})`,
                          filter: buildFilterString(),
                        }}
                      />
                    ) : (
                      <img
                        src={storyFile?.previewUrl}
                        alt="Story preview"
                        className="object-contain w-full h-full"
                        style={{
                          transform: `scale(${zoom})`,
                          filter: buildFilterString(),
                        }}
                      />
                    )}
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="md:w-[300px] w-full overflow-y-auto bg-white border-4 border-gray-200 rounded-xl">
                {/* Top Bar */}
                {step === 3 ? (
                  <div className="flex justify-between items-center px-4 py-2 border-b text-sm font-medium cursor-pointer">
                    <button onClick={() => setStep(2)}>←</button>
                    <span>Create new story</span>
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        getFileUrl();
                      }}
                    >
                      Share
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (step === 1) {
                            setShowDiscardDialog(true);
                          } else {
                            setStep(step - 1);
                          }
                        }}
                        className="text-xl text-gray-700 cursor-pointer"
                      >
                        ←
                      </button>
                      {/* <p className="font-medium">Crop & Zoom</p> */}
                      <p className="font-medium">
                        {step === 1 ? "Crop & Zoom" : step === 2 ? "Edit" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep((prev) => prev + 1)}
                      className="px-4 py-2 rounded-md transition border border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-100"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Step 1: Zoom and Aspect Ratio */}
                {step === 1 && (
                  <div className="p-4 space-y-4 relative">
                    <button
                      onClick={() => setShowDiscardDialog(true)}
                      className="absolute right-6 text-2xl"
                    >
                      <RxCross2 />
                    </button>
                    <div>
                      <p className="text-sm">Zoom</p>
                      <input
                        type="range"
                        min={1}
                        max={2}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                    {/* <div>
                    <p className="text-sm">Aspect Ratio</p>
                    <div className="flex space-x-2 mt-2">
                      {aspectRatioOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAspectRatio(option.value)}
                          className={`px-3 py-1 rounded-md text-sm transition ${
                            aspectRatio === option.value
                              ? "bg-blue-500 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div> */}
                  </div>
                )}

                {/* Step 2: Filters / Adjustments */}
                {step === 2 && (
                  <div className="p-4 relative">
                    <button
                      onClick={() => setShowDiscardDialog(true)}
                      className="absolute right-6 text-2xl"
                    >
                      <RxCross2 />
                    </button>
                    {/* Toggle Tabs */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Trim video</p>

                      {/* Start */}
                      <div>
                        <label className="text-xs">
                          Start: {trimStart.toFixed(1)}s
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={videoDuration}
                          step={0.1}
                          value={trimStart}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value < trimEnd) {
                              setTrimStart(value);
                              videoRef.current.currentTime = value;
                            }
                          }}
                          className="w-full"
                        />
                      </div>

                      {/* End */}
                      <div>
                        <label className="text-xs">
                          End: {trimEnd.toFixed(1)}s
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={videoDuration}
                          step={0.1}
                          value={trimEnd}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value > trimStart) {
                              setTrimEnd(value);
                            }
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Caption */}
                {step === 3 && (
                  <div className="p-4 space-y-4 relative">
                    <button
                      onClick={() => setShowDiscardDialog(true)}
                      className="absolute right-4 text-xl"
                    >
                      <RxCross2 />
                    </button>
                    <div>
                      <label className="block text-sm mb-1">Caption</label>
                      <textarea
                        className="w-full border rounded-md p-2 text-sm resize-none h-24"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Location</label>
                      <input
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add location"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full max-w-md">
                      <input
                        type="text"
                        placeholder="Enter usernames separated by comma, space, or newline"
                        value={input}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />

                      <button
                        type="button"
                        onClick={handleAddUsernames}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {showDiscardDialog && (
            <Dialog
              header="Discard Post?"
              draggable={false}
              visible={showDiscardDialog}
              onHide={() => setShowDiscardDialog(false)}
              style={{ width: "550px" }}
            >
              <div className="p-1 ">
                {/* <h2 className="text-xl font-semibold">Discard Post?</h2> */}
                <p className="m-0">
                  Are you sure you want to discard this post?
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <button
                    className="px-2 py-2 text-gray-800 border border-gray-300 cursor-pointer rounded"
                    onClick={() => setShowDiscardDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-2 py-2 text-red-500 border border-gray-300 cursor-pointer rounded"
                    onClick={() => {
                      setStoryFile(null);
                      setStep(0);
                      setShowDiscardDialog(false);
                    }}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateInstaStory;
