import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputOtp } from "primereact/inputotp";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// CSS
import "./login.css";

// ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { UAParser } from "ua-parser-js";

// COMPONENTS
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";

// ASSETS
// import celitixLogo from "@/assets/images/celitix-logo-white.svg";
import celitixLogo from "@/assets/images/celitix-cpaas-solution-logo.svg";

// API
import {
  getIpAddress,
  login,
  requestOtp,
  verifyOtp,
  verifyForgotPasswordOtp,
  forgotPassword,
} from "@/apis/auth/auth";
import { getAllowedServices } from "@/apis/admin/admin";

// CONTEXT
import { useUser } from "@/context/auth";

const Login = () => {
  const { authLogin } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileotp, setMobileOtp] = useState("");
  const [emailotp, setEmailOtp] = useState("");
  const [timer, setTimer] = useState(20);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [numberOtp, setNumberOtp] = useState("");

  const [captchaProblem, setCaptchaProblem] = useState("");
  const [captchaSolution, setCaptchaSolution] = useState(null);

  const [basicDetails, setBasicDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestBtnLoading, setRequestBtnLoading] = useState(false);
  // const [basicDetails, setBasicDetails] = useState({});

  const parser = new UAParser();
  const uaResult = parser.getResult();

  const [passwordsMatch, setPasswordsMatch] = useState(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (newPassword === "" && confirmPassword === "") {
      setPasswordsMatch(null);
    } else if (newPassword === confirmPassword && newPassword !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    let countdown;
    if (
      isResendDisabled &&
      (step === "verifyOTP" || step === "verifynumberotp")
    ) {
      setTimer(20);
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isResendDisabled, step]);

  // captcha generate function
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * (num1 + 1));
    const operator = ["+", "-"][Math.floor(Math.random() * 2)];
    const solution = operator === "+" ? num1 + num2 : num1 - num2;

    setCaptchaProblem(`${num1} ${operator} ${num2} = ?`);
    setCaptchaSolution(solution);
  }
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Handle Login
  async function handleLogin() {
    if (!username || !password) {
      return toast.error("All fields are required. Please fill them out.");
    }

    if (!captcha) {
      return toast.error("CAPTCHA is required. Please fill it out.");
    }

    if (parseInt(captcha) !== captchaSolution) {
      return toast.error("Invalid CAPTCHA");
    }

    setLoading(true);
    try {
      const ipResponse = await getIpAddress();
      // const ipResponse = "0.0.0.0";
      // const domain = window.location.hostname;
      // const domain = "app.celitix.com";

      setBasicDetails({
        // systemInfo: uaResult.browser.name,
        // ip: ipResponse?.data?.clientIp || "0.0.0.0",
        systemInfo: "Chrome",
        ip: "150.107.189.220",
        // domain,
      });

      const payload = {
        userId: username,
        password,
        // systemInfo: uaResult.browser.name || "Unknown",
        // ip: ipResponse?.data?.clientIp || "0.0.0.0",
        systemInfo: "Chrome",
        ip: "150.107.189.220",
        // domain,
      };

      const res = await login(payload);

      if (res?.data?.validateOtp) {
        // return toast.error(res?.data?.message);
        setStep("verifyNumber");
        return;
      }

      if (res?.data?.validateOtp) {
        // return toast.error(res?.data?.message);
        setStep("verifyNumber");
        return;
      }

      if (!res?.data?.token) {
        return toast.error("Invalid credentials");
      }

      const { token, role, ttl } = res.data;
      console.log("role", role);

      const allowedRoles = ["ADMIN", "AGENT", "DIRECTUSER"];

      if (!allowedRoles.includes(role)) {
        toast.error("This user role is not allowed");
        return;
      }

      sessionStorage.setItem("token", token);
      setIsRedirecting(true);
      toast.success("Login Successful!");

      // let allowedServices = null;

      // if (role !== "AGENT") {
      //   allowedServices = await getAllowedServices();
      // }
      const [allowedServices] = await Promise.all([
        role !== "AGENT" ? getAllowedServices() : Promise.resolve(null),
        delay(1500), // Ensures UI is shown for at least 3.5 seconds
      ]);

      authLogin(role, allowedServices, ttl);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error while logging in");
      setIsRedirecting(false);
    } finally {
      setLoading(false);
    }
  }

  // Handle Request OTP
  function handleRequestOTP() {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!mobile || !email) {
      toast.error("Both mobile number and email are required.");
      return;
    }

    if (!phoneRegex.test(mobile)) {
      toast.error("Invalid mobile number. Please enter a 10-digit number.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return;
    }

    toast.success("OTP Sent to your mobile number and email");
    setStep("verifyOTP");
  }

  // handle Verify Number
  async function handleVerifyNumberRequest() {
    try {
      const phoneRegex = /^\d{10,13}$/;

      if (!verifyNumber) {
        toast.error("Mobile number is required.");
        return;
      }

      if (!phoneRegex.test(verifyNumber)) {
        toast.error("Invalid mobile number. Please enter a 10-digit number.");
        return;
      }

      let payload = {
        userId: username,
        // password: password,
        mobileNo: verifyNumber,
        // domain: window.location.hostname,
        domain: basicDetails.domain,
      };

      if (!isForgotPassword) {
        payload = {
          ...payload,
          password: password,
        };
      }
      // setLoading(true);
      setRequestBtnLoading(true);

      const res = isForgotPassword
        ? await forgotPassword(payload)
        : await requestOtp(payload);

      if (!res?.data?.status) {
        return toast.error(res?.data.msg || "Unable to send OTP");
      }

      toast.success("OTP Sent to your mobile number");
      setStep("verifynumberotp");
    } catch (error) {
      console.error("OTP Request Failed:", error);
      toast.error("Something went wrong while sending OTP. Please try again.");
    } finally {
      // setLoading(false);
      setRequestBtnLoading(false);
    }
  }

  // Handle verify Number OTP
  async function handleVerifyNumberOTP() {
    // verifyBtnLoading(true)
    if (!numberOtp) {
      toast.error("Please fill OTP");
      return;
    }
    setLoading(true);

    try {
      const payload = {
        userId: username,
        password: password,

        mobileNo: verifyNumber,
        otp: numberOtp,
        ...basicDetails,
      };
      const res = isForgotPassword
        ? await verifyForgotPasswordOtp({
            userId: username,
            mobileNo: verifyNumber,
            otp: numberOtp,
          })
        : await verifyOtp(payload);
      if (!res?.data?.token) {
        return toast.error("Invalid otp");
      }

      if (isForgotPassword) {
        setStep("login");
        return;
      }

      const { token, role, ttl } = res.data;

      const allowedRoles = ["ADMIN", "AGENT"];

      if (!allowedRoles.includes(role)) {
        toast.error("This user role is not allowed");
        return;
      }
      sessionStorage.setItem("token", token);

      setIsRedirecting(true);
      toast.success("Login Successful!");
      // let allowedServices = null;
      // if (role !== "AGENT") {
      //   allowedServices = await getAllowedServices();
      // }
      const [allowedServices] = await Promise.all([
        role !== "AGENT" ? getAllowedServices() : Promise.resolve(null),
        delay(1500), // Ensures UI is shown for at least 3.5 seconds
      ]);
      authLogin(role, allowedServices, ttl);
      navigate("/");
    } catch (e) {
      setIsRedirecting(false);
      toast.error("Unable to Verify OTP");
    } finally {
      setLoading(false);
      // verifyBtnLoading(false)
    }
  }

  //Handle OTP Verify
  function handleVerifyOTP() {
    if (mobileotp === "123456" && emailotp === "456789") {
      toast.success("OTP Verified successfully");
      setStep("resetPassword");
    } else {
      toast.error("Incorrect OTPs");
    }
  }

  // Handle Resend OTP
  function handleResendOTP() {
    toast.success("New OTP Sent to your mobile and email");
    setIsResendDisabled(true);
  }

  // Handle Reset Password
  function handleResetPassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8}$/;

    if (!passwordRegex.test(newPassword) || newPassword !== confirmPassword) {
      toast.error(
        "Password must be exactly 8 characters, with at least one uppercase and one lowercase letter, and both fields must match.",
      );
      return;
    }

    toast.success("Password Reset Successful");
    setStep("login");
  }

  // Handle Generate Password
  function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const allCharacters = uppercase + lowercase + numbers;

    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];

    for (let i = 3; i < 8; i++) {
      password +=
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setNewPassword(password);
    setConfirmPassword(password);
  }

  // back to login step button
  const handleBackToLogin = () => {
    setStep("login");
    setIsForgotPassword(false);
    // setIsForgotPassword(false)
    setPassword("");
  };

  // Back to Verify Mobile step
  const handleBackMobileInput = () => {
    setStep("verifyNumber");
    setNumberOtp("");
    setVerifyNumber("");
  };

  return (
    <div className="h-[100%] flex items-center justify-center bg-white">
      <div className="bg-white flex rounded-2xl">
        <div className="flex items-center justify-center rounded-2xl p-4 md:p-6 border-2 border-gray-400 m-4 bg-gray-50 w-96 sm:w-100 md:w-120 shadow">
          <div className="w-full">
            {isRedirecting ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center"
              >
                {/* Animated Icon/Logo */}
                <div className="relative mb-6">
                  <div className="w-30 h-30 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-30 h-30 border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={celitixLogo} alt="Logo" className="w-20 h-20 " />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2 playf">
                  Setting up your workspace
                </h2>
                <p className="text-gray-500 text-sm mb-8 max-w-[250px]">
                  Please wait while we prepare your personalized dashboard and
                  secure your session.
                </p>

                {/* Production Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="bg-green-700 h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between w-full text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  <span>Authenticating</span>
                  <span>Finalizing</span>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Login Step */}
                {step === "login" && (
                  <>
                    <motion.div
                    // initial={{ opacity: 0, y: 100 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: -100 }}
                    // transition={{ duration: 0.5 }}
                    >
                      <div className="flex flex-col items-center justify-center w-100">
                        {/* <h3 className="text-4xl font-medium playf">
                      Welcome Back
                    </h3> */}
                      </div>

                      <div className="w-full">
                        <div htmlFor="username" className="text-base mb-1.5">
                          Username
                        </div>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Enter Username"
                          className={`w-full px-2 py-2 mb-2 border border-gray-300 rounded-md text-sm ${loading ? "cursor-not-allowed bg-gray-200" : ""}`}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={loading}
                          // maxLength={8}
                        />
                      </div>

                      <div className="relative w-full ">
                        <div htmlFor="password" className="text-base mb-1.5">
                          Password
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          className={`w-full px-2 py-2 mb-2 border border-gray-300 rounded-md text-sm ${loading ? "cursor-not-allowed bg-gray-200" : ""}`}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          disabled={loading}
                          // maxLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-2 top-5 flex items-center"
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                          ) : (
                            <AiOutlineEye size={20} />
                          )}
                        </button>
                      </div>

                      {/* <div className="flex items-center justify-end">
                    <button
                      className="text-black mt-2 cursor-pointer text-right "
                      onClick={() => setStep("forgotPassword")}
                    >
                      Forgot Password?
                    </button>
                  </div> */}

                      <div className="flex justify-between my-2">
                        <h2 className="text-sm">Solve Captcha</h2>
                        {/* <button
                      onClick={() => {
                        setStep("verifyNumber");
                        setIsForgotPassword(true);
                      }}
                      className="hover:underline cursor-pointer"
                    >
                      Forgot Password
                    </button> */}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="p-2 ">{captchaProblem}</span>
                        <input
                          type="number"
                          maxLength={2}
                          placeholder="Enter Captcha"
                          disabled={loading}
                          // className="w-2/3 p-2 border border-gray-300 rounded-xl"
                          className={`w-2/3 p-2 border border-gray-300 rounded-xl ${loading ? "cursor-not-allowed bg-gray-200" : ""}`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d*$/.test(inputValue)) {
                              setCaptcha(inputValue);
                            }
                          }}
                        />
                      </div>
                      <div className="w-full flex items-center justify-center mt-4">
                        {/* <button
                      className="w-30 bg-black text-white p-2 rounded-lg mt-4 cursor-pointer"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button> */}

                        <button
                          className={`custom-signin-btn ${
                            loading ? "loading" : ""
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
                    </motion.div>
                  </>
                )}

                {/* Step Verify Number  */}
                {step === "verifyNumber" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="p-1 "
                  >
                    <h1 className="text-4xl font-semibold text-center my-2 playf">
                      {isForgotPassword ? "Forgot Password" : "Verify Number"}
                    </h1>
                    {/* {!isForgotPassword && (
                  <p className="text-center font-medium sm:text-lg playf">
                    Provide your mobile number for secure access.{" "}
                  </p>
                )} */}
                    <p className="text-center font-medium sm:text-lg playf mb-4">
                      Provide your mobile number for secure access.{" "}
                    </p>
                    <div lassName="space-y-2 ">
                      {isForgotPassword && (
                        <input
                          type="text"
                          placeholder="Enter UserId"
                          className="w-full p-2 my-4 border border-gray-300 rounded-xl"
                          onChange={(e) => setUsername(e.target.value)}
                          // maxLength={13}
                        />
                      )}
                      <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        className="w-full p-2 border border-gray-300 rounded-xl"
                        onChange={(e) => setVerifyNumber(e.target.value)}
                        maxLength={13}
                        value={verifyNumber}
                      />
                    </div>

                    {/* <button
                  className="w-full text-white bg-black p-2 rounded-lg mt-2"
                  onClick={handleVerifyNumberRequest}
                >
                  Request OTP
                </button> */}

                    <div className="w-full flex items-center justify-center mt-4">
                      <button
                        className={`custom-signin-btn ${
                          requestBtnLoading ? "loading" : ""
                        }`}
                        disabled={requestBtnLoading}
                        onClick={handleVerifyNumberRequest}
                      >
                        <div className="back"></div>
                        {!requestBtnLoading ? (
                          <span className="text"> Request OTP</span>
                        ) : (
                          <div className="circle-spinner" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                        onClick={handleBackToLogin}
                      >
                        ← Back to Login
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step Verify OTP */}
                {step === "verifynumberotp" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-4xl font-bold mb-4 text-center playf">
                        Enter OTP
                      </h2>
                      <p className="text-center mb-4">
                        We've sent a 6-digit code to your mobile. Enter it below
                      </p>

                      <div className="flex items-center justify-center">
                        <InputOtp
                          length={6}
                          value={numberOtp}
                          onChange={(e) => setNumberOtp(e.value)}
                          variant={"outlined"}
                          className="p-2"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                        {/* <button
                      className="w-full bg-black text-white p-2 rounded-lg"
                      onClick={handleVerifyNumberOTP}
                    >
                      Verify OTP
                    </button> */}

                        <button
                          className={`custom-signin-btn ${
                            loading ? "loading" : ""
                          }`}
                          disabled={loading}
                          onClick={handleVerifyNumberOTP}
                        >
                          <div className="back"></div>
                          {!loading ? (
                            <span className="text">Verify OTP</span>
                          ) : (
                            <div className="circle-spinner" />
                          )}
                        </button>

                        {/* {!isResendDisabled && (
                      <button
                        className="w-full bg-black text-white p-2 rounded-lg"
                        onClick={handleVerifyNumberRequest}
                      >
                        Resend OTP
                      </button>
                    )} */}
                        {!isResendDisabled && (
                          // <button
                          //   className="w-full bg-black text-white p-2 rounded-lg"
                          //   onClick={handleVerifyNumberRequest}
                          // >
                          //   Resend OTP
                          // </button>

                          <button
                            className={`custom-signin-btn ${
                              requestBtnLoading ? "loading" : ""
                            }`}
                            disabled={requestBtnLoading}
                            onClick={handleVerifyNumberRequest}
                          >
                            <div className="back"></div>
                            {!requestBtnLoading ? (
                              <span className="text">Resend OTP</span>
                            ) : (
                              <div className="circle-spinner" />
                            )}
                          </button>
                        )}
                      </div>
                      {/* <p className="text-center mt-3 text-gray-500">
                    {isResendDisabled ? `Resend OTP in ${timer} seconds` : ""}
                  </p> */}
                      <p className="text-center mt-3 text-gray-500">
                        {isResendDisabled
                          ? `Resend OTP in ${timer} seconds`
                          : ""}
                      </p>

                      <div className="flex items-center justify-center">
                        <button
                          className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                          onClick={handleBackMobileInput}
                        >
                          ← Back to Verify Number
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Step Forgot Password */}

                {step === "forgotPassword" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col ">
                      <h1 className="lg:text-3xl text-2xl font-medium text-center playf">
                        Enter Your Registered{" "}
                      </h1>
                      <h1 className="lg:text-2xl text-xl font-medium text-center my-1 playf">
                        Mobile Number & Email Address
                      </h1>
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        className=" p-2 my-4 border border-gray-200 rounded-md"
                        onChange={(e) => setMobile(e.target.value)}
                        maxLength={10}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className=" p-2 my-4 border border-gray-200 rounded"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        className=" text-white bg-black p-2 rounded-lg mt-2"
                        onClick={handleRequestOTP}
                      >
                        Request OTP
                      </button>
                      <div className="flex items-center justify-center">
                        <button
                          className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                          onClick={handleBackToLogin}
                        >
                          ← Back to Login
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step Forgor Password Verify OTP */}

                {step === "verifyOTP" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-xl font-medium mb-4 text-center playf">
                        Enter the mobile OTP
                      </h2>
                      <InputOtp
                        length={6}
                        value={mobileotp}
                        onChange={(e) => setMobileOtp(e.value)}
                        variant={"outlined"}
                      />

                      <h2 className="text-xl font-medium mb-4 text-center mt-4 playf">
                        Enter the email OTP
                      </h2>
                      <InputOtp
                        length={6}
                        value={emailotp}
                        onChange={(e) => setEmailOtp(e.value)}
                        variant={"outlined"}
                      />

                      <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                          className="w-full bg-black text-white p-2 rounded-lg"
                          onClick={handleVerifyOTP}
                        >
                          Verify OTP
                        </button>

                        {!isResendDisabled && (
                          <button
                            className="w-full bg-black text-white p-2 rounded-lg"
                            onClick={handleResendOTP}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <p className="text-center mt-3 text-gray-500">
                        {isResendDisabled
                          ? `Resend OTP in ${timer} seconds`
                          : ""}
                      </p>
                      <div className="flex items-center justify-center">
                        <button
                          className=" text-black underline p-2 rounded-lg mt-4 text-centre cursor-pointer"
                          onClick={handleBackToLogin}
                        >
                          ← Back to Login
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Step Reset Password */}

                {step === "resetPassword" && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-xl flex flex-col items-center justify-center sm:p-4">
                      <h2 className="text-4xl font-medium mb-2 text-center playf">
                        Reset Password
                      </h2>
                      <div className="relative flex flex-col items-center my-4">
                        <p className="text-base">New Password</p>
                        <div className="relative w-full max-w-xs">
                          <input
                            id="new-password"
                            placeholder="New Password"
                            className={`p-2 my-1 border rounded-lg w-full pr-10 ${
                              newPassword === ""
                                ? "border-gray-400"
                                : passwordsMatch === true
                                  ? "border-green-500"
                                  : "border-red-500"
                            }`}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={showNewPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-3 flex items-center"
                          >
                            {showNewPassword ? (
                              <svg
                                className="w-5 h-5 text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6a16.57 16.57 0 014.609-4.845m2.608-1.45A9.988 9.988 0 0112 5c5.523 0 10 6 10 6a16.536 16.536 0 01-1.986 2.12M3 3l18 18"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5 text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password - with dynamic border color */}
                      <div className="relative flex flex-col items-center my-1">
                        <p className="text-base">Confirm New Password</p>
                        <div className="relative w-full max-w-xs">
                          <input
                            placeholder="Confirm New Password"
                            className={`p-2 my-2 border rounded-lg w-full pr-10 ${
                              confirmPassword === ""
                                ? "border-gray-400"
                                : passwordsMatch === true
                                  ? "border-green-500"
                                  : "border-red-500"
                            }`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showConfirmPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            className="absolute inset-y-0 right-3 flex items-center"
                          >
                            {showConfirmPassword ? (
                              // Eye Slash (Hide password)
                              <svg
                                className="w-5 h-5 text-black hover:text-gray-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6a16.57 16.57 0 014.609-4.845m2.608-1.45A9.988 9.988 0 0112 5c5.523 0 10 6 10 6a16.536 16.536 0 01-1.986 2.12M3 3l18 18"
                                />
                              </svg>
                            ) : (
                              // Eye Open (Show password)
                              <svg
                                className="w-5 h-5 text-black hover:text-gray-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="w-1/2 flex items-center justify-center gap-2 p-1 mt-2">
                        <button
                          className="w-3xs bg-black text-white p-2 rounded-lg"
                          onClick={generatePassword}
                        >
                          Generate
                        </button>
                        <button
                          className="w-3xs bg-black text-white p-2 rounded-lg"
                          onClick={handleResetPassword}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
