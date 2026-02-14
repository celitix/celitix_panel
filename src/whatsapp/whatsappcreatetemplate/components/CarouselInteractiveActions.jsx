import React from "react";
import toast from "react-hot-toast";

// ICONS
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import LinkIcon from "@mui/icons-material/Link";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";

// COMPONENTS
import CustomTooltip from "../../components/CustomTooltip";
const CarouselInteractiveActions = ({ cards, setCards, selectedCardIndex }) => {
  if (!cards || !cards[selectedCardIndex]) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-gray-50">
        <p className="text-sm text-gray-500">
          No card selected or invalid index.
        </p>
      </div>
    );
  }
  //   const card = cards[selectedCardIndex];
  const card = cards[selectedCardIndex] || { actions: [] }; // Fallback to ensure `actions` is an array

  const handleAddAction = (type) => {
    const updatedCards = [...cards];
    const currentCard = updatedCards[selectedCardIndex];

    if (currentCard.actions.length >= 1) {
      toast.error("Maximum 1 actions allowed per card");
      return;
    }

    const newAction =
      type === "phone"
        ? { type: "phone", phoneNumber: "+91", title: "" }
        : type === "url"
          ? { type: "url", url: "http://", title: "" }
          : { type: "quickReply", title: "" };

    currentCard.actions.push(newAction);
    setCards(updatedCards);
  };

  // Update Action
  const handleActionChange = (index, key, value) => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].actions[index][key] = value;
    setCards(updatedCards);
  };

  // Remove Action
  const handleRemoveAction = (index) => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].actions.splice(index, 1);

    if (updatedCards[selectedCardIndex].actions.length === 0) {
      toast.error("At least one action is required");
    }

    setCards(updatedCards);
  };

  return (
    <div className="w-full p-5 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AiOutlineThunderbolt className="text-blue-600 text-xl" />
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            Interactive Actions
          </h2>
        </div>

        <span className="text-xs text-gray-400 font-medium">
          Template Enhancements
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        Enhance your WhatsApp template by adding interactive elements such as
        <span className="font-medium text-gray-800"> phone calls</span>,
        <span className="font-medium text-gray-800"> URLs</span>, and
        <span className="font-medium text-gray-800"> quick replies</span>. These
        options improve user engagement and make templates more dynamic.
      </p>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            id="carouselPhoneAction"
            name="carouselPhoneAction"
            className="flex items-center justify-center gap-2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
            onClick={() => handleAddAction("phone")}
          >
            <PhoneIphoneIcon className="w-5 h-5" />
            Add Phone
          </button>
          <button
            id="carouselUrlAction"
            name="carouselUrlAction"
            className="flex items-center justify-center gap-2 px-5 py-1 bg-green-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
            onClick={() => handleAddAction("url")}
          >
            <LinkIcon className="w-5 h-5" />
            Add URL
          </button>
          <button
            id="carouselQuickReplyAction"
            name="carouselQuickReplyAction"
            className="flex items-center justify-center gap-2 px-4 py-1 text-sm font-semibold rounded-full shadow-md transition-all duration-300 bg-blue-400 text-white hover:bg-blue-500"
            onClick={() => handleAddAction("quickReply")}
          >
            <ReplyIcon className="w-5 h-5" />
            Add Quick Reply
          </button>
        </div>

        {/* Render Actions */}
        {card.actions.map((action, index) => (
          <div key={index} className="relative border p-3 rounded-md shadow-sm">
            {/* <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {action.type === "phone"
                  ? "Phone Number"
                  : action.type === "url"
                  ? "URL"
                  : "Quick Reply"}
              </label>
              <AiOutlineClose
                className="text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveAction(index)}
              />
            </div> */}

            {/* Action Input Fields */}
            {action.type === "phone" && (
              <div className="grid md:grid-cols-2 gap-2">
                <div className="flex items-start flex-col mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <CustomTooltip
                      title="Button label text. Maximum 25 characters. Alphanumeric characters only."
                      placement="top"
                      arrow
                    >
                      <span>
                        <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                      </span>
                    </CustomTooltip>
                  </div>
                  <input
                    id="carouselPhoneActionTitle"
                    name="carouselPhoneActionTitle"
                    type="text"
                    className="flex-1 border rounded px-2 py-1 text-sm w-full"
                    placeholder="Button Title"
                    value={action.title}
                    onChange={(e) =>
                      handleActionChange(index, "title", e.target.value)
                    }
                    maxLength={25}
                  />
                </div>
                <div className="flex items-start flex-col mb-2">
                  <div className="flex items-center justify-between gap-2 mb-2 w-full">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <CustomTooltip
                        title="Add country code!"
                        placement="top"
                        arrow
                      >
                        <span>
                          <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                        </span>
                      </CustomTooltip>
                    </div>
                    <div className="absolute top-3 right-2">
                      <AiOutlineClose
                        className="text-gray-500 cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveAction(index)}
                      />
                    </div>
                  </div>
                  <input
                    id="carouselPhoneActionPhoneNumber"
                    name="carouselPhoneActionPhoneNumber"
                    type="text"
                    className="flex-1 border rounded px-2 py-1 text-sm w-full"
                    placeholder="Phone Number (+91)"
                    value={action.phoneNumber}
                    onChange={(e) =>
                      handleActionChange(index, "phoneNumber", e.target.value)
                    }
                    maxLength={16}
                  />
                </div>
              </div>
            )}

            {action.type === "url" && (
              <div className="grid md:grid-cols-2 gap-2 mb-2">
                <div className="flex items-start flex-col gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      URL Title
                    </label>
                    <CustomTooltip
                      title="Maximum 25 characters. Alphanumeric characters only."
                      placement="top"
                      arrow
                    >
                      <span>
                        <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                      </span>
                    </CustomTooltip>
                  </div>
                  <input
                    id="carouselUrlActionTitle"
                    name="carouselUrlActionTitle"
                    type="text"
                    className="flex-1 border rounded px-2 py-1 text-sm w-full"
                    placeholder="Button Title"
                    value={action.title}
                    onChange={(e) =>
                      handleActionChange(index, "title", e.target.value)
                    }
                    maxLength={25}
                  />
                </div>

                <div className="flex items-start flex-col gap-2 mb-2">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        URL Value
                      </label>
                      <CustomTooltip
                        title="Enter the full HTTPS URL that should open when the user taps this button in WhatsApp. 
                              Only secure HTTPS links are supported. Ensure the URL is valid and points to the desired destination."
                        placement="top"
                        arrow
                      >
                        <span>
                          <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                        </span>
                      </CustomTooltip>
                    </div>
                    <div className="absolute top-3 right-2">
                      <AiOutlineClose
                        className="text-gray-500 cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveAction(index)}
                      />
                    </div>
                  </div>
                  <input
                    id="carouselUrlActionUrl"
                    name="carouselUrlActionUrl"
                    type="text"
                    className="flex-1 border rounded px-2 py-1 text-sm w-full"
                    placeholder="Enter URL"
                    value={action.url}
                    onChange={(e) =>
                      handleActionChange(index, "url", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {action.type === "quickReply" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Quick Reply
                  </label>
                  <CustomTooltip
                    title="Button label text. Maximum 25 characters. Alphanumeric characters only."
                    placement="top"
                    arrow
                  >
                    <span>
                      <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    </span>
                  </CustomTooltip>
                </div>
                <div className="absolute top-3 right-2">
                  <AiOutlineClose
                    className="text-gray-500 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveAction(index)}
                  />
                </div>
                <input
                  id="carouselQuickReplyActionTitle"
                  name="carouselQuickReplyActionTitle"
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  placeholder="Quick Reply Title"
                  value={action.title}
                  onChange={(e) =>
                    handleActionChange(index, "title", e.target.value)
                  }
                  maxLength={25}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselInteractiveActions;
