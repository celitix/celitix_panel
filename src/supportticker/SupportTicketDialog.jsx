import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiSend, FiPaperclip, FiX, FiMessageSquare,
  FiAlertCircle, FiUsers, FiTag, FiLayers
} from "react-icons/fi";

// ASSETS
import celitixLogo from "@/assets/images/celitix-cpaas-solution-logo.svg";

// COMPONENTS
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { saveTicketLocal } from "./utils/ticketStore";

const SupportTicketDialog = ({ visible, onHide, userData, userName }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const FD_DOMAIN = import.meta.env.VITE_FRESHDESK_DOMAIN;
  const FD_API_KEY = import.meta.env.VITE_FRESHDESK_API_KEY;


  const [ticketData, setTicketData] = useState({
    name: userName || "",
    email: userData?.email || "",
    userid: userData?.userId || "",
    subject: "",
    type: "Issue",
    service: "WhatsApp",
    priority: 1,
    status: 2,
    description: "",
    cc_emails: "",
    tags: "",
  });

  const services = [
    { label: "WhatsApp API", value: "WhatsApp" },
    { label: "RCS Messaging", value: "RCS" },
    { label: "SMS Service", value: "SMS" },
    { label: "Chatbot Bot", value: "Chatbot" },
    { label: "Voice / OBD", value: "Voice" },
    { label: "Billing / Account", value: "Billing" },
  ];

  const priorities = [
    { label: "Low", value: 1 },
    { label: "Medium", value: 2 },
    { label: "High", value: 3 },
    { label: "Urgent", value: 4 },
  ];

  const ticketTypes = [
    { label: "Technical Issue", value: "Issue" },
    { label: "General Question", value: "Question" },
    { label: "Feature Request", value: "Feature Request" },
    { label: "Incident", value: "Incident" },
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const currentSize = files.reduce((acc, f) => acc + f.size, 0);
    const newSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

    if (currentSize + newSize > 20 * 1024 * 1024) {
      toast.error("Total attachments cannot exceed 20MB");
      return;
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  useEffect(() => {
    if (userData?.email) {
      setTicketData(prev => ({
        ...prev,
        email: userData.email,
        userid: userData.userId,
        name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
      }));
    }
  }, [userData]);

  const handleSubmit = async () => {
    // if (!ticketData.subject || !ticketData.description || !ticketData.service) {
    //   toast.error("Please fill in all mandatory fields");
    //   return;
    // }

    setLoading(true);
    try {


      const formData = new FormData();
      formData.append("custom_fields[cf_userid]", userData?.userId);
      formData.append("email", userData?.email || ticketData.email);
      // formData.append("email", "prateek@proactivesms.in");
      formData.append("name", userData?.firstName || ticketData.firstName);
      formData.append("subject", `[${ticketData.service}] ${ticketData.subject}`);
      formData.append("description", ticketData.description);
      formData.append("priority", Number(ticketData.priority));
      formData.append("status", Number(ticketData.status));
      // formData.append("type", ticketData.type);

      if (ticketData.cc_emails) {
        const ccArray = ticketData.cc_emails.split(",").map(email => email.trim());
        ccArray.forEach(email => formData.append("cc_emails[]", email));
      }

      if (ticketData.tags) {
        const tagsArray = ticketData.tags.split(",").map(tag => tag.trim());
        tagsArray.forEach(tag => formData.append("tags[]", tag));
      }

      // formData.append("custom_fields[category]", ticketData.service);

      files.forEach((file) => {
        formData.append("attachments[]", file);
      });

      const res = await axios.post(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Basic ${btoa(FD_API_KEY + ":X")}`
        }
      });

      if (res.status === 201) {
        const newTicket = res.data;

        // SAVE TO INDEXEDDB IMMEDIATELY
        await saveTicketLocal(newTicket);
        toast.success("Ticket generated successfully!");
        onHide();
        setFiles([]);
        setTicketData(prev => ({ ...prev, subject: "", description: "", cc_emails: "", tags: "" }));
      }
    } catch (error) {
      console.error("Freshdesk Error:", error);
      toast.error(error.response?.data?.message || "Failed to generate ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getConversationFromTicketId = async () => {
      const ticketId = 99367;

      try {
        const res = await axios.get(
          `https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}/conversations`,
          {
            headers: {
              'Authorization': `Basic ${btoa(FD_API_KEY + ":X")}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("Conversation list:", res.data);
      } catch (error) {
        console.error("Error fetching conversations:", error.response?.data || error.message);
        toast.error("Could not load ticket conversations");
      }
    };

    if (visible) {
      getConversationFromTicketId();
    }
  }, [visible]);


  // const handleCreateNote = async (ticketId) => {
  //   setLoading(true);
  //   try {

  //     const payload = {
  //       body: "Reply from Celitix Panel demouser account",
  //       private: false,
  //       // notify_emails: [userData?.email]
  //     };

  //     const ticketId = 99367;

  //     const res = await axios.post(
  //       `https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}/notes`,
  //       payload,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Basic ${btoa(FD_API_KEY + ":X")}`
  //         }
  //       }
  //     );

  //     console.log("Note response:", res.data);


  //     //       {
  //     //     "body": "<div>Reply from Celitix Panel: Your issue is being processed.</div>",
  //     //     "body_text": "Reply from Celitix Panel: Your issue is being processed.",
  //     //     "structured_body": null,
  //     //     "id": 13428894174,
  //     //     "incoming": false,
  //     //     "private": true,
  //     //     "user_id": 5008105507,
  //     //     "support_email": null,
  //     //     "ticket_id": 99367,
  //     //     "to_emails": [],
  //     //     "created_at": "2026-02-12T12:52:01Z",
  //     //     "updated_at": "2026-02-12T12:52:01Z",
  //     //     "attachments": []
  //     // }

  //     if (res.status === 201) {
  //       toast.success("Reply sent successfully!");
  //     }
  //   } catch (error) {
  //     console.error("Freshdesk Error:", error.response?.data || error);
  //     toast.error(error.response?.data?.message || "Failed to send reply");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <Dialog
      header={
        <div className="flex items-center gap-3">
          {/* <div className="bg-indigo-100 p-2 rounded-lg">
            <FiAlertCircle className="text-indigo-600 text-xl" />
          </div> */}
          <img src={celitixLogo} width={"auto"} height={25} alt="Celitix Logo" className="h-8" />

          <div>
            <h3 className="text-lg font-bold text-gray-800">Support Center</h3>
            <p className="text-xs text-gray-500 font-normal">Create a ticket for technical or billing assistance</p>
          </div>
        </div>
      }
      visible={visible}
      onHide={onHide}
      className="w-[95vw] md:w-[55rem]"
      draggable={false}
      blockScroll
    >
      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">User ID</span>
            <span className="text-sm font-semibold text-gray-700">{userData?.userId || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 border-l-0 md:border-l border-indigo-200 md:pl-6">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Requester Name</span>
            <span className="text-sm font-semibold text-gray-700">{`${userData?.firstName} ${userData?.lastName}` || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 border-l-0 md:border-l border-indigo-200 md:pl-6">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Email Address</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{userData?.email || "N/A"}</span>
          </div>
        </div>

        {/* <UniversalButton label="create note" onClick={handleCreateNote} /> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DropdownWithSearch
            label="Related Service *"
            options={services}
            value={ticketData.service}
            onChange={(val) => setTicketData({ ...ticketData, service: val })}
          />
          <DropdownWithSearch
            label="Ticket Type"
            options={ticketTypes}
            value={ticketData.type}
            onChange={(val) => setTicketData({ ...ticketData, type: val })}
          />
          <DropdownWithSearch
            label="Priority *"
            options={priorities}
            value={ticketData.priority}
            onChange={(val) => setTicketData({ ...ticketData, priority: val })}
          />
        </div>

        <InputField
          label="Ticket Subject *"
          placeholder="Brief summary (e.g., API 500 error on WhatsApp send)"
          value={ticketData.subject}
          onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="CC Emails"
            placeholder="email1@test.com, email2@test.com"
            value={ticketData.cc_emails}
            onChange={(e) => setTicketData({ ...ticketData, cc_emails: e.target.value })}
          />
          <InputField
            label="Tags"
            placeholder="v2-api, urgent, whatsapp-down"
            value={ticketData.tags}
            onChange={(e) => setTicketData({ ...ticketData, tags: e.target.value })}
          />
        </div>

        <UniversalTextArea
          label="Detailed Description *"
          placeholder="Please provide steps to reproduce, Request IDs, or error logs..."
          rows={10}
          value={ticketData.description}
          onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
        />

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <FiPaperclip /> Attachments (Screenshots / Logs)
          </label>
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
          >
            <FiLayers className="text-3xl text-gray-300 group-hover:text-indigo-400 mb-2" />
            <p className="text-sm text-gray-500 font-medium">Click to upload files</p>
            <p className="text-[10px] text-gray-400">Up to 20MB total (PDF, PNG, JPG, TXT)</p>
            <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <AnimatePresence>
              {files.map((file, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm"
                >
                  <span className="text-[11px] font-semibold text-indigo-700 truncate max-w-[150px]">
                    {file.name}
                  </span>
                  <FiX className="text-indigo-400 hover:text-red-500 cursor-pointer" onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button onClick={onHide} className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            Discard
          </button>
          <UniversalButton
            label={loading ? "Generating Ticket..." : "Submit to Support"}
            icon={<FiSend />}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default SupportTicketDialog;
// response of ticket raise

// {
//     "cc_emails": [
//         "ccmail@gmail.com"
//     ],
//     "fwd_emails": [],
//     "reply_cc_emails": [
//         "ccmail@gmail.com"
//     ],
//     "ticket_cc_emails": [
//         "ccmail@gmail.com"
//     ],
//     "ticket_bcc_emails": [],
//     "fr_escalated": false,
//     "spam": false,
//     "email_config_id": null,
//     "group_id": null,
//     "priority": 2,
//     "requester_id": 13077807470,
//     "responder_id": null,
//     "source": 2,
//     "company_id": null,
//     "status": 2,
//     "subject": "[SMS] ticket subject content",
//     "support_email": null,
//     "to_emails": null,
//     "product_id": null,
//     "id": 99374,
//     "type": null,
//     "due_by": null,
//     "fr_due_by": null,
//     "is_escalated": false,
//     "description": "<div>description content</div>",
//     "description_text": "description content",
//     "custom_fields": {
//         "cf_userid": "demoUser"
//     },
//     "created_at": "2026-02-13T04:44:35Z",
//     "updated_at": "2026-02-13T04:44:35Z",
//     "tags": [
//         "tag1"
//     ],
//     "attachments": [
//         {
//             "id": 13195604900,
//             "content_type": "image/jpeg",
//             "size": 63047,
//             "name": "73.jpg",
//             "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/13195604900/original/73.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20260213%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260213T044435Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b408c7f83cbb2b03af65738f08f045bd5704a5ae3e37dffd5a5e5804e0add952",
//             "created_at": "2026-02-13T04:44:35Z",
//             "updated_at": "2026-02-13T04:44:35Z"
//         },
//         {
//             "id": 13195604901,
//             "content_type": "application/octet-stream",
//             "size": 31328,
//             "name": "challansample.webp",
//             "attachment_url": "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/13195604901/original/challansample.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20260213%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260213T044435Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8ee53a91108436323763084e562696c9f029312a23a4543e65e97020ab1ab572",
//             "created_at": "2026-02-13T04:44:35Z",
//             "updated_at": "2026-02-13T04:44:35Z"
//         }
//     ],
//     "structured_description": null,
//     "form_id": 13000000521,
//     "nr_due_by": null,
//     "nr_escalated": false
// }



