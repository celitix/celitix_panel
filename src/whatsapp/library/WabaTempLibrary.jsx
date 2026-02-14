import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

// ==========================ICONS=========================================
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LinkIcon from "@mui/icons-material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedRtlSharpIcon from "@mui/icons-material/FormatListNumberedRtlSharp";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import TimerSharpIcon from "@mui/icons-material/TimerSharp";

// ============================API CALLS===================================
import {
  getWhatsappLibrary,
  deleteWhatsappLibrary,
  addUpdateWhatsappLibrary,
  getTemplateList,
  uploadImageFile,
} from "@/apis/whatsapp/whatsapp";

// ============================COMPONENTS===================================
import DropdownWithSearch from "../components/DropdownWithSearch";
import InputField from "../components/InputField";
import UniversalTextArea from "../components/UniversalTextArea";
import UniversalButton from "../components/UniversalButton";
import CustomEmojiPicker from "../components/CustomEmojiPicker";

const industryData = {
  ecommerce: [
    { label: "Order Confirmation", value: "order_conf" },
    { label: "Shipping Update", value: "ship_update" },
    { label: "Abandoned Cart", value: "abandoned_cart" },
    { label: "Flash Sale", value: "flash_sale" },
    { label: "Product Catalog", value: "catalog" },
    { label: "In-Stock Alert", value: "stock_alert" },
    { label: "Invoice/Billing", value: "billing" },
    { label: "Customer Review", value: "review_req" },
    { label: "Welcome Discount", value: "welcome_offer" },
    { label: "Return/Refund", value: "return_update" },
  ],
  real_estate: [
    { label: "New Listing", value: "new_listing" },
    { label: "Site Visit Invite", value: "site_visit" },
    { label: "Property Brochure", value: "brochure" },
    { label: "Price Drop Alert", value: "price_drop" },
    { label: "Follow-up", value: "follow_up" },
    { label: "Meeting Reminder", value: "meeting" },
    { label: "Project Walkthrough", value: "walkthrough" },
    { label: "Document Request", value: "doc_req" },
    { label: "Virtual Tour", value: "virtual_tour" },
    { label: "Possession Update", value: "possession" },
  ],
  education: [
    { label: "Enrollment Info", value: "enrollment" },
    { label: "Course Schedule", value: "schedule" },
    { label: "Exam Results", value: "results" },
    { label: "Webinar Link", value: "webinar" },
    { label: "Fee Reminder", value: "fee_rem" },
    { label: "Student Support", value: "support" },
    { label: "Assignment Due", value: "assignment" },
    { label: "Holiday Notice", value: "holiday" },
    { label: "Certificate Link", value: "certificate" },
    { label: "New Course Launch", value: "new_launch" },
  ],
  healthcare: [
    { label: "Appt Confirmation", value: "appt_conf" },
    { label: "Lab Reports", value: "reports" },
    { label: "Prescription Refill", value: "refill" },
    { label: "Health Tips", value: "health_tips" },
    { label: "Follow-up Checkup", value: "follow_up" },
    { label: "Vaccination Alert", value: "vax_alert" },
    { label: "Billing/Insurance", value: "insurance" },
    { label: "Clinic News", value: "news" },
    { label: "Emergency Alert", value: "emergency" },
    { label: "Symptom Survey", value: "survey" },
  ],
  finance: [
    { label: "Transaction Alert", value: "transaction" },
    { label: "OTP Authentication", value: "otp" },
    { label: "Statement Ready", value: "statement" },
    { label: "Loan Status", value: "loan_status" },
    { label: "Payment Due", value: "payment_due" },
    { label: "Policy Renewal", value: "renewal" },
    { label: "Investment Tip", value: "invest_tip" },
    { label: "Kyc Update", value: "kyc" },
    { label: "Credit Card Offer", value: "card_offer" },
    { label: "Fraud Alert", value: "fraud_alert" },
  ],
  travel: [
    { label: "Booking Confirmed", value: "booking_conf" },
    { label: "Check-in Reminder", value: "check_in" },
    { label: "Flight Update", value: "flight_update" },
    { label: "Hotel Voucher", value: "voucher" },
    { label: "Tour Itinerary", value: "itinerary" },
    { label: "Local Guide", value: "guide" },
    { label: "Travel Insurance", value: "insurance" },
    { label: "Feedback/Review", value: "feedback" },
    { label: "Loyalty Points", value: "points" },
    { label: "Cancellation", value: "cancel" },
  ],
  logistics: [
    { label: "Out for Delivery", value: "out_delivery" },
    { label: "Package Picked", value: "picked" },
    { label: "Delayed Shipment", value: "delayed" },
    { label: "Delivered", value: "delivered" },
    { label: "Proof of Delivery", value: "pod" },
    { label: "Route Update", value: "route" },
    { label: "COD Reminder", value: "cod" },
    { label: "Warehouse Arrival", value: "arrival" },
    { label: "Return Pickup", value: "ret_pickup" },
    { label: "Support Contact", value: "contact" },
  ],
  hospitality: [
    { label: "Table Booking", value: "table_book" },
    { label: "Menu of the Day", value: "menu" },
    { label: "Event Promo", value: "event" },
    { label: "Loyalty Reward", value: "reward" },
    { label: "Feedback Request", value: "feedback" },
    { label: "Check-out Survey", value: "survey" },
    { label: "Special Discount", value: "discount" },
    { label: "Room Upgrade", value: "upgrade" },
    { label: "Concierge Msg", value: "concierge" },
    { label: "Direct Booking", value: "direct" },
  ],
  saas: [
    { label: "Trial Welcome", value: "trial" },
    { label: "Feature Update", value: "feature" },
    { label: "System Status", value: "status" },
    { label: "Renewal Notice", value: "renewal" },
    { label: "API Key Generated", value: "api_key" },
    { label: "Usage Report", value: "report" },
    { label: "Billing Invoice", value: "invoice" },
    { label: "Onboarding Video", value: "video_guide" },
    { label: "Webinar Invite", value: "webinar" },
    { label: "Meeting Link", value: "meeting" },
  ],
  automobile: [
    { label: "Service Reminder", value: "service_rem" },
    { label: "Test Drive Booked", value: "test_drive" },
    { label: "New Model Launch", value: "launch" },
    { label: "Maintenance Tips", value: "tips" },
    { label: "Recall Notice", value: "recall" },
    { label: "Parts Availability", value: "parts" },
    { label: "Insurance Expiry", value: "ins_exp" },
    { label: "Warranty Update", value: "warranty" },
    { label: "Roadside Assist", value: "assist" },
    { label: "Trade-in Value", value: "trade_in" },
  ],
};

