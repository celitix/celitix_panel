import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ICONS
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

// API
import {
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";

export const CampaignTemplatePreview = ({ templateData }) => {
  const [tempDetails, setTempDetails] = useState([]);
  const [values, setValues] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!templateData?.components) return;

    setTempDetails(templateData.components);

    const extractedValues = [];
    templateData.components.forEach((component) => {
      component?.parameters?.forEach((param) => {
        if (param.text) extractedValues.push(param.text);
      });
    });
    setValues(extractedValues);
  }, [templateData]);


  const isImage = templateData?.templateType === "image";
  const isVideo = templateData?.templateType === "video";
  const isDocument = templateData?.templateType === "document";
  const isText = templateData?.templateType === "text";
  const mediaPath = templateData?.mediaPath;

  const getBtnIcon = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return <BsTelephoneFill className="mr-2" />;
      case "QUICK_REPLY":
        return <FaReply className="mr-2" />;
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
      default:
        return `Visit us: ${url}`;
    }
  };

  function renderMediaTemplate() { }

  const replacePlaceholders = (text, values) => {
    return text.replace(/{{(\d+)}}/g, (_, index) => {
      const i = parseInt(index, 10) - 1;
      return values[i] ?? `{{${index}}}`;
    });
  };

  const ButtonsGroup = ({ buttons }) => {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] mt-2">
        {buttons.map(({ url, type, text, phone_number }, btnIndex) => (
          <button
            key={btnIndex}
            title={url || phone_number}
            className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-xs shadow-sm cursor-pointer rounded-xl w-full sm:w-auto ${getBtnCss(
              type
            )}`}
          >
            {getBtnIcon(type)}
            <p className="ml-2">{text}</p>
          </button>
        ))}
      </div>
    );
  };

  return isFetching ? (
    <div className="border border-gray-200 rounded-md w-90 p-5 bg-[#ece5dd]">
      <p className="text-sm">(TemplateMessage)</p>
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
      <div className="border border-gray-200 rounded-2xl w-90 p-3 bg-[#ece5dd]">
        {tempDetails?.map((item, index) => {
          if (item?.type === "HEADER" && item?.format === "IMAGE") {
            return (
              <img
                src={mediaPath}
                alt={mediaPath}
                loading="lazy"
                key={index}
                className={`h-50 w-auto select-none pointer-events-none border border-gray-200 rounded-md mr-auto ml-auto`}
              />
            );
          }
          if (item?.type === "HEADER" && item?.format === "VIDEO") {
            return (
              <video
                src={mediaPath}
                controls={true}
                autoPlay={false}
                key={index}
                className={`h-45 m-auto border border-gray-200 rounded-md bg-center bg-no-repeat`}
              />
            );
          }
          if (item?.type === "HEADER" && item?.format === "DOCUMENT") {
            return (
              <iframe
                src={mediaPath}
                key={index}
                allow=" encrypted-media"
                className={`h-48 border border-gray-200 rounded-md bg-center bg-no-repeat`}
              ></iframe>
            );
          }
          if (item?.type === "HEADER") {
            return (
              <pre className="text-sm font-bold" key={index}>
                {item?.text}
              </pre>
            );
          }

          if (item?.type === "BODY") {
            return (
              <pre className="text-sm text-wrap font-medium mt-2" key={index}>
                {/* {item?.text} */}
                {replacePlaceholders(item?.text, values)}
              </pre>
            );
          }

          if (item.type === "BUTTONS" && item?.buttons?.length > 0) {
            return <ButtonsGroup buttons={item?.buttons} key={index} />;
          }
          if (item?.type === "FOOTER") {
            return (
              <pre
                className="text-[0.8rem] text-gray-600 text-wrap font-normal mt-2"
                key={index}
              >
                {item?.text}
              </pre>
            );
          }
        })}
      </div>
    </>
  );
};
