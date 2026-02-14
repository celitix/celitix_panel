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
  createInstaPostContainer,
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

const InstaPostReel = () => {
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
  const [aspectRatio, setAspectRatio] = useState("9/16");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // Reel info starts

  const [postUrls, setPostUrls] = useState(null);
  const [postCreatedId, setPostCreatedId] = useState("");
  const [reelFile, setReelFile] = useState(null);

  const [carouselIds, setCarouselIds] = useState([]);
  const [combinedCarouselId, setCombinedCarouselId] = useState("");
  const [shareToFeed, setShareToFeed] = useState(false);
  const [loader, setLoader] = useState(false)

  // Reel info ends

  const fileInputRef = useRef(null);

  const generateId = () =>
    window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only video
    if (!file.type.startsWith("video")) {
      alert("Only video files are allowed for Reels.");
      e.target.value = "";
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      const duration = video.duration; // seconds
      const width = video.videoWidth;
      const height = video.videoHeight;

      console.log("duration", duration);

      URL.revokeObjectURL(video.src);

      const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300 MB

      const MIN_ASPECT_RATIO = 0.01;
      const MAX_ASPECT_RATIO = 10;
      const RECOMMENDED_RATIO = 9 / 16;
      const TOLERANCE = 0.05;

      const allowedTypes = ["video/mp4", "video/x-matroska", "video/mkv"];

      // File size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be 300 MB or less.");
        return;
      }

      // Duration
      if (duration < 3) {
        toast.error("Reel must be at least 3 seconds long.");
        return;
      }
      if (duration > 600) {
        toast.error("Reel cannot be longer than 10 minutes.");
        return;
      }

      // Dimensions
      if (width < 640 || height < 640) {
        toast.error("Minimum resolution is 640 × 640 pixels.");
        return;
      }

      // Aspect ratio
      const calculatedAspectRatio = width / height;

      if (calculatedAspectRatio < 0.01 || calculatedAspectRatio > 10) {
        toast.error(
          "Invalid aspect ratio. Allowed range is between 0.01:1 and 10:1."
        );
        return;
      }

      // if (Math.abs(calculatedAspectRatio - 9 / 16) > 0.05) {
      //   toast.error(
      //     "Recommended aspect ratio is 9:16 to avoid cropping or blank space."
      //   );
      // }

      const reelMedia = {
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
        mediaType: "VIDEO",
      };

      setReelFile(reelMedia);
      setStep(1);
      e.target.value = "";
    };

    video.onerror = () => {
      toast.error("Unable to load video metadata. Please try another file.");
      e.target.value = "";
    };
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
    setLoader(true)
    const creationId = id;
    try {
      const res = await publishInstaPostContainer(creationId);
      console.log(res);
      if(res.statusCode === 200){
        toast.success("Posted a reel successfully!!")
      }else{
        toast.error(res?.response?.data?.data?.error?.message);
      }
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoader(false)
    }
  };

  const handleCreateInstaPost = async () => {
    const data = {
      mediaUrl: postUrls,
      mediaType: "REELS",
      caption: caption,
      shareToFeed: shareToFeed,
    };

    try {
      const res = await createInstaPostContainer(data);
      if (res?.statusCode === 200) {
        setPostCreatedId(res.data.id);
      }else{
        toast.error(res?.message)
      }
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoader(false)
    }
  };

  useEffect(() => {
    if (postUrls) {
      handleCreateInstaPost(postUrls);
    }
  }, [postUrls]);

  useEffect(() => {
    if (postCreatedId) {
      handlePublishInstaPost(postCreatedId);
    }
  }, [postCreatedId]);

  const getFileUrl = async () => {
    setLoader(true)
    const selectedFile = reelFile.file;

    try {
      const res = await uploadImageFile(selectedFile, 1);
      if (res.status) {
        setPostUrls(res?.fileUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Functions ends

  const activeAdjustments = reelFile?.adjustments || {
    brightness: 100,
    contrast: 100,
    hueRotate: 0,
    grayscale: 0,
  };

  const buildFilterString = () => {
    const a = reelFile?.adjustments || {};
    return `
    ${reelFile?.filter || ""}
    brightness(${a.brightness ?? 100}%)
    contrast(${a.contrast ?? 100}%)
    hue-rotate(${a.hueRotate ?? 0}deg)
    grayscale(${a.grayscale ?? 0}%)
  `;
  };

  const updateAdjustment = (key, value) => {
    setReelFile((prev) => ({
      ...prev,
      adjustments: {
        ...prev.adjustments,
        [key]: value,
      },
    }));
  };

  return (
    <>
    {loader && <Loader text="Posting a reel"/>}
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
            <p className="text-3xl font-semibold mb-4">Post a reel</p>
            <div className="my-2">
              <svg viewBox="0 0 64 64" width="96" height="96">
                <rect
                  x="6"
                  y="10"
                  width="52"
                  height="48"
                  rx="12"
                  fill="#9CA3AF" // Tailwind gray-400
                />
                <path d="M6 20h52" stroke="#E5E7EB" strokeWidth="2" />
                <path
                  d="M16 10l8 10M28 10l8 10M40 10l8 10"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path d="M28 30l12 8-12 8V30z" fill="#F3F4F6" />
              </svg>
            </div>
            <input
              type="file"
              multiple
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 rounded-md transition bg-blue-500 text-white hover:bg-blue-600"
            >
              Select from computer
            </button>
            {/* <p className="text-black text-xl mt-4">
              or drag & drop photos or videos here
            </p> */}
          </div>
        )}

        {step > 0 && (
          <>
            <div
              className="flex-1 bg-black relative"
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
                  <video
                    src={reelFile?.previewUrl}
                    muted
                    controls
                    playsInline
                    className="object-contain w-full h-full"
                    style={{
                      transform: `scale(${zoom})`,
                      filter: buildFilterString(),
                    }}
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="md:w-[300px] w-full overflow-y-auto bg-white border-4 border-gray-200 rounded-xl">
              {/* Top Bar */}
              {step === 3 ? (
                <div className="flex justify-between items-center px-4 py-2 border-b text-sm font-medium cursor-pointer">
                  <button onClick={() => setStep(2)}>←</button>
                  <span>Create new post</span>
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
                  {/* Add below button near left side of Crop & Zoom on top bar*/}
                  {/* <button onClick={() => setShowDiscardDialog(true)}>←</button> */}
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
                  <div className="flex space-x-4 mb-4">
                    <button
                      className={`font-semibold ${
                        adjustmentTab === "filters"
                          ? "border-b-2 border-black"
                          : "text-gray-500"
                      }`}
                      onClick={() => setAdjustmentTab("filters")}
                    >
                      Filters
                    </button>
                    <button
                      className={`font-semibold ${
                        adjustmentTab === "adjustments"
                          ? "border-b-2 border-black"
                          : "text-gray-500"
                      }`}
                      onClick={() => setAdjustmentTab("adjustments")}
                    >
                      Adjustments
                    </button>
                  </div>

                  {/* Filters Grid */}
                  {adjustmentTab === "filters" && (
                    <div className="grid grid-cols-3 gap-2">
                      {FILTERS.map((filter) => {
                        const isSelected = reelFile?.filter === filter.style;

                        return (
                          <div
                            key={filter.name}
                            onClick={() =>
                              setReelFile((prev) => ({
                                ...prev,
                                filter: filter.style,
                              }))
                            }
                            className={`text-center cursor-pointer p-1 rounded transition
                            ${
                              isSelected
                                ? "border-2 border-gray-500"
                                : "border border-transparent hover:border-gray-300"
                            }
                          `}
                          >
                            <video
                              src={reelFile?.previewUrl}
                              muted
                              playsInline
                              className="w-full h-20 object-cover rounded"
                              style={{ filter: filter.style }}
                            />

                            <p
                              className={`text-xs mt-1 ${
                                isSelected ? "font-semibold text-gray-600" : ""
                              }`}
                            >
                              {filter.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Adjustments Sliders */}
                  {adjustmentTab === "adjustments" && reelFile && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm block mb-1">Brightness</label>
                        <input
                          type="range"
                          min={50}
                          max={150}
                          step={1}
                          value={activeAdjustments.brightness}
                          onChange={(e) =>
                            updateAdjustment(
                              "brightness",
                              Number(e.target.value)
                            )
                          }
                          className="w-full h-2 rounded-lg cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm block mb-1">Contrast</label>
                        <input
                          type="range"
                          min={50}
                          max={150}
                          step={1}
                          value={activeAdjustments.contrast}
                          onChange={(e) =>
                            updateAdjustment("contrast", Number(e.target.value))
                          }
                          className="w-full h-2 rounded-lg cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm block mb-1">Hue Rotate</label>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          step={1}
                          value={activeAdjustments.hueRotate}
                          onChange={(e) =>
                            updateAdjustment(
                              "hueRotate",
                              Number(e.target.value)
                            )
                          }
                          className="w-full h-2 rounded-lg cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm block mb-1">Grayscale</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={activeAdjustments.grayscale}
                          onChange={(e) =>
                            updateAdjustment(
                              "grayscale",
                              Number(e.target.value)
                            )
                          }
                          className="w-full h-2 rounded-lg cursor-pointer accent-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Caption */}
              {step === 3 && (
                <div className="p-4 space-y-4 relative">
                  <button
                    onClick={() => setShowDiscardDialog(true)}
                    className="absolute right-6 text-2xl"
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

                  <div className="flex gap-6">
                    <h1 className="block text-sm mb-1">Share to feed</h1>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="shareToFeed"
                        checked={shareToFeed === true}
                        onChange={() => setShareToFeed(true)}
                      />
                      Yes
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="shareToFeed"
                        checked={shareToFeed === false}
                        onChange={() => setShareToFeed(false)}
                      />
                      No
                    </label>
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
              <p className="m-0">Are you sure you want to discard this post?</p>

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
                    setReelFile(null);
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

export default InstaPostReel;
