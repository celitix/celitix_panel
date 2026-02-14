import React, { useState, useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";
import { IconButton, Switch } from "@mui/material";

// ICONS
import { FaInstagram } from "react-icons/fa";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { FaVideo } from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { LuMic } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import VisibilityIcon from "@mui/icons-material/Visibility";

// APIS
import {
  instaUserList,
  getInstaTemplateList,
  createInstaTemplate,
  instaUpdateTempStatus,
  instaGetTempJson,
} from "@/apis/instagram/Instagram";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

// COMPONENTS
import CustomTabsMaterial from "@/instagram/components/CustomTabsMaterial";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/whatsapp/components/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";
import { DataTable } from "@/components/layout/DataTable.jsx";
import { Dialog } from "primereact/dialog";
import CustomTooltip from "@/components/common/CustomTooltip";

const ManageInstaTemplates = () => {
  const tabsData = [
    {
      label: "Create Template",
      value: "template",
      icon: FaInstagram,
      content: <TemplateComponent />,
    },
    {
      label: "Manage Template",
      value: "template library",
      icon: FaInstagram,
      content: <TemplateLibraryComponent />,
    },
  ];
  return (
    <div>
      <CustomTabsMaterial tabsData={tabsData} defaultValue="template" />
    </div>
  );
};

// {
//     "type": "GENERIC", // BUTTON - radio buttons
//     "text": "test body {#variableone#} end", - only visible type button
//     "url": null,
//     "mediaId": null,
//     "targetMessageId": "697836469",
//     "reaction": "like",
//     "businessUserId": "17841404630029041", - dropdown
//     "templateName": "shubhtestnewwwwww", - input
//     "quickReplyList": [  //3 limit
//         "test",
//         "adasd",
//         "asdasd"
//     ],
//     "variablesList": [
//         "variableone"
//     ],
//     "title": "test", - input
//     "subtitle": "hello", - input
//     "imageUrl": "https://m.cltx.in/upload/image/e15a8455-c17f-4669-aa89-4589409f1631.jpg", - upload
//     "buttons": [
//         {
//             "text": "Click to connect!", - input
//             "type": "postback", - radio buttons (postback, web_url)
//             "value": "https://postback.com" - input
//         },
//         {
//             "text": "click to visit!", - input
//             "type": "web_url", - radio buttons (postback, web_url)
//             "value": "https://example.com" - input
//         },
//     ]
// }

const TemplateComponent = () => {
  const [instaUsers, setInstaUsers] = useState([]);
  const [formDetails, setFormDetails] = useState({
    selectedOption: "GENERIC",
    templateName: "",
    selectedInstaUser: "",
    text: "",
    title: "",
    subtitle: "",
    uploadedFile: null,
    buttonSets: [
      {
        id: Date.now(),
        type: "postback",
        text: "",
        value: "",
      },
    ],
    buttonInputs: [
      {
        id: Date.now(),
        text: "",
      },
    ],
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [addButton, setAddButton] = useState(false);
  const [addInputButton, setAddInputButton] = useState(false);

  const [showVariables, setShowVariables] = useState(false);
  const [variable, setVariable] = useState("");
  const [variablesList, setVariablesList] = useState([]);
  const [variableInText, setVariableInText] = useState([]);

  useEffect(() => {
    const fetchInstaUserList = async () => {
      try {
        const response = await instaUserList();
        if (response?.statusCode === 200) setInstaUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInstaUserList();
  }, []);

  const duplicateSet = (id) => {
    setFormDetails((prev) => {
      const current = prev.buttonSets.find((b) => b.id === id);
      if (!current) return prev;

      return {
        ...prev,
        buttonSets: [...prev.buttonSets, { ...current, id: Date.now() }],
      };
    });
  };
  const duplicateButtonSet = (id) => {
    setFormDetails((prev) => {
      const current = prev.buttonInputs.find((b) => b.id === id);
      if (!current) return prev;

      return {
        ...prev,
        buttonInputs: [...prev.buttonInputs, { ...current, id: Date.now() }],
      };
    });
  };

  const handleRadioChange = (id, value) => {
    setFormDetails((prev) => ({
      ...prev,
      buttonSets: prev.buttonSets.map((item) =>
        item.id === id ? { ...item, type: value } : item,
      ),
    }));
  };

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;

    setFormDetails((prev) => ({
      ...prev,
      buttonSets: prev.buttonSets.map((item) =>
        item.id === id ? { ...item, [name]: value } : item,
      ),
    }));
  };

  const handleInputButtonChange = (id, e) => {
    const { name, value } = e.target;

    setFormDetails((prev) => ({
      ...prev,
      buttonInputs: prev.buttonInputs.map((item) =>
        item.id === id ? { ...item, [name]: value } : item,
      ),
    }));
  };

  const removeSet = (id) => {
    // hide button section if none left
    if (formDetails.buttonSets.length === 1) {
      setAddButton(false);
      return;
    }

    setFormDetails((prev) => {
      const updated = prev?.buttonSets?.filter((b) => b.id !== id);

      return {
        ...prev,
        buttonSets: updated,
      };
    });
  };

  const removeButtonSet = (id) => {
    // hide button section if none left
    if (formDetails.buttonInputs.length === 1) {
      setAddInputButton(false);
      return;
    }

    setFormDetails((prev) => {
      const updated = prev?.buttonInputs?.filter((b) => b.id !== id);

      return {
        ...prev,
        buttonInputs: updated,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariableClick = (variable) => {
    const insertText = `{#${variable}#}`;

    setFormDetails((prev) => ({
      ...prev,
      text: prev.text ? `${prev.text} ${insertText}` : insertText,
    }));
  };

  const handleRadioBtn = (e) => {
    const value = e.target.value;
    setFormDetails((prev) => ({
      ...prev,
      selectedOption: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
  };

  const handleUploadImage = async (image) => {
    if (image) {
      try {
        const response = await uploadImageFile(image);
        if (response.status === true) {
          toast.success(response?.msg || "Image uploaded successfully!");
          setFormDetails((prev) => ({
            ...prev,
            uploadedFile: response?.fileUrl,
          }));
        }

        console.log("Upload successful:", response);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  const handleCreateInstaTemplate = async () => {
    const isValidHttpsUrl = (url) => /^https:\/\/.+/i.test(url);

    if (!formDetails?.selectedInstaUser) {
      toast.error("Please select insta account");
      return;
    }

    if (!formDetails?.templateName?.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (
      formDetails?.selectedOption === "button" &&
      !formDetails?.text?.trim()
    ) {
      toast.error("Please enter the button text");
      return;
    }
    if (
      formDetails?.selectedOption === "button" &&
      !formDetails?.buttonInputs?.some((item) => item?.text?.trim())
    ) {
      toast.error("Please enter the quick reply");
      return;
    }

    if (
      formDetails?.selectedOption === "GENERIC" &&
      !formDetails?.title?.trim()
    ) {
      toast.error("Title or subtitle is required");
      return;
    }

    formDetails.buttonSets.forEach((btn, index) => {
      if (btn.type === "web_url") {
        if (!btn?.value?.trim()) {
          toast.error("URL is required");
        } else if (!isValidHttpsUrl(btn.value)) {
          toast.error("URL must start with https://");
        }
      }
      return;
    });

    const buttonsPayload = formDetails.buttonSets
      .filter((btn) => btn.text?.trim() && btn.value?.trim())
      .map((btn) => ({
        text: btn.text.trim(),
        value: btn.value.trim(),
        ...(btn.type && { type: btn.type }),
      }));

    try {
      const payload = {
        type: formDetails?.selectedOption,
        ...(formDetails?.selectedOption === "BUTTON" && {
          text: formDetails.text,
          quickReplyList: formDetails?.buttonInputs.map((btn, i) => btn.text),
        }),
        //     "text": "test body {#variableone#} end", - only visible type button

        // url: null,
        // mediaId: null,
        // targetMessageId: "697836469",
        reaction: "like",
        businessUserId: formDetails?.selectedInstaUser,
        templateName: formDetails?.templateName,

        //     "quickReplyList": [  //3 limit
        //         "test",
        //         "adasd",
        //         "asdasd"
        //     ],
        variablesList: variablesList.map((variable) => variable),
        title: formDetails?.title,
        subtitle: formDetails?.subtitle,
        imageUrl: formDetails?.uploadedFile,

        ...(buttonsPayload.length > 0 && {
          buttons: buttonsPayload,
        }),
      };

      const response = await createInstaTemplate(payload);

      if (response.statusCode === 200) {
        toast.success(response?.message || "Template added successfully!");
        setFormDetails({
          selectedOption: "",
          text: "",
          selectedInstaUser: "",
          templateName: "",
          title: "",
          subtitle: "",
          uploadedFile: null,

          buttonSets: [
            {
              id: Date.now(),
              type: "postback",
              text: "",
              value: "",
            },
          ],
          buttonInputs: [
            {
              id: Date.now(),
              text: "",
            },
          ],
        });
      } else {
        toast.error(response?.message || "failed to add template");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="p-4 w-full grid grid-cols-3">
        <div className="md:col-span-2 col-span-3">
          <div className="flex gap-4 flex-wrap items-end">
            <div className="w-full sm:w-76">
              <DropdownWithSearch
                id="instaUserList"
                name="instaUserList"
                label="Instagram Account"
                placeholder="Instagram Account"
                options={instaUsers.map((user) => ({
                  label: user.userName,
                  value: user.businessInstaUserId,
                }))}
                value={formDetails?.selectedInstaUser}
                onChange={(e) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    selectedInstaUser: e,
                  }))
                }
              />
            </div>
            <div className="w-full sm:w-76">
              <InputField
                label="Template Name"
                id="templateName"
                name="templateName"
                placeholder="Enter Template Name"
                onChange={handleChange}
              />
            </div>
            <div className="flex md:flex-row flex-wrap gap-2">
              <div className="flex items-start justify-start gap-1 bg-white p-3  rounded-2xl">
                <RadioButton
                  value="GENERIC"
                  checked={formDetails?.selectedOption === "GENERIC"}
                  onChange={handleRadioBtn}
                />
                <label
                  htmlFor="GENERIC"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Generic
                </label>
              </div>
              <div className="flex items-start justify-start gap-1 bg-white p-3  rounded-2xl  ">
                <RadioButton
                  value="BUTTON"
                  checked={formDetails?.selectedOption === "BUTTON"}
                  onChange={handleRadioBtn}
                />
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  Button
                </label>
              </div>
            </div>
          </div>
          {formDetails?.selectedOption === "GENERIC" && (
            <>
              <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-300 py-6 border-b border-gray-100">
                <div className="col-span-2 md:col-span-1">
                  <InputField
                    label="Title"
                    id="title"
                    name="title"
                    placeholder="Enter Title"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <InputField
                    label="Subtitle"
                    id="subtitle"
                    name="subtitle"
                    placeholder="Enter Subtitle"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Image
                  </label>
                  <div
                    className={`flex items-center flex-wrap gap-4 p-4 border-2 border-dashed rounded-2xl transition-all ${preview ? "border-blue-100 bg-blue-50/30" : "border-gray-200 bg-gray-50"}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="imageUpload"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="relative group">
                      <label
                        htmlFor="imageUpload"
                        className="w-16 h-16 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors"
                      >
                        <IoImageOutline size={24} />
                      </label>
                    </div>

                    <div className="flex flex-col gap-1">
                      {!preview ? (
                        <>
                          <p className="text-sm font-semibold text-gray-700">
                            Choose an image
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG, JPG up to 5MB
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUploadImage(image)}
                            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                          >
                            Confirm Upload
                          </button>
                          <button
                            onClick={handleRemove}
                            className="px-3 py-1.5 bg-white text-red-500 text-xs font-bold border border-red-100 rounded-lg hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    {!preview && (
                      <label
                        htmlFor="imageUpload"
                        className="ml-auto cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-sm"
                      >
                        Pick Image
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4">
                  {!addButton && (
                    <div className="my-5">
                      <UniversalInstaButton
                        label="Interactive Buttons"
                        onClick={() => {
                          setAddButton(true);
                        }}
                      />
                    </div>
                  )}
                  {addButton && <div></div>}
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    Interactive Buttons{" "}
                    <span className="text-xs font-normal text-gray-400">
                      ({formDetails.buttonSets.length}/3)
                    </span>
                  </h3>
                </div>

                {addButton &&
                  formDetails?.buttonSets?.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-dashed border-gray-300 rounded-xl relative bg-gray-50/50"
                    >
                      <button
                        onClick={() => {
                          removeSet(item.id);
                        }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        title="Remove"
                      >
                        <RxCross2 />
                      </button>

                      {/* Radio buttons */}
                      <div className="flex gap-4 mb-3">
                        <div className="flex gap-1 bg-white p-3 rounded-2xl">
                          <RadioButton
                            value="postback"
                            checked={item.type === "postback"}
                            onChange={() =>
                              handleRadioChange(item.id, "postback")
                            }
                          />
                          <label className="flex items-center gap-2 text-sm">
                            Postback
                          </label>
                        </div>

                        <div className="flex gap-1 bg-white p-3 rounded-2xl">
                          <RadioButton
                            value="web_url"
                            checked={item.type === "web_url"}
                            onChange={() =>
                              handleRadioChange(item.id, "web_url")
                            }
                          />
                          <label className="flex items-center gap-2 text-sm">
                            Redirect URL
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InputField
                          label={
                            item.type === "postback"
                              ? "Postback Label"
                              : "Enter URL Label"
                          }
                          name="text"
                          placeholder={
                            item.type === "postback"
                              ? "Item Title"
                              : "Visit Website!"
                          }
                          value={item.text}
                          onChange={(e) => handleInputChange(item.id, e)}
                        />

                        <InputField
                          label="Value"
                          name="value"
                          placeholder={
                            item.type === "postback" ? "Payload" : "https://..."
                          }
                          value={item.value}
                          onChange={(e) => handleInputChange(item.id, e)}
                        />
                      </div>
                    </div>
                  ))}

                {addButton && formDetails?.buttonSets.length < 3 && (
                  <button
                    onClick={() =>
                      duplicateSet(
                        formDetails.buttonSets[
                          formDetails.buttonSets.length - 1
                        ].id,
                      )
                    }
                    className="text-sm text-blue-600 font-bold flex items-center gap-1"
                  >
                    Add more
                  </button>
                )}
              </div>
            </>
          )}

          {formDetails?.selectedOption === "BUTTON" && (
            <>
              <div className="w-full my-4">
                <UniversalTextArea
                  label="Button Title"
                  id="text"
                  name="text"
                  row={5}
                  placeholder="Enter Button Title"
                  value={formDetails.text}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="flex md:flex-row flex-col gap-4 md:w-100">
                  {/* <div className="text-nowrap" >
                                        <UniversalInstaButton
                                            label="Add Variable"
                                            onClick={() => setShowVariables(true)}
                                        />
                                    </div> */}
                  {/* {showVariables && ( */}
                  <div className="flex items-end gap-5">
                    <div className="w-full sm:w-76">
                      <InputField
                        label="Enter Variable"
                        name="variable"
                        placeholder="Ex. Name, MobileNo."
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                      />
                    </div>
                    <div className="text-nowrap">
                      <UniversalInstaButton
                        label="Insert"
                        onClick={() => {
                          if (!variable.trim()) return;

                          setVariablesList((prev) => {
                            const updated = [...prev, variable.trim()];

                            localStorage.setItem(
                              "variablesList",
                              JSON.stringify(updated),
                            );

                            return updated;
                          });

                          setVariable("");
                        }}
                      />
                    </div>
                  </div>

                  {/* )} */}
                </div>
                {variablesList.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-2 border-gray-200 shadow-sm bg-gray-50 my-5 rounded-lg p-2">
                    {variablesList.map((variable, i) => (
                      <span
                        key={i}
                        onClick={() => handleVariableClick(variable)}
                        className="px-2 py-0.5 text-sm font-medium bg-blue-300 text-gray-700 border border-gray-300 rounded-full cursor-pointer hover:bg-blue-400"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                )}
                {!addInputButton && (
                  <div className="text-nowrap mt-8">
                    <UniversalInstaButton
                      label="Add Button"
                      onClick={() => setAddInputButton(true)}
                    />
                  </div>
                )}

                {addInputButton &&
                  formDetails?.buttonInputs?.map((input, i) => (
                    <div
                      key={i}
                      className="my-2 border-2 border-gray-200 rounded-xl w-[40rem] p-2 relative"
                    >
                      <InputField
                        label="Enter quick reply"
                        name="text"
                        placeholder="Enter quick reply..."
                        value={input.text}
                        onChange={(e) => handleInputButtonChange(input.id, e)}
                      />

                      <div
                        className="absolute right-4 top-2"
                        onClick={() => removeButtonSet(input.id)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}

                {addInputButton && formDetails?.buttonInputs?.length < 3 && (
                  <button
                    onClick={() =>
                      duplicateButtonSet(
                        formDetails.buttonInputs[
                          formDetails.buttonInputs.length - 1
                        ].id,
                      )
                    }
                    className="text-sm text-blue-600 font-bold flex items-center gap-1 mt-4"
                  >
                    + Add more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="md:col-span-1 col-span-3 md:mt-0 mt-5">
          <div className="w-full  overflow-scroll h-full pb-0 lg:pb-110 xl:pb-110 2xl:pb-20">
            <div className="mx-auto w-[280px]  lg:w-[280px] xl:w-[250px] 2xl:w-[340px] bg-black rounded-[3.5rem] p-2 shadow-2xl h-[600px]">
              {/* Inner Phone Screen */}
              <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative border-[2px] border-gray-800">
                {/* 1. Instagram Chat Background Layer */}
                <div
                  className="absolute inset-0 z-0 bg-repeat opacity-[0.2] pointer-events-none"
                  style={{
                    backgroundImage: "url(/instachatbg.webp)",
                    backgroundSize: "100%",
                  }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
                  <div className="w-10 h-1 bg-gray-800 rounded-full" />
                </div>

                {/* 2. Professional Header */}
                <div className="relative z-20 bg-white/90 backdrop-blur-md border-b px-5 pt-8 pb-3 flex items-center justify-between rounded-t-[44px]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FFD600] to-[#D300C5] p-[1.5px]">
                      <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img
                          src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
                          className="object-cover w-full h-full"
                          alt="profile"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      {/* <span className="text-sm font-bold text-gray-900 leading-tight">Juan Store</span> */}
                      <span className="text-sm font-bold text-gray-900 leading-tight">
                        {formDetails?.selectedInstaUser}
                      </span>
                      <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-gray-600">
                    <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
                    <FaVideo size={18} />
                  </div>
                </div>

                {/* 3. Interactive Chat Body */}
                <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                  {/* Top Info */}
                  <div className="text-[10px] text-gray-400 text-center my-2">
                    OCT 24, 9:41 AM
                  </div>
                  <div className="max-w-[85%] animate-in slide-in-from-bottom-4 duration-500">
                    {formDetails.selectedOption === "generic" ? (
                      /* GENERIC CARD PREVIEW */
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 flex flex-col">
                        <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {preview ? (
                            <img
                              src={preview}
                              className="w-full h-full object-cover"
                              alt="Preview"
                            />
                          ) : (
                            <IoImageOutline
                              size={40}
                              className="text-gray-300"
                            />
                          )}
                        </div>

                        {/* TEXT AREA WITH PROPER WRAPPING */}
                        <div className="p-3 flex flex-col gap-1">
                          <h4 className="font-bold text-sm text-gray-800 break-words leading-tight">
                            {formDetails.title || "Headline Title"}
                          </h4>
                          <p className="text-[11px] text-gray-500 break-words leading-normal">
                            {formDetails.subtitle ||
                              "Supporting description text goes here..."}
                          </p>
                        </div>

                        {/* BUTTONS AREA */}
                        <div className="border-t flex flex-col">
                          {formDetails.buttonSets.map((b) => (
                            <div
                              key={b.id}
                              className="py-2.5 px-2 text-center text-blue-500 text-xs font-bold border-b last:border-b-0 active:bg-gray-50 cursor-default truncate"
                              title={b.text}
                            >
                              {b.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* BUTTON MESSAGE PREVIEW */
                      <div className="space-y-2 flex flex-col items-start">
                        {/* TEXT BUBBLE WITH WRAP */}
                        <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none text-sm shadow-sm border border-gray-200 w-full break-words whitespace-pre-wrap">
                          {formDetails.text || "Your message text here..."}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col gap-1 w-full">
                          {formDetails.buttonSets.map((b) => (
                            <div
                              key={b.id}
                              className="bg-white border border-gray-200 py-2 px-3 rounded-xl text-center text-blue-500 text-xs font-bold shadow-sm active:scale-95 transition-transform truncate"
                            >
                              {b.text || "Button"}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Bottom Input Area */}
                <div className="relative z-10 p-4 bg-white border-t">
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-3">
                    <FaRegFaceSmile className="text-gray-400" />
                    {/* <PhotoCameraIcon sx={{ fontSize: 20, color: '#3797F0' }} /> */}
                    <span className="text-gray-400 text-[13px] flex-1">
                      Message...
                    </span>
                    <LuMic className="text-gray-400" />
                    <IoImageOutline className="text-gray-400" />
                  </div>
                  {/* iPhone Indicator */}
                  <div className="w-28 h-1 bg-black rounded-full mx-auto mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-max-content flex items-center justify-center">
        <UniversalInstaButton
          label="Create Template"
          onClick={handleCreateInstaTemplate}
        />
      </div>
    </>
  );
};

const TemplateLibraryComponent = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [templateList, setTemplateList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [templateJson, setTemplateJson] = useState({
    isShow: false,
  });

  async function getUserList() {
    try {
      const users = await instaUserList();

      if (users?.statusCode !== 200) {
        return toast.error(users?.message || "Something went wrong");
      }
      setUserList(users?.data);
    } catch (e) {
      toast.error("Something Went Wrong");
    }
  }

  async function getUserTemplateList(templateName = null) {
    const data = {
      templateType: selectedTemplate?.templateType || "all",
      templateName: selectedTemplate?.templateName || "all",
      instaBusinessUserId: selectedUser || "all",
      status: selectedTemplate?.templateStatus || "all",
      isHide: selectedTemplate?.isHide || -1,
    };
    try {
      const template = await getInstaTemplateList(data);

      if (template?.statusCode !== 200) {
        return toast.error(template?.message || "Something went wrong");
      }
      setTemplateList(template?.data);
    } catch (e) {
      toast.error("Something Went Wrong");
    }
  }
  useEffect(() => {
    getUserList();
    getUserTemplateList();
  }, []);

  //   useEffect(() => {
  //     if (!selectedUser) {
  //       setTemplateList([]);
  //     }
  //     getUserTemplateList();
  //   }, [selectedUser]);

  async function handleSearch() {
    if (!selectedUser) {
      setTemplateList([]);
    }
    getUserTemplateList();
  }

  async function handleUpdateStatus(srno, isHide) {
    if (!srno) return;
    try {
      const data = {
        srno: srno,
        isHide: Number(!isHide),
      };

      const res = await instaUpdateTempStatus(data);

      if (res?.statusCode !== 200) {
        return toast.error(res?.message || "Something went wrong");
      }
      toast.success(res?.message || "Status Updated Successfully");
      await getUserTemplateList();
    } catch (e) {
      toast.error("Something Went Wrong");
    }
  }

  async function handleView(srno) {
    if (!srno) return;
    try {
      const res = await instaGetTempJson(srno);
      if (res?.statusCode !== 200) {
        return toast.error(res?.message || "Something went wrong");
      }

      const parsedJson = JSON.parse(res?.data?.requestJson);
      const template_type =
        parsedJson?.message?.attachment?.payload?.template_type;
      let json = {};
      if (template_type == "generic") {
        json = parsedJson?.message?.attachment?.payload?.elements[0];
      } else {
        json = parsedJson?.message;
      }
      setTemplateJson({
        isShow: true,
        ...res?.data,
        requestJson: json,
        template_type,
      });
    } catch (e) {
      toast.error("Something Went Wrong");
    }
  }

  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "template_name",
      headerName: "Template Name",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "template_type",
      headerName: "Template Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "insert_time",
      headerName: "Created At",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "is_hide",
      headerName: "Active",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip value={"Active"}>
            <Switch
              checked={params.row.is_hide}
              onChange={(e) => {
                handleUpdateStatus(params.row.srno, params.row.is_hide);
              }}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#34C759",
                },
                "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                {
                  backgroundColor: "#34C759",
                },
              }}
            />
          </CustomTooltip>
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View Template" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleView(params.row.srno)}
            >
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];
  const rows = Array.isArray(templateList)
    ? templateList?.map((item, index) => ({
      ...item,
      sn: index + 1,
      id: index + 1,
    }))
    : [];

  return (
    <div className="space-y-5 p-4">
      <div className="flex gap-5 items-end flex-wrap">
        <div className="w-full sm:w-56">
          <DropdownWithSearch
            id="userList"
            name="userList"
            value={selectedUser}
            onChange={setSelectedUser}
            label="Select Insta account"
            tooltipContent="Select an option..."
            tooltipPlacement="top"
            placeholder="Select an option..."
            options={userList?.map((user) => ({
              value: user?.businessInstaUserId,
              label: user?.userName,
            }))}
          />
        </div>
        <div className="w-full sm:w-56">
          <InputField
            id="templateName"
            name="templateName"
            label="Template Name"
            placeholder="Template Name"
            value={selectedTemplate?.templateName}
            onChange={(e) =>
              setSelectedTemplate({
                ...selectedTemplate,
                templateName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full sm:w-56">
          <DropdownWithSearch
            id="templateType"
            name="templateType"
            value={selectedTemplate?.templateType}
            onChange={(e) =>
              setSelectedTemplate({
                ...selectedTemplate,
                templateType: e,
              })
            }
            label="Select Template Type"
            tooltipContent="Select an option..."
            tooltipPlacement="top"
            placeholder="Select an option..."
            options={[
              {
                value: "BUTTON",
                label: "BUTTON",
              },
              {
                value: "GENERIC",
                label: "GENERIC",
              },
            ]}
          />
        </div>
        <div className="w-full sm:w-56">
          <DropdownWithSearch
            id="isHide"
            name="isHide"
            value={selectedTemplate?.isHide}
            onChange={(e) =>
              setSelectedTemplate({
                ...selectedTemplate,
                isHide: e,
              })
            }
            label="Select Active Status"
            tooltipContent="Select an option..."
            tooltipPlacement="top"
            placeholder="Select an option..."
            options={[
              {
                value: 1,
                label: "Active",
              },
              {
                value: 0,
                label: "Inactive",
              },
            ]}
          />
        </div>

        <div className="w-full sm:w-56">
          <DropdownWithSearch
            id="templateStatus"
            name="templateStatus"
            value={selectedTemplate?.templateStatus}
            onChange={(e) =>
              setSelectedTemplate({
                ...selectedTemplate,
                templateStatus: e,
              })
            }
            label="Select Template Status"
            tooltipContent="Select an option..."
            tooltipPlacement="top"
            placeholder="Select an option..."
            options={[
              {
                value: "approved",
                label: "Approved",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "rejected",
                label: "Rejected",
              },
            ]}
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            id="search"
            onClick={handleSearch}
            label={"Search"}
          />
        </div>
      </div>
      <div>
        <DataTable
          id="templateList"
          name="templateList"
          col={cols}
          rows={rows}
          getRowHeight={null}
        />
      </div>

      <Dialog
        header={`${templateJson?.templateName} (${templateJson?.template_type})`}
        visible={templateJson.isShow}
        style={{ width: "35rem" }}
        onHide={() => {
          setTemplateJson({ isShow: false });
        }}
        draggable={false}
      >
        <div>
          {templateJson.template_type == "generic" ? (
            <div className="border border-gray-100 p-2 bg-gray-300 rounded-xl shadow-xl">
              {templateJson?.requestJson?.image_url && (
                <img
                  src={templateJson?.requestJson?.image_url}
                  alt={templateJson?.requestJson?.title}
                  className="rounded-t-lg"
                />
              )}
              <div className="bg-gray-200 p-2 rounded-b-lg">
                <div className="font-semibold text-black mt-2 ml-3"> {templateJson?.requestJson?.title}</div>

                <div className="font-normal text-gray-400 text-xs ml-3">{templateJson?.requestJson?.subtitle}</div>

                <div className="flex flex-col gap-1 w-full my-2">
                  {templateJson?.requestJson?.buttons?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white py-2 px-3 rounded-xl text-center text-gray-800 text-xs font-bold active:scale-95 transition-transform truncate"
                    >
                      {item?.title || "Button"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-100 p-2 bg-gray-300 rounded-xl shadow-xl">
              <div className="space-y-2 flex flex-col items-start">
                {/* TEXT BUBBLE WITH WRAP */}
                <div className="p-3 rounded-2xl text-sm w-full break-words whitespace-pre-wrap">
                  {templateJson?.requestJson?.text}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-1 w-full">
                  {templateJson?.requestJson?.quick_replies?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-white py-2 px-3 rounded-xl text-center text-gray-800 text-xs font-bold active:scale-95 transition-transform truncate"
                      >
                        {item?.title || "Button"}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ManageInstaTemplates;
