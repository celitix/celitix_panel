import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { UAParser } from "ua-parser-js";
import { InputOtp } from "primereact/inputotp";
import { Link, useNavigate } from "react-router-dom";

// ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

// CONTEXT
import { useUser } from "@/context/auth";

// CSS
import "./login.css";

// ASSETS
import celitixLogo from "@/assets/images/celitix-logo-white.svg";
import celitix_logo from "@/assets/images/celitix-logo-white.svg";

import celitixLogoNew from "@/assets/images/celitix-cpaas-solution-logo.svg";

// APIS
import {
  forgotPassword,
  getIpAddress,
  login,
  verifyOtp,
  requestOtp,
  verifyForgotPasswordOtp,
} from "@/apis/auth/auth";
import { getAllowedServices } from "@/apis/admin/admin";

// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import { countryList } from "./constants/countryList";
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import PhoneInputWithCode from "@/components/common/PhoneInputWithCode";

const Login = () => {
  const parser = new UAParser();
  const uaResult = parser.getResult();

  const navigate = useNavigate();
  const { authLogin } = useUser();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(91);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [inputDetails, setInputDetails] = useState({
    userId: "",
    password: "",
    rememberMe: false,
    // mobileNo: "",
    // otp: "",
    ip: "",
    systemInfo: "",
  });

  const [forgotPassState, setForgotPassState] = useState({
    userId: inputDetails.userId,
    mobileNo: "",
  });

  const [otpDetails, setOtpDetails] = useState({
    email: "",
    mobileNo: "",
    otp: "",
  });

  const [passwordState, setPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsBtnVisible(true);

      const handleResendOtp = async () => {
        if (!inputDetails.userId || !inputDetails.mobileNo) return;
        try {
          const res = await forgotPassword({
            userId: inputDetails.userId,
            mobileNo: inputDetails.mobileNo,
          });

          if (!res?.data.status) {
            return toast.error(res?.data?.msg || "Unable to send OTP");
          }
          toast.success(res?.data?.msg);
        } catch (e) {
          console.log(e);
          toast.error("Unable to send OTP");
        }
      };
      handleResendOtp();
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleLogin() {
    if (!inputDetails.userId || !inputDetails.password) {
      return toast.error("Enter userID and password");
    }

    setLoading(true);
    try {
      const systemData = {
        browser: {
          name: uaResult.browser.name || "Unknown",
          version: uaResult.browser.version || "Unknown",
        },
        os: {
          name: uaResult.os.name || "Unknown",
          version: uaResult.os.version || "Unknown",
        },
      };

      // const ipResponse = await axios.get("https://ipapi.co/json/");

      const ipResponse = await getIpAddress();

      setInputDetails((prev) => ({
        ...prev,
        // systemInfo: uaResult.browser.name || "Unknown",
        // ip: ipResponse?.data?.clientIp || "0.0.0.0",
        systemInfo: "Chrome",
        ip: "49.36.234.187",
      }));

      const payloadd = {
        ...inputDetails,
        // systemInfo: uaResult.browser.name || "Unknown",
        // ip: ipResponse?.data?.clientIp || "0.0.0.0",
        systemInfo: "Chrome",
        ip: "49.36.234.187",
      };

      delete payloadd.rememberMe;
      const res = await login(payloadd);

      if (res?.data?.validateOtp) {
        setStep(2);
        return;
      }

      if (!res?.data?.token) {
        return toast.error("Invalid credentials");
      }

      if (inputDetails?.rememberMe) {
        localStorage.setItem("token", res?.data?.token);
      } else {
        sessionStorage.setItem("token", res?.data?.token);
      }

      // let allowedServices = null;

      // if (
      //   res?.data?.role !== "AGENT" &&
      //   res?.data?.role !== "SALESPERSON" &&
      //   res?.data?.role !== "ACCOUNTUSER"
      // ) {
      //   allowedServices = await getAllowedServices();
      // }
      setIsRedirecting(true);
      toast.success("Login Successfull!");

      const [allowedServices] = await Promise.all([
        res?.data?.role !== "AGENT" &&
          res?.data?.role !== "SALESPERSON" &&
          res?.data?.role !== "ACCOUNTUSER"
          ? getAllowedServices()
          : Promise.resolve(null),
        delay(2500),
      ]);

      const allowedRoles = ["AGENT", "SALESPERSON", "ACCOUNTUSER", "DIRECTUSER", "ADMIN"];

      if (!allowedRoles.includes(res?.data?.role)) {
        toast.error("This user role not allowed");
        return;
      }

      authLogin(res?.data?.role, allowedServices, res?.data?.ttl);
      navigate("/");
      // setStep(2);
    } catch (e) {
      console.log(e);
      setIsRedirecting(false);
      return toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  }

  // async function handleSentForgotPasswordOtp() {
  //   if (!forgotPassState.userId || !forgotPassState.mobileNo)
  //     return toast.error("Enter email and phone number");

  //   try {
  //     const res = await forgotPassword(forgotPassState);

  //     if (!res?.data.status) {
  //       return toast.error("Either user id or mobile number is incorrect");
  //     }
  //     toast.success(res?.data?.msg);
  //     setStep(3);
  //   } catch (e) {
  //     console.log(e);
  //     return toast.error("Unable to send OTP");
  //   }
  // }

  useEffect(() => {
    setCountryCodes(countryList);
  }, []);

  const formattedCountryOptions = countryCodes.map((c) => ({
    value: c.countryCode,
    label: `${c.countryName} (+${c.countryCode})`,
  }));

  // async function handleSendOtp() {
  //   delete inputDetails.rememberMe;
  //   let payload = {};
  //   if (isForgotPassword) {
  //     payload = {
  //       userId: inputDetails.userId,
  //       mobileNo: inputDetails.mobileNo,
  //     };
  //   } else {
  //     payload = { ...inputDetails };
  //   }
  //   setLoading(true)
  //   try {
  //     const res = isForgotPassword
  //       ? await forgotPassword(payload)
  //       : await requestOtp(payload);
  //     if (!res?.data?.status) {
  //       toast.error(res?.data?.msg || "Unable to send OTP");
  //       return;
  //     }
  //     toast.success(res?.data?.msg);
  //     setStep(3);
  //   } catch (e) {
  //     console.log(e);
  //     return toast.error("Unable to send OTP");
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // async function handleVerifyForgotPasswordOtp() {
  //   console.log(otp);
  //   if (!otp?.mobileNo) {
  //     return toast.error("Enter OTP");
  //   }

  //   const data = {
  //     userId: forgotPassState.userId,
  //     mobileNo: forgotPassState.mobileNo,
  //     otp: otp?.mobileNo,
  //   };
  //   try {
  //     const res = await verifyOtp(data);
  //     if (!res?.data?.status) {
  //       return toast.error(res?.data?.msg);
  //     }
  //     toast.success("OTP verified successfully");
  //     setStep(1);
  //   } catch (e) {
  //     console.log(e);
  //     return toast.error("Unable to verify OTP");
  //   }
  // }

  async function handleSendOtp() {
    // if (!selectedCode || selectedCode === "no-selection") {
    //   toast.error("Please select country code.");
    //   return;
    // }
    if (!inputDetails.mobileNo) {
      toast.error("Please enter your mobile number.");
      return;
    }

    delete inputDetails.rememberMe;

    let payload = {};
    if (isForgotPassword) {
      payload = {
        userId: inputDetails.userId,
        // mobileNo: `${selectedCode}${inputDetails.mobileNo}`,
        mobileNo: `${selectedCode}${inputDetails.mobileNo}`,
      };
    } else {
      payload = {
        ...inputDetails,
        mobileNo: `${selectedCode}${inputDetails.mobileNo}`,
      };
    }

    setLoading(true);
    setLoadingResend(true);
    try {
      const res = isForgotPassword
        ? await forgotPassword(payload)
        : await requestOtp(payload);

      if (!res?.data?.status) {
        toast.error(res?.data?.msg || "Unable to send OTP");
        return;
      }

      toast.success(res?.data?.msg);
      setStep(3);
    } catch (e) {
      console.log(e);
      return toast.error("Unable to send OTP");
    } finally {
      setLoading(false);
      setLoadingResend(false);
    }
  }

  async function handleVerifyOtp() {
    if (!inputDetails.otp) {
      return toast.error("Enter OTP");
    }

    delete inputDetails.rememberMe;

    setLoading(true);

    try {
      let payload = {};
      if (isForgotPassword) {
        payload = {
          userId: inputDetails.userId,
          // mobileNo: inputDetails.mobileNo,
          mobileNo: `${selectedCode}${inputDetails.mobileNo}`,
          otp: inputDetails.otp,
        };
      } else {
        payload = {
          ...inputDetails,
          mobileNo: `${selectedCode}${inputDetails.mobileNo}`,
        };
      }

      const res = isForgotPassword
        ? await verifyForgotPasswordOtp(payload)
        : await verifyOtp(payload);

      // if (!res?.data?.status || res?.data?.statusCode !== 200) {
      //   return toast.error(res?.data?.msg || "Unable to verify OTP");
      // }
      // toast.success("OTP Verified Successfully");

      if (res?.data?.statusCode !== 200) {
        return toast.error(res?.data?.msg || "Unable to verify OTP");
      }

      toast.success(res?.data?.message || "OTP verified successfully");

      if (isForgotPassword) {
        setStep(1);
        return;
      }
      sessionStorage.setItem("token", res?.data?.token);
      // let allowedServices = null;
      // if (
      //   res?.data?.role !== "AGENT" &&
      //   res?.data?.role !== "SALESPERSON" &&
      //   res?.data?.role !== "ACCOUNTUSER"
      // ) {
      //   allowedServices = await getAllowedServices();
      // }
      setIsRedirecting(true);

      const [allowedServices] = await Promise.all([
        res?.data?.role !== "AGENT" &&
          res?.data?.role !== "SALESPERSON" &&
          res?.data?.role !== "ACCOUNTUSER"
          ? getAllowedServices()
          : Promise.resolve(null),
        delay(2500),
      ]);

      const allowedRoles = ["AGENT", "SALESPERSON", "ACCOUNTUSER", "DIRECTUSER"];

      if (!allowedRoles.includes(res?.data?.role)) {
        toast.error("This user role not allowed");
        return;
      }

      // toast.success("Login Successful!");
      authLogin(res?.data?.role, allowedServices, res?.data?.ttl);
      navigate("/");
      // setStep(2);
    } catch (e) {
      console.log(e);
      setIsRedirecting(false);
      return toast.error("Unable to verify OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOTP() {
    setCountdown(15);
    setIsBtnVisible(false);
  }

  const handleBackToOne = () => {
    setStep(1);
  };
  const handleBackToTwo = () => {
    setStep(2);
  };
  const handleBackToThree = () => {
    setStep(3);
  };

  return (
    <>
      <Header />

      <div className="flex flex-col h-screen overflow-none scroll-smooth">
        {/* main content */}
        <div className="flex-1 flex items-center justify-center min-h-screen bg-[#edf5ff]">
          {isRedirecting ? (
            // ==============================first ui ===============================

            // <motion.div
            //   initial={{ opacity: 0, scale: 0.95 }}
            //   animate={{ opacity: 1, scale: 1 }}
            //   className="flex flex-col items-center justify-center p-8 text-center"
            // >
            //   <div className="relative mb-6">
            //     <div className="w-30 h-30 border-4 border-gray-100 rounded-full"></div>
            //     <div className="absolute top-0 left-0 w-30 h-30 border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            //     <div className="absolute inset-0 flex items-center justify-center">
            //       <img src={celitixLogoNew} alt="Logo" className="w-20 h-20 " />
            //     </div>
            //   </div>

            //   <h2 className="text-2xl font-semibold text-gray-800 mb-2 playf">
            //     Setting up your workspace
            //   </h2>
            //   <p className="text-gray-500 text-sm mb-8 max-w-[250px]">
            //     Please wait while we prepare your personalized dashboard and secure your session.
            //   </p>
            //   <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 overflow-hidden">
            //     <motion.div
            //       initial={{ width: "0%" }}
            //       animate={{ width: "100%" }}
            //       transition={{ duration: 1.5, ease: "easeInOut" }}
            //       className="bg-green-700 h-full rounded-full"
            //     />
            //   </div>

            //   <div className="flex justify-between w-full text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            //     <span>Authenticating</span>
            //     <span>Finalizing</span>
            //   </div>
            // </motion.div>

            // =================================second ui ===================================

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-screen flex items-center justify-center bg-[#f3f6fb]"
            >
              {/* Soft background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-[420px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] px-10 py-12"
              >
                {/* Logo + circular loader */}
                <div className="flex justify-center mb-10">
                  <div className="relative w-34 h-34 flex items-center justify-center">
                    {/* Loader ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.4,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border-[3px] border-blue-100 border-t-blue-600"
                    />
                    {/* Logo */}
                    <div className="w-34 p-3 h-34 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <img
                        src={celitixLogoNew}
                        alt="Celitix"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-semibold text-gray-900 text-center playf mb-2">
                  Signing you in
                </h1>

                <p className="text-sm text-gray-500 text-center mb-10">
                  Setting up your secure workspace. Please wait.
                </p>

                {/* Progress bar */}
                <div className="w-full h-[4px] bg-blue-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  />
                </div>

                {/* Footer */}
                <p className="mt-6 text-[11px] text-gray-400 text-center tracking-wide">
                  Protected by enterprise-grade security
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-[#ffffff] rounded-xl shadow-lg w-[830px] h-120 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                      }}
                      className="h-full flex flex-col md:p-6 mt-7 space-y-4 p-2"
                    >
                      <div>
                        <h1 className="text-[2.8rem] text-center font-semibold bluetxt playf">
                          Welcome Back
                        </h1>
                        <p className="text-base sm:text-sm text-center ">
                          Enter your userId and password to access your account
                        </p>
                      </div>
                      <label className="text-[0.95rem] font-medium text-gray-700 mb-2">
                        User ID
                      </label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        label="User ID"
                        value={inputDetails.userId}
                        onChange={(e) => {
                          setInputDetails({
                            ...inputDetails,
                            userId: e.target.value,
                          });
                        }}
                        placeholder="Enter User ID"
                        className={`block w-full p-2 py-2.5 border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${loading
                          ? "bg-gray-300 transition-all duration-100 cursor-not-allowed "
                          : ""
                          } `}
                        disabled={loading}
                        required
                      />
                      <div className="">
                        <div className="text-[0.95rem] font-medium text-gray-700 mb-2">
                          Password
                        </div>
                        <div className="relative z-0">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={inputDetails.password}
                            onChange={(e) => {
                              setInputDetails({
                                ...inputDetails,
                                password: e.target.value,
                              });
                            }}
                            required
                            id="password"
                            name="password"
                            className={`block w-full p-2 py-2.5 border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${loading
                              ? "bg-gray-300 transition-all duration-100 cursor-not-allowed "
                              : ""
                              } `}
                            disabled={loading}
                          />
                          <div
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible size={20} />
                            ) : (
                              <AiOutlineEye size={20} />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <button
                      className="hover:underline text-[0.85rem] cursor-pointer tracking-wide font-medium text-right text-gray-700 hover:text-gray-900 transition-all duration-200"
                      onClick={() => {
                        setStep(2);
                        setIsForgotPassword(true);
                      }}
                    >
                      Forgot Password{" "}?
                    </button> */}
                      <div className="flex items-center justify-center ">
                        <button
                          className={`custom-signin-btn ${loading ? "loading" : ""
                            }`}
                          disabled={loading}
                          onClick={handleLogin}
                        >
                          <div className="back"></div>
                          {!loading ? (
                            <span className="text">Sign In</span>
                          ) : (
                            <div className="circle-spinner" />
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 flex flex-col justify-center col-start-2"
                    >
                      <div className="flex flex-col items-center justify-center space-y-5 w-90 min-h-100 p-4 rounded-2xl shadow-md">
                        <div>
                          {isForgotPassword ? (
                            <>
                              <h1 className="text-[2.8rem] text-center font-semibold bluetxt playf">
                                Forgot Password
                              </h1>
                              <p className="text-base sm:text-sm text-center ">
                                Provide your mobile number <br />{" "}
                                <span className="text-sm font-medium">
                                  (with country code)
                                </span>{" "}
                                & userId for secure access.
                              </p>
                            </>
                          ) : (
                            <>
                              <h1 className="text-[2.8rem] text-center font-semibold bluetxt playf">
                                Verify Number
                              </h1>
                              <p className="text-base sm:text-sm text-center ">
                                Provide your mobile number
                                <br />{" "}
                                <span className="text-sm font-medium">
                                  (with country code)
                                </span>{" "}
                                for secure access.{" "}
                              </p>
                            </>
                          )}
                        </div>
                        {isForgotPassword && (
                          <InputField
                            id="userId"
                            name={"userId"}
                            label="Enter User Id"
                            type="text"
                            placeholder="Enter userId"
                            value={inputDetails.userId}
                            onChange={(e) => {
                              setInputDetails({
                                ...inputDetails,
                                userId: e.target.value,
                              });
                            }}
                            className="w-full p-2 rounded-lg bg-gray-100 text-md"
                          />
                        )}
                        {/* <Drop
                      downWithSearch
                        id="countryCode"
                        name="countryCode"
                        label={"Select Country Code"}
                        options={formattedCountryOptions}
                        value={selectedCode}
                        onChange={(val) => setSelectedCode(val)}
                      />
                      <InputField
                        id="mobileNo"
                        name="mobileNo"
                        tooltipContent="Enter your registered mobile number only with country code"
                        label={"Enter Mobile No"}
                        value={inputDetails.mobileNo}
                        placeholder="Enter Mobile Number"
                        onChange={(e) => {
                          setInputDetails((prev) => ({
                            ...prev,
                            mobileNo: e.target.value,
                          }));
                        }}
                        type="text"
                        maxLength="10"
                        disabled={loading}
                      /> */}

                        <PhoneInputWithCode
                          label="Enter Mobile Number"
                          selectedCode={selectedCode}
                          onCodeChange={setSelectedCode}
                          value={inputDetails.mobileNo}
                          onChange={(e) =>
                            setInputDetails((prev) => ({
                              ...prev,
                              mobileNo: e.target.value,
                            }))
                          }
                        />

                        <div className="flex items-center justify-center">
                          <button
                            className={`custom-signin-btnlog ${loading ? "loading" : ""
                              }`}
                            disabled={loading}
                            onClick={() => {
                              handleSendOtp();
                            }}
                          >
                            <div className="back"></div>
                            {!loading ? (
                              <span className="text">Send OTP</span>
                            ) : (
                              <div className="circle-spinner" />
                            )}
                          </button>
                        </div>

                        {!loading && (
                          <p
                            className="text-sm text-gray-800 flex justify-center items-center  hover:underline hover:font-semibold transition-all cursor-pointer"
                            onClick={handleBackToOne}
                          >
                            <KeyboardBackspaceOutlinedIcon />
                            Back to login
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 flex flex-col justify-center col-start-2"
                    >
                      <div className="flex flex-col items-center space-y-5 justify-center w-90 min-h-100 p-5 rounded-2xl shadow-md">
                        <div>
                          <h1 className="text-[2.8rem] text-center font-semibold bluetxt playf">
                            Enter OTP
                          </h1>
                          <p className="text-base sm:text-sm text-center ">
                            We've sent a 6-digit code to your mobile. Enter it
                            below
                          </p>
                        </div>
                        <InputOtp
                          length={6}
                          value={inputDetails.otp}
                          onChange={(e) => {
                            setInputDetails({
                              ...inputDetails,
                              otp: e.value,
                            });
                          }}
                          variant={"outlined"}
                          className="p-2"
                        />

                        {error && (
                          <p className="text-red-500 text-sm mb-2">{error}</p>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center">
                            <button
                              className={`custom-signin-btnlog ${loading ? "loading" : ""
                                }`}
                              disabled={loading}
                              onClick={handleVerifyOtp}
                            >
                              <div className="back"></div>
                              {!loading ? (
                                <span className="text">Verify</span>
                              ) : (
                                <div className="circle-spinner" />
                              )}
                            </button>
                          </div>

                          {/* {countdown > 0 && (
                          <p className="text-sm text-green-800 mt-2 flex justify-center">
                            Resend OTP in {countdown}s
                          </p>
                        )} */}
                          {countdown != 0 && (
                            <p className="text-sm text-gray-600 mt-2 flex justify-center">
                              Resend OTP in {countdown}s
                            </p>
                          )}
                          {isBtnVisible && (
                            <div className="flex items-center justify-center">
                              <button
                                className={`custom-signin-btnlog ${loadingResend ? "loading" : ""
                                  }`}
                                disabled={loadingResend}
                                onClick={handleSendOtp}
                              >
                                <div className="back"></div>
                                {!loadingResend ? (
                                  <span className="text">Resend</span>
                                ) : (
                                  // <div className="circle-spinner" />
                                  <span className="text cursor-not-allowed opacity-75 blur-[1px]">
                                    Resend
                                  </span>
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                        {!loading && (
                          <p
                            className="text-sm text-gray-800 flex justify-center items-center  hover:underline hover:font-semibold transition-all cursor-pointer"
                            onClick={handleBackToTwo}
                          >
                            <KeyboardBackspaceOutlinedIcon />
                            Back to Mobile Input
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* <motion.div
                key={step}
                className="hidden md:flex flex-col items-center justify-center bg-gradient-to-r from-[#2b40b0] to-[#8447c6] text-white p-6"
                style={{
                  borderRadius: "150px 10px 10px 100px",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-5"
                >
                  <Link to="https://celitix.com">
                    <img
                      src={celitixLogo}
                      alt="Celitix"
                      style={{ width: "220px" }}
                    />
                  </Link>
                </motion.div>
                <p className="text-center text-md">
                  Welcome to the Future of Customer Communication - Your
                  Engagement Journey Begins Here.
                </p>
              </motion.div> */}

                <motion.div
                  className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden md:z-0 -z-10"
                  initial={{
                    x: 0,
                    borderTopLeftRadius: "150px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "100px",
                    borderBottomRightRadius: "0px",
                  }}
                  animate={{
                    x: step === 1 ? 0 : "-100%",
                    borderTopLeftRadius: step === 1 ? "150px" : "0px",
                    borderTopRightRadius: step === 1 ? "0px" : "150px",
                    borderBottomLeftRadius: step === 1 ? "130px" : "0px",
                    borderBottomRightRadius: step === 1 ? "0px" : "100px",
                  }}
                  transition={{
                    x: {
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.6,
                    },
                    borderTopLeftRadius: { duration: 0.6, ease: "easeInOut" },
                    borderTopRightRadius: { duration: 0.6, ease: "easeInOut" },
                    borderBottomLeftRadius: {
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                    borderBottomRightRadius: {
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    className="h-full md:flex flex-col items-center justify-center bg-gradient-to-r from-[#2b40b0] to-[#8447c6] text-white p-6 hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="mb-5"
                    >
                      <Link to="https://celitix.com">
                        <img
                          src={celitixLogo}
                          alt="Celitix"
                          style={{ width: "220px" }}
                        />
                      </Link>
                    </motion.div>
                    <h1 className="text-center text-md">
                      Welcome to the Future of Customer Communication - Your
                      Engagement Journey Begins Here.
                    </h1>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
        {/* main content */}
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default Login;
