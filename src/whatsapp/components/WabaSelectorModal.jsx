import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useWabaStore } from "@/whatsapp/store/waba.store";

const Shimmer = () => (
  <div className="animate-pulse space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-12 bg-gray-200 rounded-md" />
    ))}
  </div>
);

const WabaSelectorModal = ({ wabaList = [], loading }) => {
  const { showWabaModal, selectWaba, closeWabaModal } = useWabaStore();

  return createPortal(
    <AnimatePresence>
      {showWabaModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="bg-white w-[420px] rounded-xl shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaWhatsapp className="text-green-500" size={22} />
              <h2 className="text-lg font-semibold">
                Switch WhatsApp Account
              </h2>
            </div>

            {loading ? (
              <Shimmer />
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {wabaList.map((waba) => (
                  <button
                    key={waba.wabaId}
                    onClick={() => selectWaba(waba)}
                    className="w-full p-3 border rounded-lg text-left hover:bg-green-50 transition"
                  >
                    <div className="font-medium">
                      {waba.displayName || waba.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {waba.phoneNumber}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={closeWabaModal}
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default WabaSelectorModal;
