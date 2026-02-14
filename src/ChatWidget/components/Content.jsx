import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

// ICONS
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { IoMdColorFilter } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { IoClipboardOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import EmojiPicker from "emoji-picker-react";
import { LuTrash } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import { IoInformation } from "react-icons/io5";
import { BsBookHalf } from "react-icons/bs";
import { MdAddLink } from "react-icons/md";

// COMPONENTS
import useWidgetStore from "../stores/useWidgetStore";

const Content = () => {
  const {
    conversationStarters,
    previewImage,
    homeHeader,
    homeMessage,
    onlineStatus,
    minimizedValue,
    isOpen,
    showMinimizedLabel,
    offlineStatus,
    privacyMsg,
    offlineTicket,
    contentOpen,
    offlineTextMsg,
    screen,
    preChatSurvey,
    surveyFields,
    showNewsLetter,
    emailIntroMsg,

    // ALL SETTERS (add these!)
    setConversationStarters,
    setPreviewImage,
    setHomeHeader,
    setHomeMessage,
    setOnlineStatus,
    setOfflineStatus,
    setMinimizedValue,
    setShowMinimizedLabel,
    setIsOpen,
    setContentOpen,
    setScreen,
    setPrivacyMsg,
    setOfflineTicket,
    setOfflineTextMsg,
    setPreChatSurvey,
    setSurveyFields,
    setShowNewsletter,
    setEmailIntroMsg,
  } = useWidgetStore();

  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("HOME");
  const [selectLogo, setSelectLogo] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleToggle = (index) => {
    setConversationStarters((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleTextChange = (index, value) => {
    setConversationStarters((prev) =>
      prev.map((item, i) => (i === index ? { ...item, text: value } : item))
    );
  };

  const handleDelete = (index) => {
    setConversationStarters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddNew = () => {
    setConversationStarters((prev) => {
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, { text: "New starter...", enabled: true }];
    });
  };

  console.log("previewImage", previewImage);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageurl = URL.createObjectURL(file);
      setPreviewImage(imageurl);
    }
  };

  console.log("activeTab", activeTab);
  const tabOptions = [
    { label: "HOME", icon: <AiFillHome /> },
    { label: "CHAT", icon: <BsChatLeft />, action: () => setScreen("chat") },
    {
      label: "SURVEY",
      icon: <IoClipboardOutline />,
      action: () => {
        setScreen("chat");
        setPreChatSurvey("true");
      },
    },
    {
      label: "MINIMIZED",
      icon: <IoIosArrowDropdown />,
      action: () => setIsOpen(!isOpen),
    },
  ];

  // const tabOptions = [
  //   { label: "HOME", icon: <AiFillHome /> },
  //   { label: "CHAT", icon: <BsChatLeft /> },
  //   { label: "SURVEY", icon: <IoClipboardOutline /> },
  //   { label: "MINIMIZED", icon: <IoIosArrowDropdown /> },
  // ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);

    if (tab.label === "CHAT") setScreen("chat");

    if (tab.label === "SURVEY") {
      setScreen("chat");
      setPreChatSurvey(true);
    }

    if (tab.label === "MINIMIZED") {
      setIsOpen((prev) => !prev);
    }
  };

  const FIELD_OPTIONS = [
    { label: "Email", type: "email" },
    { label: "Name", type: "nameText" },
    { label: "Phone number", type: "tel" },
    { label: "GDPR Compliance", type: "textarea" },
    { label: "Department", type: "select" },
  ];

  const handleAddField = (field) => {
    setSurveyFields((prev) => [...prev, field]);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      {/* ACCORDION HEADER */}
      <button
        onClick={() => setContentOpen(!contentOpen)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <h2 className="text-lg font-medium">Content</h2>
        {contentOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {contentOpen && (
        <div className="px-4 sm:px-6 pb-6 animate-fadeIn">
          {/* TABS — MOBILE SCROLLABLE */}
          <div className="flex gap-6 border-b overflow-x-auto pb-2">
            {tabOptions.map((tab) => (
              <button
                key={tab.label}
                onClick={() => {
                  setActiveTab(tab.label);
                  if (tab.action) tab.action();
                }}
                className={`pb-2 flex flex-col items-center gap-1 capitalize min-w-[70px] ${
                  activeTab === tab.label
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <span className="text-[22px]">{tab.icon}</span>
                <span className="text-xs sm:text-sm text-center">
                  {tab.label === "SURVEY" ? "Pre-chat Survey" : tab.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-3">
            {activeTab === "HOME" && (
              <div className="space-y-8">
                {/* DESCRIPTION */}
                <p className="text-[13px] text-gray-500">
                  Welcome your visitors when they open the widget.
                </p>

                {/* WELCOME IMAGE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-sm font-medium">Welcome image</div>

                  <div className="md:col-span-3 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="welcomeImage"
                        defaultChecked
                        onClick={() => setSelectLogo(false)}
                      />
                      Agents collage
                    </label>

                    <p className="text-xs text-gray-500">
                      Show a collage of your agents’ profile pictures at the top
                      of your widget.
                    </p>

                    <label
                      className="flex items-center gap-3 cursor-pointer text-sm"
                      onClick={() => setSelectLogo(true)}
                    >
                      <input type="radio" name="welcomeImage" />
                      Your logo
                    </label>

                    {selectLogo && (
                      <div className="flex flex-wrap items-start gap-3">
                        {/* Upload */}
                        <div
                          className="border border-red-500 rounded-md w-16 h-16 flex items-center justify-center text-xs cursor-pointer overflow-hidden"
                          onClick={handleClick}
                        >
                          {previewImage ? (
                            <img
                              src={previewImage}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <ImFilePicture size={20} />
                          )}

                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>

                        {/* Info */}
                        <p className="text-sm text-red-500 flex-1 min-w-[200px]">
                          File is required, upload your logo or switch to Agents
                          collage
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* HEADER TEXTAREA */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="text-sm font-medium">Header</label>

                  <div className="relative md:col-span-3">
                    <textarea
                      rows={3}
                      maxLength={100}
                      className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
                      value={homeHeader}
                      onChange={(e) => setHomeHeader(e.target.value)}
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="text-sm font-medium">Message</label>

                  <div className="relative md:col-span-3">
                    <textarea
                      rows={3}
                      maxLength={100}
                      className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
                      value={homeMessage}
                      onChange={(e) => setHomeMessage(e.target.value)}
                    />
                  </div>
                </div>

                {/* CONVERSATION STARTERS (Already responsive in your code, kept same) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Conversation starters</p>
                    <p className="text-xs text-gray-500">
                      Visitors can quickly start a conversation with Lyro AI or
                      an agent.
                    </p>
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-3">
                    {conversationStarters.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-wrap items-center gap-3 bg-gray-100 p-2 rounded-lg"
                      >
                        <RxDragHandleDots2
                          size={20}
                          className="text-gray-500"
                        />

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.enabled}
                            onChange={() => handleToggle(i)}
                          />
                          <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-all"></div>
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-all"></div>
                        </label>

                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => handleTextChange(i, e.target.value)}
                          className="flex-1 min-w-[60%] border rounded-lg px-3 py-2 text-sm"
                        />

                        <button
                          onClick={() => handleDelete(i)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 rounded"
                        >
                          <LuTrash />
                        </button>
                      </div>
                    ))}

                    <div
                      onClick={handleAddNew}
                      className="flex justify-center border rounded-lg p-2 cursor-pointer hover:bg-gray-100"
                    >
                      + Add New
                    </div>
                  </div>
                </div>

                {/* ONLINE STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="text-sm font-medium">Online status</label>

                  <input
                    className="border rounded-lg px-3 py-2 text-sm md:col-span-3"
                    placeholder="We reply immediately"
                    value={onlineStatus}
                    onChange={(e) => setOnlineStatus(e.target.value)}
                  />
                </div>

                {/* OFFLINE STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="text-sm font-medium">
                    Offline status
                    <span className="block text-blue-500 text-xs">
                      (adjust hours)
                    </span>
                  </label>

                  <input
                    className="border rounded-lg px-3 py-2 text-sm md:col-span-3"
                    value={offlineStatus}
                    onChange={(e) => setOfflineStatus(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ******************************************************************************************** CHAT TAB ************************************************************************  */}

            {activeTab === "CHAT" && (
              <div className="space-y-8">
                {/* Offline Message */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="text-sm text-gray-700 md:col-span-1">
                    Offline message
                  </label>

                  <textarea
                    className="w-full md:col-span-3 border border-gray-300 rounded-lg p-3 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    value={offlineTextMsg}
                    onChange={(e) => setOfflineTextMsg(e.target.value)}
                    maxLength={100}
                  />
                </div>

                {/* Let visitors create ticket */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <label className="text-sm text-gray-700 md:col-span-1 leading-5">
                    Let visitors create ticket
                    <br />
                    when offline
                  </label>

                  <div className="flex items-center gap-3 md:col-span-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        value={offlineTicket}
                        onChange={(e) => setOfflineTicket(e.target.checked)}
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                    </label>

                    <span className="text-gray-500 cursor-pointer border px-2 py-0.5 rounded-full">
                      ?
                    </span>
                  </div>
                </div>

                {/* Privacy Policy */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <label className="text-sm text-gray-700 md:col-span-1">
                    Privacy policy message
                  </label>

                  <label className="relative inline-flex items-center cursor-pointer md:col-span-3">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={privacyMsg}
                      onChange={(e) => setPrivacyMsg(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
            )}

            {/* ******************************************************************************************** PRE-CHAT-SURVEY TAB ************************************************************************  */}
            {activeTab === "SURVEY" && (
              <div className="space-y-6">
                {/* Description */}
                <p className="text-[13px] text-gray-500">
                  Ask your visitor for their personal information before the
                  conversation starts.
                </p>

                {/* DISPLAY TOGGLE */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Display</span>

                  <label className="relative inline-flex items-center cursor-pointer md:col-span-3">
                    <input
                      type="checkbox"
                      checked={preChatSurvey}
                      onChange={(e) => setPreChatSurvey(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition"></div>
                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
                  </label>
                </div>

                {/* MESSAGE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <span className="text-sm font-medium">Message</span>

                  <input
                    type="text"
                    value={emailIntroMsg}
                    onChange={(e) => setEmailIntroMsg(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm md:col-span-3 w-full"
                    placeholder="Please introduce yourself:"
                  />
                </div>

                {/* SURVEY FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Left Label */}
                  <span className="text-sm font-medium">Survey fields</span>

                  {/* Fields */}
                  <div className="space-y-4 md:col-span-3">
                    {surveyFields.map((field, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex flex-wrap gap-3 items-start">
                          {/* Field label */}
                          <span className="text-sm w-28 pt-2">
                            {field.label}
                          </span>

                          {/* Field input types */}
                          <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                            {/* Regular Input */}
                            {(field.type === "email" ||
                              field.type === "nameText" ||
                              field.type === "tel") && (
                              <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) =>
                                  setSurveyFields((prev) => {
                                    const updated = [...prev];
                                    updated[index].value = e.target.value;
                                    return updated;
                                  })
                                }
                                className="border rounded-lg px-3 py-2 text-sm w-full"
                              />
                            )}

                            {/* GDPR Textarea */}
                            {field.type === "textarea" && (
                              <div className="relative w-full">
                                <textarea
                                  value={field.value}
                                  onChange={(e) => {
                                    const updated = [...surveyFields];
                                    updated[index].value = e.target.value;
                                    setSurveyFields(updated);
                                  }}
                                  placeholder="Enter value..."
                                  className="border rounded-lg px-3 py-2 text-sm w-full pr-10 resize-none"
                                />

                                {/* Add URL Icon */}
                                <MdAddLink
                                  className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-600 cursor-pointer"
                                  size={18}
                                  onClick={() => {
                                    const updated = [...surveyFields];
                                    updated[index].value =
                                      "(https://www.your_url.com)";
                                    setSurveyFields(updated);
                                  }}
                                />
                              </div>
                            )}

                            {/* Newsletter Permission */}
                            {field.type === "email" && (
                              <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                <input
                                  type="checkbox"
                                  checked={showNewsLetter}
                                  onChange={(e) =>
                                    setShowNewsletter(e.target.checked)
                                  }
                                  className="w-4 h-4 accent-blue-600"
                                />
                                Ask visitor for newsletter permission
                              </label>
                            )}

                            {/* Department Dropdown */}
                            {field.type === "select" && (
                              <div className="flex flex-col gap-2">
                                <select
                                  disabled
                                  className="border rounded-lg px-3 py-2 text-sm w-full text-gray-600"
                                >
                                  <option>Select department</option>
                                </select>

                                <div className="flex items-start gap-2 bg-gray-100 mt-2 p-3 rounded-lg text-gray-600 text-sm leading-5">
                                  <IoIosInformationCircleOutline className="text-2xl mt-[2px]" />
                                  <p>
                                    To set routing rules, add a department
                                    first.
                                    <a className="underline cursor-pointer text-gray-800">
                                      Go to departments’ settings
                                    </a>
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Delete Icon */}
                          <div
                            className="p-2 rounded hover:bg-red-100 text-gray-500 hover:text-red-500 cursor-pointer"
                            onClick={() =>
                              setSurveyFields((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <LuTrash />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* ADD NEW FIELD */}
                    <div className="relative">
                      <details className="group">
                        <summary className="flex items-center justify-center gap-2 border rounded-lg px-3 py-1 text-sm cursor-pointer w-32 hover:bg-gray-100">
                          + Add new
                        </summary>

                        <div className="mt-2 bg-white shadow-lg rounded-lg p-2 w-48 absolute z-50">
                          {FIELD_OPTIONS.map((option) => {
                            const exists = surveyFields.some(
                              (f) => f.label === option.label
                            );

                            return (
                              <p
                                key={option.label}
                                className={`px-3 py-2 text-sm rounded cursor-pointer ${
                                  exists
                                    ? "opacity-40 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                                }`}
                                onClick={() =>
                                  !exists && handleAddField(option)
                                }
                              >
                                {option.label}
                              </p>
                            );
                          })}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>

                {/* LEARN MORE LINK */}
                <a
                  href="#"
                  className="flex items-center gap-2 text-blue-600 text-sm underline"
                >
                  <BsBookHalf className="text-blue-500 text-lg" />
                  Learn when to use a pre-chat survey
                </a>
              </div>
            )}

            {/* ******************************************************************************************** MINIMIZED TAB ************************************************************************  */}
            {activeTab === "MINIMIZED" && (
              <>
                <p className="my-2 text-xs text-gray-600">
                  You can add button label to encourage visitors to open the
                  widget.
                </p>

                <div className="grid grid-cols-4 gap-4 items-start">
                  {/* Left Label */}
                  <span className="text-sm font-medium col-span-1 pt-2">
                    Button label
                  </span>

                  <div className="col-span-3 flex flex-col gap-2">
                    {/* Toggle */}
                    {/* <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
                    </label> */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showMinimizedLabel}
                        onChange={(e) =>
                          setShowMinimizedLabel(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
                    </label>

                    {/* Input */}
                    <input
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Chat with us 👋"
                      value={minimizedValue}
                      onChange={(e) => setMinimizedValue(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
