// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// // ICONS
// import { MdOutlineDeleteForever } from "react-icons/md";

// // APIS
// import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

// // COMPONENTS
// import InputField from "@/whatsapp/components/InputField";
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

// export const Variables = ({
//   variablesData,
//   setVariablesData,
//   specificTemplate,
//   fileRef,
//   setBasicDetails,
//   fileData,
//   setFileData,
// }) => {
//   function handleFileChange(e) {
//     const file = e.target.files[0];
//     setFileData((prev) => ({ ...prev, file: file }));
//   }
//   async function handleUploadFile() {
//     if (!fileData.file) return;
//     if (fileData.url) return toast.error("File already uploaded");

//     const res = await uploadImageFile(fileData.file);
//     setFileData((prev) => ({ ...prev, url: res?.fileUrl }));
//     setBasicDetails((prev) => ({ ...prev, mediaPath: res?.fileUrl }));
//   }

//   function deleteImage() {
//     if (!fileData.url) return;
//     setFileData({ file: "", url: "" });
//     setBasicDetails((prev) => ({ ...prev, mediaPath: "" }));
//     fileRef.current.value = "";
//   }
//   return (
//     <div className="mt-2 space-y-2 border p-3 rounded-xl">
//       {variablesData?.data?.length > 0 &&
//         variablesData?.data?.map((input, index) => (
//           <div key={index}>
//             <div>
//               <h1>Variables</h1>
//             </div>
//             <div>
//               <div className="flex  gap-2 items-center mt-2">
//                 <label htmlFor="templateMessage">
//                   {`{{${variablesData?.data[index]}}}`}
//                 </label>
//                 <InputField
//                   placeholder="{{name}}"
//                   id="templateMessage"
//                   name="templateMessage"
//                   value={variablesData?.input[index]}
//                   onChange={(e) => {
//                     const updatedData = [...variablesData.input];
//                     updatedData[index] = e.target.value;
//                     setVariablesData((prev) => ({
//                       ...prev,
//                       input: updatedData,
//                     }));
//                   }}
//                   className="flex-1 w-full focus:outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}

//       {variablesData?.btn?.length > 0 &&
//         variablesData?.btn?.map((input, index) => (
//           <div key={index}>
//             <h1>Buttons</h1>
//             <div className="flex  gap-2 items-center mt-2">
//               <label htmlFor="templateMessage">
//                 {`{{${variablesData?.btn[index]}}}`}
//               </label>
//               <InputField
//                 placeholder="{{name}}"
//                 id="templateMessage"
//                 name="templateMessage"
//                 value={variablesData?.btnInput[index]}
//                 onChange={(e) => {
//                   const updatedData = [...variablesData.btnInput];
//                   updatedData[index] = e.target.value;
//                   setVariablesData((prev) => ({
//                     ...prev,
//                     btnInput: updatedData,
//                   }));
//                 }}
//                 className="flex-1 w-full focus:outline-none"
//               />
//             </div>
//           </div>
//         ))}

//       {specificTemplate?.templateType === "image" && (
//         <div className="space-y-2">
//           <h1>Upload Image</h1>
//           <div className="flex gap-2 items-center">
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileRef}
//               className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
//               onChange={handleFileChange}
//             />

//             <button onClick={handleUploadFile}>
//               <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
//             </button>
//             <button onClick={deleteImage}>
//               <MdOutlineDeleteForever
//                 className="text-red-500 cursor-pointer hover:text-red-600"
//                 size={25}
//               />
//             </button>
//           </div>
//         </div>
//       )}
//       {specificTemplate?.templateType === "video" && (
//         <div className="space-y-2">
//           <h1>Upload Video</h1>
//           <div className="flex gap-2 items-center">
//             <input
//               type="file"
//               accept="video/*"
//               ref={fileRef}
//               className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
//               onChange={handleFileChange}
//             />

//             <button onClick={handleUploadFile}>
//               <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
//             </button>
//             <button onClick={deleteImage}>
//               <MdOutlineDeleteForever
//                 className="text-red-500 cursor-pointer hover:text-red-600"
//                 size={25}
//               />
//             </button>
//           </div>
//         </div>
//       )}
//       {specificTemplate?.templateType === "document" && (
//         <div className="space-y-2">
//           <h1>Upload Document</h1>
//           <div className="flex gap-2 items-center">
//             <input
//               type="file"
//               accept="application/*"
//               ref={fileRef}
//               className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
//               onChange={handleFileChange}
//             />

