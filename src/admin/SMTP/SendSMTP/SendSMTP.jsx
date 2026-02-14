// import React, { useState, useEffect } from "react";
// import InputField from "@/components/layout/InputField";
// import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
// import RadioButtonLaunchCampaign from "./componets/RadioButtonLaunchCampaign";
// import EmailPreview from "./componets/EmailPreview";
// import UniversalButton from "@/components/common/UniversalButton";
// import toast, { Toaster } from "react-hot-toast";
// import { Dialog } from "primereact/dialog";
// import { getSMTPList, sendSMTP } from "@/apis/email/Email";
// import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
// import { IconButton, InputAdornment } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const SendSMTP = () => {
//   const [formData, setFormData] = useState({
//     hostName: "",
//     userName: "",
//     port: "",
//     password: "",
//     toEmail: "",
//     subject: "",
//     authentication: "",
//     message: "",
//   });
//   const [visible, setVisible] = useState(false);
//   const [smtpList, setSmtpList] = useState([]);
//   const [selectedSMTP, setSelectedSMTP] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   // 🔹 fetch all available SMTP records
//   const fetchSMTPList = async () => {
//     setLoading(true);
//     try {
//       const res = await getSMTPList();

//       if (res?.success && Array.isArray(res.data)) {
//         const formatted = res.data.map((item, index) => ({
//           id: index + 1,
//           label: `${item.hostName}`,
//           value: item.hostName,
//           fullData: item,
//         }));
//         setSmtpList(formatted);
//       } else {
//         toast.info("No SMTP records found");
//         setSmtpList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching SMTP list:", error);
//       toast.error("Failed to fetch SMTP list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSMTPList();
//   }, []);

//   const handleReviewAndSend = () => {
//     // Check for empty fields
//     const emptyField = Object.entries(formData).find(([_, value]) => !value);
//     if (emptyField) {
//       toast.error(`Please fill in the ${emptyField[0]} field.`);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.toEmail)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     // Port validation
//     // const portNumber = Number(formData.port);
//     // if (isNaN(portNumber) || portNumber <= 0 || portNumber > 65535) {
//     //   toast.error("Please enter a valid port number (1–65535).");
//     //   return;
//     // }

//     toast.success("All fields validated successfully!");
//     setVisible(true);
//   };

//   const handleConfirmSend = async () => {
//     try {
//       toast.loading("Sending email...", { id: "send" });

//       const payload = {
//         hostName: formData.hostName,
//         userName: formData.userName,
//         port: Number(formData.port),
//         password: formData.password,
//         toEmail: formData.toEmail,
//         subject: formData.subject,
//         message: formData.message,
//         authentication: formData.authentication,
//       };

//       console.log("Sending payload:", payload);

//       const response = await sendSMTP(payload);

//       if (response?.status === 200 || response?.success) {
//         toast.success("Email sent successfully!", { id: "send" });
//         setVisible(false);
//       } else {
//         toast.error("Failed to send email. Please try again.", { id: "send" });
//       }
//     } catch (error) {
//       console.error("SMTP Send Error:", error);
//       toast.error("Something went wrong while sending email.", { id: "send" });
//     }
//   };

//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
//         {/* Left Side */}
//         <div className="w-full space-y-2">
//           <div className="space-y-4 border border-gray-300 bg-white p-4 rounded-lg">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//               <DropdownWithSearch
//                 label="Choose SMTP"
//                 tooltipContent="Please Select SMTP"
//                 tooltipPlacement="right"
//                 placeholder="Select SMTP Hostname"
//                 options={smtpList}
//                 value={selectedSMTP}
//                 onChange={(valueOrEvent) => {
//                   // Get selected value safely
//                   const selected =
//                     valueOrEvent?.target?.value ??
//                     valueOrEvent?.value ??
//                     valueOrEvent;

//                   setSelectedSMTP(selected);
//                   const selectedItem = smtpList.find(
//                     (item) => item.value === selected
//                   );

//                   if (selectedItem?.fullData) {
//                     const smtp = selectedItem.fullData;
//                     setFormData((prev) => ({
//                       ...prev,
//                       hostName: smtp.hostName || "",
//                       userName: smtp.userName || "",
//                       port: smtp.port || "",
//                       password: smtp.password || "",
//                       authentication: smtp.authentication || "",
//                     }));

