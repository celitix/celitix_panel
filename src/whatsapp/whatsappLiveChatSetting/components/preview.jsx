// // ICONS
// import { WhatsApp } from "@mui/icons-material";
// import { BsTelephoneFill } from "react-icons/bs";
// import { TbLocationShare } from "react-icons/tb";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { FaReply } from "react-icons/fa6";
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// export const Preview = ({ specificTemplate, variablesData, basicDetails }) => {
//   const getBtnIcon = (type) => {
//     switch (type) {
//       case "phoneDisplay":
//         return <BsTelephoneFill className="mr-2" />;
//       case "replyButtons":
//         return <FaReply className="mr-2" />;
//       case "isFlow":
//         return <AssignmentOutlinedIcon className="mr-2" />;
//       default:
//         return <FaExternalLinkAlt className="mr-2" />;
//     }
//   };

//   const getBtnCss = (type) => {
//     switch (type) {
//       case "phoneDisplay":
//         return "bg-white text-[#128c7e]";
//       case "replyButtons":
//         return "bg-white text-[#128c7e]";
//       case "isFlow":
//         return "bg-white text-[#128c7e]";
//       default:
//         return "bg-white text-[#128c7e]";
//     }
//   };

//   const getBtnTitle = (type, phone, url, text) => {
//     switch (type) {
//       case "phoneDisplay":
//         return `Contact us: ${phone}`;
//       case "replyButtons":
//         return `View more: ${text}`;
//       case "FLOW":
//         return `${text}`;
//       default:
//         return `Visit us: ${url}`;
//     }
//   };

//   const MediaRenderer = ({ format, fileUrl, fallbackUrl }) => {
//     if (format === "image") {
//       return (
//         <div className="w-[10rem] m-auto">
//           <img
//             src={fileUrl || fallbackUrl}
//             alt="Template"
//             className="object-contain"
//           />
//         </div>
//       );
//     }
//     if (format === "video") {
//       return (
//         <div className="w-[10rem] m-auto">
//           <video
//             src={fileUrl || fallbackUrl}
//             alt="Template"
//             className="object-contain"
//             controls={true}
//           />
//         </div>
//       );
//     }
//     if (format === "document") {
//       return (
//         <div className="w-full">
//           <iframe
//             src={fileUrl || fallbackUrl}
//             alt="Template"
//             className="object-contain"
//           />
//         </div>
//       );
//     }
//   };

//   const ButtonsGroup = ({ buttons }) => {
//     return (
//       <div className="flex flex-col gap-2 w-full max-w-[500px] mt-3">
//         {buttons.map(({ url, type, text, phone_number }, btnIndex) => (
//           <button
//             key={btnIndex}
//             title={url || phone_number}
//             className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnCss(
//               type
//             )}`}
//           >
//             {getBtnIcon(type)}
//             <p className="ml-2">{text}</p>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const isCarousal = false;

//   const title =
//     specificTemplate?.urlValue || specificTemplate?.phoneValue || "";
//   const type = specificTemplate?.urlDisplay || specificTemplate?.phoneDisplay;
//   const text = specificTemplate?.urlDisplay || specificTemplate?.phoneDisplay;
//   return (
//     <div className="transition-all duration-300 ease-in shadow-md rounded-xl">
//       <div className="flex items-center justify-between bg-[#128C7E] text-white px-2 py-3 rounded-t-xl">
//         <h2 className="font-medium tracking-wide text-md">
//           Template Preview
//         </h2>
//         <WhatsApp />
//       </div>

//       {specificTemplate && (
//         <div className="space-y-3 p-2 w-full bg-gray-100 " >
//           <div>
//             {["image", "video", "document"].includes(
//               specificTemplate.templateType
//             ) && (
//                 <MediaRenderer
//                   format={specificTemplate.templateType}
//                   fallbackUrl={specificTemplate.media_path}
//                   fileUrl={basicDetails.mediaPath}
//                 />
//               )}
//           </div>

//           {specificTemplate?.message && (
//             <pre className="whitespace-pre-wrap text-sm overflow-y-auto h-50">
//               {specificTemplate.message}
//             </pre>
//           )}

//           <div className="w-full space-y-2 p-2">
//             {specificTemplate?.urlDisplay && (
//               <button
//                 title={specificTemplate?.urlValue}
//                 className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2    ${getBtnCss(
//                   type
//                 )}`}
//               >
//                 {getBtnIcon(specificTemplate?.urlDisplay)}
//                 <p className="ml-2">{specificTemplate?.urlDisplay}</p>
//               </button>
//             )}
//             {specificTemplate?.phoneDisplay && (
//               <button
//                 title={specificTemplate?.phoneValue || ""}
//                 className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 ${getBtnCss(
//                   "phoneDisplay"
//                 )}`}
//               >
//                 {getBtnIcon("phoneDisplay")}
//                 <p className="ml-2">{specificTemplate?.phoneDisplay}</p>
//               </button>
//             )}
//             {specificTemplate?.isFlow === 1 && (
//               <button
//                 title={specificTemplate?.phoneValue || ""}
//                 className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 ${getBtnCss(
//                   "isFlow"
//                 )}`}
//               >
//                 {getBtnIcon("isFlow")}
//                 {/* <p className="ml-2">{specificTemplate?.phoneDisplay}</p> */}
//                 <p className="ml-2">Flow</p>
//               </button>
//             )}
//             {specificTemplate?.replyButtons &&
//               specificTemplate?.replyButtons.length > 0 &&
//               specificTemplate?.replyButtons.map((btn, index) => (
//                 <button
//                   key={index}
//                   title={btn || ""}
//                   className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2  ${getBtnCss(
//                     "replyButtons"
//                   )}`}
//                 >
//                   {getBtnIcon("replyButtons")}
//                   <p className="ml-2">{btn}</p>
//                 </button>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };




