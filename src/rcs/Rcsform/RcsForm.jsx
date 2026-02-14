import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import toast from "react-hot-toast";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import IMG1 from "@/assets/images/img1.jpg";
import IMG2 from "@/assets/images/img2.jpg";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/components/common/UniversalButton";

const steps = ["Bot Details", "Business Details", "Otp Details", "Submit"];

const RcsForm = () => {
  // step1
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [displayName, setDisplayName] = useState("Title");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState(
    "Celitix is a SMS panel to send updates on transactions important information to customers"
  );
  const [color, setColor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("860-886-6162");
  const [phoneLabel, setPhoneLabel] = useState("Customer Care Number");
  const [emailId, setEmailId] = useState("whistle@whistle.mobi");
  const [emailLabel, setEmailLabel] = useState("Email Address");
  const [website, setWebsite] = useState("https://whistle.mobi/");
  const [websiteLabel, setWebsiteLabel] = useState("Official Website");
  const [privacy, setPrivacy] = useState("");
  const [termCondition, setTermCondition] = useState("");
  const [botLanguage, setBotLanguage] = useState("");
  const [webHook, setWebHook] = useState("");

  // step2
  const [businesscategory, setBusinessCategory] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [pin, setPin] = useState("");
  const [pocFirstname, setPocFirstname] = useState("");
  const [pocLastname, setPocLastname] = useState("");
  const [pocDesignation, setPocDesignation] = useState("");
  const [pocPhoneNumber, setPocPhoneNumber] = useState("");
  const [corporateEmailId, setCorporateEmailId] = useState("");
  const [identityProof, setIdentityProof] = useState("");
  const [identityProofNumber, setIdentityProofNumber] = useState("");
  const [businessPan, setBusinessPan] = useState("");

  // step3
  const [otpinfo, setOtpInfo] = useState("");
  const [otpInmessage, setOtpInmessage] = useState("");
  const [otPInUrl, setOtpInUrl] = useState("");
  const [otpOutmessage, setOtpOutmessage] = useState("");

  // step4
  const [webSiteUrl, setWebSiteUrl] = useState("");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChangeEnable = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const validateEmail = (emailId, corporateEmailId) =>
    /^[^\s@]+@gmail\.com$/.test(emailId, corporateEmailId);

  const validatePhoneNumber = (phoneNumber, pocPhoneNumber) => {
    const patterns = [
      /^\d{10}$/,
      /^\d{3}-\d{3}-\d{4}$/,
      /^\d{3} \d{3} \d{4}$/,
      /^\+1 \d{3}-\d{3}-\d{4}$/,
      /^\(\d{3}\) \d{3}-\d{4}$/,
    ];
    return patterns.some((pattern) =>
      pattern.test(phoneNumber, pocPhoneNumber)
    );
  };

  const handleSubmit = () => {
    if (!validateEmail(emailId))
      return toast.error("Only valid Gmail addresses are allowed");
    if (!validatePhoneNumber(phoneNumber))
      return toast.error("Phone number should be digits");
    toast.success("Form submitted successfully");
  };

  return (
    <div className="flex justify-between w-full  gap-1 h-full p-2">
      <div className=" py-2 w-full border-2 border-gray-400 rounded-xl h-full relative flex flex-col">
        <div className="w-full">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="mt-4 h-full relative overflow-scroll px-5">
          {activeStep === 0 && (
            <div className="stapone grid md:grid-col-3 grid-col-1 space-y-2 ">
              <h2 className="text-2xl font-bold text-blue-500 flex justify-start items-center popf">
                Bot Details
              </h2>

              <div className="flex gap-2  popf">
                <label className="text-md font-semibold text-gray-500  ">
                  Bot Type:
                </label>
                <p className="text-gray-500">Domestics</p>
              </div>
              <div className="flex flex-col gap-3 popf">
                <div className="space-x-4 flex mb-3">
                  <div>
                    <label className="text-md font-semibold popf text-gray-500">
                      Message Type*:
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-4 ">
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="messageotp"
                        name="messageotp"
                        value="option1"
                        checked={selectedOption === "option1"}
                        onChange={handleChangeEnable}
                      />
                      <label htmlFor="messageotp" className="ml-2">
                        OTP
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="messagepromotional"
                        name="messagepromotional"
                        value="option2"
                        checked={selectedOption === "option2"}
                        onChange={handleChangeEnable}
                      />
                      <label htmlFor="messagepromotional" className="ml-2">
                        Promotional
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="messageTransactional"
                        name="messageTransactional"
                        value="option3"
                        checked={selectedOption === "option3"}
                        onChange={handleChangeEnable}
                      />
                      <label htmlFor="messageTransactional" className="ml-2">
                        Trasactional
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" w-full gap-6  grid grid-cols-3">
                  <div className="w-full ">
                    <InputField
                      maxLength={20}
                      value={displayName}
                      label="Bot Display Name*"
                      type="text"
                      placeholder="Enter Bot Name"
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full ">
                    <InputField
                      maxLength={30}
                      value={companyName}
                      label="Brand/Company Name*"
                      placeholder="Enter Brand/Company Name"
                      type="text"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={200}
                      value={description}
                      label="Bot Description"
                      placeholder="Enter Bot Description"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={color}
                      label="Color*"
                      type="color"
                      onChange={(e) => setColor(e.target.value)}
                    />
                    {/* <ColorPicker
                   disabled/> */}
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={10}
                      value={phoneNumber}
                      label="Primary Phone Number*"
                      placeholder="Enter Primary Phone Number"
                      type="mobileNo"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={15}
                      value={phoneLabel}
                      label="Primary Phone Label*"
                      placeholder="Enter Primary Phone Label"
                      type="text"
                      onChange={(e) => setPhoneLabel(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={emailId}
                      label="Primary Email Id*"
                      placeholder="info@celitix.com"
                      type="email"
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={10}
                      value={emailLabel}
                      label="Primary Email label*"
                      placeholder="Email"
                      type="text"
                      onChange={(e) => setEmailLabel(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={website}
                      label="Website*"
                      placeholder="Enter URL"
                      type="url"
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={20}
                      value={websiteLabel}
                      label="Website Label*"
                      placeholder="Website"
                      type="text"
                      onChange={(e) => setWebsiteLabel(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={privacy}
                      label="Privacy Policy URL*"
                      placeholder="Enter Privacy Policy URL"
                      type="text"
                      onChange={(e) => setPrivacy(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={termCondition}
                      label="Term & Conditions URL*"
                      placeholder="Enter Term & Conditions URL "
                      type="text"
                      onChange={(e) => setTermCondition(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={15}
                      value={botLanguage}
                      label="Bot Language*"
                      placeholder="Enter Language Name "
                      type="text"
                      onChange={(e) => setBotLanguage(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={webHook}
                      label="Webhook URL*"
                      placeholder="Enter Webhook URL"
                      type="text"
                      onChange={(e) => setWebHook(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="stapone ">
              <h2 className="text-2xl font-bold text-blue-500 justify-center items-center popf mb-5">
                Business Details
              </h2>
              <div className="flex flex-col gap-3 popf">
                <div className="w-full gap-4 grid md:grid-cols-3 grid-cols-1">
                  <div className="w-full">
                    <AnimatedDropdown
                      id="businesscategory"
                      name="businesscategory"
                      value={businesscategory}
                      label="Business Category*"
                      tooltipPlacement="right"
                      placeholder="Select Business Address Proof"
                      options={[
                        {
                          value: "Advertising/marketing",
                          label: "Advertising/marketing",
                        },
                        {
                          value: "  Arts & entertainment",
                          label: "  Arts & entertainment",
                        },
                        {
                          value: "Commercial and industrial",
                          label: "Commercial and industrial",
                        },
                        {
                          value: "Education",
                          label: "Education",
                        },
                        {
                          value: "Telecom",
                          label: "Telecom",
                        },
                        {
                          value: "Finance",
                          label: "Finance",
                        },
                        {
                          value: "Hotel and B&B",
                          label: "Hotel and B&B",
                        },
                        {
                          value: "Legal",
                          label: "Legal",
                        },
                        {
                          value: "Local Service",
                          label: "Local Service",
                        },
                        {
                          value: "Media/ News Company",
                          label: "Media/News company",
                        },
                        {
                          value: " Non-governmental organisation (NGO)",
                          label: " Non-governmental organisation (NGO)",
                        },
                        {
                          value: "Non-profit organisation",
                          label: "Non-profit organisation",
                        },
                        {
                          value: "Science, technology and engineering",
                          label: "Science, technology and engineering",
                        },
                        {
                          value: "Shopping & retail",
                          label: "Shopping & retail",
                        },
                        {
                          value: " Sport & recreation",
                          label: " Sport & recreation",
                        },
                        {
                          value: " Community organisation",
                          label: "Community organisation",
                        },
                        {
                          value: " Others",
                          label: "Others",
                        },
                        {
                          value: " Not Available",
                          label: "Not Available",
                        },
                        {
                          value: "Goverment",
                          label: "Goverment",
                        },
                      ]}
                      onChange={(value) => setBusinessCategory(value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={20}
                      value={cityName}
                      label="City*"
                      type="text"
                      placeholder="Enter City Name"
                      onChange={(e) => setCityName(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={20}
                      value={stateName}
                      label="State*"
                      type="text"
                      placeholder="Enter State Name"
                      onChange={(e) => setStateName(e.target.value)}
                    />
                  </div>
                  <div className="w-full ">
                    <InputField
                      maxLength={10}
                      value={pin}
                      label="Pin*"
                      placeholder="Enter Pin"
                      type="text"
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={15}
                      value={pocFirstname}
                      label="Point Of Contact (POC) First Name*"
                      placeholder="Enter Point of contact (POC) First Name"
                      type="text"
                      onChange={(e) => setPocFirstname(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={15}
                      value={pocLastname}
                      label="Point Of Contact (POC) Last Name*"
                      placeholder="Enter Point of contact (POC) Last Name"
                      type="text"
                      onChange={(e) => setPocLastname(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={25}
                      value={pocDesignation}
                      label="POC Designation *"
                      placeholder="Enter POC Designation"
                      type="text"
                      onChange={(e) => setPocDesignation(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      maxLength={10}
                      value={pocPhoneNumber}
                      label="POC Phone Number*"
                      placeholder="Enter POC Phone Number"
                      type="mobilenumber"
                      onChange={(e) => setPocPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={corporateEmailId}
                      label="POC Corporate Email Id*"
                      placeholder="Enter POC Corporate Email Id"
                      type="email"
                      onChange={(e) => setCorporateEmailId(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={identityProof}
                      label="POC Identity Proof*"
                      placeholder="Enter POC Identity Proof"
                      type="text"
                      onChange={(e) => setIdentityProof(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={identityProofNumber}
                      label="POC Identity Proof*"
                      placeholder="Enter POC Identity Proof Number"
                      type="text"
                      onChange={(e) => setIdentityProofNumber(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={businessPan}
                      label="Business PAN*"
                      placeholder="Enter Business Pan"
                      type="text"
                      onChange={(e) => setBusinessPan(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <AnimatedDropdown
                      id="businessAddress"
                      name="businessAddress"
                      value={businessAddress}
                      label="Business Category*"
                      tooltipPlacement="right"
                      placeholder="Business Address Proof"
                      options={[
                        {
                          value: "Utility Bill",
                          label: "Utility Bill",
                        },
                        {
                          value: "Business License",
                          label: "Business License",
                        },
                        {
                          value: "Tax Return",
                          label: "Tax Return",
                        },
                      ]}
                      onChange={(value) => setBusinessAddress(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="stapone ">
              <h2 className="flex justify-start items-center text-2xl font-bold text-blue-500 mb-6">
                OTP Details{" "}
              </h2>
              <div className="flex flex-col gap-5 popf">
                <div className=" w-full gap-4 grid grid-cols-2">
                  <div className="w-full">
                    <InputField
                      value={otpinfo}
                      label="Otp-In Information*"
                      placeholder="Enter Otp Information"
                      onChange={(e) => setOtpInfo(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={otPInUrl}
                      label="Otp-In Url*"
                      placeholder="Enter Otp-in Url"
                      onChange={(e) => setOtpInUrl(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={otpInmessage}
                      label="Otp-In Message*"
                      placeholder="Enter Otp-in Message"
                      onChange={(e) => setOtpInmessage(e.target.value)}
                    />
                  </div>

                  <div className="w-full ">
                    <InputField
                      value={otpOutmessage}
                      label="Otp-Out Message*"
                      placeholder="Enter Otp-Out Message"
                      onChange={(e) => setOtpOutmessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full ">
                <InputField
                  value={webSiteUrl}
                  label="Website*"
                  placeholder="Enter Url"
                  onChange={(value) => setWebSiteUrl(value)}
                />
              </div>

              <div className="w-full ">
                <InputField
                  value={privacyPolicyUrl}
                  label="Privacy Policy Url*"
                  placeholder="Enter Privacy Url "
                  onChange={(value) => setPrivacyPolicyUrl(value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-full px-5">
          <div className="flex justify-between mb-1 mt-4 gap-4">
            {/* Back */}
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold 
               bg-gray-200 text-gray-800 border border-gray-400
               disabled:opacity-50 disabled:cursor-not-allowed
               hover:bg-gray-300 transition-all duration-300 shadow-md"
            >
              ⬅ Back
            </button>

            {/* Next / Submit */}
            {activeStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-2 rounded-full font-semibold text-white
                 bg-gradient-to-r from-cyan-500 to-blue-500
                 hover:from-blue-500 hover:to-cyan-500
                 transition-all duration-300 shadow-lg"
              >
                🚀 Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-2 rounded-full font-semibold text-white
                 bg-gradient-to-r from-cyan-500 to-blue-500
                 hover:from-blue-500 hover:to-cyan-500
                 transition-all duration-300 shadow-lg"
              >
                Next ➡
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center p-5 w-[40%] border-2 border-gray-400 rounded-xl">
        {/* <div className="bg-gray-400"> */}

        <div className="p-3 max-w-100 border bg-gray-50 rounded-4xl shadow-gray-700 space-y-2 h-auto">
          <div className="flex items-center justify-center">
            <div className="bg-gray-300 h-2 rounded-full w-25 "></div>
          </div>
          <div className="flex flex-col relative h-35 2xl:h-50 items-center">
            <img
              src={IMG1}
              alt="Image Preview"
              className="w-full rounded-t-2xl h-30 2xl:h-43"
            />
            <div className="flex justify-center items-center absolute bottom-0 ">
              <img
                className="w-15 2xl:w-20 rounded-full  "
                src={IMG2}
                alt="Logo"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl 2xl:text-3xl"> {displayName}</p>
              <p className=" text-gray-400 text-center text-md 2xl:text-xl">
                {" "}
                {description}
              </p>
            </div>

            <div className="flex flex-row justify-center rounded-xl border-gray-300 border-2 p-2 gap-4  mt-5 text-[#337ab7] text-center mb-3">
              <div className="">
                <CallOutlinedIcon className="text-lg" />
                <p>Call</p>
              </div>
              <div>
                <LanguageOutlinedIcon className=" text-lg" />
                <a href="#" target="_blank">
                  <p className="">Website</p>
                </a>
              </div>
              <div className="">
                <MailOutlineOutlinedIcon className="text-lg" />
                <p>Email</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 text-md  px-4">
              <div className="border-t-2 border-gray-300 flex items-center gap-x-5 pt-2">
                <CallOutlinedIcon className="text-sm  text-[#337ab7] " />
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#337ab7]" maxLength={10}>
                    +91 <span className="text-[#337ab7]">{phoneNumber}</span>
                  </p>
                  <p className="text-[#337ab7]">{phoneLabel}</p>
                </div>
              </div>

              <div className=" border-t-2 border-gray-300 flex items-center gap-x-5 pt-2">
                <LanguageOutlinedIcon className="text-[#337ab7] text-sm" />
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#337ab7]"> {website}</p>
                  <p className="text-[#337ab7]">{websiteLabel}</p>
                </div>
              </div>

              <div className=" border-t-2 border-gray-300 flex items-center gap-x-5 pt-2">
                <MailOutlineOutlinedIcon className="text-lg text-[#337ab7] " />
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#337ab7]" maxLength={15}>
                    {emailId}
                  </p>
                  <p className="text-[#337ab7]">{emailLabel}</p>
                </div>
              </div>
              <div className="flex items-center justify-center border-t-2 border-gray-300  px-4">
                {/* <div className="bg-gray-300 h-10 rounded-full w-10 mt-2"></div> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* right-panel */}
          {/* <div className="">
             <label>
             Banner image<span
                    className="w-50"
                  ></span>
             </label>
                 
               <label>
               Bot Logo<span className="w-50"></span>
               </label>
               
                  
                <label>
                Short Description<span
                    className="w-50"
                  ></span>
                </label>
               
                  <label>
                  Color<span className="w-50"></span>
                  </label>
               <label>
               Label for phone Number<span
                   className="w-50"
                  ></span>
               </label>
               
                 <label>
                 Label for website<span
                  className="w-50"
                  ></span>
                 </label>
               
                
                  <label>
                  Label for email<span
                    className="w-50"
                    
                  ></span>
                  </label>
              </div> */}
          {/* left-panel */}

          {/* <div >
               <label>
               Bot name<span className="w-75"></span>
               </label>
                
               
               <label>
               Phone Number<span
                    className="w-50"
                  ></span>
              
               </label>
                 
               <label>
               Website<span className="w-50"></span>
               </label>
                 
              <label>
              Email<span className="w-50"></span>
              </label>
                    
              
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default RcsForm;
