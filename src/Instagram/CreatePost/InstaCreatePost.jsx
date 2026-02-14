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

const FILTERS = [
  { name: "Normal", style: "" },
  { name: "Clarendon", style: "contrast(1.2) saturate(1.25)" },
  { name: "Gingham", style: "grayscale(0.5) contrast(1.1)" },
  { name: "Lark", style: "brightness(1.1) saturate(1.15)" },
  { name: "Juno", style: "contrast(1.15) saturate(1.3)" },
  { name: "Crema", style: "contrast(0.9) brightness(1.1)" },
  { name: "Aden", style: "hue-rotate(20deg) brightness(1.1)" },
];

// COMPONENTS 
import Loader from "./Loader";

const InstaCreatePost = () => {
  const [step, setStep] = useState(0);
  // const [file, setFile] = useState([]);
  // const [images, setImages] = useState([]);
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
  const [aspectRatio, setAspectRatio] = useState("1 / 1");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // Post info starts

  const [postUrls, setPostUrls] = useState(null);
  const [postCreatedId, setPostCreatedId] = useState("");
  const [multiFiles, setMultiFiles] = useState([]);
  const [carouselIds, setCarouselIds] = useState([]);
  const [combinedCarouselId, setCombinedCarouselId] = useState("");
  const [loader, setLoader] = useState(false)

  // Post info ends

  const fileInputRef = useRef(null);

  const generateId = () =>
    window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  useEffect(() => {
    if (multiFiles.length > 0) {
      setAspectRatio("1 / 1");
    }
  }, [multiFiles]);

  const MAX_FILES = 10;
  const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8 MB
  const MIN_WIDTH = 320;
  const MAX_WIDTH = 1440;

  const MIN_RATIO = 4 / 5; // 0 .8
  const MAX_RATIO = 1.91; // 1.91

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (files.length + multiFiles.length > MAX_FILES) {
      toast.error("You can upload a maximum of 10 images/videos.");
      e.target.value = "";
      return;
    }

    const validatedMedia = [];

    for (const file of files) {
      const isVideo = file.type.startsWith("video");
      const isImage = file.type.startsWith("image");

      // Invalid type
      if (!isImage && !isVideo) {
        toast.error("Only image or video files are allowed.");
        continue;
      }

      /* ================= IMAGE VALIDATIONS ================= */
      if (isImage) {
        // Format
        if (file.type !== "image/jpeg") {
          toast.error("Only JPEG images are allowed.");
          continue;
        }

        // Size
        if (file.size > MAX_IMAGE_SIZE) {
          toast.error("Image size must be 8 MB or less.");
          continue;
        }

        // Dimension & ratio validation
        const isValidImage = await new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            const width = img.width;
            const height = img.height;
            const ratio = width / height;

            URL.revokeObjectURL(img.src);

            if (ratio < MIN_RATIO || ratio > MAX_RATIO) {
              toast.error("Image aspect ratio must be between 4:5 and 1.91:1.");
              resolve(false);
              return;
            }

            if (width < MIN_WIDTH) {
              toast.error("Minimum image width is 320px.");
              resolve(false);
              return;
            }

            // Width > 1440 is allowed (can be scaled later)
            resolve(true);
          };

          img.onerror = () => {
            toast.error("Unable to load image.");
            resolve(false);
          };
        });

        if (!isValidImage) continue;
      }

      /* ================= ADD VALID FILE ================= */
      validatedMedia.push({
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
        mediaType: isVideo ? "VIDEO" : "IMAGE",
      });
    }

    if (!validatedMedia.length) {
      e.target.value = "";
      return;
    }

    setMultiFiles((prev) => [...prev, ...validatedMedia]);
    setStep(1);
    e.target.value = "";
  };

  const filteredStyle = {
    // transform: `scale(${zoom})`,
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

  const aspectRatioOptions = [
    { label: "1:1", value: "1 / 1" },
    { label: "4:5", value: "4 / 5" },
    { label: "16:9", value: "16 / 9" },
  ];

  const getImageContainerStyle = () => ({
    aspectRatio,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  // Functions starts

  const handlePublishInstaPost = async (id) => {
    setLoader(true)
    const creationId = id;

    console.log("creationId", creationId);
    try {
      const res = await publishInstaPostContainer(creationId);
      console.log(res);
      if(res.statusCode === 200){
        toast.success("Posted Successfully")
      }else{
        toast.error(res?.response?.data?.data?.error?.message);
      }
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoader(false)
    }
  };

  const getMediaTypeFromUrl = (url) => {

    if (typeof url !== "string") return "IMAGE"; // default or throw

    const ext = url.split(".").pop().toLowerCase().split("?")[0];

    if (["mp4", "mov", "webm", "mkv"].includes(ext)) return "VIDEO";
    return "IMAGE";
  };

  const handleCreateInstaPost = async (postUrls) => {
    const mediaType = getMediaTypeFromUrl(postUrls);

    const data = {
      mediaUrl: postUrls,
      mediaType,
      isCarouselItem: Array.isArray(postUrls) && postUrls.length > 1,
      ...(mediaType === "VIDEO" && { uploadType: "resumable" }),
    };

    try {
      const res = await createInstaPostContainer(data);
      if (res?.statusCode === 200) {
        setPostCreatedId(res.data.id);
      }else{
        toast.error(res?.data?.error?.message)
      }
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }finally{
          setLoader(false)
    }
  };

  useEffect(() => {
    if (postCreatedId) {
      handlePublishInstaPost(postCreatedId);
    }
  }, [postCreatedId]);

  const getFileUrl = async () => {
        setLoader(true)
    const selectedFile = multiFiles[0].file;
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
      handleCreateInstaPost(postUrls);
    }
  }, [postUrls]);

  const createCarouselItems = async () => {
    const ids = [];

    for (let i = 0; i < multiFiles.length; i++) {
      const media = multiFiles[i];
      console.log("media", media);
      // upload file
      const uploadRes = await uploadImageFile(media.file, i);
      if (!uploadRes?.status) continue;

      // create container
      const res = await createInstaPostContainer({
        mediaUrl: uploadRes.fileUrl,
        mediaType: media.mediaType,
        isCarouselItem: true,
      });

      if (res?.statusCode === 200) {
        ids.push(res.data.id); // save id
      }
    }

    setCarouselIds(ids);
  };

  const createCarouselIdsInstaItems = async () => {
    const data = {
      caption: caption,
      mediaType: "CAROUSEL",
      children: carouselIds,
    };
    try {
      const res = await createInstaPostContainer(data);
      if (res?.statusCode === 200) {
        setCombinedCarouselId(res?.data?.id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (carouselIds.length > 1) {
      createCarouselIdsInstaItems();
    }
  }, [carouselIds]);

  useEffect(() => {
    if (combinedCarouselId) {
      handlePublishInstaPost(combinedCarouselId);
    }
  }, [combinedCarouselId]);

  // Functions ends

  const activeAdjustments = multiFiles?.[activeIndex]?.adjustments || {
    brightness: 100,
    contrast: 100,
    hueRotate: 0,
    grayscale: 0,
  };

  const updateAdjustment = (key, value) => {
    setMultiFiles((prev) =>
      prev.map((media, index) =>
        index === activeIndex
          ? {
              ...media,
              adjustments: {
                ...media.adjustments,
                [key]: value,
              },
            }
          : media
      )
    );
  };
  const buildFilterString = (media) => {
    const a = media.adjustments;
    return `
    ${media.filter || ""}
    brightness(${a?.brightness ?? 100}%)
    contrast(${a?.contrast ?? 100}%)
    hue-rotate(${a?.hueRotate ?? 0}deg)
    grayscale(${a?.grayscale ?? 0}%)
  `;
  };

  const handleZoomChange = (value) => {
    setMultiFiles((prev) =>
      prev.map((media, index) =>
        index === activeIndex ? { ...media, zoom: value } : media
      )
    );
  };

  const handleAspectRatioChange = (value) => {
    setMultiFiles((prev) =>
      prev.map((media, index) =>
        index === activeIndex ? { ...media, aspectRatio: value } : media
      )
    );
  };

  return (
    <>
    {loader && <Loader text={"Posting an instagram post"}/>}
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
            <p className="text-3xl font-semibold mb-4">Create new post</p>
            <div className="my-2">
              <svg
                aria-label="Icon to represent media such as images or videos"
                fill="currentColor"
                height="97"
                role="img"
                viewBox="0 0 120.6 97.3"
                width="120"
              >
                <title>Icon to represent media such as images or videos</title>
                <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" />
                <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" />
                <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" />
              </svg>
            </div>
            <input
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm,video/quicktime"
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
            <p className="text-black text-xl mt-4">
              or drag & drop photos or videos here
            </p>
          </div>
        )}

        {step > 0 && (
          <>
            <div
              className="flex-1 bg-white relative border-3 border-gray-200 rounded-2xl"
              style={getImageContainerStyle()}
            >
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="h-full"
                pagination={{ clickable: true }}
                navigation
                modules={[Navigation, Pagination]}
              >
                {multiFiles.map((media) => (
                  <SwiperSlide key={media.id} className="h-full">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      {media.mediaType === "VIDEO" ? (
                        <video
                          src={media.previewUrl}
                          muted
                          controls
                          playsInline
                          className="w-full h-full object-contain"
                          style={{
                            transform: `scale(${media.zoom || 1})`,
                            filter: buildFilterString(media),
                          }}
                        />
                      ) : (
                        <img
                          src={media.previewUrl}
                          className="w-full h-full object-contain"
                          style={{
                            transform: `scale(${media.zoom || 1})`,
                            filter: buildFilterString(media),
                          }}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="md:w-[300px] w-full overflow-y-auto bg-white border-4 border-gray-200 rounded-xl">
              {/* Top Bar */}
              {step === 3 ? (
                <div className="flex justify-between items-center px-4 py-2 border-b text-sm font-medium cursor-pointer rounded-xl">
                  <button onClick={() => setStep(2)}>←</button>
                  <span>Create new post</span>
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      if (multiFiles.length > 1) {
                        createCarouselItems(); // multiple files
                      } else {
                        getFileUrl(); // single file
                      }
                    }}
                  >
                    Share
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => setShowDiscardDialog(true)}
                      className="text-xl text-gray-700"
                    >
                      ←
                    </button> */}

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
                    className="absolute left-60 text-2xl cursor-pointer"
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
                      value={multiFiles[activeIndex]?.zoom || 1}
                      onChange={(e) => handleZoomChange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <p className="text-sm">Aspect Ratio</p>
                    <div className="flex space-x-2 mt-2">
                      {aspectRatioOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAspectRatioChange(option.value)}
                          className={`px-3 py-1 rounded-md text-sm transition ${
                            multiFiles[activeIndex]?.aspectRatio ===
                            option.value
                              ? "bg-blue-500 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload multiple images */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium">
                        Add more images
                      </label>
                      {multiFiles.length >= 10 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {multiFiles.length}/10 images uploaded
                        </span>
                      )}
                    </div>

                    {multiFiles.length < 10 && (
                      <>
                        <input
                          type="file"
                          id="add-more-images"
                          multiple
                          accept="image/*,video/mp4,video/webm,video/quicktime"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);

                            if (!files.length) return;

                            if (files.length + multiFiles.length > 10) {
                              alert(
                                "You can upload a maximum of 10 images/videos."
                              );
                              e.target.value = "";
                              return;
                            }

                            const newMediaFiles = files.map((file) => {
                              const isVideo = file.type.startsWith("video");

                              return {
                                id:
                                  crypto?.randomUUID?.() ??
                                  `${Date.now()}-${Math.random()
                                    .toString(36)
                                    .slice(2)}`,
                                file,
                                previewUrl: URL.createObjectURL(file),
                                mediaType: isVideo ? "VIDEO" : "IMAGE",
                              };
                            });

                            setMultiFiles((prev) => [
                              ...prev,
                              ...newMediaFiles,
                            ]);

                            // allow re-selecting same files
                            e.target.value = "";
                          }}
                          className="hidden"
                        />

                        <button
                          onClick={() =>
                            document.getElementById("add-more-images").click()
                          }
                          className="px-4 py-2 rounded-md transition bg-green-500 text-white hover:bg-green-600 text-sm"
                        >
                          (+) Add more images
                        </button>
                      </>
                    )}
                  </div>

                  {multiFiles?.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">
                        All Uploaded Images
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {multiFiles.map((item, i) => (
                          <div
                            key={item.id}
                            className="relative w-20 h-20 border rounded overflow-hidden"
                            // onClick={() => {
                            //   swiperRef.current?.slideTo(i);
                            //   setActiveIndex(i);
                            // }}
                          >
                            {item.mediaType === "VIDEO" ? (
                              <video
                                src={item.previewUrl}
                                className="object-cover w-full h-full"
                                muted
                                playsInline
                              />
                            ) : (
                              <img
                                src={item.previewUrl}
                                className="object-cover w-full h-full"
                                alt={`media-${i}`}
                              />
                            )}

                            <button
                              onClick={() => {
                                setMultiFiles((prev) => {
                                  const removed = prev[i];
                                  URL.revokeObjectURL(removed.previewUrl);
                                  return prev.filter((_, idx) => idx !== i);
                                });
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Filters / Adjustments */}
              {step === 2 && (
                <div className="p-4 relative">
                  {/* <button
                    onClick={() => setShowDiscardDialog(true)}
                    className="absolute top-40 right-88 text-2xl cursor-pointer"
                  >
                    <RxCross2 />
                  </button> */}
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

                    <button
                      onClick={() => setShowDiscardDialog(true)}
                      className="absolute left-58 text-2xl cursor-pointer"
                    >
                      <RxCross2 />
                    </button>
                  </div>

                  {/* Filters Grid */}
                  {adjustmentTab === "filters" && (
                    <div className="grid grid-cols-3 gap-2">
                      {FILTERS.map((filter) => {
                        const isSelected =
                          multiFiles?.[activeIndex]?.filter === filter.style;

                        return (
                          <div
                            key={filter.name}
                            onClick={() => {
                              setMultiFiles((prev) =>
                                prev.map((item, index) =>
                                  index === activeIndex
                                    ? { ...item, filter: filter.style }
                                    : item
                                )
                              );
                            }}
                            className={`text-center cursor-pointer p-1 rounded transition
                              ${
                                isSelected
                                  ? "border-2 border-gray-300"
                                  : "border border-transparent hover:border-gray-300"
                              }
                            `}
                          >
                            {multiFiles?.[activeIndex]?.mediaType ===
                            "IMAGE" ? (
                              <img
                                src={multiFiles[activeIndex].previewUrl}
                                alt={filter.name}
                                className="w-full h-20 object-cover rounded"
                                style={{ filter: filter.style }}
                              />
                            ) : (
                              <div className="w-full h-20 flex items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                                Not supported
                              </div>
                            )}

                            <p
                              className={`text-xs mt-1 ${
                                isSelected ? "font-semibold text-blue-600" : ""
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
                  {adjustmentTab === "adjustments" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm">Brightness</label>
                        <input
                          type="range"
                          min={50}
                          max={150}
                          value={activeAdjustments.brightness}
                          onChange={(e) =>
                            updateAdjustment(
                              "brightness",
                              Number(e.target.value)
                            )
                          }
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm">Contrast</label>
                        <input
                          type="range"
                          min={50}
                          max={150}
                          value={activeAdjustments.contrast}
                          onChange={(e) =>
                            updateAdjustment("contrast", Number(e.target.value))
                          }
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm">Hue Rotate</label>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          value={activeAdjustments.hueRotate}
                          onChange={(e) =>
                            updateAdjustment(
                              "hueRotate",
                              Number(e.target.value)
                            )
                          }
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm">Grayscale</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={activeAdjustments.grayscale}
                          onChange={(e) =>
                            updateAdjustment(
                              "grayscale",
                              Number(e.target.value)
                            )
                          }
                          className="w-full accent-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Caption */}
              {step === 3 && (
                <div className="p-4 space-y-4">
                  {/* <button
                    onClick={() => setShowDiscardDialog(true)}
                    className="absolute top-16 right-6"
                  >
                    Discard
                  </button> */}
                  <div>
                    <label className="block text-sm mb-1">Caption</label>
                    <textarea
                      className="w-full border rounded-md p-2 text-sm resize-none h-24"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm mb-1">Location</label>
                    <input
                      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Add location"
                    />
                  </div> */}
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
                    setMultiFiles([]);
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

export default InstaCreatePost;