//             <button onClick={handleUploadFile}>
//               <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
//             </button>
//             <button onClick={deleteImage}>
//               <MdOutlineDeleteForever
//                 className="text-red-500 cursor-pointer hover:text-red-600"
//                 size={25}
//               />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

//========================== Please don't remove above code ==========================================

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";

// ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";

// APIS
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CustomTooltip from "@/components/common/CustomTooltip.jsx";

export const Variables = ({
  variablesData,
  setVariablesData,
  specificTemplate,
  fileRef,
  setBasicDetails,
  fileData,
  setFileData,
  setInputValues,
  onInputChange,
  inputValues,
  templateDataNew,
  setTemplateDataNew,
  cardIndex,
  setCardIndex,
  selectedTemplateData,
  basicDetails
}) => {

  console.log("basicDetails", basicDetails)
  function handleFileChange(e) {
    const file = e.target.files[0];
    setFileData((prev) => ({ ...prev, file: file }));
  }

  async function handleCarFileChange(e, index) {
    const file = e.target.files[0];

    setFileData((prev) => ({
      ...prev,
      [index]: {
        fileTempPath: file,
        filePath: "",
      },
    }));
  }

  // async function handleUploadFile(index) {
  //   if (!fileData[index]?.fileTempPath) {
  //     return toast.error("Please select a file first");
  //   }
  //   const res = await uploadImageFile(fileData[index]?.fileTempPath);
  //   if (res?.fileUrl) {
  //     toast.success("Media uploaded successfully!");
  //   }

  //   setFileData((prev) => ({
  //     ...prev,
  //     [index]: {
  //       ...prev[index],
  //       filePath: res?.fileUrl,
  //     },
  //   }));
  // }

  async function handleUploadFile(index) {
  if (!fileData[index]?.fileTempPath) {
    return toast.error("Please select a file first");
  }

  const res = await uploadImageFile(fileData[index]?.fileTempPath);

  if (!res?.fileUrl) return;

  toast.success("Media uploaded successfully!");


  // update carousel header image
  setTemplateDataNew((prev) => {
    const updated = structuredClone(prev); // or deep clone

    const carousel = updated.components.find(
      (c) => c.type === "CAROUSEL"
    );

    if (!carousel) return prev;

    const header = carousel.cards[index]?.components.find(
      (c) => c.type === "HEADER" && c.format === "IMAGE"
    );

    if (!header) return prev;

    header.example = {
      header_handle: [res.fileUrl],
    };

    return updated;
  });
}


  console.log("fileData", fileData)

  async function handleDeleteFile(index) {
    setFileData((prev) => ({
      ...prev,
      [index]: {
        fileTempPath: null,
        filePath: "",
      },
    }));

    fileRef.current.value = "";
  }

  async function handleUpload() {
    if (!fileData?.file) {
      return toast.error("Please select a file first");
    }

    // if (fileData?.url) {
    //   return toast.error("File already uploaded");
    // }

    try {
      const res = await uploadImageFile(fileData.file);

      if (!res?.fileUrl) {
        toast.error("Upload failed");
        return;
      }

      setFileData((prev) => ({
        ...prev,
        url: res.fileUrl,
      }));

      setBasicDetails((prev) => ({
        ...prev,
        mediaPath: res.fileUrl,
      }));

      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
    }
  }

  function deleteImage() {
    if (!fileData?.url) return;

    setFileData({ file: null, url: null });

    setBasicDetails((prev) => ({
      ...prev,
      mediaPath: "",
    }));

    if (fileRef?.current) {
      fileRef.current.value = "";
    }
  }

  const handleInputChange = (e, index, type = "body") => {
    const { value } = e.target;
    const variableKey = variablesData[index].key;

    // Update variablesData (THIS FIXES INPUT)
    setVariablesData((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        value,
      };
      return updated;
    });

    // Optional local tracking
    setInputValues((prev) => ({
      ...prev,
      [`${type}${variableKey}`]: value,
    }));

    //Update formData in parent
    onInputChange(value, `${type}${variableKey}`);
  };

  const isCarousal = templateDataNew?.components?.find(
    (comp) => comp.type === "CAROUSEL",
  );
  let CardsData = [];

  isCarousal?.cards?.map(({ components: card }, index) => {
    CardsData.push(card);
  });

  console.log("templateDataNew", templateDataNew)
  // useEffect(() => {
  //   isCarousal?.cards?.map((card, index) => {
  //     setFileData((prev) => ({
  //       ...prev,
  //       [index]: {
  //         fileTempPath: "",
  //         filePath: "",
  //       },
  //     }));
  //   });
  // }, [isCarousal]);

  const isButton = templateDataNew?.components?.find(
    (comp) => comp.type === "BUTTONS",
  );