//                     toast.success(
//                       `SMTP "${smtp.hostName}" loaded successfully`
//                     );
//                   }
//                 }}
//               />

//               <InputField
//                 label="Host Name"
//                 tooltipContent="Please Enter Host Name "
//                 tooltipPlacement="right"
//                 placeholder="Enter Host Name"
//                 value={formData.hostName}
//                 onChange={(e) => handleChange("hostName", e.target.value)}
//               />
//               <InputField
//                 label="User Name"
//                 tooltipContent="Please Enter User Name "
//                 tooltipPlacement="right"
//                 placeholder="Enter User Name"
//                 value={formData.userName}
//                 onChange={(e) => handleChange("userName", e.target.value)}
//               />
//               <InputField
//                 label="Port"
//                 tooltipContent="Please Enter Port "
//                 tooltipPlacement="right"
//                 placeholder="Enter port"
//                 value={formData.port}
//                 onChange={(e) => handleChange("port", e.target.value)}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//               {/* <InputField
//                 label="Password"
//                 tooltipContent="Please Enter Password "
//                 tooltipPlacement="right"
//                 placeholder="Enter password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//               /> */}
//               <div className="relative">
//                 <InputField
//                   label="Password"
//                   tooltipContent="Please Enter Password"
//                   tooltipPlacement="right"
//                   placeholder="Enter password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={(e) => handleChange("password", e.target.value)}
//                   className="pr-10"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-2 top-8.5 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </button>
//               </div>

//               <InputField
//                 label="Email"
//                 tooltipContent="Please Enter Email "
//                 tooltipPlacement="right"
//                 type="email"
//                 placeholder="Enter Email"
//                 value={formData.toEmail}
//                 onChange={(e) => handleChange("toEmail", e.target.value)}
//               />
//               <InputField
//                 label="Subject"
//                 tooltipContent="Please Enter Subject "
//                 tooltipPlacement="right"
//                 placeholder="Subject"
//                 value={formData.subject}
//                 onChange={(e) => handleChange("subject", e.target.value)}
//               />
//               {/* <InputField
//                 label="Authentication"
//                 placeholder="Enter Authentication"
//                 value={formData.authentication}
//                 onChange={(e) => handleChange("authentication", e.target.value)}
//               /> */}
//               <DropdownWithSearch
//                 label="Authentication"
//                 tooltipContent="Please Select Authentication "
//                 tooltipPlacement="right"
//                 placeholder="Select Authentication"
//                 value={formData.authentication}
//                 // onChange={(e) => handleChange("authentication", e.target)}
//                 onChange={(valueOrEvent) => {
//                   const value =
//                     valueOrEvent?.target?.value ??
//                     valueOrEvent?.value ??
//                     valueOrEvent;
//                   handleChange("authentication", value);
//                 }}
//                 options={[
//                   { label: "Plain", value: "plain" },
//                   { label: "Login", value: "login" },
//                   { label: "Cram MD5", value: "cram md-5" },
//                 ]}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//               <UniversalTextArea
//                 label="Message"
//                 tooltipContent="Please Enter Message"
//                 tooltipPlacement="right"
//                 placeholder="Enter message"
//                 className="h-30"
//                 value={formData.message}
//                 onChange={(e) => handleChange("message", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* <div className="space-y-4 border border-gray-300 bg-white p-4 rounded-lg">
//             <RadioButtonLaunchCampaign
//               onOptionChange={() => {}}
//               onGroupChange={() => {}}
//               setSelectedGroups={setSelectedGroups}
//             />
//           </div> */}
//         </div>

//         {/* Right Side */}
//         <div className="w-full lg:w-100 xl:w-150 2xl:w-170 h-full">
//           <div className="space-y-4 border border-gray-300 bg-white p-4 rounded-lg">
//             <EmailPreview
//               subject={formData.subject}
//               toEmail={formData.toEmail}
//               message={formData.message}
//               userName={formData.userName}
//               hostName={formData.hostName}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Review & Send Button */}
//       <div className="flex items-center justify-center mt-5">
//         <UniversalButton
//           label="Review & Send"
//           type="button"
//           onClick={handleReviewAndSend}
//           style={{ borderRadius: "40px", letterSpacing: "1px" }}
//           variant="primary"
//         />
//       </div>

