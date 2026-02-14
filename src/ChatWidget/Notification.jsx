import React, { useState } from "react";

// ICONS
import { AlertTriangle } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';

const Notification = () => {
  const [forwardEnabled, setForwardEnabled] = useState(false);
  const [forwardEmail, setForwardEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const saveHandler = () => {
    if (forwardEnabled && !validateEmail(forwardEmail)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    alert("Saved!");
  };

  const notificationRows = [
    {
      label: "New message",
      email: true,
      web: true,
      sound: "Dong",
      disabledEmail: false,
    },
    {
      label: "New chat request",
      email: true,
      web: true,
      sound: "Dong",
      disabledEmail: true,
    },
    {
      label: "Incoming visitor",
      email: false,
      web: false,
      sound: "Dong",
      disabledEmail: true,
      note: "You won’t receive any notifications of this type.",
    },
    {
      label: "New ticket and ticket messages",
      email: true,
      web: true,
      sound: "Dong",
    },
    {
      label: "New mention",
      email: true,
      web: true,
      sound: "Dong",
    },
  ];

  const soundOptions = ["Dong", "Bell", "Pop", "Chime"];

  return (
    <div className="p-2">
      {/*  Browser Block Banner */}
      <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl text-sm mb-5">
        <b>Your browser blocks notifications.</b> You might miss some incoming chats.{" "}
        <a className="underline cursor-pointer">Read how to allow notifications in your browser</a>
      </div>

      <h2 className="text-2xl font-semibold">Notifications <span className="text-gray-500">for Anshu </span></h2>

      {/* TABLE */}
      <div className="mt-6 border rounded-xl overflow-auto ">
        <table className="w-full text-sm mt-2">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="py-3 px-5 text-left">Notification type</th>
              <th className="text-left px-5">Email  <HelpCenterOutlinedIcon size={5}/></th>
              <th className="text-left px-5">Web notification <HelpCenterOutlinedIcon size={5}/></th>
              <th className="text-left px-5">Web notification sound</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {notificationRows.map((row, i) => (
              <tr key={i} className="bg-white">
                {/* Notification Name */}
                <td className="p-4">
                  <div className="flex flex-col">
                    <span>{row.label}</span>
                    {row.note && (
                      <span className="text-xs text-orange-600 flex items-center mt-1">
                        <AlertTriangle size={13}/> {row.note}
                      </span>
                    )}
                  </div>
                </td>

                {/* Email Checkbox */}
                <td className="px-5">
                  <input
                    type="checkbox"
                    disabled={row.disabledEmail}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                    defaultChecked={row.email}
                  />
                </td>

                {/* Web Checkbox */}
                <td className="px-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                    defaultChecked={row.web}
                  />
                </td>

                {/* Sound Dropdown */}
                <td className="px-5">
                  <select className="border-2 border-gray-200 rounded-lg px-3 py-1 cursor-pointer text-gray-700 w-full">
                    {soundOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------- Forward Email Notification Section -------- */}
      <div className="mt-10">
        <h3 className="font-semibold text-lg">Forward email notifications</h3>
        <p className="text-sm text-gray-500 mt-1 w-[60%]">
          To receive email notifications to a private email, add it below. You will be notified
          every time someone sends a chat message when all agents are offline.
        </p>

        {/* Enable Toggle */}
        <div className="flex items-center gap-4 mt-6">
          <span className="text-sm">Enable</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={forwardEnabled}
              onChange={(e) => setForwardEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Email Input */}
        {forwardEnabled && (
        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <label className="text-sm text-gray-700 mb-2 font-medium  block">Send to :</label>
            <input
              type="text"
              value={forwardEmail}
              onChange={(e) => setForwardEmail(e.target.value)}
              placeholder="Enter an email"
              className={` border px-4 py-2 rounded-lg w-full md:w-[40%]
                ${emailError ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />

            {emailError && (
              <div className="bg-red-100 text-red-700 mt-4 p-3 rounded-lg text-sm">
                ❗ Something went wrong. Please make sure that all the email addresses are correct.
              </div>
            )}
          </div>
        )}

        {/* SAVE BUTTON */}
        <button
          onClick={saveHandler}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Notification;
