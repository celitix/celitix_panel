import { useEffect, useState } from "react";

// ICONS
import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const TemplatePreview = ({
  scrollContainerRef,
  header,
  format,
  footer,
  imageUrl,
  videoUrl,
  documentUrl,
  locationUrl,
  phoneTitle,
  urlTitle,
  quickReplies,
  variables, // Pass variables from parentz
  flowTemplateState,
  activeType,
  templateValues,
}) => {
  const extractCoordinates = (url) => {
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

  const [scrollOffset, setScrollOffset] = useState(206); // Default top position

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef?.current) {
        const containerScrollY = scrollContainerRef.current.scrollTop;
        const offset = Math.max(100, 190 - containerScrollY); // Adjust based on scroll
        setScrollOffset(offset);
      }
    };

    const container = scrollContainerRef?.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef]);

  // Function to replace placeholders with variable values
  const renderWithVariables = (template) => {
    if (!variables || variables.length === 0) return template;

    return template.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = variables.find((v) => v.id === id);
      return variable ? `[${variable.value || "empty"}]` : match;
    });
  };
  const isLargeScreen = window.innerWidth >= 1024;

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
    <div
      className={
        " sm:w-[20rem] md:w-[30rem] lg:w-[30rem] h-auto overflow-y-auto z-50 transition-all duration-300 bg-white"
      }
    >
      <div className="flex items-center justify-between px-4 py-2 text-white bg-[#128c7e] rounded-full">
        <h2 className="text-lg font-semibold">Template Preview</h2>
        <p className="text-sm">
          <WhatsApp />
        </p>
      </div>

      <div className="p-4 shadow-inner rounded-b-md bg-[#ece5dd] mt-2 rounded-xl">
        {header && (
          <div
            className="w-full px-3 py-2 text-sm text-gray-900 break-words  rounded-md max-h-20"
            id="templateHeaderPreview"
            name="templateHeaderPreview"
          >
            <strong className="text-lg font-semibold">{header}</strong>
          </div>
        )}

        {imageUrl && (
          <div className="mb-4">
            <img
              id="templateImagePreview"
              name="templateImagePreview"
              src={URL.createObjectURL(imageUrl)}
              alt="Template Preview"
              className="object-cover w-full h-48 rounded-md"
            />
          </div>
        )}

        {videoUrl && (
          <div className="mb-4">
            <video
              controls
              className="w-full h-48 rounded-md"
              id="templateVideoPreview"
              name="templateVideoPreview"
            >
              <source src={URL.createObjectURL(videoUrl)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {documentUrl && (
          <div className="mb-4">
            {/* <a
              id="templateDocumentPreview"
              name="templateDocumentPreview"
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Document
            </a> */}

            <iframe src={documentUrl} frameborder="0"></iframe>
          </div>
        )}

        {locationUrl && (
          <div className="mb-4">
            {(() => {
              const coordinates = extractCoordinates(locationUrl);
              if (coordinates) {
                return (
                  <iframe
                    id="templateLocationPreview"
                    name="templateLocationPreview"
                    src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`}
                    width="100%"
                    height="200"
                    allowFullScreen
                    loading="eager"
                    className="rounded-md"
                  ></iframe>
                );
              } else {
                return (
                  <div className="flex justify-center px-3 py-2 mb-4 text-gray-800 bg-gray-100 rounded-md">
                    <span className="mr-3">
                      <FaLinkSlash size={19} className="p-0" />
                    </span>
                    <span className="text-md">Invalid Maps URL</span>
                  </div>
                );
              }
            })()}
          </div>
        )}

        {format && (
          <div
            className="w-full px-3 py-2 mb-4 overflow-auto text-sm text-gray-800 break-words  rounded-md "
            id="templateFormatPreview"
            name="templateFormatPreview"
          >
            <pre
              className="text-wrap"
              dangerouslySetInnerHTML={{
                __html: formatMessageBody(renderWithVariables(format)),
              }}
            >
              {/* {renderWithVariables(format)} */}
            </pre>
          </div>
        )}

        {footer && (
          <div
            className="mt-4 overflow-auto text-xs text-center text-gray-500 break-words max-h-16"
            id="templateFooterPreview"
            name="templateFooterPreview"
          >
            {footer}
          </div>
        )}
        <div className="flex flex-col gap-2 mt-4">
          {phoneTitle && (
            <button
              className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full sm:w-auto bg-white text-[#128c7e]"
              id="templatePhoneBtnPreview"
              name="templatePhoneBtnPreview"
            >
              <BsTelephoneFill className="mr-2" />
              {phoneTitle}
            </button>
          )}
          {urlTitle && (
            <button
              className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full sm:w-auto bg-white text-[#128c7e]"
              id="templateUrlBtnPreview"
              name="templateUrlBtnPreview"
            >
              <FaExternalLinkAlt className="mr-2" />
              {urlTitle}
            </button>
          )}
          {flowTemplateState.title && (
            <button
              className="flex items-center justify-center px-4 py-2 text-white bg-gray-400 rounded-md"
              id="templateUrlBtnPreview"
              name="templateUrlBtnPreview"
            >
              <AssignmentOutlinedIcon className="mr-2" />
              {flowTemplateState.title}
            </button>
          )}

          {templateValues.type && (
             <button
              className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full sm:w-auto bg-white text-[#128c7e]"
              id="templateUrlBtnPreview"
              name="templateUrlBtnPreview"
            >
              <AssignmentOutlinedIcon fontSize="small" />
              {templateValues.text || "Typing…"}
            </button>
          )}
        </div>

        {quickReplies && quickReplies.length > 0 && (
          <div className="mt-2.5">
            <div className="flex flex-col gap-2">
              {quickReplies.map(
                (reply, index) =>
                  reply && (
                    <button
                      id="templateQuickReplyBtnPreview"
                      name="templateQuickReplyBtnPreview"
                      key={index}
                      className="flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full sm:w-auto bg-white text-[#128c7e]"
                    >
                      <FaReply className="mr-2" />
                      {reply}
                    </button>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