//       <Dialog
//         header="Review Email Details"
//         visible={visible}
//         style={{ width: "40vw" }}
//         modal
//         onHide={() => setVisible(false)}
//       >
//         <div className="space-y-5">
//           <div className="border rounded-xl bg-gray-50 px-5 py-4 shadow-sm space-y-3">
//             <div className="flex justify-between border-b border-gray-200 pb-2">
//               <span className="font-medium text-gray-600">Host</span>
//               <span className="text-gray-900">{formData.hostName}</span>
//             </div>
//             <div className="flex justify-between border-b border-gray-200 pb-2">
//               <span className="font-medium text-gray-600">User</span>
//               <span className="text-gray-900">{formData.userName}</span>
//             </div>
//             <div className="flex justify-between border-b border-gray-200 pb-2">
//               <span className="font-medium text-gray-600">Email To</span>
//               <span className="text-gray-900">{formData.toEmail}</span>
//             </div>
//             <div className="flex justify-between border-b border-gray-200 pb-2">
//               <span className="font-medium text-gray-600">Subject</span>
//               <span className="text-gray-900">{formData.subject}</span>
//             </div>

//             <div className="pt-2">
//               <span className="font-medium text-gray-600">Message</span>
//               <div className="bg-white border border-gray-200 rounded-lg mt-2 p-3 max-h-40 overflow-y-auto">
//                 <p className="text-gray-800 whitespace-pre-line">
//                   {formData.message}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center mt-5">
//             <UniversalButton
//               label="Send Email"
//               variant="primary"
//               onClick={handleConfirmSend}
//               style={{
//                 borderRadius: "40px",
//                 letterSpacing: "1px",
//                 padding: "10px 30px",
//                 fontWeight: "600",
//               }}
//             />
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default SendSMTP;



import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Dialog } from "primereact/dialog";

// MUI MATERIAL
import { IconButton, InputAdornment } from "@mui/material";

// ICONS
import { Visibility, VisibilityOff } from "@mui/icons-material";

// COMPONENTS
import InputField from "@/components/layout/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import RadioButtonLaunchCampaign from "./componets/RadioButtonLaunchCampaign";
import EmailPreview from "./componets/EmailPreview";

// API
import { getSMTPList, sendSMTP } from "@/apis/email/Email";

