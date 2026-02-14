import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TooltipHover = ({ children, content }) => {
    const [open, setOpen] = useState(false);

    // Detect if device supports touch
    const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => !isTouchDevice && setOpen(true)}
            onMouseLeave={() => !isTouchDevice && setOpen(false)}
            onClick={() => isTouchDevice && setOpen((prev) => !prev)}
        >
            {children}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-2 w-max max-w-xs rounded-md bg-gray-800 text-white text-xs px-3 py-2 shadow-lg z-500"
                    >
                        {content}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 z-100"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default TooltipHover