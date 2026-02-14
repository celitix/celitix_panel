import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";

// ICONS
import { WhatsApp } from "@mui/icons-material";
import {
  MdArrowForwardIos,
  MdOutlineArrowBackIos,
  MdOutlineDeleteForever,
} from "react-icons/md";
import {
  FaExternalLinkAlt,
  FaExternalLinkSquareAlt,
  FaPlay,
} from "react-icons/fa";
import { BsTelephoneFill, BsTelephonePlusFill } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";

const CarouselTemplatePreview = ({
  scrollContainerRef,
  format,
  cards,
  footer,
  setCards, // Receive setCards here
  onAddCard,
  onDeleteCard,
  variables, // Pass variables from parentz.
  selectedCardIndex,
  setSelectedCardIndex,
  carouselMediaType,
}) => {
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

  // const handleAddCard = () => {
  //   if (cards.length >= 10) {
  //     toast.error('You can add up to 10 cards only');
  //   } else {
  //     const newCard = {
  //       body: '',
  //       mediaUrl: '',
  //       mediaType: cards[0]?.mediaType || 'image', // Use the same media type as the first card
  //       fileName: '', // For storing the file name of uploaded media
  //     };
  //     onAddCard(newCard);
  //   }
  // };

  const handleAddCard = () => {
    if (cards.length >= 10) {
      toast.error("You can add up to 10 cards only");
      return;
    }

    // Determine the media type based on the current carousel media type or existing cards
    const newCardMediaType =
      carouselMediaType || cards[0]?.mediaType || "image";

    // Create the new card
    const newCard = {
      mediaType: newCardMediaType, // Consistent media type for all cards
      mediaUrl: "",
      body: "This is a dummy card body. You can change this content later.",
      // footer: 'This is a dummy footer. You can change this content later.',
      actions: [], // Initialize actions
    };

    // Update the cards state
    setCards([...cards, newCard]);

    // Select the newly added card
    setSelectedCardIndex(cards.length);
  };

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
      className={`${isLargeScreen ? "static" : "static"
        } top-[230px] sm:w-[20rem] md:w-[30rem] lg:w-[30rem] h-auto overflow-y-auto z-50 transition-all duration-300    rounded-md  mb-5`}
    >
      <div className="flex items-center justify-between px-4 py-2 text-white bg-[#128c7e] rounded-full mb-3">
        <h2 className="text-lg font-semibold">Cards Template Preview</h2>
        <p className="text-sm">
          <WhatsApp />
        </p>
      </div>
      <div className="p-2 shadow-inner rounded-b-md bg-[#ece5dd] mt-2 rounded-xl ">
        {format && (
          <pre
            className="w-full h-auto py-2 mb-3 overflow-auto text-sm text-gray-800 break-words   rounded-md  text-wrap"
            id="carousel-format-preview"
            name="carousel-format-preview"
            dangerouslySetInnerHTML={{
              __html: formatMessageBody(renderWithVariables(format)),
            }}
          >
            {/* {renderWithVariables(format)} */}
          </pre>
        )}
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          renderArrowPrev={() => null}
          renderArrowNext={() => null}
          selectedItem={selectedCardIndex} // Sync Carousel with selectedCardIndex
          onChange={(index) => setSelectedCardIndex(index)} // Sync selectedCardIndex with Carousel
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
                  onClickHandler(); // Update Carousel
                  setSelectedCardIndex(index); // Sync selectedCardIndex globally
                }}
                role="button"
                tabIndex={0}
                aria-label={`Slide ${index + 1}`}
              />
            );
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="">
              {card.mediaType === "video" && card.mediaUrl ? (
                <video controls className="w-full h-48 rounded-md">
                  <source src={card.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : card.mediaType === "video" ? (
                <div className="relative">
                  <img
                    id="carousel-media-video-dummy"
                    name="carousel-media-video-dummy"
                    // src='https://dummyimage.com/500x500/cccccc/ffffff'
                    src="https://picsum.photos/500/500"
                    alt="Dummy Video"
                    className="object-cover w-full h-48 rounded-md"
                  />
                  <FaPlay
                    className="absolute inset-0 p-2 m-auto text-gray-800 bg-white rounded-full"
                    size={30}
                  />
                </div>
              ) : card.mediaType === "image" && card.mediaUrl ? (
                <img
                  id="carousel-media-image"
                  name="carousel-media-image"
                  src={card.mediaUrl}
                  alt="Card Media"
                  className="object-cover w-full h-48 rounded-md"
                />
              ) : (
                <img
                  id="carousel-media-image-dummy"
                  name="carousel-media-image-dummy"
                  // src='https://dummyimage.com/500x500/cccccc/ffffff'
                  src="https://picsum.photos/500/500"
                  alt="Dummy Image"
                  className="object-cover w-full h-48 rounded-md"
                />
              )}
              <div className="pt-2 ">
                <pre
                  className="w-full py-2 mb-0 overflow-auto text-sm text-justify text-gray-800 break-words align-middle  rounded-md h-28 text-wrap"
                  id="carousel-body-preview"
                  name="carousel-body-preview"
                >
                  {card.body ||
                    "This is a dummy card body. You can change this content later."}
                </pre>
              </div>

              {index !== 0 && (
                <button>
                  <MdOutlineDeleteForever
                    className="absolute text-red-500 cursor-pointer top-2 right-2 hover:text-red-700"
                    size={23}
                    onClick={() => onDeleteCard(index)}
                  />
                </button>
              )}
            </div>
          ))}
        </Carousel>


        {/* <div className='h-16 px-2 py-1 mt-2 overflow-auto text-xs text-gray-500 break-words border-2 border-gray-200 rounded-md  carouselfooterpreview'
                id='carousel-footer-preview' name='carousel-footer-preview'
            >
                {footer || 'This is a dummy footer. You can change this content later.'}
            </div>
             */}

        {cards[selectedCardIndex]?.actions.map((action, index) => (
          <button
            id="carousel-action-preview"
            name="carousel-action-preview"
            key={index}
            className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full   mt-2 ${action.type === "phone"
              ? "bg-white text-[#128c7e]"
              : action.type === "url"
                ? "bg-white text-[#128c7e]"
                : "bg-white text-[#128c7e]"
              } rounded-md`}
          >
            {action.type === "phone" && <BsTelephoneFill className="mr-2" />}
            {action.type === "url" && <FaExternalLinkAlt className="mr-2" />}
            {action.type === "quickReply" && <FaReply className="mr-2" />}
            {action.title}
          </button>
        ))}
        <div className="relative flex justify-center py-4">
          <button
            id="carousel-add-card"
            name="carousel-add-card"
            className={`bg-[#212529] text-white px-2 py-2 font-normal rounded-md text-sm hover:bg-[#434851] ${cards.length >= 10 ? "bg-[#434851]" : "bg-[#212529]"
              }`}
            onClick={handleAddCard}
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselTemplatePreview;
