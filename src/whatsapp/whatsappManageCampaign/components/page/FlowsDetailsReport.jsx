import react, { useEffect } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import usePagination from "@mui/material/usePagination";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import { motion } from "framer-motion";

// ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RiCloseLine } from "react-icons/ri";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { getMainJson } from "@/apis/whatsapp/whatsapp.js";

// COMPONENTS
import PreviewMobilePanel from "@/whatsapp/whatsappFlows/components/PreviewMobilePanel";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                key={index}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: "27px" }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                key={index}
                variant="outlined"
                size="small"
                {...item}
                sx={{}}
              >
                {type === "previous" ? "Previous" : "Next"}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>
    </Box>
  );
};

const FlowsDetailsReport = ({ id, name }) => {
  const location = useLocation();

  const { data = [], matchedFlow = null } = location.state || {};

  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [mainJsonContent, setMainJsonContent] = useState([]);
  const [screenData, setScreenData] = useState([]);

  useEffect(() => {
    if (!matchedFlow?.srNo) return;

    const handleFetchGetMainJson = async () => {
      try {
        const res = await getMainJson(matchedFlow.srNo);
        const parsedJson = JSON.parse(res?.data?.[0]?.mainJson);

        const extractedScreens = [];
        const extractedComponents = [];

        parsedJson?.screens?.forEach((screen) => {
          screen?.layout?.children?.forEach((item) => {
            switch (item.type) {
              case "TextHeading":
                extractedComponents.push({
                  type: "TextHeading",
                  text: item.text,
                });
                break;

              case "ChipsSelector":
                extractedComponents.push({
                  type: "ChipsSelector",
                  name: item.name,
                  label: item.label,
                  description: item.description,
                  required: item.required,
                  maxSelected: item["max-selected-items"],
                  options: item["data-source"]?.map((opt) => ({
                    id: opt.id,
                    title: opt.title,
                  })),
                });
                break;

              case "Dropdown":
                extractedComponents.push({
                  type: "Dropdown",
                  name: item.name,
                  label: item.label,
                  required: item.required,
                  options: item["data-source"]?.map((opt) => ({
                    id: opt.id,
                    title: opt.title,
                    description: opt.description,
                    metadata: opt.metadata,
                  })),
                });
                break;

              case "DocumentPicker":
                extractedComponents.push({
                  type: "DocumentPicker",
                  name: item.name,
                  label: item.label,
                  description: item.description,
                  min: item["min-uploaded-documents"],
                  max: item["max-uploaded-documents"],
                });
                break;

              case "CalendarPicker":
                extractedComponents.push({
                  type: "CalendarPicker",
                  name: item.name,
                  label: item.label,
                  mode: item.mode,
                  minDate: item["min-date"],
                  maxDate: item["max-date"],
                  unavailableDates: item["unavailable-dates"],
                  helperText: item["helper-text"],
                  required: item.required,
                });
                break;

              case "RichText":
                extractedComponents.push({
                  type: "RichText",
                  name: item.name,
                  label: item.label,
                  text: item.text,
                  content: item.content,
                });
                break;

              case "CheckboxGroup":
                extractedComponents.push({
                  type: "CheckboxGroup",
                  name: item.name,
                  label: item.label,
                  options: item.options,
                  content: item.content,
                });
                break;

              case "RadioButtonsGroup":
                extractedComponents.push({
                  type: "RadioButtonsGroup",
                  name: item.name,
                  label: item.label,
                  options: item.options,
                  content: item.content,
                });
                break;

              case "Embeddedlink":
                extractedComponents.push({
                  type: "Embeddedlink",
                  text: item.text,
                });
                break;

              case "optin":
                extractedComponents.push({
                  type: "optin",
                  label: item.label,
                  checked: item.checked,
                });
                break;

              case "Image":
                extractedComponents.push({
                  type: "Image",
                  src: item.src,
                  checked: item.checked,
                });
                break;

              case "DocumentPicker":
                extractedComponents.push({
                  type: "DocumentPicker",
                  label: item.label,
                  description: item.description,
                  min: item.min,
                  max: item.max,
                });
                break;

              case "Media":
                extractedComponents.push({
                  type: "Media",
                  label: item.label,
                  description: item.description,
                  "min-uploaded-photos": item["min-uploaded-photos"],
                  "max-uploaded-photos": item["max-uploaded-photos"],
                });
                break;

              case "ImageCarousel":
                extractedComponents.push({
                  type: "ImageCarousel",
                  images: item.images,
                });
                break;

              case "Footer":
                extractedComponents.push({
                  type: "Footer",
                  label: item.label,
                  centerCaption: item["center-caption"],
                  action: item["on-click-action"],
                });
                break;

              default:
                break;
            }
          });

          // SCREEN DATA STORED HERE
          extractedScreens.push({
            screenId: screen.id,
            screenTitle: screen.title,
            terminal: screen.terminal,
            components: extractedComponents,
          });
        });

        setMainJsonContent(extractedComponents);
        setScreenData(extractedScreens);
      } catch (e) {
        console.error("Error while fetching main json", e);
      }
    };

    handleFetchGetMainJson();
  }, [matchedFlow?.srNo]);

  // Generate dynamic columns
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Base columns
    let cols = [
      { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
      {
        field: "mobile_no",
        headerName: "Mobile Number",
        flex: 1,
        minWidth: 150,
      },
    ];

    // Add dynamic columns from first row's fields
    const dynamicFields = data[0].fields || [];
    dynamicFields.forEach((field, idx) => {
      cols.push({
        field: `field_${idx}`,
        headerName: field.label,
        flex: 1,
        minWidth: 150,
      });
    });

    return cols;
  }, [data]);

  // Generate rows
  const rows = useMemo(() => {
    return (
      data?.map((item, index) => {
        let row = {
          sn: index + 1,
          id: index + 1, // or item.UserSrno if available
          mobile_no: item.mobile_no,
        };

        // Map field inputs dynamically
        item.fields?.forEach((f, idx) => {
          row[`field_${idx}`] = f.input;
        });

        return row;
      }) || []
    );
  }, [data]);

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", lg: "space-between" },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}
          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows.length}</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <div>
      <h1 className="my-4 text-lg font-medium text-center">
        WhatsApp Flows Details Reports
      </h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Paper sx={{ height: 400 }} id={id} name={name}>
            <DataGrid
              id={id}
              name={name}
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 50]}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              rowHeight={50}
              slots={{
                footer: CustomFooter,
                pagination: () => (
                  <CustomPagination
                    totalPages={totalPages}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                  />
                ),
              }}
              onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
              disableRowSelectionOnClick
              disableColumnResize
              disableColumnMenu
              sx={{
                border: 0,
                "& .MuiDataGrid-columnHeaders": {
                  color: "#193cb8",
                  fontSize: "14px",
                  fontWeight: "bold !important",
                },
                "& .MuiDataGrid-row--borderBottom": {
                  backgroundColor: "#e6f4ff !important",
                },
              }}
            />
          </Paper>
        </div>
        <div className="col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative h-[690px] w-[320px] mx-auto rounded-[3rem] border-[5px] border-slate-900 bg-[#F0F2F5] overflow-hidden shadow-2xl ring-0 ring-slate-800"
          >
            <div className="bg-[#128C7E] text-white pt-6 pb-3 px-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <RiCloseLine className="text-xl opacity-80 cursor-pointer" />
                <span className="text-xs font-medium tracking-tight truncate max-w-[180px]">
                  {screenData[0]?.screenTitle || "WhatsApp Flow"}
                </span>
                <div className="w-5" /> {/* Spacer */}
              </div>
            </div>
            {/* <div className="flex flex-col gap-4 p-2 h-full overflow-auto hide-scrollbar pb-37"> */}
            <div className="h-[calc(100%-140px)] overflow-y-auto hide-scrollbar bg-white rounded-t-2xl mt-[-10px] shadow-inner p-4 space-y-5">
              {mainJsonContent?.map((item, index) => {
                switch (item.type) {
                  // Render Heading
                  case "TextHeading":
                    return (
                      <h1
                        key={index}
                        className="text-xl font-bold text-slate-900 leading-tight"
                      >
                        {item.text}
                      </h1>
                    );

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
                    return (
                      <p
                        key={index}
                        className="text-sm text-slate-600 leading-relaxed"
                      >
                        {item.text}
                      </p>
                    );

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

                  case "TextInput":
                  case "TextArea":
                    const isTextArea = item.type === "TextArea";

                    return (
                      <div key={index} className="flex flex-col w-full group">
                        {/* Label: Minimal, bold, and using the brand color */}
                        {item.label && (
                          <label className="text-[11px] font-bold text-[#128C7E] mb-1 ml-1 uppercase tracking-wider">
                            {item.label}
                            {item.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
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
                            <p
                              className={`text-[10px] font-medium tracking-tight ${item.required && !item.value?.trim() ? "text-red-500" : "text-slate-400"}`}
                            >
                              {item.required && !item.value?.trim()
                                ? item["error-message"]
                                : item["helper-text"]}
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
                        `<img$1 class="w-30 h-30 rounded-full object-cover border">`,
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

                  case "CheckboxGroup":
                  case "RadioButtonsGroup":
                    return (
                      <div key={index} className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {item.label}
                        </p>
                        <div className="space-y-2">
                          {item.options?.map((opt, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center gap-3">
                                {opt.image && (
                                  <img
                                    src={`data:image/png;base64,${opt.image}`}
                                    className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                                  />
                                )}
                                <div>
                                  <p className="text-sm font-semibold text-slate-800">
                                    {opt.title}
                                  </p>
                                  <p className="text-[11px] text-slate-500">
                                    {opt.description}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-2 ${item.type === "RadioButtonsGroup" ? "rounded-full" : "rounded-md"} border-slate-300`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );

                  case "Dropdown":
                    const isOpen = openDropdownIndex === index;
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-1.5 w-full relative"
                      >
                        <label className="text-[12px] font-bold text-slate-500 ml-1 uppercase">
                          {item.label}
                        </label>
                        <div
                          onClick={() =>
                            setOpenDropdownIndex(isOpen ? null : index)
                          }
                          className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex justify-between cursor-pointer"
                        >
                          <span
                            className={
                              item.selected
                                ? "text-slate-800"
                                : "text-slate-400"
                            }
                          >
                            {item.options?.find(
                              (opt) => opt.id === item.selected,
                            )?.title || "Select..."}
                          </span>
                          <svg
                            className={`w-5 h-5 transform ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>

                        {/* Inline Menu */}
                        {isOpen && (
                          <div className="absolute top-[100%] left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl z-10 overflow-hidden">
                            {item.options?.map((opt) => (
                              <div
                                key={opt.id}
                                className="px-4 py-3 hover:bg-slate-50 text-sm cursor-pointer border-b last:border-0"
                                onClick={() => {
                                  onUpdateItem(index, (prev) => ({
                                    ...prev,
                                    selected: opt.id,
                                  }));
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

                  case "ChipsSelector":
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-3 w-full my-2"
                      >
                        <div className="flex justify-between items-end px-1">
                          <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                            {item.label || "Categories"}
                          </label>
                          <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                            {item.selected?.length || 0}/2
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.options.map((option, i) => {
                            const isSelected = (item.selected || []).includes(
                              option.title,
                            );
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  handleChipOptionClick(index, option.title)
                                }
                                className={`px-4 py-2 rounded-full text-[13px] font-semibold border-2 transition-all duration-200 shadow-sm ${
                                  isSelected
                                    ? "bg-[#128C7E] text-white border-[#128C7E] scale-105"
                                    : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
                                }`}
                              >
                                {option.title}
                                {isSelected && (
                                  <span className="ml-1.5 opacity-80">✕</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {item.selected?.length > 0 && (
                          <p className="text-[11px] text-[#128C7E] italic ml-1 font-medium italic">
                            You have selected {item.selected.join(", ")}
                          </p>
                        )}
                      </div>
                    );

                  case "Footer":
                    const centerCaption =
                      item["center-caption"] || "center caption";
                    const buttonLabel = item.label || "Click me";

                    return (
                      <div className="w-full flex items-center justify-center">
                        <div className="w-full text-center p-5 bottom-0 absolute bg-gray-200 h-24 rounded-lg flex flex-col items-center justify-center">
                          <p className="text-xs pb-2 mt-4">{centerCaption}</p>
                          <button className="w-full bg-green-700 text-white py-1 rounded-full hover:bg-green-800 transition-all text-sm">
                            {buttonLabel}
                          </button>
                          <p className="text-xs text-gray-500 my-2">
                            {/* {`Managed by ${currentRow?.channel}` ||
                            "Managed by business"} */}
                            {/* <a href="#" className="text-blue-600 hover:underline">
                        Learn more
                      </a> */}
                          </p>
                        </div>
                      </div>
                    );

                  case "Embeddedlink":
                    return (
                      <div className="text-green-500">{item.text || ""}</div>
                    );

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
                              <strong>Alt Text:</strong>{" "}
                              {item["alt-text"] || "-"}
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
                              Min Documents: {item.min || ""} | Max Documents:{" "}
                              {item.max || ""}
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
                              Min Photos: {item["min-uploaded-photos"] || ""} |
                              Max Photos: {item["max-uploaded-photos"] || ""}
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
                              className={`absolute top-0 left-0 w-full h-full object-${scaleType} transition-opacity duration-300 ${
                                idx === currentIndex
                                  ? "opacity-100"
                                  : "opacity-0"
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
                                      (prev - 1 + images.length) %
                                      images.length,
                                  )
                                }
                              >
                                ‹
                              </button>
                              <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                                onClick={() =>
                                  setCurrentIndex(
                                    (prev) => (prev + 1) % images.length,
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

                  // case "Calendar":
                  //   return (
                  //     <div className="w-full px-3 py-2">
                  //       {item.mode === "range" ? (
                  //         <div className="space-y-4">
                  //           {/* Start Date */}
                  //           <div className="w-full">
                  //             <label className="block text-sm font-medium text-gray-700 mb-1">
                  //               {/* {item.label?.start-date || "Start Date"} */}
                  //             </label>
                  //             <UniversalDatePicker
                  //               selected={
                  //                 item.unavailableDates[0]
                  //                   ? new Date(item.unavailableDates[0])
                  //                   : null
                  //               }
                  //               onChange={(date) =>
                  //                 onUpdateItem &&
                  //                 onUpdateItem(index, (prevItem) => ({
                  //                   ...prevItem,
                  //                   value: {
                  //                     ...prevItem.value,
                  //                     "start-date": date
                  //                       ?.toISOString()
                  //                       .split("T")[0],
                  //                   },
                  //                 }))
                  //               }
                  //               placeholderText="Select start date"
                  //               minDate={
                  //                 item["min-date"]
                  //                   ? new Date(item["min-date"])
                  //                   : undefined
                  //               }
                  //               maxDate={
                  //                 item["max-date"]
                  //                   ? new Date(item["max-date"])
                  //                   : undefined
                  //               }
                  //               unavailableDate={
                  //                 Array.isArray(item["unavailable-dates"])
                  //                   ? item["unavailable-dates"].map(
                  //                       (d) => new Date(d),
                  //                     )
                  //                   : undefined
                  //               }
                  //               dateFormat="yyyy-MM-dd"
                  //               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                  //             />
                  //             {item["helper-text"]?.["start-date"] && (
                  //               <p className="text-xs text-gray-500 mt-1">
                  //                 {item["helper-text"]["start-date"]}
                  //               </p>
                  //             )}
                  //           </div>

                  //           {/* End Date */}
                  //           <div className="w-full">
                  //             <label className="block text-sm font-medium text-gray-700 mb-1">
                  //               {item.label?.end-date || "End Date"}
                  //             </label>
                  //             <UniversalDatePicker
                  //               selected={
                  //                 item.value?.["end-date"]
                  //                   ? new Date(item.value["end-date"])
                  //                   : null
                  //               }
                  //               onChange={(date) =>
                  //                 onUpdateItem &&
                  //                 onUpdateItem(index, (prevItem) => ({
                  //                   ...prevItem,
                  //                   value: {
                  //                     ...prevItem.value,
                  //                     "end-date": date
                  //                       ?.toISOString()
                  //                       .split("T")[0],
                  //                   },
                  //                 }))
                  //               }
                  //               placeholderText="Select end date"
                  //               minDate={
                  //                 item["min-date"]
                  //                   ? new Date(item["min-date"])
                  //                   : undefined
                  //               }
                  //               maxDate={
                  //                 item["max-date"]
                  //                   ? new Date(item["max-date"])
                  //                   : undefined
                  //               }
                  //               unavailableDate={
                  //                 Array.isArray(item["unavailable-dates"])
                  //                   ? item["unavailable-dates"].map(
                  //                       (d) => new Date(d),
                  //                     )
                  //                   : undefined
                  //               }
                  //               dateFormat="yyyy-MM-dd"
                  //               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                  //             />
                  //             {item["helper-text"]?.["end-date"] && (
                  //               <p className="text-xs text-gray-500 mt-1">
                  //                 {item["helper-text"]["end-date"]}
                  //               </p>
                  //             )}
                  //           </div>
                  //         </div>
                  //       ) : (
                  //         <div className="w-full">
                  //           <label className="block text-sm font-medium text-gray-700 mb-1">
                  //             {item.label || "Date"}
                  //           </label>
                  //           <UniversalDatePicker
                  //             selected={item.value ? new Date(item.value) : null}
                  //             onChange={(date) =>
                  //               onUpdateItem &&
                  //               onUpdateItem(index, (prevItem) => ({
                  //                 ...prevItem,
                  //                 value: date?.toISOString().split("T")[0],
                  //               }))
                  //             }
                  //             placeholderText={
                  //               item.placeholder || "Select a date"
                  //             }
                  //             minDate={
                  //               item["min-date"]
                  //                 ? new Date(item["min-date"])
                  //                 : undefined
                  //             }
                  //             maxDate={
                  //               item["max-date"]
                  //                 ? new Date(item["max-date"])
                  //                 : undefined
                  //             }
                  //             unavailableDate={
                  //               Array.isArray(item["unavailable-dates"])
                  //                 ? item["unavailable-dates"].map(
                  //                     (d) => new Date(d),
                  //                   )
                  //                 : undefined
                  //             }
                  //             dateFormat="yyyy-MM-dd"
                  //             className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                  //           />
                  //           {item["helper-text"] && (
                  //             <p className="text-xs text-gray-500 mt-1">
                  //               {item["helper-text"]}
                  //             </p>
                  //           )}
                  //         </div>
                  //       )}
                  //     </div>
                  //   );

                  case "DatePicker":
                  case "CalendarPicker":
                    const isRange = item.mode === "range";

                    // Helper to render a single date field
                    const renderDateField = (
                      label,
                      value,
                      helperText,
                      isRequired,
                    ) => (
                      <div className="flex flex-col flex-1 gap-1.5 group">
                        <label className="text-[11px] font-bold text-[#128C7E] ml-1 uppercase tracking-wider">
                          {label}
                          {isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>

                        <div className="relative flex items-center w-full h-[52px] bg-slate-50 border-b-[1.5px] border-slate-300 rounded-t-lg px-4 transition-all group-hover:border-slate-400">
                          <span
                            className={`text-[15px] ${value ? "text-slate-800 font-medium" : "text-slate-400 font-normal"}`}
                          >
                            {value
                              ? new Date(value).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "Select date"}
                          </span>

                          {/* Calendar Icon */}
                          <svg
                            className="absolute right-4 w-5 h-5 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
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
                      <div
                        key={index}
                        className="w-full flex flex-col gap-4 py-1"
                      >
                        {isRange ? (
                          <div className="flex flex-col gap-3 w-full">
                            {/* Start Date */}
                            {renderDateField(
                              item.label?.["start-date"] || "Start Date",
                              item.value?.["start-date"],
                              item["helper-text"]?.["start-date"],
                              item.required?.["start-date"],
                            )}
                            {/* End Date */}
                            {renderDateField(
                              item.label?.["end-date"] || "End Date",
                              item.value?.["end-date"],
                              item["helper-text"]?.["end-date"],
                              item.required?.["end-date"],
                            )}
                          </div>
                        ) : (
                          /* Single Date Picker */
                          renderDateField(
                            item.label || "Select Date",
                            item.value,
                            item["helper-text"],
                            item.required,
                          )
                        )}

                        {/* Constraints Info (Min/Max/Unavailable) - Optional subtle footer */}
                        {(item["min-date"] || item["max-date"]) && (
                          <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 opacity-60">
                            {item["min-date"] && (
                              <span className="text-[9px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                                From:{" "}
                                {new Date(
                                  item["min-date"],
                                ).toLocaleDateString()}
                              </span>
                            )}
                            {item["max-date"] && (
                              <span className="text-[9px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                                To:{" "}
                                {new Date(
                                  item["max-date"],
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlowsDetailsReport;
