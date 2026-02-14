import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useWabaStore } from "@/whatsapp/store/waba.store";

const WabaFloatingButton = () => {
  const { selectedWaba, openWabaModal } = useWabaStore();

  if (!selectedWaba) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={openWabaModal}
      className="fixed bottom-6 right-20 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg text-white"
    >
      <FaWhatsapp size={26} />
    </motion.button>
  );
};

export default WabaFloatingButton;
