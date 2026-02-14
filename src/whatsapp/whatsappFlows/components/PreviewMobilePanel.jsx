import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  Slide,
  Chip,
  // Dropdown
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import { toast } from "react-hot-toast";

// ICONS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { RiCloseLine, RiImage2Line, RiFileTextLine, RiArrowRightSLine } from "react-icons/ri";

// COMPONENTS
import InputField from "../../components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import UniversalDatePicker from "../../components/UniversalDatePicker";
import AnimatedDropdown from "../../components/AnimatedDropdown";

const MobilePanel = ({
  items,
  onUpdateItem,
  screenTitle,
  currentRow,
  totalScreens,
  activeScreenIndex
}) => {
  console.log("MobilePanel items:", items);
  const [radioBtnLabel, setRadioBtnLabel] = useState("Choose an option");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [radioButtonOptions, setRadioButtonOptions] = useState([
    { title: "Option 1", description: "Description 1", image: "url1.png" },
    { title: "Option 2", description: "Description 2", image: "url2.png" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (index, optionId, checked) => {
    onUpdateItem(index, (item) => {
      const selected = new Set(item.selected || []);

      if (checked) selected.add(optionId);
      else selected.delete(optionId);

      return {
        ...item,
        selected: Array.from(selected),
      };
    });
  };

  const handleRadioChange = (index, selectedValue) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => ({
        ...prevItem,
        selected: selectedValue,
      }));
    }
  };


  const handleDropdownChange = (index, dropdownId, selectedValue) => {
    if (onUpdateItem) {
      onUpdateItem(index, (prevItem) => {
        const updatedSelected = { ...(prevItem.selected || {}) };
        updatedSelected[dropdownId] = selectedValue;

        return {
          ...prevItem,
          selected: updatedSelected,
        };
      });
    }
  };

  // chipSelector
  const handleChipOptionClick = (itemIndex, optionName) => {
    onUpdateItem &&
      onUpdateItem(itemIndex, (prevItem) => {
        const selected = prevItem.selected || [];

        const isSelected = selected.includes(optionName);
        const newSelected = isSelected
          ? selected.filter((name) => name !== optionName)
          : [...selected, optionName];

        if (!isSelected && newSelected.length > 2) {
          toast.error("You can select up to 2 options only.");
          return prevItem;
        }

        return {
          ...prevItem,
          selected: newSelected,
        };
      });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // console.log("File uploaded:", selectedFile.name);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handlePhotoUpload = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      setUploadPhoto(selectedPhoto);
      // console.log("Photo uploaded:", selectedPhoto.name);
    } else {
      alert("Please choose a photo.");
    }
  };

  // imageCarousel
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("Rendering MobilePanel with items:", items);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      // transition={{ type: "spring", stiffness: 200, damping: 25 }}
      // className="relative h-[75vh] w-full rounded-3xl shadow-md bg-gray-100 border border-[#128c7e] overflow-hidden"
      className="relative h-[690px] w-[320px] mx-auto rounded-[3rem] border-[5px] border-slate-900 bg-[#F0F2F5] overflow-hidden shadow-2xl ring-0 ring-slate-800"
    >
      {/* <div className="flex flex-col items-center">
        <div className="h-1 w-12 rounded-full mb-3 mt-1 bg-gray-300"></div>

        <h2 className="text-md font-semibold text-center text-gray-800 px-4 truncate w-full">{screenTitle}</h2>
        {totalScreens > 1 && (
          <div className="flex w-full gap-1 px-4 mt-1 mb-2">
            {Array.from({ length: totalScreens }).map((_, idx) => (
              <div
                key={idx}
                className="h-1 rounded-full flex-1 transition-all duration-300"
                style={{
                  backgroundColor: idx <= activeScreenIndex ? "#128C7E" : "#E5E7EB",
                }}
              />
            ))}
          </div>
        )}
      </div> */}
      <div className="bg-[#128C7E] text-white pt-6 pb-3 px-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <RiCloseLine className="text-xl opacity-80 cursor-pointer" />
          <span className="text-xs font-medium tracking-tight truncate max-w-[180px]">
            {screenTitle || "WhatsApp Flow"}
          </span>
          <div className="w-5" /> {/* Spacer */}
        </div>

        {/* PROGRESS INDICATOR */}
        {totalScreens > 1 && (
          <div className="flex gap-1.5 mt-2">
            {Array.from({ length: totalScreens }).map((_, idx) => (
              <div
                key={idx}
                className="h-1 rounded-full flex-1 transition-all duration-500"
                style={{
                  backgroundColor: idx <= activeScreenIndex ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* <div className="flex flex-col gap-4 p-2 h-full overflow-auto hide-scrollbar pb-37"> */}
      <div className="h-[calc(100%-140px)] overflow-y-auto hide-scrollbar bg-white rounded-t-2xl mt-[-10px] shadow-inner p-4 space-y-5">
        {items.map((item, index) => {
          console.log("item", item.type);
          switch (item.type) {
            // Render Heading
            case "TextHeading":
              return <h1 key={index} className="text-xl font-bold text-slate-900 leading-tight">{item.text}</h1>;

            // Render Subheading
            case "TextSubheading":
              return (
                <Typography
                  key={index}
                  variant="h7"
                  className="text-md font-medium break-words whitespace-pre-wrap w-full max-w-full "
                >
                  {item.text || "Subheading Placeholder"}
                </Typography>
              );

            // Render Text Body and Text Caption
            case "TextBody":
              return <p key={index} className="text-sm text-slate-600 leading-relaxed">{item.text}</p>;

            case "TextCaption":
              return (
                <Typography
                  key={index}
                  variant="caption"
                  className="text-xs mb-1 break-words whitespace-pre-wrap w-full max-w-full "
                >
                  {item.text || "Text Caption Placeholder"}
                </Typography>
              );

            // Render Text Input
            // case "TextInput":
            //   return (
            //     <div key={index} className="">
            //       <Typography
            //         variant="caption"
            //       // sx={{ whiteSpace: "pre-line" }}
            //       >
            //         {item.label || "Label"}
            //       </Typography>

            //       <InputField
            //         readOnly
            //         fullWidth
            //         multiline
            //         rows={4}
            //         value={item.value || ""}
            //         placeholder={
            //           item["helper-text"] || "Text Input Placeholder"
            //         }
            //         error={item.required && !item.value?.trim()}
            //         helperText={item["error-message"] || ""}
            //         onChange={(e) =>
            //           onUpdateItem &&
            //           onUpdateItem(index, (prevItem) => ({
            //             ...prevItem,
            //             value: e.target.value,
            //           }))
            //         }
            //       />
            //     </div>
            //   );

            // // Render Text Area
            // case "TextArea":
            //   return (
            //     <div key={index} className="">
            //       <Typography variant="caption">
            //         {item.label || "Label"}
            //       </Typography>
            //       <InputField
            //         readOnly
            //         fullWidth
            //         multiline
            //         rows={4}
            //         value={item.value || ""}
            //         placeholder={item["helper-text"] || "Text Area Placeholder"}
            //         error={item.required && !item.value?.trim()}
            //         helperText={item["error-message"] || ""}
            //         onChange={(e) =>
            //           onUpdateItem &&
            //           onUpdateItem(index, (prevItem) => ({
            //             ...prevItem,
            //             value: e.target.value,
            //           }))
            //         }
            //       />
            //     </div>
            //   );
            case "TextInput":
            case "TextArea":
              const isTextArea = item.type === "TextArea";

              return (
                <div key={index} className="flex flex-col w-full group">
                  {/* Label: Minimal, bold, and using the brand color */}
                  {item.label && (
                    <label className="text-[11px] font-bold text-[#128C7E] mb-1 ml-1 uppercase tracking-wider">
                      {item.label}
                      {item.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  )}

                  <div
                    className={`relative flex items-center w-full transition-all duration-200 
          ${isTextArea ? "min-h-[100px]" : "h-[52px]"} 
          bg-slate-50 border-b-[1.5px] rounded-t-lg
          ${item.required && !item.value?.trim() ? "border-red-300" : "border-slate-300 group-hover:border-slate-400 focus-within:border-[#128C7E] focus-within:bg-slate-100/50"}
        `}
                  >
                    {isTextArea ? (
                      <textarea
                        value={item.value || ""}
                        placeholder={item["helper-text"]}
                        className="w-full h-full bg-transparent px-4 py-3 text-[13px] text-slate-800 outline-none resize-none placeholder:text-slate-400 placeholder:font-normal font-medium border rounded-xl border-gray-200"
                        onChange={(e) =>
                          onUpdateItem &&
                          onUpdateItem(index, (prevItem) => ({
                            ...prevItem,
                            value: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        value={item.value || ""}
                        placeholder={item["helper-text"]}
                        className="w-full h-full bg-transparent px-4 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal font-medium border rounded-xl border-gray-200"
                        onChange={(e) =>
                          onUpdateItem &&
                          onUpdateItem(index, (prevItem) => ({
                            ...prevItem,
                            value: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>

                  {/* Helper / Error Text: Only shown if error exists or helper text provided */}
                  {(item["error-message"] || item["helper-text"]) && (
                    <div className="flex justify-between mt-1 px-1">
                      <p className={`text-[10px] font-medium tracking-tight ${item.required && !item.value?.trim() ? "text-red-500" : "text-slate-400"}`}>
                        {item.required && !item.value?.trim() ? item["error-message"] : item["helper-text"]}
                      </p>
                    </div>
                  )}
                </div>
              );

            //Render RichText
            case "RichText": {
              let renderedHTML = "<p>No content available</p>";

              try {
                const markdown = Array.isArray(item?.text)
                  ? item.text.join("\n")
                  : item?.content || "";

                renderedHTML = marked.parse(markdown);

                renderedHTML = renderedHTML.replace(
                  /<img[^>]*src=["'](?!data:image\/)[^"']*["'][^>]*>/g,
                  `<img$1 class="w-30 h-30 rounded-full object-cover border">`
                );
              } catch (err) {
                console.error("Markdown rendering error:", err);
                renderedHTML = "<p>No content available</p>";
              }

              return (
                <div className="w-full mx-auto border rounded-md shadow-md overflow-hidden bg-white h-auto flex flex-col break-words whitespace-pre-wrap max-w-full">
                  <div
                    className="flex-1 overflow-y-auto p-4 prose prose-sm max-w-none 
                      prose-img:rounded 
                      // prose-a:text-blue-500 prose-a:underline 
                      prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 
                      prose-li:marker:text-gray-500 prose-li:pl-1 
                      prose-strong:font-bold 
                      prose-table:border prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-td:border prose-td:border-gray-300 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1"
                    dangerouslySetInnerHTML={{ __html: renderedHTML }}
                  />

                  <style>
                    {`
    .prose h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .prose h2 {
      font-size: 1.25rem;
      font-weight: 500;
    }
    .prose table {
      width: 100%;
      border-collapse: collapse;
    }
    .prose th, .prose td {
      border: 1px solid #ddd;
      padding: 4px 8px;
    }
    .prose thead {
      background-color: #f3f4f6;
    }
    .prose ul {
      list-style-type: disc;
      margin-left: 1.5rem;
    }
    .prose ol {
      list-style-type: decimal;
      margin-left: 1.5rem;
    }
    // .prose a {
    //  text-color: blue-500;
    // }
    .prose li {
      color: #6b7280
      margin: 0.25rem 0;
    }
    .prose img {
      width: 2.5rem; 
      height: 2.5rem; 
      border-radius: 9999px; 
      object-fit: cover; 
      border: 1px solid #d1d5db; 
      display: inline-block; 
    }
  `}
                  </style>
                </div>
              );
            }

            // Render Checkboxes

            // case "CheckboxGroup":
            //   return (
            //     <div key={index}>
            //       {/* Label */}
            //       <Typography
            //         variant="subtitle1"
            //         sx={{ fontWeight: 600, mb: 1 }}
            //       >
            //         {item.label}
            //         {item.required && (
            //           <Typography component="span" color="error">
            //             {" "}
            //             *
            //           </Typography>
            //         )}
            //       </Typography>

            //       {/* Checkbox options */}
            //       {Array.isArray(item["data-source"]) &&
            //         item["data-source"].length > 0 ? (
            //         item["data-source"].map((option, optionIndex) => (
            //           <Box
            //             key={option.id || optionIndex}
            //             sx={{
            //               display: "flex",
            //               alignItems: "center",
            //               mb: 1,
            //               px: 0.5,
            //               py: 0.4,
            //               borderRadius: 1,
            //               border: "1px solid #e0e0e0",
            //             }}
            //           >
            //             {/* Image */}
            //             {option.image && (
            //               <Box
            //                 component="img"
            //                 src={
            //                   option.image.startsWith("data:")
            //                     ? option.image
            //                     : `data:image/jpeg;base64,${option.image}`
            //                 }
            //                 alt={option.title || `Option ${optionIndex + 1}`}
            //                 sx={{
            //                   width: 40,
            //                   height: 40,
            //                   borderRadius: "50%",
            //                   mr: 1,
            //                   border: "1px solid #ccc",
            //                   objectFit: "cover",
            //                 }}
            //                 onError={(e) =>
            //                   (e.currentTarget.style.display = "none")
            //                 }
            //               />
            //             )}

            //             {/* Text */}
            //             <Box sx={{ flexGrow: 1 }}>
            //               <Typography fontWeight={600}>
            //                 {option.title || `Option ${optionIndex + 1}`}
            //               </Typography>
            //               {option.description && (
            //                 <Typography
            //                   variant="caption"
            //                   color="text.secondary"
            //                 >
            //                   {option.description}
            //                 </Typography>
            //               )}
            //             </Box>

            //             {/* Checkbox */}
            //             <Checkbox
            //               checked={(item.selected || []).includes(option.id)}
            //               onChange={(e) =>
            //                 handleCheckboxChange(
            //                   index,
            //                   option.id,
            //                   e.target.checked
            //                 )
            //               }
            //             />
            //           </Box>
            //         ))
            //       ) : (
            //         <Typography color="text.secondary">
            //           No checkbox options found.
            //         </Typography>
            //       )}
            //     </div>
            //   );

            // // Render Radio Buttons

            // case "RadioButtonsGroup":
            //   return (
            //     <div key={index}>
            //       {/* Label */}
            //       <Typography
            //         variant="subtitle1"
            //         sx={{ fontWeight: 600, mb: 1 }}
            //       >
            //         {item.label}
            //         {item.required && (
            //           <Typography component="span" color="error">
            //             {" "}
            //             *
            //           </Typography>
            //         )}
            //       </Typography>

            //       {/* Radio group */}
            //       {Array.isArray(item["data-source"]) &&
            //         item["data-source"].length > 0 ? (
            //         <RadioGroup
            //           name={item.name}
            //           value={item.selected || ""}
            //           onChange={(e) => handleRadioChange(index, e.target.value)}
            //         >
            //           {item["data-source"].map((option, optionIndex) => (
            //             <FormControlLabel
            //               key={option.id || optionIndex}
            //               value={option.id}
            //               control={<Radio />}
            //               label={
            //                 <Box
            //                   sx={{
            //                     display: "flex",
            //                     alignItems: "center",
            //                   }}
            //                 >
            //                   {/* Image */}
            //                   {option.image && (
            //                     <Box
            //                       component="img"
            //                       src={
            //                         option.image.startsWith("data:")
            //                           ? option.image
            //                           : `data:image/jpeg;base64,${option.image}`
            //                       }
            //                       alt={
            //                         option.title || `Option ${optionIndex + 1}`
            //                       }
            //                       sx={{
            //                         width: 40,
            //                         height: 40,
            //                         borderRadius: "50%",
            //                         mr: 1,
            //                         border: "1px solid #ccc",
            //                       }}
            //                       onError={(e) => {
            //                         e.currentTarget.style.display = "none";
            //                       }}
            //                     />
            //                   )}

            //                   {/* Text */}
            //                   <Box>
            //                     <Typography variant="body2" fontWeight={600}>
            //                       {option.title || `Option ${optionIndex + 1}`}
            //                     </Typography>
            //                     {option.description && (
            //                       <Typography
            //                         variant="caption"
            //                         color="text.secondary"
            //                       >
            //                         {option.description}
            //                       </Typography>
            //                     )}
            //                   </Box>
            //                 </Box>
            //               }
            //               sx={{
            //                 mb: 1,
            //                 px: 0.5,
            //                 py: 0.4,
            //                 borderRadius: 1,
            //                 border: "1px solid #e0e0e0",
            //                 alignItems: "flex-start",
            //               }}
            //             />
            //           ))}
            //         </RadioGroup>
            //       ) : (
            //         <Typography color="text.secondary">
            //           No radio options found.
            //         </Typography>
            //       )}
            //     </div>
            //   );

            case "CheckboxGroup":
            case "RadioButtonsGroup":
              return (
                <div key={index} className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <div className="space-y-2">
                    {item["data-source"]?.map((opt, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          {opt.image && (
                            <img src={`data:image/png;base64,${opt.image}`} className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{opt.title}</p>
                            <p className="text-[11px] text-slate-500">{opt.description}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${item.type === 'RadioButtonsGroup' ? 'rounded-full' : 'rounded-md'} border-slate-300`} />
                      </div>
                    ))}
                  </div>
                </div>
              );

            //  Render Dropdown
            // case "Dropdown":
            //   return (
            //     <div key={index}>
            //       <Typography
            //         variant="subtitle1"
            //         sx={{ fontWeight: 600, mb: 1 }}
            //       >
            //         {item.label || "Select option"}
            //       </Typography>

            //       {Array.isArray(item["data-source"]) &&
            //         item["data-source"].length > 0 ? (
            //         <AnimatedDropdown
            //           value={item.selected || ""}
            //           onChange={(value) =>
            //             onUpdateItem &&
            //             onUpdateItem(index, (prev) => ({
            //               ...prev,
            //               selected: value,
            //             }))
            //           }
            //           options={item["data-source"].map((option) => ({
            //             value: option.id,
            //             label: option.title,
            //           }))}
            //         />
            //       ) : (
            //         <Typography color="text.secondary">
            //           No dropdown options found.
            //         </Typography>
            //       )}
            //     </div>
            //   );

            case "Dropdown":
              const isOpen = openDropdownIndex === index;
              return (
                <div key={index} className="flex flex-col gap-1.5 w-full relative">
                  <label className="text-[12px] font-bold text-slate-500 ml-1 uppercase">{item.label}</label>
                  <div
                    onClick={() => setOpenDropdownIndex(isOpen ? null : index)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex justify-between cursor-pointer"
                  >
                    {/* <span className={item.selected ? "text-slate-800" : "text-slate-400"}>
                      {item["data-source"]?.find(opt => opt.id === item?.selected)?.title || "Select..."}
                    </span> */}
                    <svg className={`w-5 h-5 transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Inline Menu */}
                  {isOpen && (
                    <div className="absolute top-[100%] left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl z-10 overflow-hidden">
                      {item["data-source"]?.map((opt) => (
                        <div
                          key={opt.id}
                          className="px-4 py-3 hover:bg-slate-50 text-sm cursor-pointer border-b last:border-0"
                          onClick={() => {
                            onUpdateItem(index, (prev) => ({ ...prev, selected: opt.id }));
                            setOpenDropdownIndex(null);
                          }}
                        >
                          {opt.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );

            //  CHIP SELECTOR
            // case "ChipsSelector":
            //   return (
            //     <div className="p-2 bg-gray-100 rounded-lg">
            //       <label className="block mb-2 text-sm font-medium text-gray-900">
            //         {item.label || "Select Options"}
            //       </label>

            //       <div className="flex flex-wrap gap-2">
            //         {(item["data-source"] || []).map((option, i) => {
            //           const isSelected = (item.selected || []).includes(
            //             option.title
            //           );

            //           return (
            //             <button
            //               key={i}
            //               type="button"
            //               onClick={() =>
            //                 handleChipOptionClick(index, option.title)
            //               }
            //               className={`px-3 py-1 rounded-full text-sm border transition-all ${isSelected
            //                 ? "bg-blue-600 text-white border-blue-600"
            //                 : "bg-white text-gray-800 border-gray-300"
            //                 }`}
            //             >
            //               {option.title}
            //             </button>
            //           );
            //         })}
            //       </div>

            //       <p className="text-xs text-gray-500 mt-2">
            //         {(item.selected || []).length} selected (max 2)
            //       </p>
            //     </div>
            //   );

            case "ChipsSelector":
              return (
                <div key={index} className="flex flex-col gap-3 w-full my-2">
                  <div className="flex justify-between items-end px-1">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                      {item.label || "Categories"}
                    </label>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.selected?.length || 0}/2
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(item["data-source"] || []).map((option, i) => {
                      const isSelected = (item.selected || []).includes(option.title);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleChipOptionClick(index, option.title)}
                          className={`px-4 py-2 rounded-full text-[13px] font-semibold border-2 transition-all duration-200 shadow-sm ${isSelected
                            ? "bg-[#128C7E] text-white border-[#128C7E] scale-105"
                            : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
                            }`}
                        >
                          {option.title}
                          {isSelected && <span className="ml-1.5 opacity-80">✕</span>}
                        </button>
                      );
                    })}
                  </div>
                  {item.selected?.length > 0 && (
                    <p className="text-[11px] text-[#128C7E] italic ml-1 font-medium italic">
                      You have selected {item.selected.join(', ')}
                    </p>
                  )}
                </div>
              );

            case "Footer":
              const centerCaption = item['center-caption'] || "center caption";
              console.log(centerCaption, "from preview")
              const buttonLabel = item.label || "Click me";

              return (
                <div className="w-full flex items-center justify-center">
                  <div className="w-full text-center p-5 bottom-0 absolute bg-gray-200 h-24 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-xs pb-2 mt-4">{centerCaption}</p>
                    <button className="w-full bg-green-700 text-white py-1 rounded-full hover:bg-green-800 transition-all text-sm">
                      {buttonLabel}
                    </button>
                    <p className="text-xs text-gray-500 my-2">
                      {`Managed by ${currentRow?.channel}` || "Managed by business"}
                      {/* <a href="#" className="text-blue-600 hover:underline">
                        Learn more
                      </a> */}
                    </p>
                  </div>
                </div>
              );

            case "Embeddedlink":
              return <div className="text-green-500">{item.text || ""}</div>;

            case "optin":
              return (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={(e) =>
                      onUpdateItem &&
                      onUpdateItem(index, (prevItem) => ({
                        ...prevItem,
                        checked: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
                  />
                  <p className="text-sm text-gray-700">
                    {item.label || ""}{" "}
                    <span className="text-green-500">Read More</span>
                  </p>
                </div>
              );

            case "Image":
              return (
                <>
                  {item?.src ? (
                    <div style={{ marginBottom: "1rem" }}>
                      <div
                        style={{
                          width: "100%",
                          position: "relative",
                          paddingTop: `${100 / (item["aspect-ratio"] || 1)}%`,
                          backgroundColor: "#f5f5f5",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={`data:image/png;base64,${item?.src}`}
                          alt={item["alt-text"] || "Uploaded image"}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: item["scale-type"] || "contain",
                          }}
                        />
                      </div>

                      <p
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "14px",
                          color: "#333",
                        }}
                      >
                        <strong>Alt Text:</strong> {item["alt-text"] || "-"}
                      </p>
                      <p style={{ fontSize: "14px", color: "#333" }}>
                        <strong>Scale Type:</strong>{" "}
                        {item["scale-type"] || "contain"}
                      </p>
                    </div>
                  ) : (
                    <Typography color="text.secondary">
                      No image selected
                    </Typography>
                  )}
                </>
              );

            case "DocumentPicker":
              return (
                <>
                  {item.type === "DocumentPicker" && (
                    <div className="p-4 border rounded-md shadow-sm">
                      <p className="font-semibold">
                        {item.label || "Upload Documents"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Min Documents: {item["min-uploaded-documents"] || ""} |
                        Max Documents: {item["max-uploaded-documents"] || ""}
                      </p>
                      <div className="mt-2 border-2 border-dashed border-gray-300 p-2 text-center rounded-md">
                        <span className="text-green-400 space-x-2">
                          <ArticleOutlinedIcon />
                          Upload Document
                        </span>
                      </div>
                    </div>
                  )}
                </>
              );
            case "Media":
              return (
                <>
                  {item.type === "Media" && (
                    <div className="p-4 border rounded-md shadow-sm">
                      <p className="font-semibold">
                        {item.label || "Upload photos"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Min Photos: {item["min-uploaded-photos"] || ""} | Max
                        Photos: {item["max-uploaded-photos"] || ""}
                      </p>
                      <div className="mt-2 border-2 border-dashed border-gray-300 p-2 text-center rounded-md">
                        <span className="text-green-400 space-x-2">
                          <AddAPhotoOutlinedIcon />
                          Take Photo{" "}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              );

            case "ImageCarousel": {
              const images = [
                item?.["image-1"],
                item?.["image-2"],
                item?.["image-3"],
              ].filter((img) => img?.src); // Only non-empty images

              const scaleType = item?.["scale-type"] || "contain";

              return (
                <div className="w-[320px] mx-auto border rounded-xl shadow-md overflow-hidden bg-white relative">
                  <div className="relative h-[200px] bg-gray-100">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`data:image/png;base64,${img.src}`}
                        alt={img["alt-text"] || `Image ${idx + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-${scaleType} transition-opacity duration-300 ${idx === currentIndex ? "opacity-100" : "opacity-0"
                          }`}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    ))}

                    {images.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                          onClick={() =>
                            setCurrentIndex(
                              (prev) =>
                                (prev - 1 + images.length) % images.length
                            )
                          }
                        >
                          ‹
                        </button>
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                          onClick={() =>
                            setCurrentIndex(
                              (prev) => (prev + 1) % images.length
                            )
                          }
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  <div className="text-center py-2 text-sm text-gray-500">
                    {images[currentIndex]?.["alt-text"] ||
                      `Image ${currentIndex + 1}`}
                  </div>
                </div>
              );
            }

            case "ifelse":
              return <InputField value={item.value || ""} />;
            case "switch":
              return <InputField placeholder="SWITCH" label="SWITCH" />;

            case "Calendar":
              return (
                <div className="w-full px-3 py-2">
                  {item.mode === "range" ? (
                    <div className="space-y-4">
                      {/* Start Date */}
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {item.label?.["start-date"] || "Start Date"}
                        </label>
                        <UniversalDatePicker
                          selected={
                            item.value?.["start-date"]
                              ? new Date(item.value["start-date"])
                              : null
                          }
                          onChange={(date) =>
                            onUpdateItem &&
                            onUpdateItem(index, (prevItem) => ({
                              ...prevItem,
                              value: {
                                ...prevItem.value,
                                "start-date": date?.toISOString().split("T")[0],
                              },
                            }))
                          }
                          placeholderText="Select start date"
                          minDate={
                            item["min-date"]
                              ? new Date(item["min-date"])
                              : undefined
                          }
                          maxDate={
                            item["max-date"]
                              ? new Date(item["max-date"])
                              : undefined
                          }
                          unavailableDate={
                            Array.isArray(item["unavailable-dates"])
                              ? item["unavailable-dates"].map(
                                (d) => new Date(d)
                              )
                              : undefined
                          }
                          dateFormat="yyyy-MM-dd"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                        />
                        {item["helper-text"]?.["start-date"] && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item["helper-text"]["start-date"]}
                          </p>
                        )}
                      </div>

                      {/* End Date */}
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {item.label?.["end-date"] || "End Date"}
                        </label>
                        <UniversalDatePicker
                          selected={
                            item.value?.["end-date"]
                              ? new Date(item.value["end-date"])
                              : null
                          }
                          onChange={(date) =>
                            onUpdateItem &&
                            onUpdateItem(index, (prevItem) => ({
                              ...prevItem,
                              value: {
                                ...prevItem.value,
                                "end-date": date?.toISOString().split("T")[0],
                              },
                            }))
                          }
                          placeholderText="Select end date"
                          minDate={
                            item["min-date"]
                              ? new Date(item["min-date"])
                              : undefined
                          }
                          maxDate={
                            item["max-date"]
                              ? new Date(item["max-date"])
                              : undefined
                          }
                          unavailableDate={
                            Array.isArray(item["unavailable-dates"])
                              ? item["unavailable-dates"].map(
                                (d) => new Date(d)
                              )
                              : undefined
                          }
                          dateFormat="yyyy-MM-dd"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                        />
                        {item["helper-text"]?.["end-date"] && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item["helper-text"]["end-date"]}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {item.label || "Date"}
                      </label>
                      <UniversalDatePicker
                        selected={item.value ? new Date(item.value) : null}
                        onChange={(date) =>
                          onUpdateItem &&
                          onUpdateItem(index, (prevItem) => ({
                            ...prevItem,
                            value: date?.toISOString().split("T")[0],
                          }))
                        }
                        placeholderText={item.placeholder || "Select a date"}
                        minDate={
                          item["min-date"]
                            ? new Date(item["min-date"])
                            : undefined
                        }
                        maxDate={
                          item["max-date"]
                            ? new Date(item["max-date"])
                            : undefined
                        }
                        unavailableDate={
                          Array.isArray(item["unavailable-dates"])
                            ? item["unavailable-dates"].map((d) => new Date(d))
                            : undefined
                        }
                        dateFormat="yyyy-MM-dd"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                      />
                      {item["helper-text"] && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item["helper-text"]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );

            // Render Date
            // case "DatePicker":
            //   return (
            //     <div key={index} className="w-full px-4 py-2">
            //       {/* Label */}
            //       <label className="block text-sm font-medium text-gray-700 mb-1">
            //         {item.label}
            //       </label>

            //       {/* Date display */}
            //       <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-800">
            //         {item.value
            //           ? new Date(item.value).toLocaleDateString()
            //           : item["helper-text"] || "Select date"}
            //       </div>

            //       {/* Helper info */}
            //       <div className="mt-1 text-xs text-gray-500">
            //         {item["min-date"] && (
            //           <div>
            //             Min: {new Date(item["min-date"]).toLocaleDateString()}
            //           </div>
            //         )}
            //         {item["max-date"] && (
            //           <div>
            //             Max: {new Date(item["max-date"]).toLocaleDateString()}
            //           </div>
            //         )}
            //         {Array.isArray(item["unavailable-dates"]) &&
            //           item["unavailable-dates"].length > 0 && (
            //             <div>
            //               Unavailable:{" "}
            //               {item["unavailable-dates"]
            //                 .map((d) => new Date(d).toLocaleDateString())
            //                 .join(", ")}
            //             </div>
            //           )}
            //       </div>
            //     </div>
            //   );

            case "DatePicker":
            case "CalendarPicker":
              const isRange = item.mode === "range";

              // Helper to render a single date field
              const renderDateField = (label, value, helperText, isRequired) => (
                <div className="flex flex-col flex-1 gap-1.5 group">
                  <label className="text-[11px] font-bold text-[#128C7E] ml-1 uppercase tracking-wider">
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  <div className="relative flex items-center w-full h-[52px] bg-slate-50 border-b-[1.5px] border-slate-300 rounded-t-lg px-4 transition-all group-hover:border-slate-400">
                    <span className={`text-[15px] ${value ? "text-slate-800 font-medium" : "text-slate-400 font-normal"}`}>
                      {value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Select date"}
                    </span>

                    {/* Calendar Icon */}
                    <svg className="absolute right-4 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  {helperText && (
                    <p className="text-[10px] text-slate-400 font-medium ml-1">
                      {helperText}
                    </p>
                  )}
                </div>
              );

              return (
                <div key={index} className="w-full flex flex-col gap-4 py-1">
                  {isRange ? (
                    <div className="flex flex-col gap-3 w-full">
                      {/* Start Date */}
                      {renderDateField(
                        item.label?.["start-date"] || "Start Date",
                        item.value?.["start-date"],
                        item["helper-text"]?.["start-date"],
                        item.required?.["start-date"]
                      )}
                      {/* End Date */}
                      {renderDateField(
                        item.label?.["end-date"] || "End Date",
                        item.value?.["end-date"],
                        item["helper-text"]?.["end-date"],
                        item.required?.["end-date"]
                      )}
                    </div>
                  ) : (
                    /* Single Date Picker */
                    renderDateField(
                      item.label || "Select Date",
                      item.value,
                      item["helper-text"],
                      item.required
                    )
                  )}

                  {/* Constraints Info (Min/Max/Unavailable) - Optional subtle footer */}
                  {(item["min-date"] || item["max-date"]) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 opacity-60">
                      {item["min-date"] && (
                        <span className="text-[9px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                          From: {new Date(item["min-date"]).toLocaleDateString()}
                        </span>
                      )}
                      {item["max-date"] && (
                        <span className="text-[9px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                          To: {new Date(item["max-date"]).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );

            // case "userdetail":
            //   return (
            //     <InputField
            //       value={item.value || ""}
            //       onChange={(e) =>
            //         onUpdateItem &&
            //         onUpdateItem(index, (prevItem) => ({
            //           ...prevItem,
            //           value: e.target.value,
            //         }))

            //       }
            //     />
            //   )

            default: return null;
          }
        })}
      </div>
    </motion.div >
  );
};
export default MobilePanel;