// Fixed list of Industries for the first dropdown
const industryOptions = [
  { label: "E-commerce", value: "ecommerce" },
  { label: "Real Estate", value: "real_estate" },
  { label: "Education", value: "education" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Travel", value: "travel" },
  { label: "Logistics", value: "logistics" },
  { label: "Hospitality", value: "hospitality" },
  { label: "SaaS", value: "saas" },
  { label: "Automobile", value: "automobile" },
];

const WabaTempLibrary = () => {
  const [templateList, setTemplateList] = useState([]);
  const [editTemplate, setEditTemplate] = useState(null);
  const [deleteTemplate, setDeleteTemplate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [templateType, setTemplateType] = useState("");

  const [addTemplate, setAddTemplate] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateBody, setTemplateBody] = useState("");
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [addWhatsappLibrary, setAddWhatsappLibrary] = useState("");
  const [storeSrno, setStoreSrno] = useState(0);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [headerMedia, setHeaderMedia] = useState(null);
  const [carouselMedia, setCarouselMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [templateText, setTemplateText] = useState("");
  const [tempJsonBody, setTempJsonBody] = useState("");
  const [tempFooter, setTempFooter] = useState("");
  const [buttons, setButtons] = useState([]);
  const [carouselType, setCarouselType] = useState("");
  const [carouselCards, setCarouselCards] = useState([]);
  const [exampleValues, setExampleValues] = useState([]);
  const [params, setParams] = useState([]);
  const [showVarInput, setShowVarInput] = useState(false);
  const [varValue, setVarValue] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [isEnabled, setIsEnabled] = React.useState(true);

  function toggleValue() {
    setIsEnabled((prev) => !prev);
  }

  const mediaRef = useRef(null);
  const textRef = useRef(null);
  const carouselRefs = useRef([]);
  const carouselContainerRef = useRef(null);

  const categoryOptions = industryData[industry] || [];

  

  const urlButtons = buttons.filter((b) => b.type === "url");
  const phoneButtons = buttons.filter((b) => b.type === "phone_number");
  const quickReplyButtons = buttons.filter((b) => b.type === "quick_reply");
  const copycodeButtons = buttons.filter((b) => b.type === "copy_code");

  // =============================================================EDIT TEMPLATE FUNCTION=======================================================
  useEffect(() => {
    if (!editTemplate) return;

    setTemplateTitle(editTemplate.template_title);
    setTemplateBody(editTemplate.template_body);
    setCategory(editTemplate.category);
    setIndustry(editTemplate.industry);
    setTemplateType(editTemplate.templateType);
    setTempFooter(editTemplate.tempFooter);
    setTempJsonBody(editTemplate.tempJsonBody);
    setTemplateText(editTemplate.templateText);
    setSelectedFiles(editTemplate.selectedFiles);
  }, [editTemplate]);

  // ===============================================================RESET TEMPLATE FORM========================================================
  const resetForm = () => {
    setTemplateTitle("");
    setTemplateBody("");
    setCategory("");
    setIndustry("");
    setEditTemplate(null);
    setTempFooter("");
    setTempJsonBody("");
    setTemplateText("");
    setSelectedFiles("");
    setTemplateType("");
    setVarValue("");
  };

  // ===============================================================STARTS HERE FUNCTIONS FOR CAROUSEL====================================================
  const scrollLeft = () => {
    carouselContainerRef.current.scrollBy({
      left: -390,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselContainerRef.current.scrollBy({
      left: 390,
      behavior: "smooth",
    });
  };

  const addCarouselCard = () => {
    if (carouselCards.length >= 10) {
      toast.error("Maximum 10 cards allowed");
      return;
    }

    setCarouselCards((prev) => [
      ...prev,
      {
        media: null,
        buttons: [],
      },
    ]);
  };

  const uploadCardMedia = async (index) => {
    const card = carouselCards[index];
    if (!card.file) return;

    const type = getMediaType(card.file);
    const res = await uploadImageFile(card.file, 1);

    console.log("UPLOAD INDEX:", index);
    console.log("BEFORE:", carouselCards[index]);

    setCarouselCards((prev) =>
      prev.map((c, i) =>
        i === index
          ? {
              ...c,
              media: {
                type,
                link: res.fileUrl,
                handleId: res.handlerid,
              },
            }
          : c,
      ),
    );

    toast.success("Uploaded successfully");
  };

  const addButtonToCard = (cardIndex, type) => {
    setCarouselCards((prev) => {
      const copy = [...prev];
      const card = copy[cardIndex];

      const buttons = card.buttons || [];

      // ----- validation per card -----
      const urlCount = buttons.filter((b) => b.type === "url").length;
      const phoneCount = buttons.filter(
        (b) => b.type === "phone_number",
      ).length;
      const quickCount = buttons.filter((b) => b.type === "quick_reply").length;

      if (type === "url" && urlCount >= 3) {
        toast.error("Maximum 3 URL buttons allowed per card");
        return prev;
      }

      if (type === "phone_number" && phoneCount >= 1) {
        toast.error("Only 1 phone button allowed per card");
        return prev;
      }

      if (type === "quick_reply" && quickCount >= 5) {
        toast.error("Maximum 5 quick reply buttons allowed per card");
        return prev;
      }

      // ----- create new button -----
      let newButton;
      if (type === "url") {
        newButton = { type: "url", text: "", url: "" };
      } else if (type === "phone_number") {
        newButton = { type: "phone_number", text: "", phone_number: "" };
      } else {
        newButton = { type: "quick_reply", text: "" };
      }

      // ----- immutable update -----
      copy[cardIndex] = {
        ...card,
        buttons: [...buttons, newButton],
      };

      return copy;
    });
  };

  const updateCardButton = (cardIndex, buttonIndex, key, value) => {
    setCarouselCards((prev) => {
      const copy = [...prev];
      const card = copy[cardIndex];

      const newButtons = card.buttons.map((b, i) =>
        i === buttonIndex ? { ...b, [key]: value } : b,
      );

      copy[cardIndex] = { ...card, buttons: newButtons };
      return copy;
    });
  };

  const removeButtonFromCard = (cardIndex, buttonIndex) => {
    setCarouselCards((prev) => {
      const copy = [...prev];
      const card = copy[cardIndex];

      copy[cardIndex] = {
        ...card,
        buttons: card.buttons.filter((_, i) => i !== buttonIndex),
      };

      return copy;
    });
  };

  useEffect(() => {
    if (
      (carouselType === "image" || carouselType === "video") &&
      carouselCards.length === 0
    ) {
      setCarouselCards([
        {
          media: null,
          buttons: [],
        },
      ]);
    }
  }, [carouselType]);
  // ===============================================================ENDS HERE FUNCTIONS FOR CAROUSEL====================================================

  // =============================================================== STARTS HERE FUNCTIONS FOR GLOBAL ACTION BUTTON======================================
  const addButton = (type) => {
    setButtons((prev) => {
      // ----- validation only -----
      const urlCount = prev.filter((b) => b.type === "url").length;
      const phoneCount = prev.filter((b) => b.type === "phone_number").length;
      const quickCount = prev.filter((b) => b.type === "quick_reply").length;
      const copycode = prev.filter((b) => b.type === "copy_code");

      if (type === "url" && urlCount >= 3) {
        toast.error("Maximum 3 URL buttons allowed");
        return prev;
      }

      if (type === "phone_number" && phoneCount >= 1) {
        toast.error("Only 1 phone button allowed");
        return prev;
      }

      if (type === "quick_reply" && quickCount >= 5) {
        toast.error("Maximum 5 quick reply buttons allowed");
        return prev;
      }

      if (type === "url") {
        return [...prev, { type: "url", text: "", url: "" }];
      }

      if (type === "phone_number") {
        return [...prev, { type: "phone_number", text: "", phone_number: "" }];
      }

      if (type === "quick_reply") {
        return [...prev, { type: "quick_reply", text: "" }];
      }

      if (type === "copy_code") {
        return [...prev, { type: "copy_code", text: "" }];
      }

      return prev;
    });
  };

  const updateButton = (index, key, value) => {
    setButtons((prev) =>
      prev.map((btn, i) => (i === index ? { ...btn, [key]: value } : btn)),
    );
  };

  const removeButton = (index) => {
    setButtons((prev) => prev.filter((_, i) => i !== index));
  };

  const VALID_URL_VAR_REGEX = /(?<!\{){{\d+}}(?!\})/g;

  const normalizeSingleUrlVariable = (text) => {
    const regex = VALID_URL_VAR_REGEX;
    const matches = text.match(regex) || [];

    if (matches.length <= 1) return text;

    let result = text;
    for (let i = 1; i < matches.length; i++) {
      result = result.replace(matches[i], "");
    }

    result = result.replace(matches[0], "{{1}}");

    return result;
  };

  const validateButtonsBeforeSave = () => {
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];

      if (btn.type === "url") {
        const hasVar = VALID_URL_VAR_REGEX.test(btn.url);

        if (hasVar && !btn.urlVarValue?.trim()) {
          toast.error(`Please fill URL variable value for button ${i + 1}`);
          return false;
        }
      }
    }

    return true;
  };

  const addUrlVariable = (index) => {
    const btn = buttons[index];

    if (VALID_URL_VAR_REGEX.test(btn.url)) {
      toast.error("Only one variable is allowed in URL");
      return;
    }

    let newUrl = btn.url || "";

    newUrl = newUrl + "{{1}}";

    updateButton(index, "url", newUrl);
  };

  const deleteUrlVariable = (index) => {
    const currentUrl = buttons[index].url || "";

    const cleanedUrl = currentUrl.replace(VALID_URL_VAR_REGEX, "").trim();

    updateButton(index, "url", cleanedUrl);
    updateButton(index, "urlVarValue", "");
  };

  // =============================================================== STARTS HERE FUNCTIONS FOR GLOBAL ACTION BUTTON================================================

  // ===================================================================FETCH TEMPLATE LIST FUNCTION==============================================
  useEffect(() => {
    const fetchTemplateList = async () => {
      try {
        const res = await getTemplateList();
        setTemplateList(Array.isArray(res) ? res : []);
        console.log("Template List: ", res);
      } catch (err) {
        console.log(err, "Template List not fetched!");
        setTemplateList([]);
      }
    };
    fetchTemplateList();
  }, []);

  // ========================================CAROUSEL TEMPLATE JSON============================================================
  const buildCarouselTemplate = () => ({
    type: "carousel",
    cards: carouselCards.map((card) => ({
      components: [
        {
          type: "header",
          format: card.media.type,
          example: {
            header_handle: [card.media.handleId],
          },
        },
        ...(card.buttons.length
          ? [
              {
                type: "buttons",
                buttons: card.buttons,
              },
            ]
          : []),
      ],
    })),
  });

  // ====================================================SAVE HANDLER FUNCTION================================================
  const validateBeforeSave = () => {
    if (!tempJsonBody?.trim()) {
      toast.error("Body text cannot be empty");
      return false;
    }

    //  Buttons validation
    if (buttons?.length) {
      for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];

        if (!btn.text?.trim()) {
          toast.error(`Button ${i + 1} text is required`);
          return false;
        }

        if (btn.type === "url" && !btn.url?.trim()) {
          toast.error(`Button ${i + 1} URL is required`);
          return false;
        }

        if (btn.type === "phone_number" && !btn.phone_number?.trim()) {
          toast.error(`Button ${i + 1} phone number is required`);
          return false;
        }
      }
    }

    return true;
  };

  const headerComponent = templateType &&
    templateType !== "none" &&
    templateText?.trim() && {
      type: "header",
      format: templateType.toUpperCase(),

      ...(templateType === "text" && {
        text: templateText,

        ...(varValue?.trim() && {
          example: {
            header_text: [varValue],
          },
        }),
      }),

      ...(templateType !== "text" &&
        headerMedia?.handleId && {
          example: {
            header_handle: [headerMedia.handleId],
          },
        }),
    };

  const handleSave = async () => {
    try {
      if (!validateBeforeSave()) return;
      if (!validateVariablesBeforeSubmit()) return;
      if (!validateHeaderBeforeSave()) return;
      if (!validateButtonsBeforeSave()) return;

      const payload = {
        srNo: editTemplate ? editTemplate.sr_no : storeSrno,
        category,
        industry,
        templateTitle,
        templateBody,
        templateJson:
          templateType === "carousel"
            ? buildCarouselTemplate()
            : {
                recipient_type: "individual",
                messaging_product: "whatsapp",
                template: {
                  name: "welcome_discount_template",
                  language: "en_US",
                  category: "marketing",
                  parameter_format: "named",
                  components: [
                    ...(headerComponent ? [headerComponent] : []),

                    {
                      type: "limited_time_offer",
                      limited_time_offer: {
                        text: offerDetails,
                        has_expiration: isEnabled,
                      },
                    },

                    {
                      type: "body",
                      text: latestTemplate,
                      ...(filteredBodyParams.length > 0 && {
                        example: {
                          body_text_named_params: filteredBodyParams,
                        },
                      }),
                    },

                    ...(tempFooter?.trim()
                      ? [
                          {
                            type: "footer",
                            text: tempFooter,
                          },
                        ]
                      : []),

                    ...(buttons?.length
                      ? [
                          {
                            type: "buttons",
                            buttons: buttons
                              .map((btn) => {
                                if (btn.type === "url") {
                                  const hasVar = /{{\d+}}/.test(btn.url);

                                  return {
                                    type: "url",
                                    text: btn.text,
                                    url: btn.url,
                                    ...(hasVar &&
                                      btn.urlVarValue?.trim() && {
                                        example: [btn.urlVarValue],
                                      }),
                                  };
                                }

                                if (btn.type === "phone_number") {
                                  return {
                                    type: "phone_number",
                                    text: btn.text,
                                    phone_number: btn.phone_number,
                                  };
                                }
                                if (btn.type === "quick_reply") {
                                  return {
                                    type: "quick_reply",
                                    text: btn.text,
                                  };
                                }

                                if (btn.type === "copy_code") {
                                  return {
                                    type: "copy_code",
                                    text: btn.text,
                                  };
                                }
                                return null;
                              })
                              .filter(Boolean),
                          },
                        ]
                      : []),
                  ],
                },
              },
      };

      console.log("Payload:", payload);
      return;
      const res = await addUpdateWhatsappLibrary(payload);

      console.log("API Response:", res);

      if (res.success) {
        toast.success(
          editTemplate
            ? "Template updated successfully!"
            : "Template added successfully!",
        );
        await getTemplateList();
        setAddTemplate(false);
      } else {
        toast.error(res.message || "Failed to save template");
        return;
      }
    } catch (error) {
      console.error("Save API error:", error);
      toast.error(error.message || "Failed to save template");
    }
  };

  // =======================================DELETE HANDLER FUNCTION=============================================================
  const handleConfirmDelete = async () => {
    if (!selectedTemplate) return;

    try {
      await deleteWhatsappLibrary(selectedTemplate.sr_no);

      setTemplateList((prev) =>
        prev.filter((t) => t.sr_no !== selectedTemplate.sr_no),
      );

      toast.success("Template deleted successfully");
      await getTemplateList();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete template");
    } finally {
      setDeleteDialog(false);
      setSelectedTemplate(null);
    }
  };

  // =====================================FILE HANDLER Function================================================================
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setSelectedFiles(files);
  };

  const getMediaType = (file) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "document";
  };

  // =====================================UPLOADIMAGE HANDLER FUNCTION==========================================================
  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true);

      // ===== CAROUSEL =====
      if (templateType === "carousel") {
        const uploaded = [];

        for (const file of selectedFiles) {
          const type = getMediaType(file);
          const res = await uploadImageFile(file, 1);

          if (!res?.status || !res?.fileUrl) {
            throw new Error(res?.msg || "Upload failed");
          }

          setCarouselMedia((prev) => [
            ...prev,
            {
              type,
              link: res.fileUrl,
              handleId: res.handlerid,
            },
          ]);
        }

        toast.success("Carousel uploaded successfully");
        return;
      }

      // ===== SINGLE MEDIA =====
      const file = selectedFiles[0];
      const type = getMediaType(file);
      const res = await uploadImageFile(file, 1);

      if (!res?.status || !res?.fileUrl) {
        throw new Error(res?.msg || "Upload failed");
      }

      setHeaderMedia({
        type,
        link: res.fileUrl,
        handleId: res.handlerid,
      });

      toast.success(`${type} uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ============================================REMOVE MEDIA===================================================================
  const handleRemoveMedia = () => {
    setSelectedFiles([]);
    setHeaderMedia(null);

    if (mediaRef.current) {
      mediaRef.current.value = "";
    }
  };

  // ===========================================TEXT MESSAGE EMOJI FUNCTION===================================================

  const getCharCount = (text) => [...text].length;

  const caretRef = useRef(0);

  const handleEmojiSelectinput = (
    setState,
    emoji,
    inputRef,
    maxLength = 60,
  ) => {
    if (!inputRef?.current) return;

    const input = inputRef.current;
    const emojiChar = emoji;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const current = input.value;

    const newText = current.slice(0, start) + emojiChar + current.slice(end);

    if (getCharCount(newText) > maxLength) {
      toast.error("You reached the limit!");
      return;
    }
    setState(newText);

    requestAnimationFrame(() => {
      const caret = start + emojiChar.length;
      input.focus();
      input.setSelectionRange(caret, caret);
    });
  };

  const normalizeSingleVariable = (text) => {
    const regex = /(?<!\{){{\d+}}(?!\})/g;
    const matches = text.match(regex) || [];

    if (matches.length <= 1) return text;

    let result = text;
    for (let i = 1; i < matches.length; i++) {
      result = result.replace(matches[i], "");
    }

    result = result.replace(matches[0], "{{1}}");

    return result;
  };

  const addVariable = (setState, inputRef) => {
    if (!inputRef?.current) return;

    const input = inputRef.current;
    let current = input.value;

    current = normalizeSingleVariable(current);

    if (/(?<!\{){{\d+}}(?!\})/g.test(current)) {
      setShowVarInput(true);
      setState(current);
      return;
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const variable = "{{1}}";
    const newText = current.slice(0, start) + variable + current.slice(end);

    setState(newText);
    setShowVarInput(true);

    requestAnimationFrame(() => {
      const caret = start + variable.length;
      input.focus();
      input.setSelectionRange(caret, caret);
    });
  };

  const validateHeaderBeforeSave = () => {
    const hasVariable = /(?<!\{){{\d+}}(?!\})/g.test(templateText);

    if (
      templateType === "text" &&
      hasVariable &&
      (!varValue || varValue.trim() === "")
    ) {
      toast.error("Please fill the variable value or remove the variable");
      return false;
    }

    return true;
  };

  const deleteVariable = () => {
    setTemplateText((prev) => prev.replace(/(?<!\{){{\d+}}(?!\})/g, "").trim());

    setVarValue("");

    setShowVarInput(false);
  };

  // ========================================================PREVIEW COMPONENET==================================================
  const renderTemplateFields = () => {
    switch (templateType) {
      case "text":
        return (
          <>
            <div className="relative">
              <InputField
                label="Text Message"
                placeholder="Enter text message"
                value={templateText}
                onChange={(e) => {
                  let val = e.target.value;

                  val = normalizeSingleVariable(val);

                  if (getCharCount(val) <= 60) {
                    setTemplateText(val);
                  } else {
                    toast.error("Max 60 characters allowed");
                  }
                }}
                onSelect={(e) => {
                  caretRef.current = e.target.selectionStart;
                }}
                onClick={(e) => {
                  caretRef.current = e.target.selectionStart;
                }}
                onKeyUp={(e) => {
                  caretRef.current = e.target.selectionStart;
                }}
                ref={textRef}
                maxLength={60}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addVariable(setTemplateText, textRef, `{{${varValue}}}`);
                    setShowVarInput(false);
                  }
                }}
              />
              <span className="text-xs text-gray-500">
                {getCharCount(templateText)} / 60
              </span>

              <div className="absolute top-6 right-0 flex mt-2 mr-2 space-x-2">
                <CustomEmojiPicker
                  onSelect={(emoji) => {
                    console.log("EMOJI:", emoji);
                    handleEmojiSelectinput(setTemplateText, emoji, textRef, 60);
                  }}
                />
              </div>
            </div>
            <UniversalButton
              label="Add Variable"
              onClick={() => {
                addVariable(setTemplateText, textRef);
                setShowVarInput(true);
              }}
            />

            {showVarInput && (
              <div className="mt-2 flex items-end gap-2">
                <div className="flex-1">
                  <InputField
                    type="text"
                    label="Example value "
                    placeholder="Enter value for {{1}}"
                    value={varValue}
                    onChange={(e) => setVarValue(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={deleteVariable}
                  className="text-red-500 text-sm mb-1 hover:text-red-700 bg-red-100 p-2 rounded-full"
                >
                  <CancelOutlinedIcon />
                </button>
              </div>
            )}
          </>
        );

      case "image":
      case "video":
      case "document":
        return (
          <div className="flex items-end gap-4 w-full">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => mediaRef.current?.click()}
            >
              <InputField
                label={templateType.toUpperCase()}
                placeholder={
                  selectedFiles.length
                    ? selectedFiles[0].name
                    : `Click to select ${templateType}`
                }
                readOnly
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              title="Delete file"
              onClick={handleRemoveMedia}
              className="p-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <CancelOutlinedIcon fontSize="small" />
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={handleUpload}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Upload file"
            >
              <UploadFileOutlinedIcon fontSize="small" />
            </button>

            <input
              ref={mediaRef}
              type="file"
              hidden
              accept={
                templateType === "image"
                  ? "image/*"
                  : templateType === "video"
                    ? "video/*"
                    : ".pdf,.doc,.docx"
              }
              onChange={handleFileSelect}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // ===========================================================MOBILE PREVIEW COMPONENT OF CAROUSEL================================================

  const CarouselPreview = ({ carouselCards }) => {
    const previewRef = useRef(null);

    const scrollLeft = () => {
      previewRef.current?.scrollBy({ left: -260, behavior: "smooth" });
    };

    const scrollRight = () => {
      previewRef.current?.scrollBy({ left: 260, behavior: "smooth" });
    };

    if (!carouselCards.length) {
      return <div className="text-center text-gray-400">No cards</div>;
    }

    return (
      <div>
        <div className="bg-white rounded-[30px] p-3">
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute -left-3 top-1/2 -translate-y-1/2 
                       bg-white shadow rounded-full h-7 w-7 z-10"
            >
              <KeyboardDoubleArrowLeftOutlinedIcon />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute -right-3 top-1/2 -translate-y-1/2 
                       bg-white shadow rounded-full h-7 w-7 z-10"
            >
              <KeyboardDoubleArrowRightOutlinedIcon />
            </button>

            {/* Track */}
            <div
              ref={previewRef}
              className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
            >
              {carouselCards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-[260px] snap-start bg-gray-100 rounded-xl overflow-hidden shadow"
                >
                  {/* Media */}
                  <div className="h-40 bg-black">
                    {card.media?.type === "image" && (
                      <img
                        src={card.media.link}
                        className="h-full w-full object-cover"
                      />
                    )}

                    {card.media?.type === "video" && (
                      <video
                        src={card.media.link}
                        controls
                        className="h-full w-full object-cover"
                      />
                    )}

                    {!card.media && (
                      <div className="h-full flex items-center justify-center text-white text-xs">
                        No media
                      </div>
                    )}
                  </div>

                  {/* Buttons Preview */}
                  <div className="p-3 space-y-2">
                    {card.buttons.length > 0 ? (
                      card.buttons.map((btn, i) => (
                        <div
                          key={i}
                          className="w-full text-center border rounded-lg py-1.5 text-sm bg-white"
                        >
                          {btn.text || "Button"}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-400 text-center">
                        No buttons
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =============================================================BODY TEMPLATE FUCTION ===================================================================
  const MAX_LENGTH = 1024;

  const addCurlyBracesVariable = () => {
    if (!validateVariablesBeforeSubmit()) return;

    let text = tempJsonBody || "";
    const matches = text.match(/(?<!\{){{\d+}}(?!\})/g) || [];
    const nextNumber = matches.length + 1;

    const variable = ` {{${nextNumber}}}`;
    const newText = text + variable;

    if (getCharCount(newText) > MAX_LENGTH) {
      toast.error("You reached the character limit!");
      return;
    }

    setTempJsonBody(newText);
  };

  const extractNumericParams = (text) => {
    const regex = /(?<!\{){{\d+}}(?!\})/g;
    const matches = text.match(regex) || [];
    return [...new Set(matches)].map((m) => m.replace(/[{}]/g, ""));
  };

  const latestTemplate = tempJsonBody || "";

  const bodyTextNamedParams = params.map((param, index) => ({
    param_name: param,
    example: exampleValues[index],
  }));

  const filteredBodyParams = bodyTextNamedParams.filter(
    (p) => p.example && p.example.trim() !== "",
  );

  useEffect(() => {
    setParams(extractNumericParams(tempJsonBody));
  }, [tempJsonBody]);

  const deleteExampleVariable = (indexToDelete) => {
    const regex = /(?<!\{){{\d+}}(?!\})/g;
    const matches = [...tempJsonBody.matchAll(regex)];

    if (!matches[indexToDelete]) return;

    const match = matches[indexToDelete];
    const start = match.index;
    const end = start + match[0].length;

    let newTemplate = tempJsonBody.slice(0, start) + tempJsonBody.slice(end);

    newTemplate = normalizeTemplateVariables(newTemplate.trim());

    setTempJsonBody(newTemplate);

    const newExamples = exampleValues.filter((_, i) => i !== indexToDelete);
    setExampleValues(newExamples);
  };

  const validateVariablesBeforeSubmit = () => {
    const regex = /(?<!\{){{\d+}}(?!\})/g;
    const matches = tempJsonBody.match(regex) || [];

    for (let i = 0; i < matches.length; i++) {
      if (!exampleValues[i] || exampleValues[i].trim() === "") {
        toast.error("Please fill the variable value or remove the variable");
        return false;
      }
    }

    return true;
  };

  const normalizeTemplateVariables = (text) => {
    const regex = /(?<!\{){{\d+}}(?!\})/g;
    let counter = 1;

    return text.replace(regex, () => `{{${counter++}}}`);
  };

  // =========================================================TEMPLATE BODY FORMATER FUNCTION=======================================================
  function addFormat(format) {
    const el = tempJsonBodyRef.current;
    if (!el) return;

    const input = tempJsonBody || "";
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;

    const selected = input.slice(start, end);
    const before = input.slice(0, start);
    const after = input.slice(end);

    const inlineMap = {
      bold: { open: "*", close: "*" },
      italic: { open: "_", close: "_" },
      strike: { open: "~", close: "~" },
    };

    /* ---------- INLINE FORMATS ---------- */
    if (format === "bold" || format === "italic" || format === "strike") {
      const open = inlineMap[format].open;
      const close = inlineMap[format].close;

      const newValue = before + open + selected + close + after;

      setTempJsonBody(newValue);

      requestAnimationFrame(() => {
        const pos =
          selected.length > 0
            ? end + open.length + close.length
            : start + open.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });

      return;
    }

    /* ---------- LIST FORMATS ---------- */
    const lines = selected.split(/\r?\n/);

    // BULLET LIST: - text OR * text
    if (format === "bullet") {
      const transformed = lines
        .map((line) => {
          if (!line.trim()) return line;
          return /^[-*]\s/.test(line) ? line : `- ${line}`;
        })
        .join("\n");

      const newValue = before + transformed + after;
      setTempJsonBody(newValue);

      requestAnimationFrame(() => {
        el.setSelectionRange(start, start + transformed.length);
        el.focus();
      });

      return;
    }

    // NUMBERED LIST: 1. text, 2. text
    if (format === "number") {
      let counter = 1;

      const transformed = lines
        .map((line) => {
          if (!line.trim()) return line;
          return /^\d+\.\s/.test(line) ? line : `${counter++}. ${line}`;
        })
        .join("\n");

      const newValue = before + transformed + after;
      setTempJsonBody(newValue);

      requestAnimationFrame(() => {
        el.setSelectionRange(start, start + transformed.length);
        el.focus();
      });
    }
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;

    const el = e.currentTarget;
    const value = tempJsonBody || "";
    const pos = el.selectionStart || 0;

    const before = value.slice(0, pos);
    const after = value.slice(pos);

    const lines = before.split("\n");
    const lastLine = lines[lines.length - 1];

    /* ---------- BULLET LIST ---------- */

    const bulletMatch = lastLine.match(/^([-*])\s*(.*)$/);

    if (bulletMatch) {
      e.preventDefault();

      const bulletChar = bulletMatch[1];
      const content = bulletMatch[2];

      //  Case 1: Empty bullet → EXIT list
      if (content.trim() === "") {
        // remove the empty bullet line
        lines.pop();
        const newBefore = lines.join("\n");

        const insert = "\n";
        setTempJsonBody(newBefore + insert + after);

        requestAnimationFrame(() => {
          const newPos = newBefore.length + insert.length;
          el.setSelectionRange(newPos, newPos);
          el.focus();
        });

        return;
      }

      //  Case 2: Normal bullet → CONTINUE list
      const insert = `\n${bulletChar} `;
      setTempJsonBody(before + insert + after);

      requestAnimationFrame(() => {
        const newPos = pos + insert.length;
        el.setSelectionRange(newPos, newPos);
        el.focus();
      });

      return;
    }

    /* ---------- NUMBERED LIST ---------- */
    const numberMatch = lastLine.match(/^(\d+)\.\s+/);
    if (numberMatch) {
      e.preventDefault();

      const next = Number(numberMatch[1]) + 1;
      const insert = `\n${next}. `;
      setTempJsonBody(before + insert + after);

      requestAnimationFrame(() => {
        const newPos = pos + insert.length;
        el.setSelectionRange(newPos, newPos);
        el.focus();
      });
    }
  }

  function formatPreview(text) {
    if (!text) return "";

    //  Escape HTML
    const escapeHtml = (str) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    //  Inline formatter
    const applyInline = (str) =>
      str
        .replace(/\*(\S[^*]*\S)\*/g, "<strong>$1</strong>")
        .replace(/_(\S[^_]*\S)_/g, "<em>$1</em>")
        .replace(/~(\S[^~]*\S)~/g, "<s>$1</s>");

    const lines = text.split("\n");

    let html = "";
    let inUl = false;
    let inOl = false;

    lines.forEach((rawLine) => {
      const line = escapeHtml(rawLine);

      /* ---------- BULLET LIST ---------- */
      if (/^([-*])\s+/.test(line)) {
        if (!inUl) {
          html += "<ul style='padding-left:18px'>";
          inUl = true;
        }
        html += `<li>${applyInline(line.replace(/^([-*])\s+/, ""))}</li>`;
        return;
      } else if (inUl) {
        html += "</ul>";
        inUl = false;
      }

      /* ---------- NUMBERED LIST ---------- */
      if (/^\d+\.\s+/.test(line)) {
        if (!inOl) {
          html += "<ol style='padding-left:18px'>";
          inOl = true;
        }
        html += `<li>${applyInline(line.replace(/^\d+\.\s+/, ""))}</li>`;
        return;
      } else if (inOl) {
        html += "</ol>";
        inOl = false;
      }

      /* ---------- NORMAL TEXT ---------- */
      html += `<div>${applyInline(line) || "&nbsp;"}</div>`;
    });

    if (inUl) html += "</ul>";
    if (inOl) html += "</ol>";

    return html;
  }

  // =========================================================EMOJI PICKER FUNCTION================================================================
  const tempJsonBodyRef = useRef(null);

  const getTempBodyCharCount = (text) => [...text].length;

  const handleEmojiSelect = (setState, emoji, inputRef, maxLength = 1024) => {
    if (!inputRef?.current) return;

    const input = inputRef.current;
    const emojiChar = emoji;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const current = input.value;

    const newText = current.slice(0, start) + emojiChar + current.slice(end);

    if (getTempBodyCharCount(newText) > maxLength) {
      toast.error("You reached the limit!");
      return;
    }

    // then update
    setState(newText);

    requestAnimationFrame(() => {
      const caret = start + emojiChar.length;
      input.focus();
      input.setSelectionRange(caret, caret);
    });
  };

  return (
    <>
      {/* ================= TEMPLATE LIST ================= */}
      <div className="space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            WhatsApp Template Library
          </h2>

          <UniversalButton
            label="Add Template"
            onClick={() => {
              setEditTemplate(null);
              setAddTemplate(true);
              resetForm();
            }}
          />
        </div>

        {/* ================= CONTENT ================= */}
        {templateList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <div className="text-5xl mb-4">
              <AutoStoriesIcon />
            </div>
            <p className="text-lg font-medium">No templates found</p>
            <p className="text-sm mt-1 text-gray-400">
              Click{" "}
              <span className="font-semibold text-gray-600">Add Template</span>{" "}
              to create one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templateList.map((item) => (
              <div
                key={item.sr_no}
                className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
              >
                {/* ================= CARD HEADER ================= */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                      {item.template_title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.industry} • {item.category}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-1">
                    Created {item.insert_time}
                  </p>
                </div>

                {/* ================= BODY ================= */}
                <p className="text-sm text-gray-700 mt-4 line-clamp-3 leading-relaxed">
                  {item.template_body}
                </p>

                {/* ================= ACTIONS ================= */}
                <div className="flex justify-end gap-5 pt-4 mt-4 border-t">
                  <button
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition"
                    onClick={() => {
                      setEditTemplate(item);
                      setAddTemplate(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                    onClick={() => {
                      setSelectedTemplate(item);
                      setDeleteDialog(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =======================================AddTemplate============================================================ */}
      <Dialog
        header="WhatsApp Template Library"
        visible={addTemplate}
        onHide={() => setAddTemplate(false)}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "95vw" }}
        modal
        draggable={false}
        resizable={false}
      >
        {/* ================= FORM CONTENT ================= */}
        <div className="w-full  space-y-6">
          {/* Header */}
          <div className="border-b pb-4">
            <p className="mt-1 text-sm text-gray-500">
              Create and manage reusable WhatsApp message templates.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-6">
            <div className="space-y-3">
              {/* ================= TEMPLATE META ================= */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* ===== LEFT: TEMPLATE EDITOR ===== */}
                <div className=" space-y-6">
                  <InputField
                    label="Template Title"
                    placeholder="Enter template title"
                    value={templateTitle}
                    onChange={(e) => setTemplateTitle(e.target.value)}
                  />

                  <UniversalTextArea
                    label="Template Body "
                    placeholder="Write your WhatsApp template message here..."
                    value={templateBody}
                    onChange={(e) => setTemplateBody(e.target.value)}
                  />
                  <DropdownWithSearch
                    label="Template Type"
                    placeholder="Select template type"
                    value={templateType}
                    options={[
                      { label: "Text", value: "text" },
                      { label: "Image", value: "image" },
                      { label: "Document", value: "document" },
                      { label: "Video", value: "video" },
                      { label: "Carousel", value: "carousel" },
                      {
                        label: "Limited Time offer",
                        value: "limited_time_offer",
                      },
                    ]}
                    onChange={setTemplateType}
                  />

                  {templateType === "carousel" && (
                    <DropdownWithSearch
                      label="Carousel Type"
                      placeholder="Select Carousel type"
                      value={carouselType}
                      options={[
                        { label: "Image", value: "image" },
                        { label: "Video", value: "video" },
                      ]}
                      onChange={setCarouselType}
                    />
                  )}

                  <DropdownWithSearch
                    label="Industry"
                    placeholder="Select industry"
                    value={industry}
                    options={[
                      { label: "E-commerce", value: "ecommerce" },
                      { label: "Real Estate", value: "real_estate" },
                      { label: "Education", value: "education" },
                      { label: "Healthcare", value: "healthcare" },
                      { label: "Finance", value: "finance" },
                      { label: "Travel", value: "travel" },
                      { label: "Logistics", value: "logistics" },
                      { label: "Hospitality", value: "hospitality" },
                      { label: "SaaS", value: "saas" },
                      { label: "Automobile", value: "automobile" },
                    ]}
                    onChange={(val) => {
                      setIndustry(val);
                      setCategory("");
                    }}
                  />

                  <DropdownWithSearch
                    label="Category"
                    placeholder={
                      industry ? "Select category" : "Select industry first"
                    }
                    value={category}
                    options={categoryOptions}
                    onChange={setCategory}
                    disabled={!industry}
                  />
                  <div className="relative">
                    {/* TEMPLATE JSON BODY */}
                    <textarea
                      ref={tempJsonBodyRef}
                      value={tempJsonBody}
                      placeholder="Enter template message body"
                      onChange={(e) => {
                        let val = e.target.value;

                        val = normalizeTemplateVariables(val);

                        if ([...val].length > 1024) {
                          toast.error("You reached the limit!");
                          val = [...val].slice(0, 1024).join("");
                        }

                        setTempJsonBody(val);
                      }}
                      onSelect={(e) => {
                        caretRef.current = e.target.selectionStart;
                      }}
                      onClick={(e) => {
                        caretRef.current = e.target.selectionStart;
                      }}
                      onKeyUp={(e) => {
                        caretRef.current = e.target.selectionStart;
                      }}
                      onKeyDown={handleKeyDown}
                      className=" w-full  h-[120px] p-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-900 placeholder-gray-400resize-y focus:outline-none focus:border-blue-500 focus:ring-2
                      focus:ring-blue-200"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex items-center gap-2 mt-2 bg-white border border-slate-200 rounded-xl px-2 py-2 shadow w-max"
                    >
                      <Tooltip title="Bold">
                        <button
                          onClick={() => addFormat("bold")}
                          className="hover:bg-blue-100 text-blue-400 rounded-md p-1 transition cursor-pointer"
                        >
                          <FormatBoldOutlined fontSize="small" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Italic">
                        <button
                          onClick={() => addFormat("italic")}
                          className="hover:bg-blue-100 text-blue-400 rounded-md p-1 transition cursor-pointer"
                        >
                          <FormatItalicOutlined fontSize="small" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Strike">
                        <button
                          onClick={() => addFormat("strike")}
                          className="hover:bg-blue-100 text-blue-400 rounded-md p-1 transition cursor-pointer"
                        >
                          <FormatStrikethroughOutlined fontSize="small" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Bullet List">
                        <button
                          onClick={() => addFormat("bullet")}
                          className="hover:bg-blue-100 text-blue-400 rounded-md p-1 transition cursor-pointer"
                        >
                          <FormatListBulletedIcon fontSize="small" />
                        </button>
                      </Tooltip>

                      <Tooltip title="Numbered List">
                        <button
                          onClick={() => addFormat("number")}
                          className="hover:bg-blue-100 text-blue-400 rounded-md p-1 transition cursor-pointer"
                        >
                          <FormatListNumberedRtlSharpIcon fontSize="small" />
                        </button>
                      </Tooltip>
                    </motion.div>

                    <span className="text-xs text-gray-500">
                      {getTempBodyCharCount(tempJsonBody)} / 1024
                    </span>

                    <div className="absolute top-0 right-0 flex mt-2 mr-2 space-x-2">
                      <CustomEmojiPicker
                        onSelect={(emoji) => {
                          console.log("EMOJI:", emoji);
                          handleEmojiSelect(
                            setTempJsonBody,
                            emoji,
                            tempJsonBodyRef,
                            1024,
                          );
                        }}
                      />
                    </div>
                  </div>
                  <UniversalButton
                    label="Add"
                    disabled={getCharCount(tempJsonBody) >= MAX_LENGTH}
                    onClick={addCurlyBracesVariable}
                  />

                  {params.length > 0 && (
                    <div className="h-50 overflow-scroll bg-gray-100 p-3 rounded-md">
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Example Values
                        </h4>

                        {params.map((param, index) => (
                          <div key={param} className="flex items-center gap-3">
                            <span className="text-sm w-10">#{param}</span>

                            <InputField
                              placeholder={`Enter example for ${param}`}
                              value={exampleValues[index] || ""}
                              onChange={(e) => {
                                const newValues = [...exampleValues];
                                newValues[index] = e.target.value;
                                setExampleValues(newValues);
                              }}
                            />

                            <button
                              onClick={() => deleteExampleVariable(index)}
                              className="text-red-500 text-sm hover:text-red-700 bg-red-100 p-2 rounded-full"
                            >
                              <CancelOutlinedIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FOOTER */}
                  <InputField
                    label="Footer "
                    placeholder="Enter footer text"
                    value={tempFooter}
                    onChange={(e) => setTempFooter(e.target.value)}
                  />

                  {/* TEXT TEMPLATE */}
                  {templateType === "text" && (
                    <div>{renderTemplateFields()}</div>
                  )}

                  {/* MEDIA TEMPLATE */}
                  {["image", "video", "document"].includes(templateType) && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        Template Media
                      </h4>
                      {renderTemplateFields()}
                    </div>
                  )}

                  {/* =======================================CAROUSEL SECTION======================================================== */}
                  {templateType === "carousel" && (
                    <UniversalButton label="Add" onClick={addCarouselCard} />
                  )}
                  {/* Carousel Track */}
                  <div className="relative w-[390px] overflow-hidden">
                    <div
                      ref={carouselContainerRef}
                      className="flex overflow-x-auto scroll-smooth no-scrollbar gap-5"
                    >
                      {carouselCards.map((card, index) => {
                        const cardUrlButtons = card.buttons.filter(
                          (b) => b.type === "url",
                        );
                        const cardPhoneButtons = card.buttons.filter(
                          (b) => b.type === "phone_number",
                        );
                        const cardQuickReplyButtons = card.buttons.filter(
                          (b) => b.type === "quick_reply",
                        );

                        return (
                          <>
                            {/* Left Button */}
                            <button
                              type="button"
                              onClick={scrollLeft}
                              className="absolute left-0 top-1/2 -translate-y-1/2 z-20  bg-white shadow rounded-full h-10 w-10"
                            >
                              <KeyboardDoubleArrowLeftOutlinedIcon />
                            </button>

                            {/* Right Button */}
                            <button
                              type="button"
                              onClick={scrollRight}
                              className="absolute right-0 top-1/2 -translate-y-1/2 z-20  bg-white shadow rounded-full h-10 w-10"
                            >
                              <KeyboardDoubleArrowRightOutlinedIcon />
                            </button>

                            <div
                              key={index}
                              className="min-w-[390px]  flex-shrink-0   rounded-xl border p-5 bg-gray-50"
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-sm mb-3">
                                  Card {index + 1}
                                </h4>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setCarouselCards((prev) =>
                                      prev.filter((_, i) => i !== index),
                                    );
                                    carouselRefs.current.splice(index, 1);
                                  }}
                                  className="text-red-500 text-xs"
                                >
                                  <CancelOutlinedIcon fontSize="small" />
                                </button>
                              </div>

                              <div>
                                {/* MEDIA */}
                                <div
                                  className="flex-1 cursor-pointer "
                                  onClick={() =>
                                    carouselRefs.current[index]?.click()
                                  }
                                >
                                  <InputField
                                    label="Carousel Media"
                                    placeholder={
                                      card.file
                                        ? card.file.name
                                        : `Click to select ${carouselType}`
                                    }
                                    readOnly
                                  />
                                </div>

                                <input
                                  ref={(el) =>
                                    (carouselRefs.current[index] = el)
                                  }
                                  type="file"
                                  hidden
                                  accept={
                                    carouselType === "image"
                                      ? "image/*"
                                      : "video/*"
                                  }
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    setCarouselCards((prev) => {
                                      const copy = [...prev];
                                      copy[index].file = file;
                                      return copy;
                                    });
                                  }}
                                />

                                {card.file && !card.media && (
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center h-10 w-10 mt-2 rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    title="Upload file"
                                    disabled={uploading}
                                    onClick={() => uploadCardMedia(index)}
                                  >
                                    <UploadFileOutlinedIcon fontSize="small" />
                                  </button>
                                )}

                                {card.media && (
                                  <span className="text-green-600 text-xs">
                                    Uploaded ✔
                                  </span>
                                )}
                              </div>

                              {/* ================= CARD BUTTONS ================= */}
                              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-6 mt-5">
                                <h4 className="text-sm font-semibold text-gray-700">
                                  Buttons
                                </h4>

                                {/* ADD BUTTONS */}
                                <div className="flex flex-wrap gap-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addButtonToCard(index, "url")
                                    }
                                    className="px-3 py-1.5 text-sm rounded bg-blue-100 text-blue-700"
                                  >
                                    URL Button
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      addButtonToCard(index, "phone_number")
                                    }
                                    className="px-3 py-1.5 text-sm rounded bg-green-100 text-green-700"
                                  >
                                    Phone Button
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      addButtonToCard(index, "quick_reply")
                                    }
                                    className="px-3 py-1.5 text-sm rounded bg-purple-100 text-purple-700"
                                  >
                                    Quick Reply
                                  </button>
                                </div>

                                {/* ================= URL BUTTONS ================= */}
                                {cardUrlButtons.length > 0 && (
                                  <div className="space-y-3">
                                    <h5 className="text-xs font-semibold text-blue-700 uppercase">
                                      URL Buttons
                                    </h5>

                                    {cardUrlButtons.map((btn) => {
                                      const bIndex = card.buttons.indexOf(btn);

                                      return (
                                        <div
                                          key={bIndex}
                                          className="flex items-end gap-3 p-3 border rounded-lg bg-white"
                                        >
                                          <InputField
                                            label="Button Text"
                                            placeholder="Enter button text"
                                            value={btn.text}
                                            maxLength={25}
                                            onChange={(e) =>
                                              updateCardButton(
                                                index,
                                                bIndex,
                                                "text",
                                                e.target.value,
                                              )
                                            }
                                          />

                                          <InputField
                                            label="URL"
                                            placeholder="https://example.com"
                                            type="url"
                                            value={btn.url}
                                            onChange={(e) => {
                                              let value = e.target.value.trim();

                                              if (
                                                value &&
                                                !/^https?:\/\//i.test(value)
                                              ) {
                                                value = "https://" + value;
                                              }

                                              updateCardButton(
                                                index,
                                                bIndex,
                                                "url",
                                                value,
                                              );
                                            }}
                                          />

                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeButtonFromCard(
                                                index,
                                                bIndex,
                                              )
                                            }
                                            className="p-2 rounded-full bg-red-100 text-red-600"
                                          >
                                            <CancelOutlinedIcon />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* ================= PHONE BUTTON ================= */}
                                {cardPhoneButtons.length > 0 && (
                                  <div className="space-y-3">
                                    <h5 className="text-xs font-semibold text-green-700 uppercase">
                                      Phone Button
                                    </h5>

                                    {cardPhoneButtons.map((btn) => {
                                      const bIndex = card.buttons.indexOf(btn);

                                      return (
                                        <div
                                          key={bIndex}
                                          className="flex items-end gap-3 p-3 border rounded-lg bg-white"
                                        >
                                          <InputField
                                            label="Button Text"
                                            placeholder="Enter button text"
                                            value={btn.text}
                                            maxLength={25}
                                            onChange={(e) =>
                                              updateCardButton(
                                                index,
                                                bIndex,
                                                "text",
                                                e.target.value,
                                              )
                                            }
                                          />

                                          <InputField
                                            label="Phone Number"
                                            placeholder="9999999999"
                                            type="Number"
                                            value={btn.phone_number}
                                            onChange={(e) =>
                                              updateCardButton(
                                                index,
                                                bIndex,
                                                "phone_number",
                                                e.target.value,
                                              )
                                            }
                                          />

                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeButtonFromCard(
                                                index,
                                                bIndex,
                                              )
                                            }
                                            className="p-2 rounded-full bg-red-100 text-red-600"
                                          >
                                            <CancelOutlinedIcon />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* ================= QUICK REPLY BUTTONS ================= */}
                                {cardQuickReplyButtons.length > 0 && (
                                  <div className="space-y-3">
                                    <h5 className="text-xs font-semibold text-purple-700 uppercase">
                                      Quick Reply Buttons
                                    </h5>

                                    {cardQuickReplyButtons.map((btn) => {
                                      const bIndex = card.buttons.indexOf(btn);

                                      return (
                                        <div
                                          key={bIndex}
                                          className="flex items-end gap-3 p-3 border rounded-lg bg-white"
                                        >
                                          <InputField
                                            label="Button Text"
                                            placeholder="Enter button text"
                                            value={btn.text}
                                            maxLength={25}
                                            onChange={(e) =>
                                              updateCardButton(
                                                index,
                                                bIndex,
                                                "text",
                                                e.target.value,
                                              )
                                            }
                                          />

                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeButtonFromCard(
                                                index,
                                                bIndex,
                                              )
                                            }
                                            className="p-2 rounded-full bg-red-100 text-red-600"
                                          >
                                            <CancelOutlinedIcon />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  {/* ==========================================LIMITED TIME OFFER==================================================== */}
                  {templateType === "limited_time_offer" && (
                    <div className="space-y-3">
                      <InputField
                        label="Offer Details"
                        placeholder="Enter Offer Details"
                        maxLength={16}
                        required={true}
                        value={offerDetails}
                        onChange={(e) => setOfferDetails(e.target.value)}
                      />

                      <button
                        onClick={() => setIsEnabled((v) => !v)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition
                                 ${isEnabled ? "bg-blue-500" : "bg-gray-400"}`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                          ${isEnabled ? "translate-x-6" : "translate-x-0"}`}
                        />
                      </button>
                      <span className="ml-2 text-sm">
                        {isEnabled ? "True" : "False"}
                      </span>
                    </div>
                  )}

                  {/* =================GLOBAL BUTTONS ================= */}
                  {templateType !== "carousel" && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-6">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Buttons
                      </h4>
                      {/* ADD BUTTONS */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => addButton("url")}
                          className="px-3 py-1.5 text-sm rounded bg-blue-100 text-blue-700"
                        >
                          URL Button
                        </button>

                        <button
                          type="button"
                          onClick={() => addButton("phone_number")}
                          className="px-3 py-1.5 text-sm rounded bg-green-100 text-green-700"
                        >
                          Phone Button
                        </button>

                        <button
                          type="button"
                          onClick={() => addButton("quick_reply")}
                          className="px-3 py-1.5 text-sm rounded bg-purple-100 text-purple-700"
                        >
                          Quick Reply
                        </button>

                        {templateType === "limited_time_offer" && (
                          <button
                            type="button"
                            onClick={() => addButton("copy_code")}
                            className="px-3 py-1.5 text-sm rounded bg-indigo-100 text-indigo-500"
                          >
                            Copy Code
                          </button>
                        )}
                      </div>
                      {/* ================= URL BUTTONS ================= */}

                      {urlButtons.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-xs font-semibold text-blue-700 uppercase">
                            URL Buttons
                          </h5>

                          {urlButtons.map((btn) => {
                            const index = buttons.indexOf(btn);

                            return (
                              <div
                                key={index}
                                className="flex flex-col gap-3 p-3 border rounded-lg bg-white"
                              >
                                <div className="flex gap-3 items-end">
                                  <InputField
                                    label="Button Text"
                                    placeholder="Enter button text"
                                    value={btn.text}
                                    maxLength={25}
                                    onChange={(e) =>
                                      updateButton(
                                        index,
                                        "text",
                                        e.target.value,
                                      )
                                    }
                                  />

                                  <InputField
                                    label="URL"
                                    placeholder="https://example.com"
                                    type="url"
                                    value={btn.url}
                                    onChange={(e) => {
                                      let value = e.target.value.trim();
                                      value = normalizeSingleUrlVariable(value);

                                      if (
                                        value &&
                                        !/^https?:\/\//i.test(value)
                                      ) {
                                        value = "https://" + value;
                                      }

                                      updateButton(index, "url", value);
                                    }}
                                    maxLength={2000}
                                  />

                                  <button
                                    type="button"
                                    onClick={() => removeButton(index)}
                                    className="p-2 text-sm rounded-full bg-red-100 text-red-600"
                                  >
                                    <CancelOutlinedIcon />
                                  </button>
                                </div>

                                <div className="flex gap-2">
                                  <UniversalButton
                                    onClick={() => addUrlVariable(index)}
                                    label="Add Variable"
                                  />
                                </div>

                                {/(?<!\{){{\d+}}(?!\})/g.test(btn.url) && (
                                  <div className="flex items-end gap-3 mt-2">
                                    <div className="flex-1">
                                      <InputField
                                        label="URL Variable Value"
                                        type="text"
                                        placeholder="Enter value for {{1}}"
                                        value={btn.urlVarValue || ""}
                                        onChange={(e) =>
                                          updateButton(
                                            index,
                                            "urlVarValue",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => deleteUrlVariable(index)}
                                      className="text-red-500 text-xs mb-1 hover:text-red-700 bg-red-100 p-2 rounded-full"
                                    >
                                      <CancelOutlinedIcon />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* ================= PHONE BUTTON ================= */}
                      {phoneButtons.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-xs font-semibold text-green-700 uppercase">
                            Phone Button
                          </h5>

                          {phoneButtons.map((btn) => {
                            const index = buttons.indexOf(btn);

                            return (
                              <div
                                key={index}
                                className="flex items-end gap-3 p-3 border rounded-lg bg-white"
                              >
                                <InputField
                                  label="Button Text"
                                  placeholder="Enter button text"
                                  value={btn.text}
                                  onChange={(e) =>
                                    updateButton(index, "text", e.target.value)
                                  }
                                  maxLength={25}
                                />

                                <InputField
                                  label="Phone Number"
                                  placeholder="+15550051310"
                                  type="Number"
                                  value={btn.phone_number}
                                  onChange={(e) =>
                                    updateButton(
                                      index,
                                      "phone_number",
                                      e.target.value,
                                    )
                                  }
                                />

                                <button
                                  type="button"
                                  onClick={() => removeButton(index)}
                                  className="p-2 text-sm rounded-full bg-red-100 text-red-600"
                                >
                                  <CancelOutlinedIcon />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* ================= QUICK REPLY BUTTONS ================= */}
                      {quickReplyButtons.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-xs font-semibold text-purple-700 uppercase">
                            Quick Reply Buttons
                          </h5>

                          {quickReplyButtons.map((btn) => {
                            const index = buttons.indexOf(btn);

                            return (
                              <div
                                key={index}
                                className="flex items-end gap-3 p-3 border rounded-lg bg-white"
                              >
                                <InputField
                                  label="Button Text"
                                  placeholder="Enter button text"
                                  value={btn.text}
                                  onChange={(e) =>
                                    updateButton(index, "text", e.target.value)
                                  }
                                  maxLength={25}
                                />

                                <button
                                  type="button"
                                  onClick={() => removeButton(index)}
                                  className="p-2 text-sm rounded-full bg-red-100 text-red-600"
                                >
                                  <CancelOutlinedIcon />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ================== COPY CODE ============================= */}
                      {copycodeButtons.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-xs font-semibold text-indigo-500 uppercase">
                            Copy code Buttons
                          </h5>

                          {copycodeButtons.map((btn) => {
                            const index = buttons.indexOf(btn);

                            return (
                              <div
                                key={index}
                                className="flex items-end gap-3 p-3 border rounded-lg bg-white"
                              >
                                <InputField
                                  label="Button Text"
                                  placeholder="Enter Button Text"
                                  value={btn.text}
                                  onChange={(e) =>
                                    updateButton(index, "text", e.target.value)
                                  }
                                  maxLength={15}
                                  required={true}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ===== RIGHT: MOBILE PREVIEW ===== */}
                <div className=" flex justify-center ">
                  <div className="sticky top-24 w-[320px] h-[550px] rounded-[32px] border border-gray-300  shadow-xl overflow-hidden bg-[#0b141a]">
                    {/* Phone notch */}
                    <div className="h-6 bg-[#1f2c34] rounded-b-xl mx-auto w-24 mt-2" />

                    {/* Screen */}
                    <div className="p-4 text-sm h-full flex flex-col bg-[#0b141a]">
                      <div className="flex-1 overflow-auto flex flex-col gap-3">
                        {/* ================= TEMPLATE CARD ================= */}
                        <div className="rounded-2xl bg-[#1f2c34] overflow-hidden shadow-md">
                          {/* IMAGE HEADER */}
                          {["image", "video", "document"].includes(
                            templateType,
                          ) &&
                            headerMedia?.link && (
                              <div className="relative">
                                {headerMedia.type === "image" && (
                                  <img
                                    src={headerMedia.link}
                                    className="w-full h-56 object-cover"
                                  />
                                )}

                                {headerMedia.type === "video" && (
                                  <video
                                    src={headerMedia.link}
                                    controls
                                    className="w-full h-56 object-cover"
                                  />
                                )}

                                {headerMedia.type === "document" && (
                                  <div className="p-4 bg-[#2a3942] text-white text-sm flex items-center gap-2">
                                    <AssignmentOutlinedIcon />{" "}
                                    <span>Document</span>
                                  </div>
                                )}
                              </div>
                            )}

                          {templateType === "carousel" && (
                            <CarouselPreview carouselCards={carouselCards} />
                          )}

                          <div className="px-4 py-3 space-y-2 text-white">
                            <pre className="font-semibold break-words">
                              {templateTitle || "Template Title"}
                            </pre>

                            {templateType === "text" && templateText && (
                              <pre className="font-medium break-words">
                                {templateText}
                              </pre>
                            )}

                            {/* ================= BODY ================= */}
                            <div
                              className="text-[#e9edef] text-sm break-words leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: tempJsonBody
                                  ? formatPreview(tempJsonBody)
                                  : "<span style='opacity:.6'>Template body preview goes here...</span>",
                              }}
                            />

                            {/* ========================OFFER =============================== */}
                            {templateType === "limited_time_offer" && (
                              <div className="mt-4 p-3 rounded-xl bg-[#202c33] text-[#e9edef] space-y-2">
                                {/* Offer badge */}
                                {isEnabled && (
                                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                                    <TimerSharpIcon fontSize="small" /> LIMITED
                                    TIME OFFER
                                  </div>
                                )}

                                {/* Offer details */}
                                <div className="text-sm break-words">
                                  {offerDetails || (
                                    <span className="opacity-60">
                                      Offer details will appear here…
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {tempFooter && (
                              <pre className="text-xs text-[#8696a0] border-t border-[#2a3942] pt-2 text-center break-words">
                                {tempFooter}
                              </pre>
                            )}

                            {/* ================= ACTION BUTTONS ================= */}
                            {buttons.length > 0 && (
                              <div className="-mx-4 mt-2 bg-[#1f2c34]">
                                {urlButtons.map((btn, i) => (
                                  <div
                                    key={`url-${i}`}
                                    title={btn.url}
                                    className="flex items-center justify-center gap-2 py-3 px-2 text-[#00a884] font-medium border-t border-[#2a3942] first:border-t last:border-b"
                                  >
                                    <span className="block w-full break-words text-center">
                                      <LinkIcon fontSize="small" />
                                      {btn.text}
                                    </span>
                                  </div>
                                ))}

                                {phoneButtons.map((btn, i) => (
                                  <div
                                    key={`phone-${i}`}
                                    title={btn.phone_number}
                                    className="flex items-center justify-center gap-2 py-3 px-2 break-words   text-[#00a884] font-medium border-t border-[#2a3942]  first:border-t last:border-b"
                                  >
                                    <span className="block w-full break-words text-center">
                                      <PhoneIcon fontSize="small" />
                                      {btn.text}
                                    </span>
                                  </div>
                                ))}

                                {quickReplyButtons.map((btn, i) => (
                                  <div
                                    key={`quick-${i}`}
                                    title={btn.text}
                                    className=" flex items-center justify-center gap-2 py-3 px-2 whitespace-pre-line break-words text-[#00a884] font-medium  border-t border-[#2a3942] first:border-t last:border-b"
                                  >
                                    <span className="block w-full break-words text-center">
                                      <QuickreplyIcon fontSize="small" />
                                      {btn.text}
                                    </span>
                                  </div>
                                ))}

                                {copycodeButtons.map((btn, i) => (
                                  <div
                                    key={`copy_code-${i}`}
                                    title={btn.text}
                                    className=" flex items-center justify-center gap-2 py-3 px-2 whitespace-pre-line break-words text-[#00a884] font-medium  border-t border-[#2a3942] first:border-t last:border-b"
                                  >
                                    <span className="block w-full break-words text-center">
                                      <ContentCopySharpIcon fontSize="small" />
                                      {btn.text}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <UniversalButton
                label="Cancel"
                variant="secondary"
                onClick={() => setAddTemplate(false)}
              />

              <UniversalButton
                label={editTemplate ? "Update Template" : "Save Template"}
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* ====================================DELETE DIALOG========================================= */}

      <Dialog
        header="Delete Template"
        visible={deleteDialog}
        onHide={() => setDeleteDialog(false)}
        style={{ width: "420px" }}
        modal
        draggable={false}
        resizable={false}
      >
        <div className="space-y-6">
          {/* ====================================Icon + Message=========================================== */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86l-8.5 14.78A1 1 0 002.5 20h19a1 1 0 00.86-1.36l-8.5-14.78a1 1 0 00-1.72 0z"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Delete Template
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This action cannot be undone. Are you sure you want to proceed?
              </p>
            </div>
          </div>

          {/* ==============================================Template Preview=============================== */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="font-medium text-gray-800 truncate">
              {selectedTemplate?.template_title}
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <span className="rounded-full bg-white px-2 py-0.5 border">
                {selectedTemplate?.category}
              </span>
              <span>•</span>
              <span className="rounded-full bg-white px-2 py-0.5 border">
                {selectedTemplate?.industry}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setDeleteDialog(false)}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              onClick={handleConfirmDelete}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WabaTempLibrary;
