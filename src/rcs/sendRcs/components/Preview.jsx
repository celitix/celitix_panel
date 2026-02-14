import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ICONS
import {
  FaSmile,
  FaImage,
  FaPlus,
  FaMicrophone,
  FaSignal,
  FaWifi,
  FaBatteryFull,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { TbLocationShare } from "react-icons/tb";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { RiBuildingLine } from "react-icons/ri";
export const Preview = ({
  templateDetails,
  selectedIndex,
  setSelectedIndex,
  inputVariables,
  allAgents,
  campaignDetails,
}) => {
  const [data, setData] = useState({
    type: "text",
    isCarousal: false,
    details: "",
    btnData: [],
  });

  useEffect(() => {
    if (!templateDetails.length) return;

    let type = "text";
    let isCarousal = false;
    const buttonSuggestions = [];

    if (templateDetails.length === 1) {
      type = templateDetails[0]?.templateType || "text";
    } else if (templateDetails.length > 1) {
      isCarousal = true;
      type = templateDetails[0]?.templateType || "image";
    }

    const variable = templateDetails[0]?.content;

    const matchVar = variable?.match(/{#(.+?)#}/g);

    const variableValueMap = matchVar?.reduce((acc, key, index) => {
      acc[key] = inputVariables[index];
      return acc;
    }, {});

    const replacedContent = variable?.replace(
      /{#(.*?)#}/g,
      (_, key) => variableValueMap[`{#${key}#}`] || `{#${key}#}`
    );

    let url = "";

    if (
      templateDetails[0]?.templateType === "text_message_with_pdf" &&
      templateDetails[0]["pdfBase64 "]
    ) {
      const base64PDF = templateDetails[0]["pdfBase64 "] || "";
      const byteCharacters = atob(base64PDF);
      const byteNumbers = Array.from(byteCharacters).map((c) =>
        c.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      url = URL.createObjectURL(blob);
    }

    setData({
      type,
      isCarousal,
      details: templateDetails,
      btnData: buttonSuggestions,
      replacedContent,
      pdfUrl: url,
      ...templateDetails[0],
    });
  }, [templateDetails, inputVariables]);

  const getBtnStyle = (type) => {
    const baseStyle =
      "text-blue-500 text-sm border-b border-gray-200 space-x-1";
    switch (type) {
      case "reply button":
      case "website":
      case "mobile":
      case "view location":
      case "share location":
        return baseStyle;
      default:
        return "";
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "reply button":
        return <FaReply />;
      case "website":
        return <FaExternalLinkAlt />;
      case "mobile":
        return <BsTelephoneFill />;
      case "view location":
        return <FaLocationCrosshairs />;
      case "share location":
        return <TbLocationShare />;
      default:
        return null;
    }
  };

  return (
    <div className="smartphone">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
        <div>9:30</div>
        <div className="w-4 h-4 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <FaSignal className="text-[10px]" />
          <FaWifi className="text-[10px]" />
          <FaBatteryFull className="text-[12px]" />
        </div>
      </div>

      {/* <div className="flex justify-center items-center mt-2 p-2">
        <div className="relative">
          <img
            src="src/assets/icons/CELITIX FAVICON2.png"
            alt=""
            className="size-15"
          />
          <div className="absolute -bottom-1 -right-2">
            <VerifiedUserIcon
              sx={{
                color: "rgb(48, 111, 219)",
              }}
            />
          </div>
        </div>
      </div> */}

      <div className="smartphone-content">
        {!data.isCarousal ? (
          <div className="rounded-md border px-1">
            {data.type !== "text" && (
              <div className="mb-2 w-full h-35">
                {data.type === "image" ? (
                  <img
                    src={data?.details[0]?.imageUrl}
                    alt="Uploaded content"
                    className="h-full w-full"
                  />
                ) : data?.type === "video" ? (
                  <video
                    controls
                    src={data?.details[0]?.imageUrl}
                    className="w-full overflow-x-hidden"
                  />
                ) : (
                  <embed
                    src={data.pdfUrl}
                    type={"application/pdf"}
                    className="w-full overflow-x-hidden"
                  />
                )}
              </div>
            )}
            {data.contentTitle && (
              <p className="font-semibold ml-1">{data.contentTitle}</p>
            )}
            <div className="overflow-y-scroll max-h-[250px] text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
              <p>{data?.replacedContent}</p>
            </div>
            {data?.details[0]?.suggestions?.length > 0 && (
              <div className="grid grid-cols-1 w-full max-w-[500px]">
                {data?.details[0]?.suggestions?.map((item, index) => {
                  return (
                    <button
                      key={index}
                      title={item.suggestionValue}
                      className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                        item.type
                      )}`}
                    >
                      {getBtnIcon(item.type)}
                      <p className="ml-2">{item.suggestionTitle}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            renderArrowPrev={() => null}
            renderArrowNext={() => null}
            selectedItem={selectedIndex}
            renderIndicator={(onClickHandler, isSelected, index) => {
              const indicatorClass = isSelected
                ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
                : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";
              return (
                <li
                  key={index}
                  className={`inline-block ${indicatorClass}`}
                  onClick={() => {
                    onClickHandler();
                    setSelectedIndex(index);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Slide ${index + 1}`}
                />
              );
            }}
          >
            {data?.details.map((item, index) => {
              const type = item?.templateType?.toLowerCase();
              return (
                <>
                  <div key={index} className="text-start p-2">
                    {item.imageUrl &&
                      (type === "image" ? (
                        <img
                          src={item.imageUrl}
                          alt={item.contentTitle}
                          className="h-30 p-1 rounded-xl"
                        />
                      ) : type === "video" ? (
                        <video
                          src={item.imageUrl}
                          controls
                          className="rounded-xl w-full"
                        />
                      ) : null)}
                    <p className="text-md text-start p-2">
                      {item.contentTitle}
                    </p>
                    <div className="overflow-y-scroll max-h-[150px] max-w-[525px] p-1 break-words whitespace-pre-wrap rounded-md border min-h-[50px] text-sm">
                      <pre className="p-1 break-words whitespace-pre-wrap rounded-md">
                        {item.content}
                      </pre>
                    </div>
                  </div>
                  {item.suggestions && (
                    <div className="flex flex-wrap gap-2 flex-col w-full max-w-[500px] mt-2 min-h-40">
                      {item.suggestions?.map((item, index) => (
                        <button
                          key={index}
                          title={item.suggestionValue}
                          className={`flex items-center justify-center cursor-pointer px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                            item.type
                          )}`}
                        >
                          {getBtnIcon(item.type)}
                          <p className="ml-2">{item.suggestionTitle}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            })}
          </Carousel>
        )}
      </div>

      <div className="flex items-center justify-between px-2 py-1 rounded-full bg-white shadow-sm w-66 max-w-md mx-auto my-2">
        <div className="flex items-center flex-1 px-2 gap-2">
          <FaSmile className="text-gray-500 text-sm" />
          <input
            readOnly
            type="text"
            placeholder="RCS message"
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent w-24 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 px-2">
          <FaReply className="text-gray-600 text-sm" />
          <FaImage className="text-gray-600 text-sm" />
          <FaPlus className="text-gray-600 text-sm" />
        </div>
        <div className="ml-2 p-2 bg-green-200 rounded-full hover:bg-green-300 transition duration-200 cursor-pointer">
          <FaMicrophone className="text-green-800 text-sm" />
        </div>
      </div>
    </div>

    // <div className="mx-auto relative w-[300px] h-[580px] bg-black rounded-[3rem] shadow-2xl p-2 mb-5">
    //   {/* Phone inner */}
    //   <div className="relative w-full h-full bg-white rounded-[2.6rem] overflow-hidden flex flex-col">
    //     {/* Notch */}
    //     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50" />
    //     {/* Top bar */}
    //     <div className="flex items-center justify-between px-4 py-2 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
    //       <div>9:30</div>
    //       <div className="w-4 h-4 bg-black rounded-full" />
    //       <div className="flex items-center gap-1">
    //         <FaSignal className="text-[10px]" />
    //         <FaWifi className="text-[10px]" />
    //         <FaBatteryFull className="text-[12px]" />
    //       </div>
    //     </div>

    //     <div className="smartphone-content">
    //       {/* Phone Top Header */}
    //       <div className=" z-40">
    //         <div className="flex items-center justify-between px-4 py-3 bg-[#E0E0E0] text-black ">
    //           {/* Left Section */}
    //           <div className="flex items-center gap-3">
    //             {/* Back Arrow */}
    //             <button className="text-black">
    //               <FaArrowLeft />
    //             </button>

    //             {/* Avatar */}
    //             <div className="w-8 h-8 flex items-center justify-center rounded-full border border-black/30">
    //               <RiBuildingLine className="text-sm text-gray-700" />
    //             </div>

    //             {/* Name */}
    //             <span className="text-sm font-semibold tracking-tight">
    //               {allAgents.find(
    //                 (agent) => agent.agent_id === campaignDetails.agent
    //               )?.agent_name || "Agent"}
    //             </span>
    //           </div>

    //           {/* Right Section */}
    //           <div className="flex items-center gap-4">
    //             {/* Shield / Verified */}
    //             <svg
    //               className="w-5 h-5 text-black/90"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path d="M12 2l7 4v6c0 5-3.5 9.7-7 10-3.5-.3-7-5-7-10V6l7-4z" />
    //             </svg>

    //             {/* More menu */}
    //             <svg
    //               className="w-5 h-5 text-black/90"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <circle cx="12" cy="5" r="2" />
    //               <circle cx="12" cy="12" r="2" />
    //               <circle cx="12" cy="19" r="2" />
    //             </svg>
    //           </div>
    //         </div>
    //       </div>

    //       {!data.isCarousal ? (
    //         <div className="rounded-md border border-transparent px-1 bg-gray-100">
    //           {data.type !== "text" && (
    //             <div className="mb-3 w-full bg-gray-100 rounded-xl overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none]">
    //               {data.type === "image" ? (
    //                 <img
    //                   src={data?.details[0]?.imageUrl}
    //                   alt="Uploaded content"
    //                   className="w-full object-cover "
    //                 />
    //               ) : data?.type === "video" ? (
    //                 <video
    //                   controls
    //                   src={data?.details[0]?.imageUrl}
    //                   className="w-full "
    //                 />
    //               ) : (
    //                 <div className="h-40 bg-gray-50 flex items-center justify-center ">
    //                   <embed
    //                     src={data.pdfUrl}
    //                     type="application/pdf"
    //                     className="w-full h-full "
    //                   />
    //                 </div>
    //               )}
    //             </div>
    //           )}

    //           {data.contentTitle && (
    //             <p className="font-semibold ml-1">{data.contentTitle}</p>
    //           )}
    //           <div className="max-h-[100px] overflow-y-auto px-3 py-2 rounded-xl bg-green-50 text-[13px] text-gray-800 leading-relaxed h-full">
    //             <p className="break-words whitespace-pre-wrap">
    //               {data?.replacedContent}
    //             </p>
    //           </div>

    //           {data?.details[0]?.suggestions?.length > 0 && (
    //             <div className="z-20">
    //               <div className="bg-white rounded-t-2xl">
    //                 <div className="space-y-2 overflow-y-auto">
    //                   {data.details[0].suggestions.map((item, index) => (
    //                     <button
    //                       key={index}
    //                       title={item.suggestionValue}
    //                       className="
    //                               w-full flex items-center justify-center
    //                               px-4 py-1.5
    //                               bg-blue-100
    //                               rounded-xl
    //                               text-sm font-semibold text-gray-700
    //                               hover:bg-gray-100
    //                               transition
    //                             "
    //                     >
    //                       <span className="flex items-center gap-2">
    //                         <span className="text-blue-500  text-xs ">
    //                           {getBtnIcon(item.type)}
    //                         </span>
    //                         {item.suggestionTitle}
    //                       </span>
    //                     </button>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       ) : (
    //         <Carousel
    //           showThumbs={false}
    //           showStatus={false}
    //           infiniteLoop
    //           useKeyboardArrows
    //           renderArrowPrev={() => null}
    //           renderArrowNext={() => null}
    //           selectedItem={selectedIndex}
    //           renderIndicator={(onClickHandler, isSelected, index) => {
    //             const indicatorClass = isSelected
    //               ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
    //               : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";
    //             return (
    //               <li
    //                 key={index}
    //                 className={`inline-block ${indicatorClass}`}
    //                 onClick={() => {
    //                   onClickHandler();
    //                   setSelectedIndex(index);
    //                 }}
    //                 role="button"
    //                 tabIndex={0}
    //                 aria-label={`Slide ${index + 1}`}
    //               />
    //             );
    //           }}
    //         >
    //           {data?.details.map((item, index) => {
    //             const type = item?.templateType?.toLowerCase();
    //             return (
    //               <>
    //                 <div key={index} className="text-start p-2">
    //                   {item.imageUrl &&
    //                     (type === "image" ? (
    //                       <img
    //                         src={item.imageUrl}
    //                         alt={item.contentTitle}
    //                         className="h-30 p-1 rounded-xl"
    //                       />
    //                     ) : type === "video" ? (
    //                       <video
    //                         src={item.imageUrl}
    //                         controls
    //                         className="rounded-xl w-full"
    //                       />
    //                     ) : null)}
    //                   <p className="text-md text-start p-2">
    //                     {item.contentTitle}
    //                   </p>
    //                   <div className="max-h-[160px] overflow-y-auto px-3 py-2 rounded-xl bg-gray-50 text-[13px] text-gray-700 leading-relaxed shadow-inner scrollbar-hide">
    //                     <pre className="break-words whitespace-pre-wrap font-sans">
    //                       {item.content}
    //                     </pre>
    //                   </div>
    //                 </div>
    //                 {item.suggestions && (
    //                   <div className="flex flex-wrap gap-2 flex-col w-full  mt-2 min-h-15">
    //                     {item.suggestions?.map((item, index) => (
    //                       <button
    //                         key={index}
    //                         title={item.suggestionValue}
    //                         className="w-full flex items-center justify-center px-4 py-2 bg-blue-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
    //                       >
    //                         {getBtnIcon(item.type)}
    //                         <p className="ml-2">{item.suggestionTitle}</p>
    //                       </button>
    //                     ))}
    //                   </div>
    //                 )}
    //               </>
    //             );
    //           })}
    //         </Carousel>
    //       )}
    //     </div>
    //     {/* Bottom Input Bar */}
    //     <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 bg-transparent">
    //       <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1f1f1f]/90 backdrop-blur-md shadow-lg">
    //         {/* Plus */}
    //         <button className="text-gray-300 hover:text-white transition">
    //           <FaPlus className="text-sm" />
    //         </button>

    //         {/* Input */}
    //         <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2a]">
    //           <span className="text-gray-200 text-xs">RCS message</span>
    //         </div>

    //         {/* Emoji */}
    //         <button className="text-gray-300 hover:text-white transition">
    //           <FaSmile className="text-sm" />
    //         </button>

    //         {/* Image */}
    //         <button className="text-gray-300 hover:text-white transition">
    //           <FaImage className="text-sm" />
    //         </button>

    //         {/* Mic */}
    //         <button className="ml-1 p-2 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a] transition">
    //           <FaMicrophone className="text-white text-sm" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
