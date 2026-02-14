
import React, { useState, useEffect, useRef } from "react";

// Import Components
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  getEmailAllTemplate,
  getEmailSingleTemplate,
  sendMultipleEmail,
} from "@/apis/email/Email";
import toast from "react-hot-toast";

import InputVariable from "./components/InputVariable";
import Preview from "./components/Preview";
import { RadioButtonLaunchEmail } from "./components/RadioButtonLaunchEmail";
import { getAllGroups } from "@/apis/common/common";
import { getCountryList } from "@/apis/admin/admin";
import { Dialog } from "primereact/dialog";

const SendEmail = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templates, setTemplates] = useState([]);
  const [subject, setSubject] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [toEmails, setToEmails] = useState([""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [variables, setVariables] = useState();
  const [variableCount, setVariableCount] = useState(0);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [totalAudience, setTotalAudience] = useState(0);
  // const [fileHeaders, setFileHeaders] = useState([]);
  // const [totalRecords, setTotalRecords] = useState("");
  // const [xlsxPath, setXlsxPath] = useState("");
  // const [selectedMobileColumn, setSelectedMobileColumn] = useState("");
  // const [selectedCountryCode, setSelectedCountryCode] = useState("");
  // const [isCountryCodeChecked, setIsCountryCodeChecked] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("option1");
  // const [uploadedFile, setUploadedFile] = useState(null);
  // const [isUploaded, setIsUploaded] = useState(false);

  const [selectedOption, setSelectedOption] = useState("group");
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGrp, setselectedGrp] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [contactData, setContactData] = useState({
    filePath: "",
    fileHeaders: [],
    totalRecords: "",
    selectedCountryCode: "",
    selectedMobileColumn: "",
    sampleRecords: "",
    addcountryCode: false,
  });
  const [countryList, setCountryList] = useState([]);
  const inputRef = useRef(null);

  const fileRef = React.useRef(null);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  };
  // Handle template change
  const fetchTemplates = async () => {
    try {
      const payload = {
        pageIndex: "",
        pageSize: "",
        templateName: "",
      };

      const res = await getEmailAllTemplate(payload);

      if (res?.data?.content) {
        const formatted = res.data.content.map((item) => ({
          label: item.templateName,
          value: item.srNo,
        }));

        setTemplates(formatted);
      } else {
        setTemplates([]);
      }
    } catch (error) {
      console.error("Template Fetch Error:", error);
      toast.error("Failed to load templates");
    }
  };

  async function fetchAllGrps() {
    try {
      const res = await getAllGroups();
      setAllGroups(res);
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    }
  }

  const fetchCountryList = async () => {
    try {
      // setIsLoading(true);

      const response = await getCountryList();

      if (response) {
        setCountryList(response);
      } else {
        toast.error("Failed to load Country List");
      }
    } catch (error) {
      toast.error("Error fetching country list.");
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchAllGrps();
    fetchCountryList();
  }, []);

  const handleTemplateSelect = async (srNo) => {
    setSelectedTemplate(srNo);

    if (!srNo) return;

    try {
      const res = await getEmailSingleTemplate(srNo);

      if (res?.data) {
        // ✅ Save email body/content
        setEmailContent(res.data.emailContent || "");

        if (res.data.variableCount >= 0) {
          const count = res.data.variableCount;

          const newVars = Array.from({ length: count }, () => "");
          const currentIndex = 0;

          setCurrentIndex(currentIndex);
          setToEmails([""]);

          setVariables({
            [currentIndex]: newVars,
          });

          setVariableCount(count);
        }
      }
    } catch (err) {
      console.error("Single Template Error:", err);
    }
  };

  const getPreviewContent = () => {
    let content = emailContent || "";

    const currentVars = variables?.[currentIndex] || [];

    currentVars.forEach((val, i) => {
      const regex = new RegExp(`{{var${i + 1}}}`, "g");
      content = content.replace(regex, val || `{{var${i + 1}}}`);
    });

    return content;
  };

  // Add new email field
  const handleAddEmail = () => {
    setToEmails((prev) => {
      const updated = [...prev, ""];
      const currentIndex = updated.length - 1;

      setCurrentIndex(currentIndex);

      const newVars = Array.from({ length: variableCount }, () => "");

      setVariables((prev) => ({
        ...prev,
        [currentIndex]: newVars,
      }));
      return updated;
    });
  };

  // Update email value
  const handleEmailChange = (index, value) => {
    const updated = [...toEmails];
    updated[index] = value;
    setToEmails(updated);
  };

  // Remove email field (optional)
  const handleRemoveEmail = (index) => {
    setRemovingIndex(index);

    setTimeout(() => {
      setToEmails((prev) => prev.filter((_, i) => i !== index));

      setRemovingIndex(null);

      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }, 250);

    setVariables((prev) => ({
      ...prev,
      [index]: Array.from({ length: variableCount }, () => ""),
    }));
  };

  // const handleSendEmail = async () => {
  //   if (!selectedTemplate) {
  //     toast.error("Please select a template");
  //     return;
  //   }

  //   if (!fromEmail || !fromName) {
  //     toast.error("From name & email required");
  //     return;
  //   }

  //   if (!toEmails.every((e) => e.trim())) {
  //     toast.error("Please fill all recipient emails");
  //     return;
  //   }

  //   // Check variables for each email
  //   for (let i = 0; i < toEmails.length; i++) {
  //     if (!variables?.[i]?.every((v) => v.trim())) {
  //       toast.error(`Fill all variables for Email ${i + 1}`);
  //       return;
  //     }
  //   }

  //   // Build List
  //   const list = toEmails.map((email, i) => {
  //     const varList = {};

  //     variables[i].forEach((val, index) => {
  //       varList[`var${index + 1}`] = val;
  //     });

  //     return {
  //       toEmail: email,
  //       varList: varList,
  //     };
  //   });

  //   // Final Payload
  //   const payload = {
  //     templateId: selectedTemplate,
  //     subject,
  //     fromEmail,
  //     fromName,
  //     replyEmail,
  //     list,
  //   };

  //   console.log("Final Payload:", payload);

  //   try {
  //     const res = await sendMultipleEmail(payload);

  //     if (res?.status) {
  //       toast.success(res?.message || "Emails sent 🚀");

  //       // Reset
  //       setToEmails([""]);
  //       setVariables({});
  //       setSelectedTemplate("");
  //       setCurrentIndex(0);
  //     } else {
  //       toast.error(res?.message || "Send failed");
  //     }
  //   } catch (err) {
  //     console.error("Send Error:", err);
  //     toast.error("Server error");
  //   }
  // };

  const handleSendEmail = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    if (!fromName) {
      toast.error("From name required");
      return;
    }

    if (!fromEmail) {
      toast.error("From email required");
      return;
    }

    if (!isValidEmail(fromEmail)) {
      toast.error("Invalid From email format");
      return;
    }

    if (!subject) {
      toast.error("From subject required");
      return;
    }

    if (!replyEmail) {
      toast.error("From Reply Email required");
      return;
    }

    if (!isValidEmail(replyEmail)) {
      toast.error("Invalid Reply email format");
      return;
    }

    for (let i = 0; i < toEmails.length; i++) {
      if (!variables?.[i]?.every((v) => v.trim())) {
        toast.error(`Fill all variables for To Email ${i + 1}`);
        return;
      }
    }

    for (let i = 0; i < toEmails.length; i++) {
      const email = toEmails[i];

      if (!email.trim()) {
        toast.error(`Email ${i + 1} is required`);
        return;
      }

      if (!isValidEmail(email)) {
        toast.error(`Invalid email format: ${email}`);
        return;
      }
    }

    if (selectedOption === "group" && !selectedGrp) {
      return toast.error("Please select a group.");
    }

    if (selectedOption === "group") {
      let totalGrpCount = 0;
      selectedGrp?.map((grp) => {
        const length = allGroups.find(
          (group) => group.groupCode === grp,
        ).totalCount;
        totalGrpCount += Number(length);
      });
      if (totalGrpCount === 0) {
        return toast.error("Selected group has no contacts.");
      }
      setTotalAudience(totalGrpCount);
    }

    if (selectedOption === "contact" && !contactData?.filePath) {
      return toast.error("Please upload a file.");
    }


    if (
      selectedOption === "contact" &&
      contactData.addcountryCode &&
      !contactData.selectedCountryCode
    ) {
      return toast.error("Please choose a country code.");
    }

    if (
      selectedOption === "contact" &&
      !contactData.selectedMobileColumn
    ) {
      toast.error("Please select email column.");
      return;
    }


    if (selectedOption === "contact") {
      setTotalAudience(contactData?.totalRecords);
    }



    // Open Review Dialog
    setConfirmDialogVisible(true);
  };

  const handleLaunchEmail = async () => {
    const list = toEmails.map((email, i) => {
      const varList = {};

      variables[i].forEach((val, index) => {
        varList[`var${index + 1}`] = val;
      });

      return {
        toEmail: email,
        varList,
      };
    });

    const payload = {
      templateId: selectedTemplate,
      subject,
      fromEmail,
      fromName,
      replyEmail,
      list,
    };

    try {
      const res = await sendMultipleEmail(payload);

      if (res?.status) {
        toast.success(res?.message || "Emails sent 🚀");

        // Reset
        setToEmails([""]);
        setVariables({});
        setSelectedTemplate("");
        setCurrentIndex(0);
        setConfirmDialogVisible(false);
      } else {
        toast.error(res?.message || "Send failed");
      }
    } catch (err) {
      console.error("Send Error:", err);
      toast.error("Server error");
    }
  };

  function handleAddVariable(e, index) {
    const variable = variables?.[currentIndex] || [""];
    const allIndexVariables = [...variable];
    allIndexVariables[index] = e;
    setVariables((prev) => ({
      ...prev,
      [currentIndex]: allIndexVariables,
    }));
  }

  const handleFileHeadersUpdate = (
    filePath,
    headers,
    totalRecords,
    countryCode,
    selectedMobileColumn,
    addCountryCode,
  ) => {
    setFileHeaders(headers);
    setTotalRecords(totalRecords);
    setXlsxPath(filePath);
    setSelectedMobileColumn(selectedMobileColumn);
    setSelectedCountryCode(countryCode);
    setIsCountryCodeChecked(addCountryCode);
  };

  const handleSelectVariable = (selectedVar, inputKey, type = "body") => {
    setInputValues((prev) => {
      const key = `${type}${inputKey}`;

      const oldValue = prev[key] || "";

      // Append at end (safe version)
      const newValue = oldValue + `{{${selectedVar}}}`;

      const newState = {
        ...prev,
        [key]: newValue,
      };

      // Sync with parent
      setTimeout(() => {
        onInputChange(newValue, key);
      }, 0);

      return newState;
    });
  };

  const insertVariable = (varName, emailIndex) => {
    const updated = [...(variables?.[emailIndex] || [])];

    // Find first empty field
    const emptyIndex = updated.findIndex((v) => !v);

    if (emptyIndex === -1) {
      toast.error("All variables already filled");
      return;
    }

    updated[emptyIndex] = `{{${varName}}}`;

    setVariables((prev) => ({
      ...prev,
      [emailIndex]: updated,
    }));
  };

  useEffect(() => {
    if (selectedOption === "group") {
      setContactData((prev) => ({
        ...prev,
        fileHeaders: ["first_name", "last_name"],
      }));
    } else {
      setContactData((prev) => ({
        ...prev,
        fileHeaders: [],
      }));
    }
  }, [selectedOption]);

  return (
    <div className="max-w-full">
      <div className="container-fluid">
        <div className="flex flex-wrap">
          {/* Left Panel */}
          <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:w-2/3 p-3 rounded-xl lg:flex-nowrap flex-wrap gap-3.5 bg-gray-200 min-h-[80vh]">
            <div className="relative w-full p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex-1">
                  <DropdownWithSearch
                    label="Select Template"
                    options={templates}
                    value={selectedTemplate}
                    onChange={handleTemplateSelect}
                    placeholder="Select Template"
                  />
                </div>

                <div className="flex-1">
                  <InputField
                    label="From Name"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Enter From Name"
                  />
                </div>
              </div>

              <div className="mb-3">
                <InputField
                  label="From Email"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  placeholder="Enter From Email"
                />
              </div>

              <div className="mb-3">
                <InputField
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter Subject"
                />
              </div>

              <div className="mb-3">
                <InputField
                  label="Reply Email"
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  placeholder="Enter Reply Email"
                />
              </div>

              <div className=" space-y-3">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-gray-700">
                    To Email
                  </label>

                  <UniversalButton
                    label="Add To Email"
                    type="button"
                    onClick={handleAddEmail}
                  />
                </div>

                {/* Carousel Container */}
                <div className="overflow-hidden  w-full">
                  {/* Slider */}
                  <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {toEmails.map((email, index) => (
                      <div
                        key={index}
                        className={`w-full flex-shrink-0 px-1 ${removingIndex === index ? "slide-out" : ""
                          }`}
                      >
                        <div>
                          <div className="relative w-full flex items-end gap-1">
                            <InputField
                              label={`To Email ${index + 1}`}
                              placeholder={`Enter Email ${index + 1}`}
                              value={email}
                              onChange={(e) =>
                                handleEmailChange(index, e.target.value)
                              }
                              className="w-full"
                            />

                            {toEmails?.length > 1 && (
                              <button
                                className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleRemoveEmail(index)}
                              >
                                <MdOutlineDeleteForever
                                  className="text-red-500 hover:text-red-600"
                                  size={20}
                                />
                              </button>
                            )}
                          </div>

                          {/* Template Variables */}
                          {variables?.[currentIndex]?.length > 0 && (
                            <div className="mt-2 p-4 bg-white rounded-lg shadow-sm space-y-3">
                              <label className="font-semibold text-gray-700 block">
                                Template Variables
                              </label>

                              <div className=" w-full space-y-2">
                                {variables[currentIndex].map((val, index) => (
                                  <div className="relative" key={index}>
                                    <InputField
                                      label={`Variable ${index + 1}`}
                                      placeholder={`Enter Value ${index + 1}`}
                                      value={val}
                                      onChange={(e) =>
                                        handleAddVariable(e.target.value, index)
                                      }
                                      className="w-full"
                                    />
                                    <div className="absolute top-7 right-0 z-30">
                                      <InputVariable
                                        variables={contactData.fileHeaders}
                                        onSelect={(selectedVar) =>
                                          handleAddVariable(
                                            `{{${selectedVar}}}`,
                                            index,
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}

                                {/* Variable Insert Button */}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="absolute bottom-0 left-0 w-full bg-white p-2">
                  <div className="flex justify-between items-center mb-1 bg-white">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => prev - 1)}
                      className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                      ◀ Prev
                    </button>

                    <span className="text-sm text-gray-600">
                      {currentIndex + 1} / {toEmails.length}
                    </span>

                    <button
                      disabled={currentIndex === toEmails.length - 1}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                      Next ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Inside Panel */}
            <div className=" lg:flex-1 w-full">
              <RadioButtonLaunchEmail
                allGroups={allGroups}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                selectedGrp={selectedGrp}
                setselectedGrp={setselectedGrp}
                setUploadedFile={setUploadFile}
                uploadedFile={uploadFile}
                setContactData={setContactData}
                contactData={contactData}
                countryList={countryList}
                inputRef={inputRef}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-full lg:w-1/3 px-2 lg:px-5 mt-5 lg:mt-0 min-h-[80vh] ">
            <Preview
              subject={subject}
              fromName={fromName}
              fromEmail={fromEmail}
              replyEmail={replyEmail}
              toEmail={toEmails[currentIndex]}
              variables={variables?.[currentIndex] || []}
              templateId={selectedTemplate}
              emailContent={getPreviewContent()}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-5">
          <UniversalButton
            label="Review & Send"
            type="button"
            onClick={handleSendEmail}
            style={{
              borderRadius: "40px",
              letterSpacing: "1px",
            }}
            variant="primary"
          />
        </div>

        <Dialog
          header="Review & Confirm"
          visible={confirmDialogVisible}
          style={{ width: "30rem" }}
          onHide={() => {
            setConfirmDialogVisible(false);
          }}
          draggable={false}
        >
          <div className="space-y-4 text-sm">
            <div>
              <p>
                <b>From:</b> {fromName}
              </p>
              <p>
                <b>Email:</b> {fromEmail}
              </p>
              <p>
                <b>Subject:</b> {subject}
              </p>
              <p>
                <b>Reply To:</b> {replyEmail}
              </p>
            </div>

            <div>
              <p>
                <b>Audience Type:</b> {selectedOption}
              </p>
              <p>
                <b>Total Recipients:</b> {totalAudience || toEmails.length}
              </p>
            </div>

            <div className="border rounded p-2 max-h-32 overflow-auto">
              {toEmails.map((email, i) => (
                <p key={i}>
                  {i + 1}. {email}
                </p>
              ))}
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <UniversalButton
                label="Cancel"
                variant="secondary"
                onClick={() => setConfirmDialogVisible(false)}
              />

              <UniversalButton
                label="Send Campaign"
                onClick={handleLaunchEmail}
                style={{
                  borderRadius: "40px",
                  letterSpacing: "1px",
                }}
                variant="primary"
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default SendEmail;
