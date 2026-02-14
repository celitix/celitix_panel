// import React, { useEffect, useState } from "react";
// import { MultiSelect } from "primereact/multiselect";
// import toast from "react-hot-toast";
// import { RadioButton } from "primereact/radiobutton";

// // ICONS
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// import { MdOutlineDeleteForever } from "react-icons/md";

// // APIS
// import { campaignUploadFile } from "@/apis/whatsapp/whatsapp.js";
// import { getCountryList } from "@/apis/common/common.js";
// import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// function RadioButtonLaunchEmail({
//   onOptionChange,
//   onFileUpload,
//   onGroupChange,
//   onUrlIndexChange,
//   groups,
//   setSelectedGroups,
//   selectedGroups,
//   setUploadedFile,
//   uploadedFile,
//   setIsUploaded,
//   isUploaded,
//   fileRef,
//   selectedOption,
//   setSelectedOption,
// }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);

//   const [fileHeaders, setFileHeaders] = useState([]);
//   const [totalRecords, setTotalRecords] = useState("");
//   const [columns, setColumns] = useState([]);
//   const [fileData, setFileData] = useState([]);

//   const [selectedMobileColumn, setSelectedMobileColumn] = useState("");
//   const [addCountryCode, setAddCountryCode] = useState(false);
//   const [selectedCountryCode, setSelectedCountryCode] = useState("");
//   const [selectedCountryName, setSelectedCountryName] = useState("");
//   const [countryList, setCountryList] = useState([]);
//   const [xlsxPath, setXlsxPath] = useState("");

//   // ✅ safer separator to avoid "-" breaking country name split
//   const COUNTRY_SEPARATOR = "||";

//   const handleChange = (event) => {
//     const value = event.target.value;
//     setSelectedOption(value);
//     onOptionChange(value);

//     // ✅ Reset states when switching
//     setUploadedFile(null);
//     setFileData([]);
//     setColumns([]);
//     setFileHeaders([]);
//     setTotalRecords("");
//     setSelectedMobileColumn("");
//     setAddCountryCode(false);
//     setSelectedCountryCode("");
//     setSelectedCountryName("");
//     setXlsxPath("");
//     setIsUploaded(false);

//     // ✅ reset file input using ref (no direct DOM)
//     if (fileRef?.current) fileRef.current.value = "";

//     if (value === "option1") {
//       onGroupChange("-1");
//       setSelectedGroups([]);
//       if (onUrlIndexChange) onUrlIndexChange(null);
//     }

//     if (value === "option2") {
//       onGroupChange("0");
//       setSelectedGroups([]);
//       if (onUrlIndexChange) onUrlIndexChange(null);
//     }

//     if (value === "option3") {
//       setSelectedGroups([]);
//       if (onUrlIndexChange) onUrlIndexChange(null);
//     }
//   };

//   const isValidFileName = (fileName) => {
//     const regex = /^[a-zA-Z0-9_-]+$/;
//     return regex.test(fileName);
//   };

//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files?.[0];
//     if (!file) return;

//     const validExtensions = [".xls", ".xlsx", ".xlsm"];
//     const fileExtension = "." + file.name.split(".").pop().toLowerCase();

//     if (!validExtensions.includes(fileExtension)) {
//       toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
//       return;
//     }

//     if (!isValidFileName(file.name.split(".")[0])) {
//       toast.error(
//         "File name can only contain alphanumeric characters, underscores, or hyphens."
//       );
//       return;
//     }

//     setUploadedFile(file);
//     setIsUploaded(false);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const validExtensions = [".xls", ".xlsx", ".xlsm"];
//     const fileExtension = "." + file.name.split(".").pop().toLowerCase();

//     if (!validExtensions.includes(fileExtension)) {
//       toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
//       return;
//     }

//     if (!isValidFileName(file.name.split(".")[0])) {
//       toast.error(
//         "File name can only contain alphanumeric characters, underscores, or hyphens."
//       );
//       return;
//     }

//     setUploadedFile(file);
//     setIsUploaded(false);
//   };

//   const handleRemoveFile = () => {
//     setUploadedFile(null);
//     setIsUploaded(false);
//     setAddCountryCode(false);
//     setFileHeaders([]);
//     setSelectedCountryCode("");
//     setSelectedCountryName("");
//     setSelectedMobileColumn("");
//     setFileData([]);
//     setColumns([]);
//     setTotalRecords("");
//     setXlsxPath("");

