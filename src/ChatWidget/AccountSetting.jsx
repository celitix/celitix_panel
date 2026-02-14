import React, { useState } from "react";

// ICONS
import { AlertTriangle } from "lucide-react";

const AccountSetting = () => {
  const [activeTab, setActiveTab] = useState("Personal details");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [accountPhoto, setAccountPhoto] = useState(null);

  const [signature, setSignature] = useState("");
  const isSignatureChanged = signature.trim().length > 0;

  const tabs = ["Personal details", "Custom signature", "Password"];

  return (
    // <div className="p-10 w-full">
    //   {/* Heading */}
    //   <h2 className="text-2xl font-semibold text-gray-800">Account</h2>

    //   <p className="text-gray-500 text-sm mt-1 max-w-2xl leading-relaxed">
    //     Change your agent name, add your profile picture, change your email
    //     address and password and adjust your region so that your time zone will
    //     be displayed correctly.
    //   </p>

    //   {/* Tabs */}
    //   <div className="flex gap-8 mt-8 border-b">
    //     {tabs.map((t) => (
    //       <button
    //         key={t}
    //         onClick={() => setActiveTab(t)}
    //         className={`pb-3 text-sm font-medium transition-all ${
    //           activeTab === t
    //             ? "text-blue-600 border-b-2 border-blue-600"
    //             : "text-gray-500 hover:text-gray-700"
    //         }`}
    //       >
    //         {t}
    //       </button>
    //     ))}
    //   </div>

    //   {/* -------------------- PERSONAL DETAILS -------------------- */}
    //   {activeTab === "Personal details" && (
    //     <div className="mt-10 space-y-8">
    //       {/* Name */}
    //       <div className="grid grid-cols-12 items-center gap-4">
    //         <label className="col-span-3 text-gray-700 text-sm">Name</label>
    //         <input
    //           type="text"
    //           placeholder="Your name"
    //           className="col-span-6 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    //         />
    //       </div>

    //       {/* Picture Upload */}

    //       <div className="grid grid-cols-12 gap-4 items-start">
    //         <label className="col-span-3 text-gray-700 text-sm">
    //           Your picture
    //         </label>

    //         <label
    //           htmlFor="personalPhotoUpload"
    //           className={`w-24 h-24 rounded-xl border-2 cursor-pointer flex items-center justify-center overflow-hidden transition
    //   ${
    //     accountPhoto
    //       ? "border-blue-500"
    //       : "border-gray-300 hover:border-gray-400"
    //   }`}
    //         >
    //           {accountPhoto ? (
    //             <img
    //               src={accountPhoto}
    //               alt="profile"
    //               className="w-full h-full object-cover"
    //             />
    //           ) : (
    //             <span className="text-gray-500 text-xs">Click to upload</span>
    //           )}
    //         </label>

    //         <input
    //           id="personalPhotoUpload"
    //           type="file"
    //           accept="image/*"
    //           className="hidden"
    //           onChange={(e) => {
    //             const file = e.target.files[0];
    //             if (file) setAccountPhoto(URL.createObjectURL(file));
    //           }}
    //         />
    //       </div>

    //       {/* Email */}
    //       <div className="grid grid-cols-12 items-center gap-4">
    //         <label className="col-span-3 text-gray-700 text-sm">Email</label>
    //         <input
    //           type="email"
    //           placeholder="example@email.com"
    //           className="col-span-6 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    //         />
    //       </div>

    //       {/* Region */}
    //       <div className="grid grid-cols-12 items-center gap-4">
    //         <label className="col-span-3 text-gray-700 text-sm">Region</label>
    //         <select className="col-span-6 border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500">
    //           <option>Select...</option>
    //           <option>Asia</option>
    //           <option>Europe</option>
    //           <option>USA</option>
    //         </select>
    //       </div>

    //       {/* Language */}
    //       <div className="grid grid-cols-12 items-center gap-4">
    //         <label className="col-span-3 text-gray-700 text-sm">Language</label>
    //         <select className="col-span-6 border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500">
    //           <option>English</option>
    //           <option>Hindi</option>
    //           <option>French</option>
    //         </select>
    //       </div>
    //     </div>
    //   )}

    //   {/* -------------------- CUSTOM SIGNATURE -------------------- */}
    //   {activeTab === "Custom signature" && (
    //     <div className="mt-10">
    //       <p className="text-gray-600 text-sm mb-4">
    //         Set your individual email signature.
    //       </p>

    //       <label className="text-gray-700 text-sm block mb-2">Signature</label>

    //       <div className="border rounded-xl h-48 p-4 bg-white w-[60%]">
    //         {/* Textarea */}
    //         <textarea
    //           value={signature}
    //           onChange={(e) => setSignature(e.target.value)}
    //           className="w-full h-[80%] outline-none resize-none text-sm"
    //           placeholder="Write your signature here…"
    //         ></textarea>

    //         {/* Toolbar Icons */}
    //         <div className="flex items-center gap-4 text-gray-400 text-sm mt-2 border-t pt-2">
    //           <span className="cursor-pointer font-bold text-gray-600">B</span>
    //           <span className="cursor-pointer italic text-gray-600">I</span>
    //           <span className="cursor-pointer underline text-gray-600">U</span>
    //           <span className="cursor-pointer">🖼️</span>
    //           <span className="cursor-pointer">😊</span>
    //         </div>
    //       </div>

    //       {/* Save Button */}
    //       <button
    //         disabled={!signature.trim()}
    //         className={`mt-4 px-5 py-2 text-sm rounded-lg transition
    //     ${
    //       signature.trim()
    //         ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
    //         : "bg-gray-200 text-gray-400 cursor-not-allowed"
    //     }
    //   `}
    //       >
    //         Save
    //       </button>
    //     </div>
    //   )}

    //   {/* ======================= PASSWORD TAB ======================= */}
    //   {activeTab === "Password" && (
    //     <div className="mt-10 space-y-8">
    //       {/* Password Row */}
    //       <div className="grid grid-cols-12 items-center ">
    //         <div className="col-span-3 text-sm text-gray-700">Password</div>

    //         <div className="col-span-9 space-y-1">
    //           <button
    //             onClick={() => setShowPasswordModal(true)}
    //             className="text-blue-600 text-sm hover:underline  "
    //           >
    //             Change password
    //           </button>
    //         </div>
    //       </div>

    //       {/* 2FA Row */}
    //       <div className="grid grid-cols-12 gap-4">
    //         <div className="col-span-3 text-sm text-gray-700">
    //           Two-Factor Authentication (2FA)
    //         </div>

    //         <div className="col-span-9 space-y-1">
    //           <div className="flex items-center gap-2 text-yellow-600">
    //             <AlertTriangle size={16} />
    //             <span className="text-sm">2FA is inactive</span>
    //           </div>

    //           <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
    //             Protect your account with an additional layer of security.
    //             Connect your account to an authenticator app on your mobile
    //             device.
    //           </p>

    //           <button
    //             onClick={() => setShow2FAModal(true)}
    //             className="text-blue-600 text-sm hover:underline"
    //           >
    //             Enable 2FA
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {/* CHANGE PASSWORD MODAL */}

    //   {showPasswordModal && (
    //     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    //       <div className="bg-white rounded-xl shadow-xl w-[400px] p-6">
    //         <h3 className="text-lg font-semibold mb-4">Change Password</h3>

    //         <div className="space-y-4">
    //           <div>
    //             <label className="text-sm text-gray-600">
    //               Current Password
    //             </label>
    //             <input
    //               type="password"
    //               className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
    //             />
    //           </div>

    //           <div>
    //             <label className="text-sm text-gray-600">New Password</label>
    //             <input
    //               type="password"
    //               className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
    //             />
    //           </div>

    //           <div>
    //             <label className="text-sm text-gray-600">
    //               Confirm Password
    //             </label>
    //             <input
    //               type="password"
    //               className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
    //             />
    //           </div>
    //         </div>

    //         {/* Modal Buttons */}
    //         <div className="flex justify-end gap-3 mt-6">
    //           <button
    //             onClick={() => setShowPasswordModal(false)}
    //             className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
    //           >
    //             Cancel
    //           </button>
    //           <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {/* ENABLE 2FA MODAL */}

    //   {show2FAModal && (
    //     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    //       <div className="bg-white rounded-xl shadow-xl w-[450px] p-6">
    //         <h3 className="text-lg font-semibold mb-4">
    //           Enable Two-Factor Authentication
    //         </h3>

    //         <p className="text-sm text-gray-600 leading-relaxed mb-4">
    //           Scan the QR code below using Google Authenticator or any
    //           authentication app to enable 2FA.
    //         </p>

    //         <div className="w-40 h-40 bg-gray-200 rounded-lg mx-auto"></div>

    //         <div className="flex justify-end gap-3 mt-6">
    //           <button
    //             onClick={() => setShow2FAModal(false)}
    //             className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
    //           >
    //             Close
    //           </button>

    //           <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
    //             Verify & Enable
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="p-4 sm:p-6 md:p-10 w-full">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800">Account</h2>

      <p className="text-gray-500 text-sm mt-1 max-w-2xl leading-relaxed">
        Change your agent name, add your profile picture, change your email
        address and password and adjust your region so that your time zone will
        be displayed correctly.
      </p>

      {/* Tabs - scrollable on mobile */}
      <div className="flex gap-6 mt-6 border-b overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`pb-3 whitespace-nowrap text-sm font-medium transition-all ${
              activeTab === t
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ============= PERSONAL DETAILS TAB ============= */}
      {activeTab === "Personal details" && (
        <div className="mt-10 space-y-8">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            <label className="md:col-span-3 text-gray-700 text-sm">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="md:col-span-6 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Picture Upload */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <label className="md:col-span-3 text-gray-700 text-sm">
              Your picture
            </label>

            <label
              htmlFor="personalPhotoUpload"
              className={`w-24 h-24 rounded-xl border-2 cursor-pointer 
            flex items-center justify-center overflow-hidden transition
            ${
              accountPhoto
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
            >
              {accountPhoto ? (
                <img
                  src={accountPhoto}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xs">Click to upload</span>
              )}
            </label>

            <input
              id="personalPhotoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setAccountPhoto(URL.createObjectURL(file));
              }}
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            <label className="md:col-span-3 text-gray-700 text-sm">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="md:col-span-6 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Region */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            {/* Label */}
            <label className="md:col-span-3 text-gray-700 text-sm">
              Region
            </label>

            {/* Dropdown */}

            <select
              className="w-50 md:w-70 border border-gray-300 rounded-lg px-3 py-2 text-sm 
                 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Select...</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>USA</option>
            </select>
          </div>

          {/* Language */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            {/* Label */}
            <label className="md:col-span-3 text-gray-700 text-sm">
              Language
            </label>
            <select
              className="w-50 md:w-70 border border-gray-300 rounded-lg px-3 py-2 text-sm 
                 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </div>
        </div>
      )}

      {/* ============= CUSTOM SIGNATURE TAB ============= */}
      {activeTab === "Custom signature" && (
        <div className="mt-10">
          <p className="text-gray-600 text-sm mb-4">
            Set your individual email signature.
          </p>

          <label className="text-gray-700 text-sm block mb-2">Signature</label>

          <div className="border rounded-xl h-48 p-4 bg-white w-full md:w-[60%]">
            <textarea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="w-full h-[80%] outline-none resize-none text-sm"
              placeholder="Write your signature here…"
            ></textarea>

            <div className="flex items-center gap-4 text-gray-400 text-sm mt-2 border-t pt-2">
              <span className="cursor-pointer font-bold text-gray-600">B</span>
              <span className="cursor-pointer italic text-gray-600">I</span>
              <span className="cursor-pointer underline text-gray-600">U</span>
              <span className="cursor-pointer">🖼️</span>
              <span className="cursor-pointer">😊</span>
            </div>
          </div>

          <button
            disabled={!signature.trim()}
            className={`mt-4 px-5 py-2 text-sm rounded-lg transition
          ${
            signature.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
          >
            Save
          </button>
        </div>
      )}

      {/* ============= PASSWORD TAB ============= */}
      {activeTab === "Password" && (
        <div className="mt-10 space-y-8">
          {/* Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-3 text-sm text-gray-700">Password</div>
            <div className="md:col-span-9">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-blue-600 text-sm hover:underline"
              >
                Change password
              </button>
            </div>
          </div>

          {/* 2FA Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-sm text-gray-700">
              Two-Factor Authentication (2FA)
            </div>

            <div className="md:col-span-9 space-y-1">
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertTriangle size={16} />
                <span className="text-sm">2FA is inactive</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Protect your account with an additional layer of security.
              </p>

              <button
                onClick={() => setShow2FAModal(true)}
                className="text-blue-600 text-sm hover:underline"
              >
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODALS RESPONSIVE ===== */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-[400px] p-6">
            ...
          </div>
        </div>
      )}

      {show2FAModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-[450px] p-6">
            ...
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSetting;
