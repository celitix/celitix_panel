import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

// COMPONENTS
import ChatScreen from "./ChatScreen";
import HomeScreen from "./HomeScreen";
import  useWidgetStore  from "../stores/useWidgetStore";

const BotUi = () => {
  const {
    // UI
    isOpen,
    screen,

    // Appearance
    bgColor,
    textColor,
    minimizedValue,
    showMinimizedLabel,

  } = useWidgetStore();

  const setWidget = useWidgetStore((s) => s.setWidget);

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* CHAT BOX */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-85 min-h-55 bg-white rounded-3xl shadow-2xl border flex flex-col overflow-hidden"
        >
          {/* Auto-switch screens */}
          {screen === "home" ? <HomeScreen /> : <ChatScreen />}
        </motion.div>
      )}

      {/* FLOATING BUTTON */}
      <motion.div
        onClick={() => setWidget({ isOpen: !isOpen })}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        {/* Tooltip */}
        {!isOpen && showMinimizedLabel && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="shadow-lg px-4 py-2 rounded-full text-sm cursor-pointer"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {minimizedValue}
          </motion.div>
        )}

        {/* Toggle Button */}
        <motion.button
          onClick={() => setWidget({ isOpen: !isOpen })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-full text-white shadow-xl mt-2"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        </motion.button>
      </motion.div>
    </div>

    
  );
};

export default BotUi;