//     // ✅ reset input safely
//     if (fileRef?.current) fileRef.current.value = "";

//     toast.success("File removed successfully.");
//   };

//   const handleMobileColumnChange = (value) => {
//     setSelectedMobileColumn(value);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleAddCountryCodeChange = (e) => {
//     const isChecked = e.target.checked;
//     setAddCountryCode(isChecked);

//     if (!isChecked) {
//       setSelectedCountryCode("");
//       setSelectedCountryName("");
//     }
//   };

//   // ✅ Single clean effect (no duplicate if/else) + totalRecords dependency added
//   useEffect(() => {
//     onFileUpload(
//       xlsxPath,
//       fileHeaders,
//       totalRecords,
//       selectedCountryCode,
//       selectedMobileColumn,
//       addCountryCode
//     );
//   }, [
//     xlsxPath,
//     fileHeaders,
//     totalRecords,
//     selectedCountryCode,
//     selectedMobileColumn,
//     addCountryCode,
//     onFileUpload,
//   ]);

//   const handleFileUpload = async () => {
//     if (!uploadedFile) {
//       toast.error("No file selected for upload.");
//       return;
//     }

//     if (isUploaded) {
//       toast.error("File already uploaded. Please select a different one.");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const response = await campaignUploadFile(uploadedFile);

//       if (response?.message === "File Upload Successfully") {
//         const headers = response.headers || [];
//         const total = response.totalRecords || "";
//         const path = response.filepath || "";
//         const sample = response.sampleRecords || [];

//         setIsUploaded(true);
//         setXlsxPath(path);
//         setFileData(sample);
//         setColumns(headers);
//         setFileHeaders(headers);
//         setTotalRecords(total);

//         // ✅ IMPORTANT: use "total" (fresh) not state "totalRecords" (stale)
//         onFileUpload(
//           path,
//           headers,
//           total,
//           selectedCountryCode,
//           selectedMobileColumn,
//           addCountryCode
//         );

//         toast.success("File uploaded successfully.");
//       } else {
//         toast.error(response?.message || "File upload failed.");
//       }
//     } catch (error) {
//       toast.error("File upload failed: " + (error?.message || "Unknown error"));
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // ✅ Get country list
//   useEffect(() => {
//     const fetchCountryList = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getCountryList();
//         if (response) {
//           setCountryList(response);
//         } else {
//           toast.error("Failed to load Country List");
//         }
//       } catch (error) {
//         toast.error("Error fetching country List.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCountryList();
//   }, []);

//   return (
//     <div className="h-full p-3 bg-gray-100 rounded-lg shadow-md">
//       <div>
//         <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
//           Choose an Option
//         </h2>

//         <div className="grid lg:grid-cols-2 gap-2 mb-2 sm:grid-cols-2">
//           {/* Option 1 */}
//           <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
//             <div className="flex items-center justify-start gap-2 cursor-pointer">
//               <RadioButton
//                 inputId="radioOption1"
//                 name="radioGroup"
//                 value="option1"
//                 onChange={handleChange}
//                 checked={selectedOption === "option1"}
//               />
//               <label
//                 htmlFor="radioOption1"
//                 className="text-sm font-medium text-gray-700 cursor-pointer"
//               >
//                 Select Groups
//               </label>
//             </div>
//           </label>

//           {/* Option 2 */}
//           <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
//             <div className="flex items-center justify-start gap-2">
//               <RadioButton
//                 inputId="radioOption2"
//                 name="radioGroup"
//                 value="option2"
//                 onChange={handleChange}
//                 checked={selectedOption === "option2"}
//               />
//               <label
//                 htmlFor="radioOption2"
//                 className="text-sm font-medium text-gray-700 cursor-pointer"
//               >
//                 Import contacts
//               </label>
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* MultiSelect */}
//       {selectedOption === "option1" && (
//         <div className="flex mt-3 justify-content-center">
//           <MultiSelect
//             className="custom-multiselect"
//             placeholder="Select Groups"
//             maxSelectedLabels={0}
//             optionLabel="label"
//             filter
//             value={selectedGroups}
//             onChange={(e) => {
//               const selectedValues = Array.isArray(e.value) ? e.value : [];
//               setSelectedGroups(selectedValues);

//               const groupValues =
//                 selectedValues.length > 0 ? selectedValues.join(",") : "-1";

