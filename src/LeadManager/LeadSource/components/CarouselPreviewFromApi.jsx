import { useRef, useState } from "react";
import { formatPreview } from "@/LeadManager/utils/templatePreviewMapper";

import { BsTelephoneFill } from "react-icons/bs";
import { FaReply, FaExternalLinkAlt } from "react-icons/fa";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

const normalize = (type) => type?.toString().toLowerCase();

export const getBtnIcon = (type) => {
  switch (normalize(type)) {
    case "phone_number":
      return <BsTelephoneFill className="mr-2" />;
    case "quick_reply":
      return <FaReply className="mr-2" />;
    case "copy_code":
      return <ContentCopySharpIcon className="mr-2" />;
    case "url":
      return <AssignmentOutlinedIcon className="mr-2" />;
    default:
      return <FaExternalLinkAlt className="mr-2" />;
  }
};

export const getBtnCss = (type) => {
  return "bg-white text-[#128c7e]";
};

export const getBtnTitle = (type, phone, url, text) => {
  switch (normalize(type)) {
    case "phone_number":
      return `Call: ${phone}`;
    case "quick_reply":
      return `Reply: ${text}`;
    case "copy_code":
      return `Copy: ${text}`;
    case "url":
      return `Copy: ${text}`;
    default:
      return `Open: ${url}`;
  }
};

const CARD_WIDTH = 560;

const CarouselPreviewFromApi = ({ cards }) => {
  const ref = useRef();
  const [index, setIndex] = useState(0);

  if (!cards || cards.length === 0) return null;

  const scrollTo = (i) => {
    const bounded = Math.max(0, Math.min(i, cards.length - 1));
    setIndex(bounded);
    ref.current?.scrollTo({
      left: bounded * CARD_WIDTH,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-[#f3ede6] md:p-3 p-4 rounded-xl overflow-hidden flex flex-col  items-center">
      {/* Track */}
      <div
        ref={ref}
        className="flex  overflow-x-hidden 
               scroll-smooth snap-x snap-mandatory"
        style={{ width: CARD_WIDTH }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ minWidth: CARD_WIDTH }}
            className="flex-shrink-0 "
          >
            <div>
              {/* MEDIA */}
              {card.media && (
                <div>
                  {card.type === "image" ? (
                    <img
                      src={card.media}
                      className="w-full h-65 object-cover rounded-lg mb-2"
                      // className="w-full
                      //      md:h-48 h-64
                      //      object-cover
                      //      rounded-xl mb-3"
                    />
                  ) : (
                    <img
                      src={card.media}
                      className="w-full h-65 rounded-lg mb-2 border"
                    />
                  )}
                </div>
              )}

              {/* BODY */}
              {card.body && (
                <div
                  className="text-sm text-gray-800 leading-snug flex-1 mb-3 text-center"
                  dangerouslySetInnerHTML={{ __html: formatPreview(card.body) }}
                />
              )}

              {/* BUTTON */}
              {card.buttons?.length > 0 && (
                <div className="mt-auto space-y-2 flex items-center justify-center">
                  {card.buttons.map((btn, j) => (
                    <button
                      key={j}
                      title={getBtnTitle(
                        btn.type,
                        btn.phone_number,
                        btn.url,
                        btn.text,
                      )}
                      className="flex items-center justify-center gap-2 w-50 xl:w-full bg-white border border-[#128c7e] text-[#128c7e] rounded-full py-1.5 text-sm shadow-sm"
                    >
                      {getBtnIcon(btn.type)}
                      {btn.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Left */}
      {index > 0 && (
        <button
          onClick={() => scrollTo(index - 1)}
          className="absolute md:left-1 left-2 
                 top-1/2 -translate-y-1/2 
                 bg-white shadow-md 
                 rounded-full 
                 md:h-9 md:w-9 h-6 w-6 
                 flex items-center justify-center"
        >
          <KeyboardDoubleArrowLeftOutlinedIcon />
        </button>
      )}

      {/* Right */}
      {index < cards.length - 1 && (
        <button
          onClick={() => scrollTo(index + 1)}
          className="absolute md:right-1 right-2 
                 top-1/2 -translate-y-1/2 
                 bg-white shadow-md 
                 rounded-full 
                md:h-9 md:w-9 h-6 w-6 
                 flex items-center justify-center"
        >
          <KeyboardDoubleArrowRightOutlinedIcon />
        </button>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {cards.map((_, i) => (
          <div
            key={i}
            onClick={() => scrollTo(i)}
            // className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
            //   i === index ? "bg-[#212529]" : "bg-[#7E7F80]"
            // }`}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 
                    rounded-full cursor-pointer transition ${
                      i === index ? "bg-[#212529]" : "bg-[#7E7F80]"
                    }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselPreviewFromApi;
