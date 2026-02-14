import React, { useEffect, useState } from 'react'
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";

// ICONS
import { Users, Tag, FileText, CheckCircle } from "lucide-react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// APIS
import { getWabaList, getWabaTemplateDetails, getTemplateDetialsById } from '@/apis/whatsapp/whatsapp';


// COMPONENTS
import AnimatedDropdown from '@/whatsapp/components/AnimatedDropdown';
import CustomTooltip from "@/components/common/CustomTooltip.jsx";
import CarouselPreviewDashbaord from './components/CarouselPreviewDashbaord';


const TemplateType = ({ selectedWaba }) => {
    // const [wabaList, setWabaList] = useState([]);
    // const [selectedWaba, setSelectedWaba] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [templateData, setTemplateData] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);


    // useEffect(() => {
    //     const fetchWabaList = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await getWabaList();
    //             setWabaList(response);
    //         } catch (error) {
    //             toast.error("Error fetching WABA List:", error);
    //         }
    //         setIsLoading(false);
    //     };
    //     fetchWabaList();
    // }, []);


    useEffect(() => {
        if (!selectedWaba?.mobileNo) return;

        const fetchTemplateDetails = async () => {
            try {
                const response = await getWabaTemplateDetails(selectedWaba?.mobileNo);

                const grouped = groupTemplatesByCategory(response);
                setTemplateData(grouped);
            } catch (error) {
                console.error("Error fetching template details:", error);
                toast.error("Error fetching template details");
            }
        };

        fetchTemplateDetails();
    }, [selectedWaba?.mobileNo]);

    const groupTemplatesByCategory = (templates) => {
        const validTemplates = templates.filter((tpl) => tpl.status);
        const categories = {};

        validTemplates.forEach((tpl) => {
            const category = (tpl.category || "UNKNOWN").toUpperCase(); // normalize
            const status = tpl.status.toUpperCase();

            if (!categories[category]) {
                categories[category] = {
                    title: getCategoryIcon(category),
                    templates: [],
                    breakdown: {
                        Approved: 0,
                        Pending: 0,
                        Rejected: 0,
                        Active: 0,
                        Inactive: 0,
                    },
                };
            }

            if (status === "APPROVED") {
                categories[category].breakdown.Approved++;
                if (tpl.is_hide === 0) categories[category].breakdown.Active++;
                else categories[category].breakdown.Inactive++;
            } else if (status === "REJECTED") {
                categories[category].breakdown.Rejected++;
            } else if (status === "PENDING") {
                categories[category].breakdown.Pending++;
            }

            // Only include templates with status we care about
            if (["APPROVED", "REJECTED", "PENDING"].includes(status)) {
                categories[category].templates.push(tpl);
            }
        });

        return Object.entries(categories).map(([category, info]) => {
            const total = info.templates.length; // total templates with valid status
            return {
                title: info.title,
                total,
                color: getCategoryGradient(category),
                width: `w-[${Math.min(total, 100)}%]`,
                breakdown: Object.entries(info.breakdown).map(([label, count]) => ({
                    label,
                    count,
                    color: getStatusColor(label),
                })),
                templates: info.templates,
            };
        });
    };



    const getCategoryIcon = (category) => {
        switch (category.toUpperCase()) {
            case "MARKETING":
                return "📩 Marketing";
            case "UTILITY":
                return "⚙️ Utility";
            case "AUTHENTICATION":
                return "🔒 Authentication";
            default:
                return "📦 Others";
        }
    };

    const getCategoryGradient = (category) => {
        switch (category.toUpperCase()) {
            case "MARKETING":
                return "from-green-700 to-green-300";
            case "UTILITY":
                return "from-green-700 to-green-300";
            case "AUTHENTICATION":
                return "from-green-700 to-green-300";
            default:
                return "from-gray-300 to-gray-200";
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-blue-500";
            case "pending":
                return "bg-yellow-400";
            case "rejected":
                return "bg-red-400";
            case "active":
                return "bg-green-500";
            case "inactive":
                return "bg-red-800";
            default:
                return "bg-gray-400";
        }
    };

    const handleView = async (row) => {
        const wabaAccountId = selectedWaba.wabaAccountId;
        const vendorTemplateId = row.vendorTemplateId;

        try {
            const response = await getTemplateDetialsById(vendorTemplateId); // API call
            if (response) {
                setSelectedRow({ ...row, templateData: response }); // store full template details
            } else {
                toast.error("No matching template found.");
            }
        } catch (error) {
            console.error("Error fetching template data:", error);
            toast.error("Error fetching template preview.");
        }
    };

    const getBtnCss = (type) => {
        switch (type) {
            case "PHONE_NUMBER":
                return "bg-white text-[#128c7e]";
            case "QUICK_REPLY":
                return "bg-white text-[#128c7e]";
            case "FLOW":
                return "bg-white text-[#128c7e]";
            default:
                return "bg-white text-[#128c7e]";
        }
    };

    const getBtnIcon = (type) => {
        switch (type) {
            case "PHONE_NUMBER":
                return <BsTelephoneFill className="mr-2" />;
            case "QUICK_REPLY":
                return <FaReply className="mr-2" />;
            case "FLOW":
                return <AssignmentOutlinedIcon className="mr-2" />;
            default:
                return <FaExternalLinkAlt className="mr-2" />;
        }
    };

    const getBtnTitle = (type, phone, url, text) => {
        switch (type) {
            case "PHONE_NUMBER":
                return `Contact us: ${phone}`;
            case "QUICK_REPLY":
                return `View more: ${text}`;
            case "FLOW":
                return `${text}`;
            default:
                return `Visit us: ${url}`;
        }
    };

    function formatMessageBody(text) {
        if (!text) return "";

        // Bold -> *text*
        let formatted = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

        // Italic -> _text_
        formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");

        // Strikethrough -> ~text~
        formatted = formatted.replace(/~(.*?)~/g, "<del>$1</del>");

        formatted = formatted.replace(/(^- .+(?:\n- .+)*)/gm, (block) => {
            const items = block
                .split("\n")
                .map((line) =>
                    line.replace(
                        /^- (.+)/,
                        `<li class="list-disc"  style=" ; list-style: disc;" >$1</li>`
                    )
                )
                .join("");
            return `<ul style="list-style: disc; padding-left: 1.25rem; margin: 0;">${items}</ul>`;
        });

        return formatted;
    }


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="group relative bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    {/* Hover gradient glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-50 via-blue-50 to-transparent transition-all duration-500" />

                    <div className="p-4 relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between  bg-[#ECE5DD] rounded-2xl">
                            <div className="p-3  text-cyan-700 rounded-2xl shadow-inner flex items-center gap-2">
                                <FileText size={26} />
                                <h3 className=" text-gray-700 text-base font-semibold tracking-wide">
                                    Templates Overview
                                </h3>
                            </div>

                            <div className="flex items-center gap-2 mx-4 bg-gray-100 text-cyan-700 text-xs font-medium px-4 py-2 rounded-full shadow-sm border border-green-800">
                                <span className="font-semibold">Templates</span>
                                <span className="h-4 w-[1px] bg-cyan-300"></span>
                                <span className="flex items-center gap-1">
                                    <span className="font-bold text-cyan-600">Total:</span> {templateData.reduce((sum, section) => sum + section.total, 0)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="text-green-600 font-bold">Active:</span> {templateData.reduce((sum, section) => sum + section.breakdown.find(b => b.label === "Active")?.count || 0, 0)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="text-red-500 font-bold">Inactive:</span> {templateData.reduce((sum, section) => sum + section.breakdown.find(b => b.label === "Inactive")?.count || 0, 0)}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        {/* <div className="flex justify-between items-start">
                            <h3 className="mt-5 text-gray-700 text-base font-semibold tracking-wide">
                                Templates Overview
                            </h3>
                            <p className="text-2xl font-extrabold mt-3 bg-[#128C7E] bg-clip-text text-transparent">
                                {templateData.reduce((sum, section) => sum + section.total, 0)}
                            </p>
                        </div> */}

                        {/* Type Breakdown */}
                        <div className="mt-5 space-y-4">
                            {templateData.map((section, index) => (
                                <div key={index}>
                                    <div
                                        onClick={() =>
                                            setExpandedCategory(expandedCategory === index ? null : index)
                                        }

                                        className={`p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${expandedCategory === index ? "ring-2 ring-[#128C7E]" : ""
                                            }`}
                                    >
                                        {/* Header */}
                                        <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-2">
                                            <span>{section.title}</span>
                                            <span className="text-[#128C7E] font-bold text-sm">{section.total}</span>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                                            <div
                                                className={`h-2 bg-gradient-to-r ${section.color} rounded-full ${section.width}`}
                                            />
                                        </div>

                                        {/* Breakdown section */}
                                        <div className="flex flex-wrap justify-between gap-x-3 gap-y-2 text-xs font-medium text-gray-600 mt-2">
                                            {section.breakdown.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                                                    <span>{item.label}</span>
                                                    <span className="text-gray-700 font-semibold ml-1">
                                                        {item.count}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {expandedCategory === index && (
                                        <div className="mt-2 p-0 bg-gray-50 border border-gray-100 rounded-xl text-sm animate-fadeIn">
                                            {section.templates && section.templates.length > 0 ? (
                                                <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200">

                                                    <table className="w-full text-left border-collapse">
                                                        <thead className="bg-gray-100 sticky top-0 z-10" >
                                                            <tr className="text-gray-600 border-b text-xs uppercase">
                                                                <th className="pb-2 px-3 py-2">Template Name</th>
                                                                <th className="pb-2 px-3 py-2">Status</th>
                                                                <th className="pb-2 px-3 py-2">Created Date</th>
                                                                <th className="pb-2 px-3 py-2">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {section.templates.map((tpl, i) => (
                                                                <tr
                                                                    key={i}
                                                                    className="border-b last:border-0 hover:bg-white transition"
                                                                >
                                                                    <td className="py-2 px-3 font-medium text-gray-800">
                                                                        {tpl.templateName}
                                                                    </td>
                                                                    <td className="py-2 px-3">
                                                                        <span
                                                                            className={`px-2 py-0.5 rounded-full text-xs ${tpl.status === "APPROVED"
                                                                                ? "bg-green-100 text-green-700"
                                                                                : tpl.status === "REJECTED"
                                                                                    ? "bg-red-100 text-red-700"
                                                                                    : "bg-yellow-100 text-yellow-700"
                                                                                }`}
                                                                        >
                                                                            {tpl.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-2 px-3 text-gray-600">
                                                                        {tpl.createdDate.split(" ")[0]}
                                                                    </td>
                                                                    <td className="py-2 px-3 text-gray-600 pl-7">
                                                                        <CustomTooltip title="View Template" placement="top" arrow>
                                                                            <IconButton
                                                                                className="text-xs"
                                                                                onClick={() => handleView(tpl)}
                                                                            >
                                                                                <VisibilityIcon
                                                                                    sx={{
                                                                                        fontSize: "1.2rem",
                                                                                        color: "green",
                                                                                    }}
                                                                                />
                                                                            </IconButton>
                                                                        </CustomTooltip>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm italic">
                                                    No templates available.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        {/* <p className="text-xs text-gray-500 mt-5">
                    Auto-approved WhatsApp templates for all message categories
                </p> */}
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                <div className='flex items-center justify-center'>
                    <div className="modal-content rounded-xl w-100 shadow-xl">
                        <div className="modal-body border-2 p-2 rounded-xl border-gray-200 bg-[#ECE5DD]">
                            {selectedRow?.templateData ? (
                                <>
                                    {/* Document if exists */}
                                    {selectedRow?.templateData?.components?.some(
                                        (comp) => comp.type === "HEADER" && comp.format === "DOCUMENT"
                                    ) && (
                                            <div className="docbox">
                                                <iframe
                                                    src={
                                                        selectedRow?.templateData?.components?.find(
                                                            (comp) => comp.type === "HEADER"
                                                        ).example?.header_handle[0]
                                                    }
                                                    title="Document Preview"
                                                    className="w-full h-64 border border-gray-200 rounded-lg"
                                                />
                                                <a
                                                    href={
                                                        selectedRow?.templateData?.components?.find(
                                                            (comp) => comp.type === "HEADER"
                                                        ).example?.header_handle[0]
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 text-sm hover:underline flex items-center justify-center mt-3"
                                                >
                                                    View Document in new tab
                                                </a>
                                            </div>
                                        )}

                                    {/* Image if exists */}
                                    {selectedRow?.templateData?.components?.some(
                                        (comp) => comp.type === "HEADER" && comp.format === "IMAGE"
                                    ) && (
                                            <div className="imgbox">
                                                <img
                                                    src={
                                                        selectedRow?.templateData?.components?.find(
                                                            (comp) => comp.type === "HEADER"
                                                        ).example?.header_handle[0]
                                                    }
                                                    alt="Template Preview"
                                                    className="h-45 w-full rounded-lg object-fit border border-gray-200"
                                                />
                                            </div>
                                        )}

                                    {/* Video if exist */}
                                    {selectedRow?.templateData?.components?.some(
                                        (comp) => comp.type === "HEADER" && comp.format === "VIDEO"
                                    ) && (
                                            <div className="videobox">
                                                <video
                                                    controls
                                                    src={
                                                        selectedRow?.templateData?.components?.find(
                                                            (comp) => comp.type === "HEADER"
                                                        ).example?.header_handle[0]
                                                    }
                                                    alt="Template Preview"
                                                    className="h-45 w-full rounded-lg object-contain border border-gray-200"
                                                />
                                            </div>
                                        )}

                                    {/* Text Content */}
                                    <div className="contentbox text-sm flex flex-col gap-2 py-2 max-h-80 overflow-scroll scrollbar-hide">
                                        {selectedRow?.templateData?.components?.map(
                                            (component, index) => (
                                                <pre className="text-wrap" key={index}
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatMessageBody(component.text),
                                                    }}
                                                >
                                                    {/* {component.text} */}
                                                </pre>
                                            )
                                        )}
                                    </div>

                                    {/* Carousel if exists */}
                                    {selectedRow?.templateData?.components?.some(
                                        (comp) => comp.type === "CAROUSEL"
                                    ) && (
                                            <CarouselPreviewDashbaord
                                                carouselData={selectedRow?.templateData?.components?.find(
                                                    (comp) => comp.type === "CAROUSEL"
                                                )}
                                            />
                                        )}

                                    {/* Buttons if exists */}
                                    <div className="flex flex-col gap-2">
                                        {selectedRow?.templateData?.components?.some(
                                            (comp) => comp.type === "BUTTONS"
                                        ) &&
                                            selectedRow?.templateData?.components
                                                ?.find((comp) => comp.type === "BUTTONS")
                                                .buttons?.map((btn, index) => (
                                                    <button
                                                        key={index}
                                                        //   title={
                                                        //     btn.type === "PHONE_NUMBER"
                                                        //       ? `Call: ${btn.phone_number}`
                                                        //       : `Visit: ${btn.url}`
                                                        //   }
                                                        title={getBtnTitle(
                                                            btn.type,
                                                            btn.phone_number,
                                                            btn.url,
                                                            btn.text
                                                        )}
                                                        className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-xs shadow-sm cursor-pointer rounded-xl w-full sm:w-auto ${getBtnCss(
                                                            btn.type
                                                        )}`}
                                                        onClick={() =>
                                                            btn.type === "PHONE_NUMBER"
                                                                ? (window.location.href = `tel:${btn.phone_number}`)
                                                                : window.open(btn.url, "_blank")
                                                        }
                                                    >
                                                        {getBtnIcon(btn.type)}
                                                        {btn.text}
                                                    </button>
                                                ))}
                                    </div>
                                </>
                            ) : (
                                <div className="relative flex flex-col items-center justify-center text-center h-[320px] w-full 
  rounded-3xl bg-white/60 backdrop-blur-md border border-blue-100 
  shadow-[0_4px_30px_rgba(0,0,0,0.05)] overflow-hidden group">

                                    {/* Animated Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/40 via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                                    {/* Icon */}
                                    <div className="z-10 bg-gradient-to-tr from-blue-500 to-cyan-400 text-white p-4 rounded-2xl shadow-lg mb-5 animate-bounce-slow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7l9 6 9-6-9-6-9 6zm0 10l9 6 9-6m-9 6V13" />
                                        </svg>
                                    </div>

                                    {/* Heading */}
                                    <h3 className="z-10 text-xl font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                                        No Template Data Available
                                    </h3>

                                    {/* Message */}
                                    <p className="z-10 text-gray-500 text-sm mt-2 max-w-xs leading-relaxed">
                                        You haven’t selected or created any WhatsApp template yet.<br />
                                        Start by choosing a WABA account or adding a new template.
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="z-10 mt-5 px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581M5.214 10.786A8 8 0 0118 8m1.786 5.214A8 8 0 016 16" />
                                        </svg>
                                        Refresh Templates
                                    </button>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default TemplateType