const handleInputBtnChange = (e, btnIndex, variable) => {
  const updatedButtons = [...isButton.buttons];

  updatedButtons[btnIndex] = {
    ...updatedButtons[btnIndex],
    values: {
      ...(updatedButtons[btnIndex].values || {}),
      [variable]: e.target.value, 
    },
  };

  setTemplateDataNew((prev) => ({
    ...prev,
    components: prev.components.map((comp) =>
      comp.type === "BUTTONS"
        ? { ...comp, buttons: updatedButtons }
        : comp,
    ),
  }));
};


  const extractUrlVariables = (url) => {
  if (!url) return [];
  return url.match(/\{\{\d+\}\}/g) || [];
};


  return (
    <div className="mt-2 space-y-2 border p-3 rounded-xl">
      {/* {variablesData?.length > 0 &&
        variablesData?.data?.map((input, index) => (
          <div key={index}>
            <div>
              <h1>Variables</h1>
            </div>
            <div>
              <div className="flex  gap-2 items-center mt-2">
                <label htmlFor="templateMessage">
                  {`{{${variablesData?.data[index]}}}`}
                </label>
                <InputField
                  placeholder="{{name}}"
                  id="templateMessage"
                  name="templateMessage"
                  value={variablesData?.input[index]}
                  onChange={(e) => {
                    const updatedData = [...variablesData.input];
                    updatedData[index] = e.target.value;
                    setVariablesData((prev) => ({
                      ...prev,
                      input: updatedData,
                    }));
                   handleInputChange(e, variable, "body")
                  }}
                  className="flex-1 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))} */}

      <div className="bg-[#ece5dd] p-2 rounded-t-md flex flex-col items-center">
        <div className="text-[#128C7E] text-sm font-semibold text-center tracking-wide border-b border-[#128c7e42] w-full pb-2 mb-2">
          Template Details
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-[0.8rem] font-medium text-[#128C7E] tracking-wider ">
            Category - {selectedTemplateData?.category || "N/A"}
          </h3>
          <h3 className="text-[0.8rem] font-medium text-[#128C7E] tracking-wider ">
            Type - {selectedTemplateData?.type?.toUpperCase() || "N/A"}
          </h3>
        </div>
      </div>

      {variablesData.length > 0 && (
        <>
          <p className="text-sm font-semibold">Message Parameter :</p>

          {variablesData.map((item, index) => (
            <div key={item.key} className="flex gap-2 items-center mt-2">
              <label className="text-sm font-medium">{`{{${item.key}}}`}</label>

              <InputField
                placeholder={`Value for {{${item.key}}}`}
                value={item.value} // controlled correctly
                onChange={(e) => handleInputChange(e, index)} // index used internally
                className="flex-1 w-full focus:outline-none"
              />
            </div>
          ))}
        </>
      )}

      {variablesData?.btn?.length > 0 &&
        variablesData?.btn?.map((input, index) => (
          <div key={index}>
            <h1>Buttons</h1>
            <div className="flex  gap-2 items-center mt-2">
              <label htmlFor="templateMessage">
                {`{{${variablesData?.btn[index]}}}`}
              </label>
              <InputField
                placeholder="{{name}}"
                id="templateMessage"
                name="templateMessage"
                value={variablesData?.btnInput[index]}
                onChange={(e) => {
                  const updatedData = [...variablesData.btnInput];
                  updatedData[index] = e.target.value;
                  setVariablesData((prev) => ({
                    ...prev,
                    btnInput: updatedData,
                  }));
                }}
                className="flex-1 w-full focus:outline-none"
              />
            </div>
          </div>
        ))}

      {specificTemplate?.templateType === "IMAGE" && (
        <div className="space-y-2">
          <h1>Upload Image</h1>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
              onChange={handleFileChange}
            />

            <button onClick={handleUpload}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            <button onClick={deleteImage}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={25}
              />
            </button>
          </div>
        </div>
      )}
      {specificTemplate?.templateType === "VIDEO" && (
        <div className="space-y-2">
          <h1>Upload Video</h1>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="video/*"
              ref={fileRef}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
              onChange={handleFileChange}
            />

            <button onClick={handleUpload}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            <button onClick={deleteImage}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={25}
              />
            </button>
          </div>
        </div>
      )}
      {specificTemplate?.templateType === "DOCUMENT" && (
        <div className="space-y-2">
          <h1>Upload Document</h1>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="application/*"
              ref={fileRef}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
              onChange={handleFileChange}
            />

            <button onClick={handleUpload}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            <button onClick={deleteImage}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={25}
              />
            </button>
          </div>
        </div>
      )}

      {isCarousal && (
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium tracking-wide text-gray-700">
              Upload File
            </p>
            <CustomTooltip
              title="Only jpg, jpeg and png allowed (5 MB max)"
              placement="right"
              arrow
            >
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div>

          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            renderArrowPrev={() => null}
            renderArrowNext={() => null}
            selectedItem={cardIndex}
            onChange={(index) => setCardIndex(index)}
            renderIndicator={(onClickHandler, isSelected, index) => {
              const baseClasses = "w-3 h-3 rounded-full mx-1 cursor-pointer";
              const indicatorClass = isSelected
                ? "bg-[#212529]"
                : "bg-[#7E7F80]";
              return (
                <li
                  key={index}
                  className={`inline-block ${baseClasses} ${indicatorClass}`}
                  onClick={() => {
                    onClickHandler();
                    setCardIndex(index);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Slide ${index + 1}`}
                />
              );
            }}
          >
            {CardsData.map((card, index) => {
              const handler = card.find(
                (item) =>
                  item.type === "HEADER" &&
                  ["IMAGE", "VIDEO", "DOCUMENT"].includes(item.format),
              );

              if (!handler) {
                // Use empty div to avoid breaking Carousel layout
                return <div key={index} />;
              }

              const acceptedTypes = {
                IMAGE: "image/*",
                VIDEO: "video/*",
                DOCUMENT: ".pdf,.doc,.docx,.xls,.xlsx",
              };

              return (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex items-start gap-2">
                    <input
                      type="file"
                      id={`imageUpload-${index}`}
                      accept={acceptedTypes[handler.format] || "*/*"}
                      onChange={(e) => handleCarFileChange(e, index)}
                      className="hidden"
                      ref={fileRef}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(`imageUpload-${index}`)?.click()
                      }
                      className="px-2 py-1.5 tracking-wide bg-blue-400 text-white text-[0.85rem] rounded-md shadow-md hover:bg-blue-500 focus:outline-none cursor-pointer"
                    >
                      Choose File
                    </button>
                  </div>

                  {fileData[index] && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUploadFile(index)}
                        disabled={!fileData[index]}
                        className="px-2 py-[0.3rem] bg-green-400 cursor-pointer hover:bg-green-500 text-white text-sm rounded-md shadow-md focus:outline-none"
                      >
                        <FileUploadOutlinedIcon
                          sx={{ color: "white", fontSize: "22px" }}
                        />
                      </button>

                      <button
                        onClick={() => handleDeleteFile(index)}
                        className="p-2 rounded-full cursor-pointer focus:outline-none hover:bg-gray-200"
                      >
                        <MdOutlineDeleteForever
                          className="text-red-500 hover:text-red-600"
                          size={20}
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </Carousel>
        </div>
      )}

      {isButton?.buttons?.some(
        (btn) => btn.type === "URL" && /\{\{\d+\}\}/.test(btn.url),
      ) && (
        <>
          <h1 className="font-semibold text-sm">URL Parameter :</h1>

          {isButton.buttons
            .filter((btn) => btn.type === "URL")
            .flatMap((btn, btnIndex) =>
              extractUrlVariables(btn.url).map((variable, varIndex) => (
                <div
                  key={`${btnIndex}-${varIndex}`}
                  className="flex gap-2 items-center mt-2"
                >
                  <label className="text-sm font-medium">{variable}</label>

                  <InputField
                    placeholder={`Value for ${variable}`}
                    value={btn.values?.[variable] || basicDetails?.buttonUrlVar}
                    onChange={(e) =>
                      handleInputBtnChange(e, btnIndex, variable)
                    }
                    className="flex-1 w-full focus:outline-none"
                  />
                </div>
              )),
            )}
        </>
      )}  
    </div>
  );
};