//               onGroupChange(groupValues);
//             }}
//             options={(groups || []).map((group) => ({
//               label: `${group.groupName} (${group.totalCount})`,
//               value: group.groupCode,
//             }))}
//           />
//         </div>
//       )}

//       {/* Upload */}
//       {selectedOption === "option2" && (
//         <div className="mt-2 file-upload">
//           <div
//             className="file-upload-container"
//             onDrop={handleFileDrop}
//             onDragOver={handleDragOver}
//           >
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="hidden"
//               id="fileInput"
//               name="fileInput"
//               accept=".xls,.xlsx,.xlsm"
//               ref={fileRef}
//             />

//             <div className="flex items-center justify-center gap-2">
//               <label
//                 htmlFor="fileInput"
//                 className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
//               >
//                 Choose or Drop File
//               </label>

//               <div className="upload-button-container">
//                 <button
//                   onClick={handleFileUpload}
//                   disabled={isUploading}
//                   className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
//                     isUploading ? "disabled" : ""
//                   }`}
//                 >
//                   <FileUploadOutlinedIcon
//                     sx={{ color: "white", fontSize: "23px" }}
//                   />
//                 </button>
//               </div>
//             </div>

//             <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
//               Supported File Formats: .xlsx
//             </p>

//             <div className="mt-3">
//               {uploadedFile ? (
//                 <div className="flex items-center justify-center gap-1 file-upload-info">
//                   <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
//                     {isUploaded ? "File Uploaded: " : "File Selected: "}
//                     <strong>{uploadedFile.name}</strong>
//                   </p>

//                   <button
//                     className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
//                     onClick={handleRemoveFile}
//                   >
//                     <MdOutlineDeleteForever
//                       className="text-red-500 cursor-pointer hover:text-red-600"
//                       size={20}
//                     />
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
//                   No file uploaded yet!
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Country + Mobile Column */}
//       <div className="flex flex-wrap items-start justify-between gap-2 mt-3">
//         {selectedOption === "option2" && isUploaded && (
//           <div className="flex flex-col w-full mt-2 gap-2">
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 bg-gray-200 border-gray-300 rounded cursor-pointer"
//                 checked={addCountryCode}
//                 onChange={handleAddCountryCodeChange}
//               />
//               <label className="text-sm font-medium">Add Country Code</label>
//             </div>

//             <DropdownWithSearch
//               id="selectCountryCode"
//               name="selectCountryCode"
//               label="Country Code"
//               tooltipContent="check the - [ ✔ Add country code ] to apply country code"
//               tooltipPlacement="right"
//               placeholder="Country Code"
//               disabled={!addCountryCode}
//               options={(countryList || [])
//                 .slice()
//                 .sort((a, b) => a.countryName.localeCompare(b.countryName))
//                 .map((country) => ({
//                   label: `${country.countryName} (+${country.countryCode})`,
//                   value: `${country.countryCode}${COUNTRY_SEPARATOR}${country.countryName}`,
//                 }))}
//               value={
//                 selectedCountryCode
//                   ? `${selectedCountryCode}${COUNTRY_SEPARATOR}${selectedCountryName}`
//                   : ""
//               }
//               onChange={(value) => {
//                 if (!value) return;
//                 const [code, name] = value.split(COUNTRY_SEPARATOR);
//                 setSelectedCountryCode(code || "");
//                 setSelectedCountryName(name || "");
//               }}
//             />
//           </div>
//         )}

