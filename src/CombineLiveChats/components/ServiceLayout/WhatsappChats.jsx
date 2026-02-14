import React from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// ICONS
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { FaFacebookF, } from "react-icons/fa";

// ASSETS
import whatsappforchat from "@/assets/animation/whatsappforchat.json";
import whatsappforchat2 from "@/assets/animation/whatsappforchat2.json";
import whatsappforchat3 from "@/assets/animation/whatsappforchat3.json";

export default function PrivessLogin() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 min-h-[85vh] flex items-center justify-center p-4 rounded-3xl">
      <div className="flex justify-center rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-center overflow-auto h-100 md:h-auto pb-10 md:pb-6">
          {/* Close Icon */}


          {/* WhatsApp Logo or Mascot */}
          <div className="mb-5 flex items-center justify-center">
            {/* <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />
          </div> */}
            <Lottie
              animationData={whatsappforchat3}
              loop
              autoplay
              className="w-25"
            />
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-green-800 mb-1">Subscribe to Whatsapp Business</h2>
          <p className="text-xs text-gray-600 mb-6">
            Access secure features by logging in or signing up to Privess.
          </p>

          {/* Info Box */}
          <div className="space-y-4 mb-2">
            <Feature
              icon={<ShareIcon />}
              text="Share stories, posts and ads across Facebook and Instagram"
            />
            <Feature
              icon={<ChatBubbleOutlineIcon />}
              text="Manage comments and messages in one place"
            />
            <Feature
              icon={<AccountCircleIcon />}
              text="Sync profile info like name and website"
            />
          </div>

          {/* Google Login Button */}
          <Link className="w-full flex items-center justify-center gap-3 bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow-lg"
          >
            <span className="bg-green-700 p-1 rounded-full" >
              <FaFacebookF />
            </span>
            Continue with Facebook
          </Link>

          {/* Footer Note */}

        </motion.div>
      </div>
    </div>
  );
}

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-3 hover:bg-blue-50 p-2 rounded-lg transition">
    <div className="text-green-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);




export function WhatsappChatSettingSetup() {
  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 min-h-[85vh] flex items-center justify-center p-4 rounded-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-center overflow-auto h-100 md:h-auto pb-10 md:pb-6"
      >
        {/* WhatsApp Logo or Mascot */}
        <div className="mb-5 flex items-center justify-center">
          <Lottie
            animationData={whatsappforchat3}
            loop
            autoplay
            className="w-full max-w-[120px] sm:max-w-[150px]"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
          Setting
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Access secure features by logging in or signing up to Privess.
        </p>

        {/* Info Box */}
        <div className="space-y-3 sm:space-y-4 mb-4">
          <FeatureSetting
            icon={<ShareIcon />}
            text="Share stories, posts and ads across Facebook and Instagram"
          />
          <FeatureSetting
            icon={<ChatBubbleOutlineIcon />}
            text="Manage comments and messages in one place"
          />
          <FeatureSetting
            icon={<AccountCircleIcon />}
            text="Sync profile info like name and website"
          />
        </div>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-green-600 text-white text-sm sm:text-base font-semibold py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
          <GoogleIcon />
          Continue with Facebook
        </button>

        {/* Footer Note */}
        <p className="text-xs sm:text-sm text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> and{" "}
          <a href="#" className="text-green-600 hover:underline">T&Cs</a>.
        </p>
      </motion.div>
    </div>
  );
}

const FeatureSetting = ({ icon, text }) => (
  <div className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
    <div className="text-green-600">{icon}</div>
    <p className="text-xs text-gray-700">{text}</p>
  </div>
);


export function WhatsappChatBot() {
  const Feature = ({ icon, text }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition">
      <div className="text-green-600">{icon}</div>
      <p className="text-xs font-medium text-gray-700">{text}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 min-h-[85vh] flex items-center justify-center rounded-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-4 text-center"
      >
        {/* Animation */}
        <div className="mb-3 flex justify-center">
          <Lottie
            animationData={whatsappforchat3}
            loop
            autoplay
            className="w-24"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-green-800 mb-1">
          WhatsApp Chat Bot
        </h2>

        <p className="text-xs text-gray-600 mb-4 px-2">
          Automate customer conversations using WhatsApp Business messaging.
        </p>

        {/* Bot Capabilities */}
        <div className="space-y-2 mb-4 text-left">
          <Feature
            icon={<WhatsAppIcon fontSize="small" />}
            text="Official WhatsApp Business integration"
          />
          <Feature
            icon={<ChatBubbleOutlineIcon fontSize="small" />}
            text="Instant automated replies & chat flows"
          />
          <Feature
            icon={<AccountCircleIcon fontSize="small" />}
            text="Personalized customer interactions"
          />
          <Feature
            icon={<ShareIcon fontSize="small" />}
            text="Send alerts, offers & notifications"
          />
        </div>

        {/* CTA */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition shadow-md"
        >
          <span className="bg-green-700 p-1 rounded-full">
            <FaFacebookF size={12} />
          </span>
          Subscribe with Facebook
        </button>

        {/* Footer */}
        <p className="text-[10px] text-gray-500 mt-3">
          Requires a verified WhatsApp Business account.
        </p>
      </motion.div>
    </div>
  );
}