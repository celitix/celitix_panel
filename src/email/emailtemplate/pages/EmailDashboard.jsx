import React, { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";

// ICONS
import { MdOutlineEmail } from "react-icons/md";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendIcon from "@mui/icons-material/Send";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EmailIcon from "@mui/icons-material/Email";

// ASSETS
import nothinganimation from "@/assets/animation/nothinganimation.json";

// APIS
import {
  getEmailAllTemplate,
  deleteEmailTemplate,
  getEmailSingleTemplate,
  testEmail,
} from "@/apis/email/Email";

// COMPONENTS
import UniversalButton from "@/components/common/UniversalButton";
import CustomTooltip from "@/components/common/CustomTooltip";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import EmailFormatter from "@/utils/EmailFormatter";
import DropdownMenuPortal from "@/utils/DropdownMenuPortal.jsx";
import InputField from "@/components/layout/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";

const EmailDashboard = () => {
  const [searchTemp, setSearchTemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [publishingId, setPublishingId] = useState(null);
  const [isPublishingNow, setIsPublishingNow] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [totalEmailTemplates, setTotalEmailTemplates] = useState(null);
  const [emailTemplatePageSize, setEmailTemplatePageSize] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [search, setSearch] = useState("");


  //test service
  const [isTestServiceDialogOpen, setIsTestServiceDialogOpen] = useState(false);
  const [testServiceData, setTestServiceData] = useState({
    templateId: null,
    subject: "",
    fromEmail: "",
    fromName: "",
    toEmail: "",
    cc: "",
    bodyHtml: "",
    varList: {},
    attachmentName: "",
    attachment: "",
  });

  //send single mail
  const [isSingleMailDialogOpen, setIsSingleMailDialogOpen] = useState(false);
  const [singleMailData, setSingleMailDataData] = useState({
    templateId: null,
    subject: "",
    fromEmail: "",
    fromName: "",
    toEmail: "",
    cc: "",
    bodyHtml: "",
    varList: {},
    attachmentName: "",
    attachment: "",
    totalVariables: 0,
    variablesList: [],
  });

  const handleMenuOpen = (event, email) => {
    setDropdownOpenId(email.srNo);
  };
  const dropdownButtonRefs = useRef({});
  const rowsPerPage = 4;
  const navigate = useNavigate();
  const [emailList, setEmailList] = useState([]);

  const fetchEmailTemplateList = async (templateName = "") => {
    try {
      setIsLoading(true);

      const data = {
        pageIndex: currentPage,
        pageSize: emailTemplatePageSize || 10,
        templateName: templateName || "",
      };

      const response = await getEmailAllTemplate(data);

      if (response?.success === true) {
        setEmailList(response?.data?.content || []);
        setTotalEmailTemplates(response?.data?.totalElements || 0);

        const pages = Math.ceil(
          response?.data?.totalElements / (emailTemplatePageSize || 10),
        );

        setTotalPages(pages);
      }
    } catch (error) {
      console.error("Error fetching email template list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplateList(search);
  }, [emailTemplatePageSize, currentPage, search]);

  const handlepublishBtn = (email) => {
    console.log("Sending test email for template:", email.srNo);
    setDropdownOpenId(email.srNo);
  };

  const handleMenuClose = () => {
    setDropdownOpenId(null);
  };

  const handleDelete = async (email) => {
    try {
      const response = await deleteEmailTemplate(email.srNo);
      if (response?.success === true) {
        toast.success("Email template deleted successfully.");
        setOpenDeleteDialog(false);
        setSelectedEmail(null);
        fetchEmailTemplateList();
      }
    } catch (error) {
      console.error("Error deleting email template:", error);
      toast.error("Failed to delete email template.");
    }
  };

  const handleEmailSend = async (email) => {
    try {
      const response = await getEmailSingleTemplate(email.srNo);
      console.log("response getEmailSingleTemplate", response);
    } catch (error) {
      toast.error("Failed to send an email");
    }
  };

  const handleNavigate = () => {
    navigate("/emailmanagement/emailltemplates");
  };

  const filteredEmails = (Array.isArray(emailList) ? emailList : []).filter(
    (email) =>
      (email?.templateName || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleEditEmailTemplate = (email) => {
    navigate("/emailmanagement/emailltemplates", {
      state: {
        emailTemplateData: email,
      },
    });
  };

  const handleSearch = () => {
    setSearch(searchTemp);
    setCurrentPage(1); // reset
    fetchEmailTemplateList(searchTemp);
  };

  function handleInsertVariable(e, index, type) {
    if (type == "single") {
      // const variableList = singleMailData.varList;
      // variableList[index] = e;
      setSingleMailDataData((prevData) => ({
        ...prevData,
        varList: {
          ...prevData.varList,
          [index]: e,
        },
      }));
    }
  }
  const testService = () => {
    setSingleMailDataData((prevData) => ({
      ...prevData,
      templateId: null,
      totalVariables: 0,
      variablesList: [],
      bodyHtml: "",
      isTestService: true,
    }));
    setIsSingleMailDialogOpen(true);
    // setIsTestServiceDialogOpen(true);
  };

  const handleTestSingleMail = (data) => {
    const content = data?.emailContent;
    const vars = [...content.matchAll(/\{#(.*?)#\}/g)].map((m) => m[1]);
    const varList = {};
    vars.forEach((v) => {
      varList[v] = "";
    });

    setSingleMailDataData((prevData) => ({
      ...prevData,
      templateId: data?.srNo,
      totalVariables: vars.length || 0,
      variablesList: vars || [],
      varList,
      bodyHtml: data?.emailContent,
    }));
    setIsSingleMailDialogOpen(true);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  };

  async function sendTestEmail() {
    try {
      let isError = false;
      const vars = singleMailData?.varList;

      if (vars && Object.keys(vars).length > 0) {
        isError = Object.values(vars).some((v) => v == null);
      }

      if (isError) {
        toast.error("Please fill all the Variables");
        return;
      }

      const requiredFields = [
        "subject",
        "fromEmail",
        "fromName",
        "toEmail",
        "bodyHtml",
      ];
      const missingFields = requiredFields.filter(
        (item) => singleMailData[item] === "",
      );

      if (missingFields.length > 0) {
        toast.error("Please fill all the required fields");
        return;
      }

      const emailFields = ["fromEmail", "toEmail"];
      const errorEmailFields = emailFields.filter(
        (field) => !isValidEmail(singleMailData?.[field]),
      );

      if (errorEmailFields.length > 0) {
        toast.error("Please fill Please fill valid FromEmail or ToEmail.");
        return;
      }

      if (singleMailData?.cvv && !isValidEmail(singleMailData?.cvv)) {
        toast.error("Please fill valid CC.");
        return;
      }
      delete singleMailData.totalVariables;
      delete singleMailData.variablesList;
      delete singleMailData.isTestService;
      const response = await testEmail(singleMailData);
      console.log("response", response);
      toast.success("Email Sent Successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to send an email");
    }
  }

  return (
    <div>
      <div className=" bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="p-4">
          {/* <div className="flex flex-col md:flex-row md:justify-between items-center mb-4"> */}
          <div className="flex flex-col md:flex-wrap lg:flex-row lg:justify-between justify-center items-center lg:items-start gap-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2 sm:mb-0">
              Created Email
              <MdOutlineEmail className="text-[#25D366] text-2xl" />
            </h2>

            <div className="flex flex-col  md:flex-row lg:justify-between justify-center items-center lg:items-start gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-lg shadow-sm">
                <span className="font-medium text-sm">
                  Total Email Templates
                </span>

                <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {totalEmailTemplates}
                </span>
              </div>

              {/* <div className="w-45">
                <DropdownWithSearch
                  id="campaign"
                  name="campaign"
                  // label="Select Campaign"
                  options={[
                    { value: 5, label: "5" },
                    { value: 10, label: "10" },
                    { value: 20, label: "20" },
                  ]}
                  onChange={(e) => setEmailTemplatePageSize(e?.value || 10)}
                  value={emailTemplatePageSize}
                  placeholder="Select Page Size"
                />
              </div> */}
              <input
                type="text"
                placeholder="Search by Email Template Name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-64 text-sm"
                value={searchTemp}
                onChange={(e) => setSearchTemp(e.target.value)}
              />
              <UniversalButton label="Search" onClick={handleSearch} />
              <UniversalButton label="Test Service" onClick={testService} />
            </div>
          </div>

          {/* Flows */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-4 border-gray-300 border-t-2 pt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-160 bg-gray-200 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-2 h-full lg:h-[75vh]">
                <div className="w-60 h-60">
                  <Lottie animationData={nothinganimation} loop={true} />
                </div>
                <div className="text-xl font-semibold text-gray-500 text-center">
                  No Emails found.
                  <br />
                  <span className="text-base font-normal text-gray-400">
                    Start your professional journey by creating a new email
                    template!
                  </span>
                </div>
                <div className="mt-4">
                  <UniversalButton
                    label="Create Temp"
                    onClick={handleNavigate}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                    icon={<SearchOutlinedIcon className="text-white" />}
                    iconPosition="left"
                    style={{
                      width: "fit-content",
                      padding: "8px 16px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredEmails.map((email, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 m-2"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#578FCA] rounded-full"></div>
                        <h3 className="text-gray-900 font-semibold text-sm sm:text-base tracking-tight">
                          {email.templateName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Email */}
                        <CustomTooltip
                          title="Test Template"
                          placement="top"
                          arrow
                        >
                          <button
                            onClick={() => handleTestSingleMail(email)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                          >
                            <EmailIcon fontSize="small" />
                          </button>
                        </CustomTooltip>
                        {/* Edit */}
                        <CustomTooltip
                          title="Edit Template"
                          placement="top"
                          arrow
                        >
                          <button
                            onClick={() => handleEditEmailTemplate(email)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                            title="Edit Template"
                          >
                            <EditIcon fontSize="small" />
                          </button>
                        </CustomTooltip>

                        {/* Delete */}
                        <CustomTooltip
                          title="Delete Template"
                          placement="top"
                          arrow
                        >
                          <button
                            onClick={() => {
                              setOpenDeleteDialog(true);
                              setSelectedEmail(email);
                              setDropdownOpenId(null);
                              setSelectedTemplateName(email.templateName);
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
                            title="Delete Template"
                          >
                            <DeleteForeverIcon
                              sx={{
                                fontSize: "1.2rem",
                                color: "#e31a1a",
                              }}
                            />
                          </button>
                        </CustomTooltip>
                      </div>
                    </div>

                    {/* Email Preview */}
                    <div className="bg-gray-50 rounded-xl p-3 text-gray-800 text-sm leading-relaxed shadow-inner border border-gray-100">
                      <EmailFormatter htmlContent={email.emailContent} />
                      {/* {email.emailContent} */}
                    </div>

                    {/* Footer Info (optional) */}
                    <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                      <span>
                        Created on:{" "}
                        <strong className="text-gray-700">
                          {moment(email.insertTime).format("DD MMM YYYY")}
                        </strong>
                      </span>
                    </div>
                  </div>
                ))}
                <div></div>
              </div>
            )}

            <div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-end items-center gap-2 mt-4 flex-wrap">
                  {/* Prev */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className={`px-3 py-1 rounded border text-sm
                          ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-blue-50"
                      }`}
                  >
                    Prev
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded border text-sm
                              ${currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white hover:bg-blue-50"
                          }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className={`px-3 py-1 rounded border text-sm
                            ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-blue-50"
                      }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            <Dialog
              header="Delete Email Template"
              visible={openDeleteDialog}
              style={{ width: "27rem" }}
              onHide={() => setOpenDeleteDialog(false)}
              draggable={false}
            >
              <div className="flex flex-col items-center justify-center text-center px-4 py-3">
                <CancelOutlinedIcon
                  sx={{ fontSize: 64, color: "#f44336", mb: 1 }}
                />

                <h2 className="text-[1.15rem] font-semibold text-gray-700 mb-2">
                  Delete Template
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  You are about to delete the following template:
                </p>

                <div className="bg-gray-100 text-gray-800 font-medium rounded-md px-3 py-2 mb-4 w-full text-center break-words">
                  {selectedTemplateName || "Unnamed Template"}
                </div>

                <p className="text-gray-500 text-sm">
                  This action is{" "}
                  <span className="font-semibold text-red-600">permanent</span>{" "}
                  and cannot be undone.
                </p>

                <div className="flex justify-center gap-4 mt-5">
                  <UniversalButton
                    label="Cancel"
                    style={{
                      backgroundColor: "#4b5563",
                    }}
                    onClick={() => setOpenDeleteDialog(false)}
                  />
                  <UniversalButton
                    label="Delete"
                    style={{
                      backgroundColor: "#dc2626",
                    }}
                    onClick={() => handleDelete(selectedEmail)}
                  />
                </div>
              </div>
            </Dialog>

            <Dialog
              header={
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <SendIcon className="text-green-600" fontSize="small" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      {singleMailData?.isTestService ? "System SMTP Diagnostic" : "Email Template Testing Lab"}
                    </h3>
                    <p className="text-xs text-gray-500 font-normal">
                      Preview content and validate variables before sending
                    </p>
                  </div>
                </div>
              }
              visible={isSingleMailDialogOpen}
              style={{ width: "95vw", maxWidth: "1200px" }}
              onHide={() => {
                setIsSingleMailDialogOpen(false);
                setSingleMailDataData({
                  templateId: null,
                  subject: "",
                  fromEmail: "",
                  fromName: "",
                  toEmail: "",
                  cc: "",
                  bodyHtml: "",
                  varList: {},
                  attachmentName: "",
                  attachment: "",
                  totalVariables: 0,
                  variablesList: [],
                });
              }}
              draggable={false}
              blockScroll
              contentClassName="p-0"
            >
              <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[75vh] overflow-hidden">
                <div className="w-full lg:w-[450px] border-r border-gray-200 bg-white overflow-y-auto custom-scrollbar">
                  <div className="p-2 space-y-6 pb-24">
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <SettingsOutlinedIcon className="text-gray-400" fontSize="small" />
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mail Configuration</h4>
                      </div>
                      <div className="space-y-4">

                        <InputField
                          label="Recipient Email"
                          placeholder="e.g. client@domain.com"
                          id="toEmail"
                          name="toEmail"
                          value={singleMailData.toEmail}
                          onChange={(e) => {
                            setSingleMailDataData((prev) => ({
                              ...prev,
                              toEmail: e.target.value,
                            }));
                          }}
                        />
                        <div className="grid grid-cols-2 gap-3">

                          <InputField
                            label="From Name"
                            placeholder="Marketing"
                            id="fromName"
                            name="fromName"
                            value={singleMailData.fromName}
                            onChange={(e) => {
                              setSingleMailDataData((prev) => ({
                                ...prev,
                                fromName: e.target.value,
                              }));
                            }}
                          />


                          <InputField
                            label="From Email"
                            placeholder="no-reply@test.com"
                            id="fromEmail"
                            name="fromEmail"
                            value={singleMailData.fromEmail}
                            onChange={(e) => {
                              setSingleMailDataData((prev) => ({
                                ...prev,
                                fromEmail: e.target.value,
                              }));
                            }}
                          />
                        </div>

                        <InputField
                          label="Subject Line"
                          placeholder="Enter email subject..."
                          id="subject"
                          name="subject"
                          value={singleMailData.subject}
                          onChange={(e) => {
                            setSingleMailDataData((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }));
                          }}
                        />
                        <InputField
                          label="CC (Carbon Copy)"
                          placeholder="manager@domain.com"
                          id="cc"
                          name="cc"
                          value={singleMailData.cc}
                          onChange={(e) => {
                            setSingleMailDataData((prev) => ({
                              ...prev,
                              cc: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </section>
                    {singleMailData?.isTestService && (
                      <section className="space-y-3">
                        <div className="flex items-center gap-2">
                          <EmailIcon className="text-gray-400" fontSize="small" />
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message Body</h4>
                        </div>

                        <UniversalTextArea
                          placeholder="HTML or Plain Text content..."
                          id="Body"
                          name="Body"
                          row={10}
                          value={singleMailData.bodyHtml}
                          onChange={(e) => {
                            setSingleMailDataData((prev) => ({
                              ...prev,
                              bodyHtml: e.target.value,
                            }));
                          }}
                        />
                      </section>
                    )}

                    {/* {singleMailData?.variablesList &&
                      singleMailData.variablesList.length > 0 &&
                      singleMailData.variablesList.map((variable, index) => (
                        <div key={index}>
                          <InputField
                            label={`variable-${index}`}
                            id={`variable-${index}`}
                            name={`variable-${index}`}
                            value={singleMailData.varList[variable]}
                            onChange={(e) => {
                              handleInsertVariable(
                                e.target.value,
                                variable,
                                "single",
                              );
                            }}
                          />
                        </div>
                      ))} */}

                    {singleMailData?.variablesList?.length > 0 && (
                      <section className="bg-blue-50/50 p-2 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold text-blue-700 uppercase flex items-center gap-2">
                            <MdOutlinePublishedWithChanges /> Dynamic Placeholders
                          </h4>
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                            {singleMailData.variablesList.length} Found
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {singleMailData.variablesList.map((variable, index) => (
                            <div key={index} className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-sm transition-focus-within">
                              <label className="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">
                                {variable}
                              </label>
                              <input
                                type="text"
                                className="w-full text-sm bg-transparent border-none p-0 focus:ring-0 text-gray-700 placeholder-gray-300 outline-none"
                                placeholder={`Enter value for ${variable}...`}
                                value={singleMailData.varList[variable] || ""}
                                onChange={(e) => handleInsertVariable(e.target.value, variable, "single")}
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                  </div>


                  {/* STICKY FOOTER ACTIONS */}
                  <div className="absolute bottom-0 left-0 w-full lg:w-[450px] p-4 bg-white border-t border-gray-100 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                    <button
                      onClick={() => setIsSingleMailDialogOpen(false)}
                      className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <UniversalButton
                      label={isLoading ? "Sending..." : "Send Test Email"}
                      icon={<SendIcon sx={{ fontSize: 16 }} />}
                      onClick={sendTestEmail}
                      className="flex-[2] shadow-lg shadow-green-100"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* RIGHT: LIVE PREVIEW PANEL */}
                <div className="flex-1 bg-gray-50 p-4 lg:p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
                  <div className="w-full max-w-[700px]">
                    {/* DEVICE HEADER */}
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-300" />
                        <div className="w-3 h-3 rounded-full bg-yellow-300" />
                        <div className="w-3 h-3 rounded-full bg-green-300" />
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <SearchOutlinedIcon fontSize="inherit" /> Desktop Live Preview
                      </div>
                    </div>

                    {/* MOCK INBOX WINDOW */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
                      {/* INBOX HEADER */}
                      <div className="bg-white border-b p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs uppercase">
                            {singleMailData.fromName?.substring(0, 2) || "S"}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm font-bold text-gray-800">{singleMailData.fromName || "Sender Name"}</h5>
                              <span className="text-[10px] text-gray-400 font-medium tracking-tighter italic">Just now</span>
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium">
                              To: <span className="text-blue-600">{singleMailData.toEmail || "recipient@domain.com"}</span>
                            </p>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-50 flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Subject:</span>
                          <span className="text-[12px] font-semibold text-gray-700 truncate">
                            {singleMailData.subject || "(No Subject Entered)"}
                          </span>
                        </div>
                      </div>

                      {/* RENDERED CONTENT AREA */}
                      <div className="flex-grow p-6 overflow-x-auto bg-[#fdfdfd]">
                        <EmailFormatter
                          htmlContent={
                            // REPLACE VARIABLES IN REAL-TIME FOR PREVIEW
                            (singleMailData.variablesList || []).reduce((acc, curr) => {
                              const userValue = singleMailData.varList[curr];
                              const placeholder = `<span class="px-1 bg-yellow-200 text-yellow-800 rounded text-[11px] font-bold border border-yellow-300">[${curr}]</span>`;
                              return acc.split(`{#${curr}#}`).join(userValue || placeholder);
                            }, singleMailData.bodyHtml || `<div class="flex flex-col items-center justify-center h-48 text-gray-300 border-2 border-dashed rounded-xl"><p>No Content to Display</p></div>`)
                          }
                        />
                      </div>
                    </div>

                    {/* DISCLAIMER */}
                    <p className="mt-4 text-[10px] text-center text-gray-400 uppercase tracking-widest px-4 leading-relaxed">
                      Rendering is simulated. Mobile view and different email clients (Outlook/Gmail) may display colors and fonts differently.
                    </p>
                  </div>
                </div>
              </div>


            </Dialog>
          </div>
          {/* Pagination */}
          {/* <div className="flex justify-end items-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`text-sm px-3 py-1 border rounded-sm cursor-pointer   ${
                  currentPage === i + 1 ? "bg-[#3674B5] text-white" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div> */}

          {/* <div className="flex justify-end items-center mt-4 gap-2">
            <UniversalButton
              label="Load More"
              onClick={fetchEmailTemplateList}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmailDashboard;