//         {selectedOption === "option2" && isUploaded && (
//           <div className="w-full">
//             <div className="w-full md:mt-2 lg:mt-4 xl:mt-2">
//               <DropdownWithSearch
//                 id="selectMobileColumn"
//                 name="selectMobileColumn"
//                 label="Mobile Number Field"
//                 tooltipContent="Select your mobile number Field!"
//                 tooltipPlacement="right"
//                 options={(columns || []).map((col, index) => ({
//                   label: col,
//                   value: index,
//                 }))}
//                 value={selectedMobileColumn}
//                 onChange={handleMobileColumnChange}
//                 placeholder=" Mobile No."
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       {selectedOption === "option2" && isUploaded && fileData.length > 0 && (
//         <>
//           <div className="my-3">
//             <p className="text-sm font-semibold tracking-wide text-gray-700">
//               Total Records in file: {totalRecords}
//             </p>
//           </div>

//           <div
//             className="w-full max-w-full overflow-auto"
//             style={{ maxHeight: "400px", maxWidth: "auto", width: "auto" }}
//           >
//             <table className="w-full border-collapse min-w-max">
//               <thead className="bg-[#128C7E]">
//                 <tr>
//                   {(columns || []).map((col, index) => (
//                     <th
//                       key={index}
//                       className="border border-gray-500 px-3 py-1 text-[0.94rem] font-medium tracking-wide text-white whitespace-nowrap"
//                     >
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {(fileData || []).map((row, index) => (
//                   <tr key={index}>
//                     {(columns || []).map((col, idx) => (
//                       <td
//                         key={idx}
//                         className="px-2 py-1 text-sm font-normal tracking-wide text-gray-800 border border-gray-400 whitespace-nowrap"
//                       >
//                         {row?.[col]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default RadioButtonLaunchEmail;

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { id } from "date-fns/locale";

// ICONS
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LetterTextIcon } from "lucide-react";
import { LuWorkflow } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

// APIS
import { campaignUploadFile, uploadImageFile } from "@/apis/whatsapp/whatsapp";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";

export const RadioButtonLaunchEmail = ({
  allGroups,
  setSelectedOption,
  selectedOption,
  selectedGrp,
  setselectedGrp,
  setUploadedFile,
  uploadedFile,
  setContactData,
  contactData,
  countryList,
  inputDetails,
  setInputDetails,
  inputRef,
  workflowState,
  setWorkflowState,
  allWorkflows,
  setWorkflowEditDialog,
  workflowEditDialog,
}) => {
  const fileInputRef = useRef(null);

  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };
  function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens.",
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens.",
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  }

  async function handleFileUpload() {
    if (!uploadedFile) {
      return toast.error("Please select a file.");
    }
    if (contactData?.filePath) {
      return toast.error(
        "File already uploaded. Please select a different one.",
      );
    }

    try {
      const response = await campaignUploadFile(uploadedFile);
      setContactData({
        filePath: response?.filepath,
        fileHeaders: response?.headers,
        totalRecords: response?.totalRecords,
        sampleRecords: response?.sampleRecords,
        selectedCountryCode: "",
        selectedMobileColumn: "",
      });
    } catch (e) {
      toast.error("File upload failed: " + error.message);
    }
  }

  function handleRemoveFile() {
    setUploadedFile("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setContactData({
      filePath: "",
      fileHeaders: "",
      totalRecords: "",
      selectedCountryCode: "",
      selectedMobileColumn: "",
      sampleRecords: "",
    });
  }
  function stripPlaceholders(str) {
    const varsToRemove = ["short_url", "whatsapp_chat", "file"];
    return varsToRemove.reduce(
      (s, v) => s.replace(new RegExp(`\\{#${v}#\\}`, "g"), ""),
      str,
    );
  }
  function handleAttachmentChange(e) {
    // if (!inputRef) return;
    // const input = inputRef.current;
    // const start = input.selectionStart;
    // const end = input.selectionEnd;
    // setInputDetails((prev) => {
    //   const strippedMessage = stripPlaceholders(prev.message);
    //   const hasAttachment = Boolean(e);
    //   const tag = hasAttachment ? `{#${e}#}` : "";
    //   const updatedMessage =
    //     strippedMessage.substring(0, start) +
    //     tag +
    //     strippedMessage.substring(end);
    //   return {
    //     ...prev,
    //     // attachmentType: hasAttachment ? e : null,
    //     message: updatedMessage,
    //     shortUrl: hasAttachment ? 1 : 0,
    //     attachmentVar: {},
    //   };
    // });
  }

  async function handleAttachmentFileChange(e) {
    let message = "";
    // try {
    //   if (inputDetails?.attachmentType === "file") {
    //     const file = e.target.files[0];
    //     const res = await uploadImageFile(file);

    //     if (!res?.status) {
    //       return toast.error(res?.msg || "Error uploading file");
    //     }
    //     message = res?.fileUrl;
    //   } else if (inputDetails?.attachmentType === "short_url") {
    //     message = e.target.value;
    //   } else {
    //     // const url = `https://wa.me/${e.target.value}`;
    //     message = e.target.value;
    //   }
    //   setInputDetails((prev) => ({
    //     ...prev,
    //     attachmentVar: {
    //       [`{#${inputDetails?.attachmentType}#}`]: message,
    //       // [inputDetails.message]: "asdasdsad",
    //     },
    //   }));
    // } catch (e) {
    //   return toast.error("Error uploading file");
    // }
  }

  return (
    <div className="max-h-full bg-gray-100 rounded-lg shadow-md lg:flex-1 border p-2 space-y-2 w-full h-full">
      <div>
        <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
          Choose an Option
        </h2>
        <div className="grid gap-4 mb-2 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-2">
          {/* Option 1 */}
          <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <RadioButton
                inputId="radioOption1"
                name="radioGroup"
                value="group"
                onChange={() => {
                  setSelectedOption("group");
                  setUploadedFile("");
                  setContactData({
                    filePath: "",
                    fileHeaders: ["first_name", "last_name"],
                    totalRecords: "",
                    selectedCountryCode: "",
                    selectedMobileColumn: "",
                    sampleRecords: "",
                    addcountryCode: false,
                  });
                }}
                checked={selectedOption === "group"}
              />
              <label
                htmlFor="radioOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Select Groups
              </label>
            </div>
          </label>

          {/* Option 2 */}
          <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2">
              <RadioButton
                inputId="radioOption2"
                name="radioGroup"
                value="contact"
                onChange={() => {
                  setSelectedOption("contact");
                  setselectedGrp("");
                }}
                checked={selectedOption === "contact"}
              />
              <label
                htmlFor="radioOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Import Contacts
              </label>
            </div>
          </label>

          {/* Option 3 */}
          {/* <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-center gap-2 " >
                    <RadioButton inputId="radioOption3" name="radioGroup" value="option3" onChange={handleChange} checked={selectedOption === 'option3'} />
                    <label htmlFor="radioOption3" className="text-sm font-medium text-gray-700">AI Audience</label>
                  </div>
                </label> */}
        </div>
      </div>

      {selectedOption === "group" && (
        <div className="flex mt-3 justify-content-center">
          <MultiSelect
            className="custom-multiselect"
            placeholder="Select Groups"
            maxSelectedLabels={0}
            optionLabel="label"
            filter
            value={selectedGrp}
            onChange={(e) => {
              if (!e.value) {
                console.error("MultiSelect received undefined value");
                return;
              }

              let selectedValues = Array.isArray(e.value) ? e.value : [e.value];
              setselectedGrp(selectedValues);
            }}
            options={allGroups.map((group) => ({
              label: `${group.groupName} (${group.totalCount})`,
              value: group.groupCode,
            }))}
          />
        </div>
      )}

      {selectedOption === "contact" && (
        <div className="mt-2 file-upload">
          <div
            className="file-upload-container"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              name="fileInput"
              accept=".xls,.xlsx,.xlsm"
              ref={fileInputRef}
            />
            <div className="flex items-center justify-center gap-2">
              <label
                htmlFor="fileInput"
                className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
              >
                Choose or Drop File
              </label>
              <div className="upload-button-container ">
                <button
                  onClick={handleFileUpload}
                  disabled={false}
                  className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                    // isUploading ?
                    // "disabled" : ""
                    ""
                  }`}
                >
                  <FileUploadOutlinedIcon
                    sx={{ color: "white", fontSize: "23px" }}
                  />
                </button>
              </div>
            </div>
            <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
              Supported File Formats: .xlsx
            </p>
            <div className="mt-3">
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-1 file-upload-info">
                  <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                    {uploadedFile?.name ? "File Uploaded: " : "File Selected: "}
                    <strong>{uploadedFile.name}</strong>
                  </p>
                  <button
                    className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <MdOutlineDeleteForever
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      size={20}
                    />
                  </button>
                </div>
              ) : (
                <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                  No file uploaded yet!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedOption === "contact" &&
        uploadedFile &&
        contactData?.fileHeaders?.length > 0 && (
          <div className="flex flex-col w-full mt-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  id="handleAddCountryCode"
                  type="checkbox"
                  className="w-4 h-4 bg-gray-200 border-gray-300 rounded cursor-pointer"
                  onChange={(e) => {
                    setContactData((prevData) => ({
                      ...prevData,
                      addcountryCode: e.target.checked,
                    }));
                  }}
                />
                <label
                  htmlFor="handleAddCountryCode"
                  className="text-sm font-medium"
                >
                  Add Country Code
                </label>
              </div>
              <DropdownWithSearch
                id="selectCountryCode"
                name="selectCountryCode"
                label="Select Country Code"
                tooltipContent="check the - [ ✔ Add country code ] to apply country code"
                tooltipPlacement="right"
                placeholder="Select Country Code"
                disabled={!contactData.addcountryCode}
                options={countryList
                  .sort((a, b) => a.countryName.localeCompare(b.countryName))
                  .map((country) => ({
                    label: `${country.countryName} (+${country.countryCode})`,
                    value: `${country.countryCode}`,
                  }))}
                value={contactData.selectedCountryCode}
                onChange={(value) => {
                  if (value) {
                    const [code, name] = value.split("-");
                    setContactData((prevData) => ({
                      ...prevData,
                      selectedCountryCode: code,
                    }));
                  }
                }}
              />
            </div>
            <div className="w-full">
              <AnimatedDropdown
                id="selectMobileColumn"
                name="selectMobileColumn"
                label="Select Email Field"
                tooltipContent="Select your email Field!"
                tooltipPlacement="right"
                options={contactData?.fileHeaders.map((col, index) => ({
                  label: col,
                  value: String(index),
                }))}
                value={contactData.selectedMobileColumn}
                onChange={(e) => {
                  setContactData((prevData) => ({
                    ...prevData,
                    selectedMobileColumn: e,
                  }));
                }}
                placeholder="Select Mobile No."
              />
            </div>
          </div>
        )}

      {selectedOption === "contact" &&
        uploadedFile &&
        contactData?.sampleRecords?.length > 0 && (
          <>
            <div className="my-3">
              <p className="text-sm font-semibold tracking-wide text-gray-700">
                Total Records in file: {contactData?.totalRecords}{" "}
              </p>
            </div>

            <div
              className="w-full max-w-full overflow-auto"
              style={{ maxHeight: "400px", maxWidth: "auto", width: "auto" }}
            >
              <table className="w-full border-collapse min-w-max">
                <thead className="bg-[#128C7E]">
                  <tr className="">
                    {contactData?.fileHeaders?.map((col, index) => (
                      <th
                        key={index}
                        className="border border-gray-500 px-3 py-1 text-[0.94rem] font-medium tracking-wide text-white whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {contactData?.sampleRecords?.map((row, index) => (
                    <tr key={index} className="">
                      {contactData?.fileHeaders?.map((col, idx) => (
                        <td
                          key={idx}
                          className="px-2 py-1 text-sm font-normal tracking-wide text-gray-800 border border-gray-400 whitespace-nowrap"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      {/* <div className="mt-5 space-y-2">
        <h1 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
          SMS Attachment
        </h1>
        <AnimatedDropdown
          id="attachmentType"
          name="attachmentType"
          options={[
            { value: "file", label: "File" },
            { value: "short_url", label: "Short URL" },
            { value: "whatsapp_chat", label: "WhatsApp Chat" },
          ]}
          onChange={handleAttachmentChange}
          value={inputDetails.attachmentType}
          disabled={!inputDetails.templateId}
        />
        {inputDetails.attachmentType === "file" && (
          <div>
            <InputField
              id="attachmentfile"
              name="attachmentfile"
              onChange={handleAttachmentFileChange}
              type="file"
              label="Select File"
            />
          </div>
        )}
        {(inputDetails.attachmentType === "short_url" ||
          inputDetails.attachmentType === "whatsapp_chat") && (
            <div className="mt-2">
              <InputField
                id="attachmentText"
                name="attachmentText"
                tooltipContent={
                  inputDetails.attachmentType === "whatsapp_chat"
                    ? "Enter a valid WhatsApp chat URL in the format: https://wa.me/<CountryCodePhoneNumber>. Example: https://wa.me/9198765xxxxx"
                    : "Enter a valid URL starting with https://"
                }
                onChange={handleAttachmentFileChange}
                label={
                  inputDetails.attachmentType === "short_url"
                    ? "Short URL"
                    : "WhatsApp Chat"
                }
                placeholder={
                  inputDetails.attachmentType === "short_url"
                    ? "Enter Short URL"
                    : "Enter WhatsApp format URL Ex- https://wa.me/9198765xxxxx"
                }
                value={
                  inputDetails?.attachmentVar[
                  `{#${inputDetails?.attachmentType}#}`
                  ] || ""
                }
              />
            </div>
          )}
      </div> */}
    </div>
  );
};
