import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Chip } from "@mui/material";
import { Dialog } from "primereact/dialog";

// ICONS
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { FaVideo } from "react-icons/fa";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { LuMic } from "react-icons/lu";

// APIS
import {
  createIceBreaker,
  deleteIceBreaker,
  getIceBreaker,
} from "@/apis/instagram/Instagram.js";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";

/* -------------------- Skeleton -------------------- */
const CardSkeleton = () => (
  <div className="relative bg-gray-50/60 border border-gray-200 rounded-2xl p-6 shadow-sm animate-pulse">
    <div className="absolute -left-3 top-6 w-8 h-8 bg-gray-300 rounded-full" />
    <div className="space-y-4 ml-4">
      <div className="h-10 bg-gray-200 rounded-lg w-full" />
      <div className="h-10 bg-gray-200 rounded-lg w-full" />
    </div>
  </div>
);

const PreviewSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="w-full h-10 bg-gray-100 rounded-xl" />
    ))}
  </div>
);

export default function IceBreaker({
  selectedInstaUser,
  selectedInstaUserDetails,
}) {
  console.log(selectedInstaUser);
  console.log(selectedInstaUserDetails, "in ice breaker file");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [qaList, setQaList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [previewChat, setPreviewChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Function to simulate clicking an icebreaker in the preview
  const simulateChat = (question, answer) => {
    const newUserMsg = { sender: "user", text: question };
    const newBotMsg = {
      sender: "bot",
      text: answer || "This is your automated response!",
    };

    // Show user question, then bot answer after a short delay
    setPreviewChat([newUserMsg]);
    setTimeout(() => {
      setPreviewChat([newUserMsg, newBotMsg]);
    }, 800);
  };

  // Clear chat when qaList changes to keep it fresh
  useEffect(() => {
    setPreviewChat([]);
  }, [qaList]);

  const [iceBreakerInputs, setIceBreakerInputs] = useState([
    { question: "", answer: "" },
  ]);

  const [showDialog, setShowDialog] = useState(false);

  const messagesTextRef = useRef(null);
  // const inputTextRef = useRef(null);

  const handleAddMore = () => {
    if (iceBreakerInputs.length >= 4) {
      toast.error("Maximum 4 Ice Breakers allowed");
      return;
    }

    setIceBreakerInputs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleChange = (index, field, value) => {
    setIceBreakerInputs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = async () => {
    // if (qaList.length >= 4) {
    //   toast.error("You reached the maximum limit!");
    //   return;
    // }

    // if (!messageText.trim() || !textAnswer.trim()) {
    //   toast.error("Question and Answer both are required!");
    //   return;
    // }

    const isValid = iceBreakerInputs.every(
      (item) => item.question.trim() !== ""
    );

    if (!isValid) {
      toast.error("All questions must have text!");
      return;
    }
    setIsSaving(true); // Start loading
    const payload = iceBreakerInputs.map((item) => ({
      question: item.question.trim(),
      payload: item.answer.trim() || item.question.trim(),
    }));

    try {
      const res = await createIceBreaker(payload, selectedInstaUser);
      if (res?.success) {
        toast.success("Ice Breaker added successfully");

        setQaList((prev) => [
          ...prev,
          { question: messageText, answer: textAnswer },
        ]);

        await fetchIceBreakers();
        setMessageText("");
        setTextAnswer("");
      } else {
        toast.error(res?.message || "Failed to add ice breaker!");
      }
    } catch (error) {
      console.log("ERROR :", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSaving(false); // End loading
    }
  };

  const fetchIceBreakers = async () => {
    setIsLoading(true);
    try {
      const res = await getIceBreaker(selectedInstaUser);
      console.log("IceBreaker API RESPONSE:", res);

      // 1. Correctly traverse the nested structure:
      // res -> data -> data[0] -> ice_breakers
      const iceBreakersArray = res?.data?.data?.[0]?.ice_breakers;

      if (res?.success && Array.isArray(iceBreakersArray)) {
        setQaList(
          iceBreakersArray.map((item) => ({
            question: item.question,
            answer: item.payload, // Mapping 'payload' from API to 'answer' for your UI
          }))
        );

        // Optional: Also sync the input fields so they match what's on the server
        setIceBreakerInputs(
          iceBreakersArray.map((item) => ({
            question: item.question,
            answer: item.payload,
          }))
        );
      } else {
        // If no data is found, reset the list
        setQaList([]);
      }
    } catch (error) {
      console.log("Fetch IceBreaker Error :", error);
      toast.error("Failed to load ice breaker");
    } finally {
      setIsLoading(false);
    }
  };

  //   const fetchIceBreakers = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await getIceBreaker(selectedInstaUser);

  //     const iceBreakersArray = res?.data?.data?.[0]?.ice_breakers;

  //     if (res?.success && Array.isArray(iceBreakersArray)) {
  //       setQaList(
  //         iceBreakersArray.map((item) => ({
  //           question: item.question,
  //           answer: item.payload,
  //         }))
  //       );

  //       setIceBreakerInputs(
  //         iceBreakersArray.map((item) => ({
  //           question: item.question,
  //           answer: item.payload,
  //         }))
  //       );
  //     } else {
  //       setQaList([]);
  //       setIceBreakerInputs([{ question: "", answer: "" }]);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to load ice breaker");
  //   } finally {
  //     setIsLoading(false); // ✅ ALWAYS stops skeleton
  //   }
  // };

  useEffect(() => {
    if (!selectedInstaUser) return;
    fetchIceBreakers();
  }, [selectedInstaUser]);

  const handleDeleteAllIceBreakers = async () => {
    if (!selectedInstaUser) {
      toast.error("Instagram user not found!");
      return;
    }
    setIsDeleting(true);

    try {
      const res = await deleteIceBreaker(selectedInstaUser);

      console.log("Delete IceBreaker RESPONSE:", res);

      if (res?.success) {
        toast.success("All IceBreakers deleted succesfully");
        setQaList([]);
        setIceBreakerInputs([{ question: "", answer: "" }]);
        setShowDialog(false);
        fetchIceBreakers();
      } else {
        toast.error(res.message || "Failed to Delete IceBreaker");
      }
    } catch (error) {
      console.log("Delete Icebreaker Error: ", error);
      toast.error(" Something went wrong to Delete Icebreaker!");
    } finally {
      setIsDeleting(false);
    }
  };




  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      {/* Left side content */}
      <div className="w-full md:w-3/4 bg-white rounded-lg shadow p-4 space-y-6 flex flex-col items-start justify-start overflow-scroll h-screen pb-90 lg:pb-70">
        {isLoading ? (
          <div className="space-y-6 w-full">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-col w-full">
                <div className="flex flex-wrap gap-3 justify-between mb-2">
                  {/* <div className="w-max-content">
                <UniversalInstaButton
                  variant="primary"
                  onClick={handleAdd}
                  label={isSaving ? "Saving..." : "Save Changes"}
                  disabled={isSaving}
                />
              </div> */}
                  <div className="text-sm bg-gray-50 text-blue-400 border-b-2 px-4 border-blue-200 transition-all rounded-full  cursor-pointer flex items-center justify-center">
                    Total IceBreaker: {qaList.length}/4
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {/* <div className="text-sm bg-gray-50 text-blue-400 border-b-2 px-2 border-blue-200 hover:bg-blue-400 hover:text-white hover-border-white transition-all rounded-full  cursor-pointer flex items-center justify-center">
                  Total IceBreaker: {qaList.length}/4
                </div> */}
                    {iceBreakerInputs.length < 4 && (
                      <button
                        onClick={handleAddMore}
                        className="text-sm bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1 hover:bg-blue-500 hover:text-white transition-all rounded-full font-semibold"
                      >
                        + Add Question
                      </button>
                    )}
                    <button
                      className="text-sm text-white border-2 px-3 py-1 bg-red-400 hover:bg-red-600 transition-all rounded-full flex items-center gap-1"
                      onClick={() => setShowDialog(true)}
                    >
                      <DeleteForeverIcon sx={{ fontSize: "1.1rem" }} />
                      <span>Clear All</span>
                    </button>
                  </div>
                </div>
                {iceBreakerInputs.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-300 transition-all rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md"
                  >
                    <div className="absolute -left-3 top-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>
                    {iceBreakerInputs.length > 1 && (
                      <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() =>
                          setIceBreakerInputs((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 gap-4 ml-4">
                      <InputField
                        label="Customer Sees This (Question)"
                        value={item.question}
                        onChange={(e) =>
                          handleChange(index, "question", e.target.value)
                        }
                        placeholder="e.g., 'What are your store hours?'"
                        className="border-none bg-white shadow-inner"
                      />
                      <InputField
                        label="Bot Replies With (Answer/Payload)"
                        value={item.answer}
                        onChange={(e) =>
                          handleChange(index, "answer", e.target.value)
                        }
                        placeholder="e.g., 'We are open 9am-6pm daily!'"
                      />
                    </div>
                  </div>
                ))}
                <div className="w-max-content flex items-center justify-center">
                  <UniversalInstaButton
                    variant="primary"
                    onClick={handleAdd}
                    label={isSaving ? "Saving..." : "Save Changes"}
                    disabled={isSaving || isLoading}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {/* <div className="w-full">
          <div className="flex h-100 rounded-2xl  border">
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full  rounded-2xl p-2 overflow-y-scroll ">
              {qaList.length === 0 ? (
                <>
                  <div className="flex md:flex-col items-center justify-center">
                    <div className="text-xl font-medium">
                      No menu items added yet.
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center w-full ">
                    <div className="w-full">
                      <span className="font-semibold">URL Button</span> <br />
                      <p className="text-gray-400 text-sm  break-words whitespace-pre-line w-full">
                        Ice Breakers provide a way for your app users to start a
                        conversation with a business with a list of frequently
                        asked questions. A maximum of 4 questions can be set via
                        the Ice Breaker API.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {qaList.map((item, index) => (
                    <div
                      key={index}
                      className="p-5 border rounded-lg bg-gray-50 shadow-sm space-y-1 relative flex flex-col items-start"
                    >
                      <button
                        className="hover:bg-gray-300 transition-all rounded-full p-0.5 cursor-pointer absolute right-2 top-2"
                        onClick={() =>
                          setQaList((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <DeleteForeverIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#e31a1a",
                          }}
                        />
                      </button>
                      <p className="text-sm font-semibold text-gray-800 break-words whitespace-pre-line w-full">
                        Que.{index + 1} {item.question}
                      </p>
                      <p className="text-sm text-gray-700 mt-2 break-words whitespace-pre-line w-full">
                        Ans.{index + 1} {item.answer}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div> */}
      </div>

      {/*Mobile preview */}
      {/* <div className="md:w-[375px] h-[667px] rounded-[2rem] border-4 border-black shadow-lg flex flex-col overflow-hidden relative bg-white mx-auto">
        <div className="absolute inset-0 z-0 bg-cover w-full h-full opacity-20 bg-center bg-[url(/instachatbg.webp)] pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 h-26 bg-gray-100 flex items-center justify-between px-3 text-xs text-gray-600">
          <p className="absolute top-3 left-2">7:00 AM</p>
          <div className="flex items-center space-x-1 absolute top-2 right-2">
            <AccessAlarmIcon sx={{ fontSize: 20 }} className="text-gray-500" />
            <WifiIcon sx={{ fontSize: 20 }} className="text-gray-500" />
            <Battery90Icon sx={{ fontSize: 20 }} className="text-gray-500" />
          </div>
          <div className="absolute top-13 left-5 flex flex-row gap-2">
            <img
              src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
              alt="Avtar"
              className="w-8 h-8 rounded-full border--2 border-black"
            />
            <div className="flex flex-col ">
              <h1 className="md:text-lg font-semibold">Jaun</h1>
              <p className="md:text-md mt-0 ">Online </p>
            </div>
          </div>
          <div className="flex space-x-1 absolute top-13 right-3 gap-2">
            <PhoneOutlinedIcon
              size={22}
              className="text-gray-500 hover:text-green-500 cursor-pointer"
            />
            <FaVideo
              size={22}
              className="text-gray-500 hover:text-blue-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col mt-10 px-4 py-2 overflow-y-auto space-y-2 absolute bottom-18 right-0 left-1">
          {qaList?.map((msg, index) => (
            <button
              key={index}
              className="w-auto max-w-xs text-right text-blue-400 text-sm bg-gray-100 font-semibold px-4 py-1.5 rounded-full break-words whitespace-pre-line "
            >
              {msg.question}
            </button>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 mx-auto mb-3 w-[95%] sm:w-[90%] md:w-auto flex items-center justify-between bg-gray-100 rounded-full px-3 py-2 shadow-sm">
          <div className="flex items-center w-full space-x-2">
            <PhotoCameraIcon
              sx={{ fontSize: 20, color: "#4588E7" }}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Message..."
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500"
            />

            <FaRegFaceSmile className="text-gray-400" />
          </div>
        </div>
        <div className="w-24 h-1.5 bg-gray-800 rounded-full mx-auto absolute bottom-2 left-0 right-0" />
      </div> */}
      <div className="w-full md:w-1/4 overflow-scroll h-200 pb-0 lg:pb-110 xl:pb-110 2xl:pb-20">
        <div className=" mx-auto w-[280px]  lg:w-[200px] xl:w-[250px] 2xl:w-[340px] bg-black rounded-[3.5rem] p-2 shadow-2xl">
          {/* Inner Phone Screen */}
          <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative border-[2px] border-gray-800">
            {/* 1. Instagram Chat Background Layer */}
            <div
              className="absolute inset-0 z-0 bg-repeat opacity-[0.2] pointer-events-none"
              style={{
                backgroundImage: "url(/instachatbg.webp)",
                backgroundSize: "100%",
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-gray-800 rounded-full" />
            </div>

            {/* 2. Professional Header */}
            <div className="relative z-20 bg-white/90 backdrop-blur-md border-b px-5 pt-12 pb-3 flex items-center justify-between rounded-t-[44px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FFD600] to-[#D300C5] p-[1.5px]">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
                      className="object-cover w-full h-full"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  {/* <span className="text-sm font-bold text-gray-900 leading-tight">Juan Store</span> */}
                  <span className="text-sm font-bold text-gray-900 leading-tight">
                    {selectedInstaUserDetails?.userName}
                  </span>
                  <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex gap-3 text-gray-600">
                <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
                <FaVideo size={18} />
              </div>
            </div>

            {/* 3. Interactive Chat Body */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {/* Top Info */}
              <div className="text-[10px] text-gray-400 text-center my-2">
                OCT 24, 9:41 AM
              </div>

              {/* Conversation Simulation Area */}
              {previewChat.length === 0 ? (
                <div className="bg-gray-100/80 self-start p-3 rounded-2xl rounded-tl-none text-xs max-w-[85%] text-gray-700 leading-relaxed border border-gray-100">
                  👋 Hi! I'm here to help. Select a question below to start a
                  conversation!
                </div>
              ) : (
                previewChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[80%] p-3 rounded-2xl text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === "user"
                      ? "self-end bg-[#3797F0] text-white rounded-tr-none"
                      : "self-start bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                      }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* 4. Ice Breaker Prompt Area (Only shows if chat is empty) */}
            {previewChat.length === 0 && (
              <div className="relative z-10 p-4 flex flex-col gap-2">

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-1">
                  Suggested Questions
                </p>

                {isLoading ? (
                  <PreviewSkeleton />
                ) : qaList.length === 0 ? (
                  <p className="text-[11px] text-gray-400 italic ml-1">
                    No ice breakers added yet...
                  </p>
                ) : (
                  qaList.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => simulateChat(item.question, item.answer)}
                      className="w-full text-left bg-white border border-[#3797F0]/30 text-[#3797F0] text-[12px] font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
                    >
                      {item.question}
                    </button>
                  ))
                )}

              </div>
            )}


            {/* 5. Bottom Input Area */}
            <div className="relative z-10 p-4 bg-white border-t">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-3">
                <FaRegFaceSmile className="text-gray-400" />
                {/* <PhotoCameraIcon sx={{ fontSize: 20, color: '#3797F0' }} /> */}
                <span className="text-gray-400 text-[13px] flex-1">
                  Message...
                </span>
                {previewChat.length > 0 && (
                  <button
                    onClick={() => setPreviewChat([])}
                    className="text-[10px] font-bold text-[#3797F0] uppercase"
                  >
                    Reset
                  </button>
                )}
                <LuMic className="text-gray-400" />
                <IoImageOutline className="text-gray-400" />
              </div>
              {/* iPhone Indicator */}
              <div className="w-28 h-1 bg-black rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>
      </div>
      {/* Delete All Ice Breakers Dialog */}
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        draggable={false}
        style={{ width: "38rem" }}
        className="rounded-2xl"
      >
        {/* Header */}
        <div className="flex justify-center items-center gap-3 border-b pb-4">
          <div className="flex flex-col ">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete All Ice Breakers
            </h2>
            <p className="text-sm text-gray-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{" "}
            <strong>all created Ice Breaker questions</strong>?
          </p>

          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            Once deleted, these Ice Breakers cannot be recovered.
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            disabled={isDeleting}
            onClick={() => setShowDialog(false)}
            className="px-4 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={isDeleting || qaList.length === 0}
            onClick={handleDeleteAllIceBreakers}
            className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition flex items-center gap-2
                ${isDeleting || qaList.length === 0
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </Dialog>
    </div>
  );
}