const SendSMTP = () => {
  const [formData, setFormData] = useState({
    hostName: "",
    userName: "",
    port: "",
    password: "",
    toEmail: "",
    subject: "",
    authentication: "",
    message: "",
  });
  const [visible, setVisible] = useState(false);
  const [smtpList, setSmtpList] = useState([]);
  const [selectedSMTP, setSelectedSMTP] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 fetch all available SMTP records
  const fetchSMTPList = async () => {
    setLoading(true);
    try {
      const res = await getSMTPList();

      if (res?.success && Array.isArray(res.data)) {
        const formatted = res.data.map((item, index) => ({
          id: index + 1,
          label: `${item.hostName}`,
          value: item.hostName,
          fullData: item,
        }));
        setSmtpList(formatted);
      } else {
        toast.info("No SMTP records found");
        setSmtpList([]);
      }
    } catch (error) {
      console.error("Error fetching SMTP list:", error);
      toast.error("Failed to fetch SMTP list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSMTPList();
  }, []);

  const handleReviewAndSend = () => {
    // Check for empty fields
    const emptyField = Object.entries(formData).find(([_, value]) => !value);
    if (emptyField) {
      toast.error(`Please fill in the ${emptyField[0]} field.`);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.toEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Port validation
    // const portNumber = Number(formData.port);
    // if (isNaN(portNumber) || portNumber <= 0 || portNumber > 65535) {
    //   toast.error("Please enter a valid port number (1–65535).");
    //   return;
    // }

    toast.success("All fields validated successfully!");
    setVisible(true);
  };

  const handleConfirmSend = async () => {
    try {
      toast.loading("Sending email...", { id: "send" });

      const payload = {
        hostName: formData.hostName,
        userName: formData.userName,
        port: Number(formData.port),
        password: formData.password,
        toEmail: formData.toEmail,
        subject: formData.subject,
        message: formData.message,
        authentication: formData.authentication,
      };

      console.log("Sending payload:", payload);

      const response = await sendSMTP(payload);

      if (response?.status === 200 || response?.success) {
        toast.success("Email sent successfully!", { id: "send" });
        setVisible(false);
      } else {
        toast.error("Failed to send email. Please try again.", { id: "send" });
      }
    } catch (error) {
      console.error("SMTP Send Error:", error);
      toast.error("Something went wrong while sending email.", { id: "send" });
    }
  };

  return (
    <div>
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
        {/* Left Side */}
        <div className="w-full space-y-2">
          <div className="space-y-4 border border-gray-300 bg-white p-4 rounded-lg h-full">
            <DropdownWithSearch
              label="Choose SMTP"
              tooltipContent="Please Select SMTP"
              tooltipPlacement="right"
              placeholder="Select SMTP Hostname"
              options={smtpList}
              value={selectedSMTP}
              onChange={(valueOrEvent) => {
                // Get selected value safely
                const selected =
                  valueOrEvent?.target?.value ??
                  valueOrEvent?.value ??
                  valueOrEvent;

                setSelectedSMTP(selected);
                const selectedItem = smtpList.find(
                  (item) => item.value === selected
                );

                if (selectedItem?.fullData) {
                  const smtp = selectedItem.fullData;
                  setFormData((prev) => ({
                    ...prev,
                    hostName: smtp.hostName || "",
                    userName: smtp.userName || "",
                    port: smtp.port || "",
                    password: smtp.password || "",
                    authentication: smtp.authentication || "",
                  }));

                  toast.success(
                    `SMTP "${smtp.hostName}" loaded successfully`
                  );
                }
              }}
            />

            {/* SMTP INFO PANEL */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">

              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">Host Name</span>
                <span className="text-gray-900 font-semibold">{formData.hostName || "—"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">User Name</span>
                <span className="text-gray-900 font-semibold">{formData.userName || "—"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">Port</span>
                <span className="text-gray-900 font-semibold">{formData.port || "—"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">Password</span>
                <span className="text-gray-900 font-semibold">{formData.password || "—"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">Authentication</span>
                <span className="text-gray-900 font-semibold">{formData.authentication || "—"}</span>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full">
                <InputField
                  label="Email"
                  tooltipContent="Please Enter Email"
                  tooltipPlacement="right"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.toEmail}
                  onChange={(e) => handleChange("toEmail", e.target.value)}
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Subject"
                  tooltipContent="Please Enter Subject "
                  tooltipPlacement="right"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                />
              </div>
            </div>
            <UniversalTextArea
              label="Message"
              tooltipContent="Please Enter Message"
              tooltipPlacement="right"
              placeholder="Enter message"
              className="h-30"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-100 xl:w-150 2xl:w-170 h-full">
          <div className="space-y-4 border border-gray-300 bg-white p-4 rounded-lg">
            <EmailPreview
              subject={formData.subject}
              toEmail={formData.toEmail}
              message={formData.message}
              userName={formData.userName}
              hostName={formData.hostName}
            />
          </div>
        </div>
      </div>

      {/* Review & Send Button */}
      <div className="flex items-center justify-center mt-5">
        <UniversalButton
          label="Review & Send"
          type="button"
          onClick={handleReviewAndSend}
          style={{ borderRadius: "40px", letterSpacing: "1px" }}
          variant="primary"
        />
      </div>

      <Dialog
        header="Review Email Details"
        visible={visible}
        style={{ width: "40vw" }}
        modal
        onHide={() => setVisible(false)}
        draggable={false}
      >
        <div className="space-y-5">
          <div className="border rounded-xl bg-gray-50 px-5 py-4 shadow-sm space-y-3">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-600">Host</span>
              <span className="text-gray-900">{formData.hostName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-600">User</span>
              <span className="text-gray-900">{formData.userName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-600">Email To</span>
              <span className="text-gray-900">{formData.toEmail}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-600">Subject</span>
              <span className="text-gray-900">{formData.subject}</span>
            </div>

            <div className="pt-2">
              <span className="font-medium text-gray-600">Message</span>
              <div className="bg-white border border-gray-200 rounded-lg mt-2 p-3 max-h-40 overflow-y-auto">
                <p className="text-gray-800 whitespace-pre-line">
                  {formData.message}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <UniversalButton
              label="Send Email"
              variant="primary"
              onClick={handleConfirmSend}
              style={{
                borderRadius: "40px",
                letterSpacing: "1px",
                padding: "10px 30px",
                fontWeight: "600",
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SendSMTP;
