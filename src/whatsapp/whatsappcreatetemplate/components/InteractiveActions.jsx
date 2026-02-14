import { useEffect } from "react";

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
import VariableManager from "./VariableManager";
import VariableManagerUrl from "./VariableManagerUrl";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/whatsapp/components/InputField";

const InteractiveActions = ({
  interactiveAction,
  setInteractiveAction,
  phoneNumber,
  setPhoneNumber,
  phoneTitle,
  setPhoneTitle,
  url,
  setUrl,
  urlTitle,
  setUrlTitle,
  quickReplies,
  setQuickReplies,
  urlValid,
  validateUrl,
  handlePhoneNumberChange,
  handleQuickReplyChange,
  addQuickReply,
  removeQuickReply,
  selectedTemplateType,
  setUrlVariables,
  setFlowTemplateState,
  flowTemplateState,
  allFlows,
  isShortUrl,
  setIsShortUrl,
}) => {
  // useEffect(() => {
  //   if (interactiveAction !== "all" || selectedTemplateType) {
  //     setPhoneNumber("");
  //     setPhoneTitle("");
  //     setUrl("");
  //     setUrlTitle("");
  //     setQuickReplies([]);
  //   }
  // }, [
  //   interactiveAction,
  //   selectedTemplateType,
  //   setPhoneNumber,
  //   setPhoneTitle,
  //   setUrl,
  //   setUrlTitle,
  //   setQuickReplies,
  // ]);
  const updateVariables = (updatedVariables) => {
    // if(u)
    setUrlVariables(updatedVariables);
    const previewFormat = url.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = updatedVariables.find((v) => v.id === id);
      return variable ? `[${variable.value || id}]` : match;
    });
    // onPreviewUpdate(previewFormat);
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
        <span className="font-medium text-gray-800"> URLs</span>,
        <span className="font-medium text-gray-800"> flows</span>, and
        <span className="font-medium text-gray-800"> quick replies</span>. These
        options improve user engagement and make templates more dynamic.
      </p>

      {/* Action Type Selection */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-4 mb-4">
        {["none", "callToActions", "quickReplies", "all", "flow"].map((action) => (
          <label
            key={action}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              id="interactiveAction"
              type="radio"
              name="interactiveAction"
              value={action}
              checked={interactiveAction === action}
              onChange={() => setInteractiveAction(action)}
              className="w-4 h-4"
            />
            <span className="text-sm capitalize">
              {action.replace(/([A-Z])/g, " $1")}
            </span>
          </label>
        ))}
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 mb-4">
        {["none", "callToActions", "quickReplies", "flow", "all"].map(
          (action) => (
            <label
              key={action}
              className={`cursor-pointer rounded-full px-2 py-1 text-center font-medium transition-all
        ${interactiveAction === action
                  ? "bg-[#434851] text-white border border-transparent"
                  : "border border-[#434851] text-[#434851] bg-transparent hover:bg-[#434851] hover:text-white"
                }`}
            >
              <input
                id="interactiveAction"
                type="radio"
                name="interactiveAction"
                value={action}
                checked={interactiveAction === action}
                onChange={() => setInteractiveAction(action)}
                className="hidden"
              />
              <span className="text-sm capitalize">
                {action.replace(/([A-Z])/g, " $1")}
              </span>
            </label>
          )
        )}
      </div>

      {/* <div className="flex w-full gap-4">

        {(interactiveAction === "callToActions" ||
          interactiveAction === "all") && (
            <div className="space-y-4 w-max">
              <div className="flex gap-2">
                <button
                  id="templateAddPhoneNumber"
                  name="templateAddPhoneNumber"
                  onClick={() => setPhoneNumber(phoneNumber || "+91")}
                  className="flex items-center justify-center gap-2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                >
                  <PhoneIphoneIcon className="w-5 h-5" />
                  Add Phone Number
                </button>
                <button
                  id="templateAddUrl"
                  name="templateAddUrl"
                  onClick={() => setUrl("https://")}
                  className="flex items-center justify-center gap-2 px-5 py-1 bg-green-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
                >
                  <LinkIcon className="w-5 h-3" />
                  Add URL
                </button>
              </div>

              {phoneNumber && (
                <div className="relative p-3 border border-gray-300 rounded-md shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <AiOutlineClose
                      className="text-gray-500 cursor-pointer hover:text-red-500"
                      onClick={() => {
                        setPhoneNumber("");
                        setPhoneTitle("");
                      }}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2">
                    <input
                      id="templatePhoneNumberTitle"
                      name="templatePhoneNumberTitle"
                      type="text"
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Button Title"
                      value={phoneTitle}
                      onChange={(e) => setPhoneTitle(e.target.value)}
                      maxLength={25}
                    />
                    <input
                      id="templatePhoneNumber"
                      name="templatePhoneNumber"
                      type="text"
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Phone Number (+919876543210)"
                      value={phoneNumber}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setPhoneNumber("+");
                          return;
                        }
                        const value = e.target.value;
                        if (/^\+?[0-9]*$/.test(value)) {
                          setPhoneNumber(value);
                        }
                      }}
                      maxLength={16}
                    />
                  </div>
                </div>
              )}


              {url && (
                <div className="relative p-3 border border-gray-300 rounded-md shadow-sm">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      URL Title
                    </label>
                    <AiOutlineClose
                      className="text-gray-500 cursor-pointer hover:text-red-500"
                      onClick={() => {
                        setUrl("");
                        setUrlTitle("");
                      }}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2">
                    <input
                      id="templateUrlTitle"
                      name="templateUrlTitle"
                      type="text"
                      className="w-full px-2 py-1 mb-2 text-sm border border-gray-300 rounded"
                      placeholder="Button Title"
                      value={urlTitle}
                      onChange={(e) => setUrlTitle(e.target.value)}
                      maxLength={25}
                    />
                    <input
                      id="templateUrl"
                      name="templateUrl"
                      type="text"
                      className="w-full px-2 py-1 mb-2 text-sm border border-gray-300 rounded"
                      placeholder="Enter URL"
                      value={url}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setUrl("https://");
                          return;
                        }
                        setUrl(e.target.value);
                        validateUrl(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 border-2 border-gray-500 w-max p-2 rounded-2xl">
                    <CustomTooltip
                      title="Enable this option to generate a tracking URL for your WhatsApp interactive template. 
When checked, every click on the button will be tracked and logged into analytics. 
You’ll be able to measure user engagement, monitor performance, and generate detailed reports 
on how recipients interact with your message."
                      placement="top"
                      arrow
                    >
                      <span>
                        <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                      </span>
                    </CustomTooltip>
                    <label
                      htmlFor="isShortUrl"
                      className="text-gray-800 text-sm font-medium"
                    >
                      Tracking URL?
                    </label>
                    <input
                      id="isShortUrl"
                      name="isShortUrl"
                      type="checkbox"
                      value={Boolean(isShortUrl)}
                      onChange={(e) => {
                        setIsShortUrl(Number(e.target.checked));
                      }}
                    />
                  </div>
                  {!isShortUrl ? (
                    <div className=" mb-2">
                      <VariableManagerUrl
                        templateFormat={url}
                        setTemplateFormat={setUrl}
                        onUpdateVariables={updateVariables}
                        allowSingleVariable={true}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}

        {(interactiveAction === "quickReplies" ||
          interactiveAction === "all") && (
            <>
              <button
                className={`flex items-center justify-center gap-2 px-4 py-1 text-sm font-semibold rounded-full shadow-md transition-all duration-300
    ${quickReplies.length >= 3
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                  }`}
                onClick={addQuickReply}
                disabled={quickReplies.length >= 3}
              >
                <ReplyIcon className="w-5 h-5" />
                Add Quick Reply
              </button>
              <div className="mt-4 space-y-4 p-3 border border-gray-300 rounded-md shadow-sm">
                {quickReplies.map((reply, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      id={`quickReply${index}`}
                      name={`quickReply${index}`}
                      type="text"
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder={`Quick Reply ${index + 1}`}
                      value={reply}
                      onChange={(e) =>
                        handleQuickReplyChange(index, e.target.value)
                      }
                      maxLength={25}
                    />
                    <AiOutlineClose
                      className="text-gray-500 cursor-pointer hover:text-red-500"
                      onClick={() => removeQuickReply(index)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
      </div> */}

      <div className="flex flex-col w-full gap-4">
        {/* --- BUTTONS ROW --- */}
        <div className="flex flex-wrap gap-3 items-center">
          {(interactiveAction === "callToActions" ||
            interactiveAction === "all") && (
              <>
                {/* Phone Button */}
                <button
                  id="templateAddPhoneNumber"
                  name="templateAddPhoneNumber"
                  onClick={() => setPhoneNumber(phoneNumber || "+91")}
                  className="flex items-center justify-center gap-2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                >
                  <PhoneIphoneIcon className="w-5 h-5" />
                  Add Phone Number
                </button>

                {/* URL Button */}
                <button
                  id="templateAddUrl"
                  name="templateAddUrl"
                  onClick={() => setUrl("https://")}
                  className="flex items-center justify-center gap-2 px-5 py-1 bg-green-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
                >
                  <LinkIcon className="w-5 h-5" />
                  Add URL
                </button>
              </>
            )}

          {(interactiveAction === "quickReplies" ||
            interactiveAction === "all") && (
              <button
                className={`flex items-center justify-center gap-2 px-4 py-1 text-sm font-semibold rounded-full shadow-md transition-all duration-300
          ${quickReplies.length >= 3
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                  }`}
                onClick={addQuickReply}
                disabled={quickReplies.length >= 3}
              >
                <ReplyIcon className="w-5 h-5" />
                Add Quick Reply
              </button>
            )}
        </div>

        {/* --- PHONE + URL + QUICK REPLIES SECTIONS --- */}
        <div className="flex flex-col gap-4">
          {/* Call to Actions */}
          {(interactiveAction === "callToActions" ||
            interactiveAction === "all") && (
              <div className="flex flex-col gap-4">
                {/* Phone Number Section */}
                {phoneNumber && (
                  <div className="relative p-3 border border-gray-300 rounded-md shadow-sm">
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
                        {/* <AiOutlineClose
                        className="text-gray-500 cursor-pointer hover:text-red-500"
                        onClick={() => {
                          setPhoneNumber("");
                          setPhoneTitle("");
                        }}
                      /> */}
                        <input
                          id="templatePhoneNumberTitle"
                          name="templatePhoneNumberTitle"
                          type="text"
                          className="flex-1 w-full px-2 py-2 text-sm border border-gray-300 rounded-md"
                          placeholder="Button Title"
                          value={phoneTitle}
                          onChange={(e) => setPhoneTitle(e.target.value)}
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
                              onClick={() => {
                                setPhoneNumber("");
                                setPhoneTitle("");
                              }}
                            />
                          </div>
                        </div>
                        <input
                          id="templatePhoneNumber"
                          name="templatePhoneNumber"
                          type="text"
                          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md"
                          placeholder="Phone Number (+919876543210)"
                          value={phoneNumber}
                          onChange={(e) => {
                            if (!e.target.value) {
                              setPhoneNumber("+");
                              return;
                            }
                            const value = e.target.value;
                            if (/^\+?[0-9]*$/.test(value)) {
                              setPhoneNumber(value);
                            }
                          }}
                          maxLength={16}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* URL Section */}
                {url && (
                  <div className="relative p-3 border border-gray-300 rounded-md shadow-sm">
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
                          id="templateUrlTitle"
                          name="templateUrlTitle"
                          type="text"
                          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md"
                          placeholder="Button Title"
                          value={urlTitle}
                          onChange={(e) => setUrlTitle(e.target.value)}
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
                              onClick={() => {
                                setUrl("");
                                setUrlTitle("");
                              }}
                            />
                          </div>
                        </div>
                        <input
                          id="templateUrl"
                          name="templateUrl"
                          type="text"
                          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md"
                          placeholder="Enter URL"
                          value={url}
                          onChange={(e) => {
                            if (!e.target.value) {
                              setUrl("https://");
                              return;
                            }
                            setUrl(e.target.value);
                            validateUrl(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-2 border-gray-500 w-max p-2 rounded-2xl">
                      <CustomTooltip
                        title="Enable this option to generate a tracking URL for your WhatsApp interactive template. 
When checked, every click on the button will be tracked and logged into analytics. 
You’ll be able to measure user engagement, monitor performance, and generate detailed reports 
on how recipients interact with your message"
                        placement="top"
                        arrow
                      >
                        <span>
                          <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                        </span>
                      </CustomTooltip>
                      <label
                        htmlFor="isShortUrl"
                        className="text-gray-800 text-sm font-medium"
                      >
                        Tracking URL?
                      </label>
                      <input
                        id="isShortUrl"
                        name="isShortUrl"
                        type="checkbox"
                        value={Boolean(isShortUrl)}
                        onChange={(e) => setIsShortUrl(Number(e.target.checked))}
                      />
                    </div>
                    {!isShortUrl && (
                      <div className="mt-1">
                        <VariableManagerUrl
                          templateFormat={url}
                          setTemplateFormat={setUrl}
                          onUpdateVariables={updateVariables}
                          allowSingleVariable={true}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          {/* Quick Replies */}
          {(interactiveAction === "quickReplies" ||
            interactiveAction === "all") && (
              <>
                {quickReplies.length > 0 && (
                  <div className="space-y-2 border border-gray-300 rounded-md shadow-sm p-3">
                    {quickReplies.map((reply, index) => (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            {`Quick Reply ${index + 1}`}
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
                        <div key={index} className="flex items-center gap-2">
                          <input
                            id={`quickReply${index}`}
                            name={`quickReply${index}`}
                            type="text"
                            className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded-md"
                            placeholder={`Quick Reply ${index + 1}`}
                            value={reply}
                            onChange={(e) =>
                              handleQuickReplyChange(index, e.target.value)
                            }
                            maxLength={25}
                          />
                          <MdOutlineDeleteForever
                            className="text-red-500 cursor-pointer hover:text-red-700"
                            size={24}
                            // className="text-gray-500 cursor-pointer hover:text-red-500"
                            onClick={() => removeQuickReply(index)}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </>
            )}
        </div>
      </div>

      {/* Flow configurations */}
      {interactiveAction === "flow" && (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2 p-3 border border-gray-300 rounded-md shadow-sm">
          <InputField
            id="flowTitle"
            name="flowTitle"
            label="Flow Title"
            tooltipContent="Type title which display as a flow button label"
            type="text"
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            placeholder="Flow Title"
            value={flowTemplateState.title}
            onChange={(e) =>
              setFlowTemplateState((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            maxLength={25}
          />
          <DropdownWithSearch
            id="flowId"
            name="flowId"
            label="Select flow"
            tooltipContent="Select Flow (List of Published Flows Only!)"
            options={allFlows
              .slice()
              .sort((a, b) => a.flowName.localeCompare(b.flowName))
              .map((flow) => ({
                value: flow.flowId,
                label: flow.flowName,
              }))}
            // options={allUsers
            //   .slice()
            //   .sort((a, b) => a.userName.localeCompare(b.userName))
            //   .map((user) => ({
            //     label: user.userName,
            //     value: user.srNo,
            //   }))
            // }
            value={flowTemplateState.flow_id}
            onChange={(e) => {
              setFlowTemplateState((prev) => ({
                ...prev,
                flow_id: e,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveActions;