//========================== Please don't remove above code ==========================================


import React from "react";
import { Carousel } from "react-responsive-carousel";

// ICONS
import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

// ASSETS
import whatsappImg from "@/assets/images/whatsappdummy.webp";

const replaceVariablesInText = (text, variables, type = "body") => {
  if (!text || !Array.isArray(variables)) return text;

  return text.replace(/{{(\d+)}}/g, (_, key) => {
    const found = variables.find((item) => String(item.key) === String(key));
    return found?.value || `{{${key}}}`;
  });
};

const replaceVariablesInTextBtnUrl = (text, value) => {
  if (!text) return text;

  return text.replace(/{{\d+}}/g, value);
};


const extractCoordinates = (url) => {
  if (!url) {
    return null;
  }
  let regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  let match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  regex = /place\/.*\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  return null;
};

export const Preview = ({
  templateDataNew,
  variablesData,
  uploadedImage,
  setCardIndex,
  cardIndex,
  fileData,
  locationData,
  basicDetails,
}) => {
  console.log("fileData", fileData)
  if (!templateDataNew || !templateDataNew.components) {
    return (
      <div className="flex items-center justify-center h-full p-3 bg-gray-200 rounded-xl">
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
          <div className="transition-all duration-300 ease-in rounded-xl w-100">
            <div className="flex items-center justify-between px-4 py-2 text-white bg-[#128c7e] rounded-full mb-2">
              <h2 className="font-medium tracking-wide text-md">
                Template Preview
              </h2>
              <p className="text-sm">
                <WhatsApp />
              </p>
            </div>
            <div className="flex flex-col gap-3 p-3 shadow-inner rounded-b-md bg-[#ece5dd] mt-2 rounded-xl">
              <img
                src={whatsappImg}
                alt="whatsapp-dummy-image"
                className="object-cover w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
              />
              <div className="flex items-center justify-center w-full p-2 text-sm text-center bg-gray-100 border border-gray-300 rounded-md h-30">
                No Template Selected
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 bg-white text-[#128c7e] ">
                  <BsTelephoneFill className="mr-2" />
                  Contact Us
                </button>
                <button className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 bg-white text-[#128c7e]  ">
                  <FaExternalLinkAlt className="mr-2" />
                  Visit Us
                </button>
                <button className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 bg-white text-[#128c7e] ">
                  <FaReply className="mr-2" />
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const headerComponent = templateDataNew.components.find(
    (comp) =>
      comp.type === "HEADER" &&
      ["IMAGE", "VIDEO", "DOCUMENT", "TEXT", "LOCATION"].includes(comp.format),
  );


  const bodyComponent = templateDataNew?.components.find(
    (comp) => comp.type === "BODY",
  );

  let finalMessage = bodyComponent
    ? replaceVariablesInText(bodyComponent.text, variablesData, "body")
    : "";

  const buttonsComponent = templateDataNew.components.find(
    (comp) => comp.type === "BUTTONS",
  );

  let CardsData = [];

  const isCarousal = templateDataNew.components.find(
    (comp) => comp.type === "CAROUSEL",
  );

  isCarousal?.cards?.forEach(({ components: card }) => {
    CardsData.push(card);
  });

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

  // MEDIA PREVIEW SOURCE (single source of truth)
  const previewMediaUrl = basicDetails?.mediaPath


  const types = ["IMAGE", "VIDEO", "DOCUMENT"];

  return (
    <div className="flex items-center justify-center h-full p-3 bg-gray-200 rounded-xl">
      <div className="flex items-center justify-center w-full h-full transition-all bg-gray-100 rounded-lg shadow-md">
        <div className="transition-all duration-300 ease-in rounded-xl w-100 ">
          <div className="flex items-center justify-between px-4 py-2 text-white bg-[#128c7e] rounded-full mb-3">
            <h2 className="font-medium tracking-wide text-md">
              Template Preview
            </h2>
            <p className="text-sm">
              <WhatsApp />
            </p>
          </div>

          {!isCarousal && (
            <div className="flex flex-col gap-2 p-3 bg-[#ece5dd]  rounded-md">
              {["IMAGE", "VIDEO", "DOCUMENT"].includes(
                headerComponent?.format,
              ) &&
                previewMediaUrl && (
                  <div className="flex justify-center mb-2">
                    {headerComponent.format === "IMAGE" ? (
                      <img
                        src={previewMediaUrl}
                        alt="Media Preview"
                        className="object-contain w-full h-48 border border-gray-200 rounded-md"
                      />
                    ) : (
                      <iframe
                        src={previewMediaUrl}
                        title="Media Preview"
                        className="object-contain w-full h-48 border border-gray-200 rounded-md"
                      />
                    )}
                  </div>
                )}

              {headerComponent?.format === "LOCATION" && (
                <>
                  <iframe
                    id="gmap"
                    src={`https://www.google.com/maps?q=${extractCoordinates(locationData?.url)?.lat
                      },${extractCoordinates(locationData?.url)?.lng
                      }&hl=es;z=14&output=embed`}
                    width="100%"
                    height="200"
                    className="border-none "
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="text-sm text-gray-800 font-bold">
                    {locationData.name}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">
                    {locationData.address}
                  </div>
                </>
              )}

              {headerComponent && headerComponent.format === "TEXT" && (
                <div className="text-md font-semibold text-gray-800">
                  {headerComponent.text}
                </div>
              )}

              {bodyComponent && (
                <pre className="border border-gray-200 rounded-md p-2 w-full  text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words text-wrap">
                  {finalMessage}
                </pre>
              )}

              {buttonsComponent && buttonsComponent.buttons.length > 0 && (
                <div className="flex flex-col gap-2 mt-1">
                  {buttonsComponent &&
                    buttonsComponent.buttons.map((button, index) => {
                      let hrefValue = button.url
                        ? replaceVariablesInTextBtnUrl(
                          button.url,
                          basicDetails?.buttonUrlVar
                        )
                        : `tel:${button.phone_number}`;

                      return (
                        <button
                          key={index}
                          // href={hrefValue}
                          title={hrefValue}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 ${getBtnCss(
                            button.type,
                          )}`}
                        >
                          {getBtnIcon(button.type)}
                          {button.text}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {isCarousal && (
            <div className="flex flex-col gap-3 p-3  shadow-inner rounded-b-md bg-[#ece5dd] mt-2 rounded-xl ">
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
                  const indicatorClass = isSelected
                    ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
                    : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";

                  return (
                    <li
                      id="carousel-indicator"
                      name="carousel-indicator"
                      key={index}
                      className={`inline-block ${indicatorClass}`}
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
                  )?.example?.header_handle[0];

                  const handlerType = card.find(
                    (item) =>
                      item.type === "HEADER" &&
                      ["IMAGE", "VIDEO", "DOCUMENT"].includes(item.format),
                  )?.format;

                  const messageBody = card.find(
                    (item) => item.type === "BODY",
                  )?.text;

                  const buttons = card.find(
                    (item) => item.type === "BUTTONS",
                  )?.buttons;

                  const bodyText = templateDataNew.components.find(
                    (comp) => comp.type === "BODY",
                  )?.text;

                  return (
                    <div
                      className="flex flex-col gap-3  bg-[#ece5dd]  rounded-b-md min-h-125"
                      key={index}
                    >
                      {fileData[index]?.file ? (
                        handlerType === "IMAGE" ? (
                          <div className="flex justify-center mb-2">
                            <img
                              src={fileData[index]?.file}
                              alt="Uploaded Preview"
                              className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                            />
                          </div>
                        ) : (
                          <iframe
                            src={fileData[index]?.file}
                            alt="Uploaded Preview"
                            className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                            frameborder="0"
                          ></iframe>
                        )
                      ) : handlerType === "IMAGE" ? (
                        handler && (
                          <div className="flex justify-center mb-2 rounded-xl">
                            <img
                              src={handler}
                              // src={whatsappImg}
                              alt="Template Preview"
                              className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                            />
                          </div>
                        )
                      ) : (
                        <div className="flex justify-center mb-2">
                          <iframe
                            src={handler}
                            // src={whatsappImg}
                            alt="Template Preview"
                            className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                          ></iframe>
                        </div>
                      )}

                      {bodyText && (
                        <pre className="border border-gray-200 rounded-md p-2 w-full text-[0.85rem] text-gray-800 overflow-y-auto min-h-20 max-h-40 break-words text-wrap">
                          {finalMessage}
                        </pre>
                      )}
                      {messageBody && (
                        <pre className="border border-gray-200 rounded-md p-2 w-full text-[0.85rem] text-gray-800 overflow-auto text-wrap text-start min-h-10 max-h-40 break-words">
                          {messageBody}
                        </pre>
                      )}

                      {buttons.length > 0 && (
                        <div className="flex flex-col gap-2 mt-1">
                          {buttons.map((btn, index) => {
                            return (
                              <button
                                key={index}
                                title={getBtnTitle(
                                  btn.type,
                                  btn.phone_number,
                                  btn.url,
                                  btn.text,
                                )}
                                className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full mt-2 ${getBtnCss(
                                  btn.type,
                                )}`}
                                onClick={() => {
                                  if (btn.type === "PHONE_NUMBER") {
                                    window.location.href = `tel:${btn.phone_number}`;
                                  } else if (btn.type === "URL") {
                                    window.open(btn.url, "_blank");
                                  }
                                }}
                              >
                                {getBtnIcon(btn.type)}
                                {btn.text}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
