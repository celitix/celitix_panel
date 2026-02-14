import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import moment from "moment";
import Lottie from "lottie-react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Switch } from "@mui/material";

// ICONS 
import { IoSearch } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

// APIS 
import {
  getEmailAllTemplate,
  deleteEmailTemplate,
  getEmailSingleTemplate,
} from "@/apis/email/Email";
import {
  deletePdfTemplate,
  getPdfAllTemplate,
  updatePdfTemplateStatus,
} from "@/apis/utility/Utility";

// COMPONENTS 
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import { PaginationTable } from "@/components/layout/PaginationTable";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import CustomTooltip from "@/components/common/CustomTooltip";
import EmailFormatter from "@/utils/EmailFormatter";
import { DataTable } from "@/components/layout/DataTable";

// ASSETS
import nothinganimation from "@/assets/animation/nothinganimation.json";

// UTILS
import PdfFormatter from "@/utils/PdfFormatter";


const TextToPdfConverter = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [searchTemp, setSearchTemp] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [totalEmailTemplates, setTotalEmailTemplates] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [search, setSearch] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [createdDate, setCreatedDate] = useState();
  const [viewEmailData, setViewEmailData] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined" && !window.__html2canvas_oklch_fixed__) {
      const originalSupports = CSS.supports;
      CSS.supports = function (property, value) {
        if (typeof value === "string" && /(oklch|lab|lch|color\()/i.test(value)) {
          return true; // Trick html2canvas into skipping unsupported color parsing
        }
        return originalSupports.call(this, property, value);
      };
      window.__html2canvas_oklch_fixed__ = true;
    }
  }, []);

  const navigate = useNavigate();

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const exportPdfTemplate = async (email) => {

    const content = email?.templateContent || email?.emailContent || "";
    if (!content) {
      toast.error("No content to export");
      return;
    }

    // Hidden container
    const container = document.createElement("div");
    container.innerHTML = content;

    /*  ⭐ FIX: SHOW TABLE BORDER IN PDF  */
    const applyTableStyles = () => {
      container.querySelectorAll("table").forEach((table) => {
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
      });

      container.querySelectorAll("table, th, td").forEach((el) => {
        el.style.border = "1px solid black";
        el.style.padding = "6px";
      });
    };

    applyTableStyles();

    Object.assign(container.style, {
      position: "fixed",
      left: "-99999px",
      top: "-99999px",
      width: "210mm",
      minHeight: "297mm",
      background: "white",
      padding: "20mm",
      boxSizing: "border-box",
      visibility: "hidden",
      opacity: "0",
      pointerEvents: "none",
      zIndex: "-9999",
      fontFamily: "Arial, Helvetica, sans-serif",
    });

    document.body.appendChild(container);

    try {

      const images = container.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = img.onerror = () => resolve();
            setTimeout(resolve, 3000); // Fallback
          });
        })
      );

      // Split into pages by .page-break
      const pages = [];
      let currentPage = document.createElement("div");
      currentPage.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
    `;

      const nodes = Array.from(container.childNodes);
      for (let node of nodes) {
        if (node.nodeType === 1 && node.classList && node.classList.contains("page-break")) {
          pages.push(currentPage);
          currentPage = document.createElement("div");
          currentPage.style.cssText = currentPage.style.cssText;
        } else {
          currentPage.appendChild(node.cloneNode(true));
        }
      }
      if (currentPage.children.length > 0) pages.push(currentPage);

      // Generate PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;

      for (let i = 0; i < pages.length; i++) {
        const pageEl = pages[i];

        // Temporarily attach to DOM for rendering
        pageEl.style.position = "fixed";
        pageEl.style.left = "-99999px";
        pageEl.style.top = "-99999px";
        pageEl.style.visibility = "visible";
        pageEl.style.opacity = "1";
        document.body.appendChild(pageEl);

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          removeContainer: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);

        // Remove from DOM
        document.body.removeChild(pageEl);
      }

      // Download
      pdf.save(`${email.templateName || "document"}.pdf`);
      toast.success("PDF downloaded successfully!");

    } catch (error) {
      console.error("PDF Export Failed:", error);
      toast.error("Failed to generate PDF. Check console.");
    } finally {
      // Always clean up
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
  };

  const handleViewTemplate = (email) => {
    setViewEmailData(email);
    setOpenViewDialog(true);
  };

  const fetchEmailTemplateList = async () => {
    setIsFetching(true);

    try {
      const response = await getPdfAllTemplate();

      const list = Array.isArray(response) ? response : [];

      setEmailList(list);
      setTotalEmailTemplates(list.length);
    } catch (error) {
      console.error("Error fetching email template list:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplateList();
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await deletePdfTemplate(email.id);
      if (response?.status === true) {
        toast.success("PDF template deleted successfully.");
        setOpenDeleteDialog(false);
        setSelectedEmail(null);
        fetchEmailTemplateList();
      }
    } catch (error) {
      console.error("Error deleting PDF template:", error);
      toast.error("Failed to delete PDF template.");
    }
  };

  const handleEditPdfTemplate = (data) => {
    navigate("/createpdfconverter", {
      state: {
        pdfTemplateData: data,
      },
    });
  };

  const handleSearch = () => {
    // setSearch(searchTemp);
    // const result = getFilteredList();
    fetchEmailTemplateList(search);
  };

  const handleStatusChange = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;
    const data = {
      srNo: row.id,
      status: newStatus,
    };
    try {
      const response = await updatePdfTemplateStatus(data);
      if (response?.status === true) {
        toast.success("Status updated successfully.");
        fetchEmailTemplateList();
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update status.");
    }
    // console.log(data);
  };

  const tableCols = [
    { field: "srNo", headerName: "Sr No.", width: 80, flex: 0 },
    {
      field: "templateName",
      headerName: "Template Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "updateTime",
      headerName: "Updated On",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        moment(params.row.updateTime).format("DD-MMM-YYYY HH:mm A"),
    },
    {
      field: "status",
      headerName: "Visibility",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip
          arrow
          placement="top"
          title={params.row.status === 1 ? "Hide" : "Show"}
        >
          <Switch
            checked={params.row.status === 1}
            onChange={() => handleStatusChange(params.row)}
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
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      flex: 0,
      renderCell: (params) => (
        <div className="flex justify-around items-center gap-2">
          {/* VIEW */}
          <CustomTooltip title="View Template" placement="top" arrow>
            <button
              className=" text-green-700"
              onClick={() => handleViewTemplate(params.row)}
            >
              <VisibilityIcon fontSize="small" />
            </button>
          </CustomTooltip>

          {/* EDIT */}
          <CustomTooltip title="Edit Template" placement="top" arrow>
            <button
              className=" text-gray-600"
              onClick={() => handleEditPdfTemplate(params.row)}
            >
              <EditIcon fontSize="small" />
            </button>
          </CustomTooltip>

          {/* DELETE */}
          <CustomTooltip title="Delete Template" placement="top" arrow>
            <button
              className="text-red-600"
              onClick={() => {
                setSelectedEmail(params.row);
                setOpenDeleteDialog(true);
                setSelectedTemplateName(params?.row?.templateName);
              }}
            >
              <DeleteForeverIcon fontSize="small" />
            </button>
          </CustomTooltip>

          {/* <CustomTooltip title="Export as PDF" placement="top" arrow>
            <button
              className="text-blue-600"
              onClick={() => exportPdfTemplate(params.row)}
            >
              <PictureAsPdfIcon fontSize="small" />
            </button>
          </CustomTooltip> */}
        </div>
      ),
    },
  ];

  const getFilteredList = () => {
    let filtered = [...emailList];


    if (searchTemp.trim()) {
      filtered = filtered.filter((item) =>
        item.templateName?.toLowerCase().includes(searchTemp.toLowerCase())
      );
    }


    if (createdDate) {
      const selected = moment(createdDate).format("DD-MM-YYYY");

      filtered = filtered.filter((item) => {
        const rawDate = item.updateTime || item.insertTime;
        const formatted = moment(rawDate).format("DD-MM-YYYY");
        return formatted === selected;
      });
    }


    filtered.sort((a, b) => {
      const dateA = moment(a.updateTime || a.insertTime);
      const dateB = moment(b.updateTime || b.insertTime);
      return dateB - dateA; // newest first
    });

    return filtered;
  };

  const filteredList = getFilteredList();

  // const tableRows = (emailList || []).map((item, index) => ({
  //   ...item,
  //   // id: `${item.srNo}-${index}`, // ALWAYS UNIQUE
  //   id: item.srNo, // ALWAYS UNIQUE
  //   srNo: index + 1,            // Display number
  // }));

  const tableRows = filteredList.map((item, index) => ({
    ...item,
    id: item.srNo, // unique
    srNo: index + 1, // display number
  }));

  return (
    <div className="bg-white w-full p-3 rounded-2xl">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-semibold mb-2">Text To PDF Converter</h2>
        <p className="text-gray-600 text-sm">
          Manage your Text to PDF conversion templates here.
        </p>
      </div>
      <div className="">
        <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
          <div className="flex items-end gap-4 flex-wrap md:flex-nowrap">
            <div className="w-full sm:w-64">
              <UniversalDatePicker
                label="Created At"
                id="createdat"
                name="createdat"
                placeholder="Select Date"
                value={createdDate}
                onChange={(date) => {
                  setCreatedDate(date);
                }}
              />
            </div>
            <div className="w-full sm:w-64">
              <InputField
                type="text"
                label="PDF Template Name"
                placeholder="Search by PDF Template Name"
                className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64 text-sm"
                value={searchTemp}
                onChange={(e) => setSearchTemp(e.target.value)}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label={isFetching ? "Searching..." : "Search"}
                disabled={isFetching}
                icon={<IoSearch />}
                onClick={handleSearch}
              />
            </div>
            <div className="w-max-content text-nowrap">
              <UniversalButton
                id="addnewtemplate"
                name="addnewtemplate"
                label="Add Template"
                onClick={() => navigate("/createpdfconverter")}
              />
            </div>
          </div>
          <p className="font-medium text-sm text-blue-800 tracking-wider bg-blue-100 px-2 py-1 rounded-md border border-gray-100 w-max">
            Total Templates:
            <span className="font-semibold"> {totalEmailTemplates} </span>
          </p>
        </div>
      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        <DataTable
          id="dlttemplateTable"
          name="dlttemplateTable"
          col={tableCols}
          rows={tableRows}
          getRowHeight={null}
        />
      )}

      <Dialog
        header={
          viewEmailData ? viewEmailData.templateName : "View PDF Template"
        }
        visible={openViewDialog}
        // style={{ width: "45rem" }}
        onHide={() => setOpenViewDialog(false)}
        draggable={false}
        className="w-[45rem] h-full"
      >
        <div className="overflow-auto border border-gray-200 rounded-lg h-full relative">
          {viewEmailData && (
            <PdfFormatter htmlContent={viewEmailData.templateContent} />
            // viewEmailData.templateContent
          )}
        </div>
      </Dialog>

      <Dialog
        header="Delete PDF Template"
        visible={openDeleteDialog}
        style={{ width: "27rem" }}
        onHide={() => setOpenDeleteDialog(false)}
        draggable={false}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 py-3">
          <CancelOutlinedIcon sx={{ fontSize: 64, color: "#f44336", mb: 1 }} />

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
            <span className="font-semibold text-red-600">permanent</span> and
            cannot be undone.
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
    </div>
  );
};

export default TextToPdfConverter;
